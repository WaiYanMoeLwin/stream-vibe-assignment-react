import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../api/api';
import '../scss/playback.scss';
import { replaceImageSource } from '../utils/utils';

export default function PlaybackPage() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const type = searchParams.get('type');
    const season = searchParams.get('season');
    const episode = searchParams.get('episode');

    const [contentDetails, setContentDetails] = useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        api.fetchContentDetails(id, season, episode).then(async (details) => {
            details.Poster = await replaceImageSource(details.Poster);
            setContentDetails(details);
        });
    }, [id, type, season, episode]);

    const onBackButtonClick = () => {
        navigate(-1);
    }

    return (
        <main id="playback">
            <section className="playback-section">
                <header className="section-header">
                    <button className="back-button" aria-label="Back to Movies & Shows" onClick={onBackButtonClick}>
                        <img src="public/images/icons/arrow-left.svg" alt="Back"/>
                    </button>

                    <h1 className="title">{contentDetails?.Title || 'Loading...'}</h1>
                </header>
                <div className="video-container">
                    <img src={contentDetails?.Poster || null } alt={contentDetails?.Title || 'Loading...'} />
                </div>
            </section>
        </main>
    )
}