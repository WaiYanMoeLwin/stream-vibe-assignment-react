import { useEffect, useState } from 'react';
import { createPortal } from "react-dom";
import { useNavigate } from 'react-router-dom';
import MainTemplate from '../components/common/MainTemplate';
import MessageBox from "../components/common/MessageBox";
import ContentInfo from '../components/movies-and-shows/ContentInfo';
import '../scss/watch-list.scss';
import useContentStore from '../stores/content-store';
import useUserStore from '../stores/user-store';
import { contentInfos } from '../utils/content-info';
import { replaceImageSource } from '../utils/utils';

export default function WatchListPage() {
    const [watchList, setWatchList] = useState([]);
    const navigate = useNavigate();
    const { getWatchList, removeFromWatchList } = useUserStore();
    const [messageBox, setMessageBox] = useState(null);
    const showMessageBox = (message, onOkay) => {
        setMessageBox({ message, onClose: () => setMessageBox(null), onOkay });
    };
    const allContent = useContentStore((state) => state.content);

    useEffect(() => {
        const fetchWatchList = async () => {
            const list = await getWatchList();
            await Promise.all(list.map(async (contentId, index) => {
                const foundContent = allContent.find(item => item.id === contentId);
                const contentDetails = foundContent ? foundContent.details : null;
                contentDetails.Poster = await replaceImageSource(contentDetails.Poster);
                contentDetails['index'] = index; // Add index to contentDetails for key prop
                contentDetails['id'] = contentId; // Add id to contentDetails for navigation
                setWatchList((prevList) => {
                    const updatedList = [...prevList];
                    if (updatedList.some(item => item.imdbID === contentDetails.imdbID)) {
                        return updatedList; // Skip adding if already exists
                    }
                    updatedList.push(contentDetails);
                    return updatedList;
                });
            }));
        };

        fetchWatchList().then(() => {
            setWatchList((prevList) => prevList.sort((a, b) => a.index - b.index)); // Sort by index after fetching all details
        });
    }, [getWatchList]);

    const handleRemoveFromWatchList = (event, content) => {
        event.stopPropagation(); // Prevent the click event from propagating to the card
        showMessageBox(`Are you sure you want to remove ${content.Title} from your watch list?`, () => {
            removeFromWatchList(content.id).then(() => {
                setWatchList((prevList) => prevList.filter((c) => c.id !== content.id));
            }).catch((error) => {
                showMessageBox(error.message);
            });
        });
    }
    return (
        <MainTemplate id="watch-list" page="watch-list" cta={false}>
            {messageBox && createPortal(<MessageBox {...messageBox} />, document.body)}
            <h1 className="watch-list-title">Your Watch List</h1>
            <section className="watch-list-section">
                {watchList.length > 0 ? watchList.map((content) => (
                    <div className="watch-list-card" key={content.index} onClick={() => navigate(`/content-details?id=${encodeURIComponent(content.id)}`)}>
                        <button className="remove-from-watch-list-button" aria-label="Remove from Watch List" onClick={(event) => handleRemoveFromWatchList(event, content)}>
                            <img src="public/images/icons/delete.svg" alt="Remove from Watch List" />
                        </button>
                        <img src={content.Poster} alt={content.Title} />
                        <div className="watch-list-card-info">
                            <ContentInfo className="runtime info" contentInfo={contentInfos.runtime} contentDetails={content} />
                            {content && content.Type === 'series' && <ContentInfo className="season info" contentInfo={contentInfos.seasons} contentDetails={content} />}
                        </div>
                    </div>
                )) : (
                    <p className="empty-watch-list-message">Your watch list is empty.</p>
                )}
            </section>
        </MainTemplate>
    )
}