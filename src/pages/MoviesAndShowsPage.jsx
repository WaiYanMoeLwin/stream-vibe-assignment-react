import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import api from "../api/api";
import MainTemplate from "../components/common/MainTemplate";
import ContentCards from "../components/movies-and-shows/ContentCards";
import GenreCards from "../components/movies-and-shows/GenreCards";
import TrailerCarousel from "../components/movies-and-shows/TrailerCarousel";
import '../scss/movies-and-shows.scss';
import { formatNumberWithUnits, formatRuntime, getRatingStars } from "../utils/content-info";


export default function MoviesAndShowsPage() {
    const [contentList, setContentList] = useState([]);
    const [activeTab, setActiveTab] = useState('movies');

    const contentTypes = [
        { id: 'movies', name: 'Movies', value: 'movie' },
        { id: 'shows', name: 'Shows', value: 'show' }
    ];

    const isMobileScreen = useMediaQuery({ maxWidth: 767 });
    const isTabletScreen = useMediaQuery({  minWidth: 768, maxWidth: 1023 });
    const isLaptopScreen = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
    const isSmallScreen = isMobileScreen || isTabletScreen;
    
    useEffect(() => {
        api.fetchContentLists().then((data) => {
            setContentList(data);
            console.log('Fetched content list:', data);
        });
    }, []);

    const contentInfos = {
        runtime: {
            id: 'runtime',
            label: 'Runtime',
            value: (content) => formatRuntime(content.Runtime),
            icon: () => <img src='/images/icons/clock.svg' alt="Runtime" />,

        },
        rating: {
            id: 'rating',
            label: 'Rating',
            value: (content) => formatNumberWithUnits(content.imdbVotes),
            icon: (content) => getRatingStars(content.imdbRating, 10),
        },
        views: {
            id: 'views',
            label: 'Views',
            value: (content) => formatNumberWithUnits(content.imdbVotes),
            icon: () => <img src='/images/icons/eye.svg' alt="Views" />,
        },
        releaseDate: {
            id: 'release-date',
            label: 'Release Date',
            value: (content) => content.Released,
            icon: () => (<span>Released at </span>), // No icon for release date
        },
        seasons: {
            id: 'seasons',
            label: 'Seasons',
            value: (content) => content.totalSeasons + ' Seasons',
            icon: () => <img src='/images/icons/stacks.svg' alt="Seasons" />,
        }
    }

    return (
        <>
            <MainTemplate id="movies-and-shows" page="movies-and-shows">
                <TrailerCarousel trailers={contentList['trailers']} />
                <div className="tab">
                    <button className="tab-button active" data-target="movies" onClick={() => setActiveTab('movies')}>Movies</button>
                    <button className="tab-button" data-target="shows" onClick={() => setActiveTab('shows')}>Shows</button>
                </div>

                {contentTypes.map((type) => (!isSmallScreen || activeTab === type.id) && (
                    <div id={type.id} key={type.id} className="content-container">
                        <h2 className="content-title">{type.name}</h2>
                        <GenreCards
                            contentType={[type.value]}
                            genres={contentList['genres'] || []}
                            title="Our Genres"
                            id={`${type.id}-genres`}
                            containerClassName="genre-cards"
                            perPage={isSmallScreen ? null : isLaptopScreen ? 4 : 5}
                        />
                        <GenreCards
                            contentType={[type.value]}
                            genres={contentList['genres'] || []}
                            title="Popular Top 10 In Genres"
                            id={`${type.id}-popular-genres`}
                            containerClassName="popular-genre-cards"
                            perPage={isSmallScreen ? null : isLaptopScreen ? 3 : 4}
                            shuffle={false}
                        />
                        <ContentCards
                            contentType={type.value}
                            contentList={contentList['trendingNow'] || []}
                            title={`Trending${type.id==="shows" ? " " + type.name : ""} Now`}
                            id={`${type.id}-trending`}
                            containerClassName="trending-cards"
                            perPage={isSmallScreen ? null : isLaptopScreen ? (type.id === "movies" ? 4 : 3 ) : (type.id === "movies" ? 5 : 4)}
                            contentInfos={type.id == "movies" ? [contentInfos.runtime, contentInfos.views] : [contentInfos.runtime, contentInfos.seasons]}
                        />
                        <ContentCards
                            contentType={type.value}
                            contentList={contentList['newReleases'] || []}
                            title={type.id === "movies" ? "New Releases" : "New Released Shows"}
                            id={`${type.id}-new-releases`}
                            containerClassName="new-releases-cards"
                            perPage={isSmallScreen ? null : isLaptopScreen ? (type.id === "movies" ? 4 : 3 ) : (type.id === "movies" ? 5 : 4)}
                            contentInfos={type.id == "movies" ? [contentInfos.releaseDate] : [contentInfos.runtime, contentInfos.seasons]}
                        />
                        <ContentCards
                            contentType={type.value}
                            contentList={contentList['mustWatch'] || []}
                            title={`Must Watch ${type.name}`}
                            id={`${type.id}-popular`}
                            containerClassName="must-watch-cards"
                            perPage={isSmallScreen ? null : isLaptopScreen ? 3 : 4}
                            contentInfos={[contentInfos.runtime, contentInfos.rating]}
                        />
                    </div>
                ))

                }

            </MainTemplate>
        </>
    )
}