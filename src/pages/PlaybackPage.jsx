import { useNavigate, useSearchParams } from 'react-router-dom';
import '../scss/playback.scss';
import useContentStore from '../stores/content-store';

export default function PlaybackPage() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    // const type = searchParams.get('type');
    const season = searchParams.get('season');
    const episode = searchParams.get('episode');

    // const [contentDetails, setContentDetails] = useState(null);
    const navigate = useNavigate();
    const allContent = useContentStore((state) => state.content);
    const loadContentDetails = useContentStore((state) => state.loadContentDetails);
    const foundContent = allContent.find(item => item.id === id);

    let contentDetails;
    if (foundContent && foundContent.details.Type === 'movie') {
        contentDetails = foundContent ? foundContent.details : null;
    } else {
        console.log('PlaybackPage - foundContent:', foundContent, 'season:', season, 'episode:', episode);
        if (!foundContent.seasons) {
            loadContentDetails(id);
        }
        contentDetails = foundContent ? foundContent.seasons?.find(s => s.seasonNumber == season)?.episodes?.find(e => e.Episode == episode) : null;
    }

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