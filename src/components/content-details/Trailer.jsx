import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { fetchActivePlan } from "../../utils/subscription-info";
import { addToWatchList, getWatchList, isLoggedIn } from "../../utils/user";
import { replaceImageSource } from "../../utils/utils";
import MessageBox from "../common/MessageBox";

export default function TrailerCarousel({ id, trailer, carousel=false, children }) {
    const [currentTrailer, setCurrentTrailer] = useState(null);
    const [messageBox, setMessageBox] = useState(null);
    const navigate = useNavigate();
    const [isInWatchList, setIsInWatchList] = useState(false);

    useEffect(() => {
        const fetchWatchListData = async () => {
            try {
                const watchListData = await getWatchList();
                if (watchListData && Array.isArray(watchListData)) {
                    const isInList = watchListData.some(item => item === trailer.id);
                    setIsInWatchList(isInList);
                }
            } catch (error) {
                console.error("Error fetching watch list:", error);
            }
        };

        fetchWatchListData();
    }, [trailer]);

    const showMessageBox = (message, onOkay) => {
        setMessageBox({ message, onClose: () => setMessageBox(null), onOkay });
    };

    const currentTrailerPoster = currentTrailer ? currentTrailer.Poster : null;
    
    const trailerStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${currentTrailerPoster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundClip: 'padding-box',
    };

    useEffect(() => {
        if (trailer) {
            api.fetchContentDetails(trailer.id).then(async (details) => {
                details.Poster = await replaceImageSource(details.Poster);
                setCurrentTrailer(details);
            });
        }
    }, [trailer]);

    const handleAddToWatchList = () => {
        if (!isLoggedIn()) {
            showMessageBox('You need to be logged in to add items to your watch list.', () => {
                window.localStorage.setItem('redirectAfterLogin', window.location.href);
                navigate('/login');
            });
        } else {
            addToWatchList(trailer.id, showMessageBox).then(() => {
                setIsInWatchList(true);
            });
        }

    }


    const handlePlayNow = async () => {
        const activePlan = await fetchActivePlan();
        if (!isLoggedIn()) {
            showMessageBox('You need to be logged in to play content.', () => {
                window.localStorage.setItem('redirectAfterLogin', window.location.pathname + (window.location.hash || '') + (window.location.search || ''));
                navigate('/login');
            });
        } else if (!activePlan) {
            showMessageBox('You need an active subscription to play content.', () => {
                navigate('/subscriptions');
            });
        } else {
            if (currentTrailer && currentTrailer.Type === "series") {
                navigate(`/playback?id=${trailer.id}&season=1&episode=1`);
            } else {
                navigate(`/playback?id=${trailer.id}`);
            }
        }
    };

    return (
        <section id={id} style={trailerStyle}>
            {messageBox && createPortal(<MessageBox {...messageBox} />, document.body)}
            <article className="section-header">
                <h2 className={carousel ? "trailer-title" : "title"}>{currentTrailer ? currentTrailer.Title : "Trailer"}</h2>
                <p className={carousel ? "trailer-description" : "description"}>{currentTrailer ? currentTrailer.Plot : "No description available."}</p>
            </article>
            <article className="media-buttons-container">
                <button className="play-button" onClick={handlePlayNow}>
                    <img src="public/images/icons/play.svg" alt="Play"/> Play Now
                </button>
                <div className="watch-list-buttons">
                    <button className="add-to-watch-list-button" aria-label="Add to Watch List" onClick={handleAddToWatchList}>
                        {isInWatchList ? (
                            <img className="in-watch-list" src="public/images/icons/bookmark.svg" alt="In Watch List"/>
                        ) : (
                            <img src="public/images/icons/plus.svg" alt="Add to Watch List"/>
                        )}
                    </button>
                    <button className="like-button" aria-label="Like">
                        <img src="public/images/icons/like.svg" alt="Like"/>
                    </button>
                    <button className="mute-button muted" aria-label="Mute/Unmute">
                        <img src="public/images/icons/audio.svg" alt="Unmute"/>
                        <img src="public/images/icons/mute.svg" className="hidden" alt="Mute"/>
                    </button>
                </div>
            </article>
            {children}
        </section>
    )
}