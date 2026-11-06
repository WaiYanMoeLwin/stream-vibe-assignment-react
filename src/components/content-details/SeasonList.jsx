import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/api";
import { replaceImageSource } from "../../utils/utils";

export default function SeasonList({ contentDetails }) {
    const [seasons, setSeasons] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (contentDetails && contentDetails.Type === 'series') {
            const seasonNumbers = Array.from({ length: contentDetails.totalSeasons }, (_, i) => i + 1);
            seasonNumbers.map(async (seasonNumber) => api.fetchContentDetails(contentDetails.imdbID, seasonNumber)
                .then(seasonDetails => {
                    seasonDetails.Episodes.map(async (episode) => {
                        api.fetchContentDetailsById(episode.imdbID).then(async (episodeDetails) => {
                            episodeDetails.Poster = await replaceImageSource(episodeDetails.Poster);
                            setSeasons(prevSeasons => {
                                const updatedSeasons = [...prevSeasons];
                                const seasonIndex = updatedSeasons.findIndex(season => season.seasonNumber === seasonNumber);
                                if (seasonIndex !== -1) {
                                    const episodeExists = updatedSeasons[seasonIndex].episodes.some(ep => ep.imdbID === episodeDetails.imdbID);
                                    if (episodeExists) {
                                        return updatedSeasons;
                                    }
                                    updatedSeasons[seasonIndex].episodes.push(episodeDetails);
                                } else {
                                    updatedSeasons.push({
                                    seasonNumber: seasonNumber,
                                    episodes: [episodeDetails]
                                });
                            }
                            return updatedSeasons;
                        });
                    });
                });
            }));
        }
    }, [contentDetails]);
    
    if (!contentDetails || contentDetails.Type !== 'series') {
        return null;
    }

    const onExpandClick = (seasonNumber) => {
        setSeasons(prevSeasons => {
            const updatedSeasons = [...prevSeasons];
            const seasonIndex = updatedSeasons.findIndex(season => season.seasonNumber === seasonNumber);
            if (seasonIndex !== -1) {
                updatedSeasons[seasonIndex].expanded = true;
            }
            return updatedSeasons;
        });
    };

    const onCollapseClick = (seasonNumber) => {
        setSeasons(prevSeasons => {
            const updatedSeasons = [...prevSeasons];
            const seasonIndex = updatedSeasons.findIndex(season => season.seasonNumber === seasonNumber);
            if (seasonIndex !== -1) {
                updatedSeasons[seasonIndex].expanded = false;
            }
            return updatedSeasons;
        });
    };

    const onPlayClick = (seasonNumber, episodeNumber) => {
        navigate(`/playback?id=${contentDetails.Title}&type=series&season=${seasonNumber}&episode=${episodeNumber}`);
    }

    return (
        <ol className="seasons-list">
            {seasons.sort((a, b) => a.seasonNumber - b.seasonNumber).map((season) => (
                <li key={season.seasonNumber} className="season-item">
                    <div className="season-header">
                        <div className="season-info">
                            <h3 className="season-title">Season {season.seasonNumber.toString().padStart(2, '0')}</h3>
                            <span className="episode-count">{season.episodes.length} Episodes</span>
                        </div>
                        <button className={`expand-button ${season.expanded ? 'hidden' : ''}`} onClick={() => onExpandClick(season.seasonNumber)}>
                            <img src="/images/icons/arrow-down.svg" alt="Expand" />
                        </button>
                        <button className={`collapse-button ${season.expanded ? '' : 'hidden'}`} onClick={() => onCollapseClick(season.seasonNumber)}>
                            <img src="/images/icons/arrow-up.svg" alt="Collapse" />
                        </button>
                    </div>
                    <ol className={`episodes-list ${season.expanded ? '' : 'hidden'}`}>
                        {season.episodes.map((episode) => (
                            <li key={episode.imdbID} className="episode-item">
                                <span className="episode-number">{episode.Episode.toString().padStart(2, '0')}</span>
                                <div className="episode-thumbnail">
                                    <img src={episode.Poster} alt={episode.Title} className="thumbnail-img" />
                                    <button className="play-button" aria-label="Play Episode" onClick={() => onPlayClick(season.seasonNumber, episode.Episode)}>
                                        <img className="play-icon" src="/images/icons/play-circle.svg" alt="Play" />
                                    </button>
                                </div>
                                <div className="episode-info">
                                    <div className="episode-header">
                                        <h4 className="episode-title">{episode.Title}</h4>
                                        <div className="episode-duration">{episode.Runtime}</div>
                                    </div>
                                    <p className="episode-description">{episode.Plot}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}