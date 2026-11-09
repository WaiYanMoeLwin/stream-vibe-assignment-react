import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { getRatingStars } from "../../utils/content-info";
import Pagination from "../common/Pagination";
import SeasonList from "./SeasonList";
import SidebarInfo from "./SidebarInfo";

export default function MainInfo({ contentDetails, mockContentDetails }) {
    const isMobileScreen = useMediaQuery({ maxWidth: 767 });
    const isTabletScreen = useMediaQuery({ maxWidth: 1023 });
    let castPerPage = 8;
    let reviewsPerPage = 2;
    if (isMobileScreen) {
        castPerPage = 4;
        reviewsPerPage = 1;
    }

    const totalCastPages = Math.ceil(contentDetails.Actors.split(',').length / castPerPage);
    const totalReviewsPages = mockContentDetails ? Math.ceil(mockContentDetails.reviews.length / reviewsPerPage) : 0;
    const [currentCastPage, setCurrentCastPage] = useState(1);
    const [currentReviewsPage, setCurrentReviewsPage] = useState(1);

    const casts = contentDetails.Actors.split(',').map(actor => actor.trim());
    const reviews = mockContentDetails ? mockContentDetails.reviews : [];

    const castToShow = casts.slice((currentCastPage - 1) * castPerPage, (currentCastPage * castPerPage) > casts.length ? casts.length : (currentCastPage * castPerPage));
    const reviewsToShow = reviews.slice((currentReviewsPage - 1) * reviewsPerPage, (currentReviewsPage * reviewsPerPage) > reviews.length ? reviews.length : (currentReviewsPage * reviewsPerPage));

    console.log('contentDetails:', contentDetails);
    console.log('mockContentDetails:', mockContentDetails);
    return (
        <article className="main-info">
            <section className={`episodes-section ${contentDetails.Type === 'movie' ? 'hidden' : ''}`}>
                <h2 className="section-title">Seasons and Episodes</h2>
                <SeasonList contentDetails={contentDetails} />
            </section>
            <section className="description-section">
                <header className="section-header">
                    <h2 className="section-title">Description</h2>
                </header>
                <p className="description">{contentDetails.Plot}</p>
            </section>
            {isTabletScreen && <SidebarInfo contentDetails={contentDetails} mockContentDetails={mockContentDetails} />}
            <section className="cast-section">
                <header className="section-header">
                    <h2 className="section-title">Cast</h2>
                    <Pagination
                        currentPage={currentCastPage}
                        totalPages={totalCastPages}
                        onPageChange={(page) => setCurrentCastPage(page)}
                        showPages={false}
                    />
                </header>
                <div className="cast-list">
                    {castToShow.map((actor, index) => (
                        <div key={index} className="cast-item">
                            <img src="images/person-placeholder.jpg"
                                alt={actor}
                                title={actor}
                            />
                        </div>
                        )
                    )}
                </div>
            </section>
            <section className="reviews-section">
                <header className="section-header">
                    <h2 className="section-title">Reviews</h2>
                    <button className="add-review-button" aria-label="Add Review">
                        <img src="public/images/icons/plus.svg" alt="Add Review"/>
                        Add Your Review
                    </button>
                </header>
                <div className="reviews-list">
                    {reviewsToShow.map((review, index) => (
                        <article key={index} className="review-item">
                            <header className="review-header">
                                <div className="reviewer">
                                    <h3 className="reviewer-name">{review.name}</h3>
                                    <span className="reviewer-location">{review.country}</span>
                                </div>
                                <div className="rating-container">
                                    { getRatingStars(review.rating, 5, "rating-stars") }
                                    <span className="rating-value">{review.rating}</span>
                                </div>
                            </header>
                            <p className="review-content">{review.text}</p>
                        </article>
                    ))}
                </div>
                <Pagination
                    currentPage={currentReviewsPage}
                    totalPages={totalReviewsPages}
                    onPageChange={(page) => setCurrentReviewsPage(page)}
                />
            </section>
        </article>
    )
}