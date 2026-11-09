import { getRatingStars } from "../../utils/content-info";

export default function SidebarInfo({ contentDetails, mockContentDetails }) {
    
    return (
        <aside className="sidebar-info">
            <section className="released-year-section">
                <header className="section-header">
                    <img src="/images/icons/calendar.svg" alt="Calendar Icon"/>
                    <h2 className="section-title">
                        Released Year
                    </h2>
                </header>
                <p className="released-year">{contentDetails.Released}</p>
            </section>
            <section className="available-languages-section">
                <header className="section-header">
                    <img src="/images/icons/language.svg" alt="Language Icon"/>
                    <h2 className="section-title">
                        Available Languages
                    </h2>
                </header>
                <ul className="available-languages-list">
                    {contentDetails.Language.split(",").map(language => language.trim()).map((language, index) => (
                        <li key={index} className="language-item">{language}</li>
                    ))}
                </ul>
            </section>
            <section className="content-rating-section">
                <header className="section-header">
                    <img src="/images/icons/star-rating.svg" alt="Star Icon"/>
                    <h2 className="section-title">
                        Ratings
                    </h2>
                </header>
                <div className="content-rating">
                    {contentDetails.Ratings && contentDetails.Ratings.map((rating, index) => {
                        const source = rating.Source;
                        const value = rating.Value;

                        let starRating;
                        if (value.includes("/")) {
                            const [numerator, denominator] = value.split("/").map(Number);
                            starRating = (numerator / denominator) * 5;
                        } else if (value.includes("%")) {
                            const percentage = parseFloat(value);
                            starRating = (percentage / 100) * 5;
                        } else {
                            starRating = parseFloat(value);
                        }

                        return (
                            <div key={index} className="rating-item">
                                <span className="rating-source">{source}</span>
                                <div className="rating-stars">
                                    {getRatingStars(starRating, 5, "rating-stars", <span className="rating-value">{value}</span>)}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
            <section className="genres-section">
                <header className="section-header">
                    <img src="/images/icons/genres.svg" alt="Genre Icon"/>
                    <h2 className="section-title">
                        Genres
                    </h2>
                </header>
                <ul className="genres-list">
                    {contentDetails.Genre.split(",").map(genre => genre.trim()).map((genre, index) => (
                        <li key={index} className="genre-item">{genre}</li>
                    ))}
                </ul>
            </section>
            <section className="director-section">
                <header className="section-header">
                    <h2 className="section-title">
                        Director
                    </h2>
                </header>
                <ul className="director-names">
                    {contentDetails.Director &&
                    contentDetails.Director.split(",").map(director => director.trim()).map((director, index) => (
                        <li key={index} className="director-name">
                            <img src="/images/person-placeholder.jpg" alt={director} title={director} />
                            <div className="info">
                                <h3 className="name-text">{director}</h3>
                                <span className="location">From {contentDetails.Country}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            {mockContentDetails && mockContentDetails.music && (
                <section className="music-section">
                    <header className="section-header">
                        <h2 className="section-title">
                            Music
                        </h2>
                    </header>
                    <ul className="music-composers">
                        {mockContentDetails.music.map((composer, index) => (
                            <li key={index} className="music-composer">
                                <img src="/images/person-placeholder.jpg" alt={composer.name} title={composer.name} />
                                <div className="info">
                                    <h3 className="name-text">{composer.name}</h3>
                                    <span className="location">{composer.country}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </aside>
    )
}