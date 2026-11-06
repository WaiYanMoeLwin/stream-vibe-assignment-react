import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function GenreCardList({contentType, genresData, className, page = 1, perPage = 5, ref, onScroll, shuffle=true}) {
    const [genreCardsData, setGenreCardsData] = useState([]);
    if (perPage === null) {
        perPage = genresData.length;
    }

    useEffect(() => {
        const genresDataPaginated = genresData.slice((page - 1) * perPage, (page * perPage) > genresData.length ? genresData.length : (page * perPage));
        const data = genresDataPaginated.map(async (genre) => {
            const contents = contentType.map((type) => genre[type]).flat();
            // Randomly shuffle the contents array to get a random selection of content for each genre
            if (shuffle) {
                for (let i = contents.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [contents[i], contents[j]] = [contents[j], contents[i]];
                }
            }
            const contentsToShow = contents.slice(0, contents.length > 4 ? 4 : contents.length);
            const contentDetailsToShow = await Promise.all(contentsToShow.map(async (content) => {
                const details = await api.fetchContentDetails(content);
                return details;
            }));
            return {
                ...genre,
                content: contentDetailsToShow
            };
        });
        Promise.all(data).then((results) => {
            setGenreCardsData(results);
        });
    }, [contentType, genresData, page, perPage, shuffle]);

    return (
        <article className={className} ref={ref} onScroll={onScroll}>
            {
                genreCardsData.map((genre) => (
                    <div className="genre-item-container" key={genre.name}>
                        <div className="genre-images-container">
                            {genre.content.map((content) => {
                                return (
                                    <div key={content.imdbID} className="genre-image">
                                        <img src={content.Poster} alt={content.Title} />
                                    </div>
                                )
                            })}
                            <div className="fade-out-bottom"></div>
                        </div>
                        <div className="genre-title-container">
                            <h3 className="genre-title">{genre.name}</h3>
                            <a className="view-all-link"
                                href={`/movies-and-shows?genre=${encodeURIComponent(genre.name)}`}>
                                <img src="/images/icons/arrow-right.svg" alt="View all" />
                            </a>
                        </div>
                    </div>
                ))
            }
        </article>
    )
}