import { useEffect, useState } from "react";
import api from "../../api/api";
import { checkImageSource } from "../../utils/utils";

export default function TrailerCarousel({ id, trailer, carousel=false, children }) {
    const [currentTrailer, setCurrentTrailer] = useState(null);

    const currentTrailerPoster = currentTrailer ? currentTrailer.Poster : "/images/general-placeholder.jpg";
    
    const trailerStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(20, 20, 20, 0), rgba(20, 20, 20, 1)), url(${currentTrailerPoster})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundClip: 'padding-box',
    };

    useEffect(() => {
        if (trailer) {
            api.fetchContentDetails(trailer.id).then(async (details) => {
                if (await checkImageSource(details.Poster)) {
                    setCurrentTrailer(details);
                } else {
                    details.Poster = "/images/general-placeholder.jpg";
                    setCurrentTrailer(details);
                }
            });
        }
    }, [trailer]);

    

    return (
        <section id={id} style={trailerStyle}>
            <article className="section-header">
                <h2 className={carousel ? "trailer-title" : "title"}>{currentTrailer ? currentTrailer.Title : "Trailer"}</h2>
                <p className={carousel ? "trailer-description" : "description"}>{currentTrailer ? currentTrailer.Plot : "No description available."}</p>
            </article>
            <article className="media-buttons-container">
                <button className="play-button"><img src="public/images/icons/play.svg" alt="Play"/> Play Now</button>
                <div className="watch-list-buttons">
                    <button className="add-to-watch-list-button" aria-label="Add to Watch List">
                        <img src="public/images/icons/plus.svg" alt="Add to Watch List"/>
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