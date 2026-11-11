import { useNavigate } from "react-router-dom";
import useContentStore from "../../stores/content-store";
import ContentInfo from "./ContentInfo";

export default function ContentCard({ contentId, contentInfos }) {
    const navigate = useNavigate();
    const allContent = useContentStore((state) => state.content);
    const foundContent = allContent.find(item => item.id === contentId);
    const contentDetails = foundContent ? foundContent.details : null;

    
    const onClick = () => {
        navigate(`/content-details?id=${encodeURIComponent(contentId)}`);
    }

    return (
        <div className="content-card" onClick={onClick}>
            <div className="content-image-container">
                <img src={contentDetails?.Poster} alt={contentDetails?.Title} title={contentDetails?.Title} className="content-card-image" />
            </div>
            <div className="content-info-container">
                {contentDetails && contentInfos.map((info) => (
                    <ContentInfo key={info.id} contentInfo={info} contentDetails={contentDetails} />
                ))}
            </div>
        </div>
    )
}