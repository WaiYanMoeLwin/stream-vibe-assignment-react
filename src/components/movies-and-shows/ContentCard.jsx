import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { replaceImageSource } from "../../utils/utils";
import ContentInfo from "./ContentInfo";

export default function ContentCard({ contentId, contentInfos }) {
    const [imageSrc, setImageSrc] = useState();
    const [contentDetails, setContentDetails] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        api.fetchContentDetails(contentId).then(async (details) => {
            setContentDetails(details);
            const updatedImageSrc = await replaceImageSource(details.Poster);
            setImageSrc(updatedImageSrc);
        });
    }, [contentId]);
    
    const onClick = () => {
        navigate(`/content-details?id=${contentId}`);
    }

    return (
        <div className="content-card" onClick={onClick}>
            <div className="content-image-container">
                <img src={imageSrc} alt={contentDetails?.Title} title={contentDetails?.Title} className="content-card-image" />
            </div>
            <div className="content-info-container">
                {contentDetails && contentInfos.map((info) => (
                    <ContentInfo key={info.id} contentInfo={info} contentDetails={contentDetails} />
                ))}
            </div>
        </div>
    )
}