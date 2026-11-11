import { useEffect, useRef, useState } from "react";
import GenreCardList from "../common/GenreCardList";
import Pagination from "../common/Pagination";
import Scrollbar from "../common/Scrollbar";


export default function GenreCards({ contentType, genres, title, id, containerClassName, perPage}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredGenres, setFilteredGenres] = useState([]);
    // const filteredGenres = genres.filter((genre) => contentType.map((type) => genre[type]).flat().length > 0);
    const totalPages = perPage ? Math.ceil(filteredGenres.length / perPage) : 1;
    perPage = perPage || filteredGenres.length; // Show all genres if perPage is not provided

    useEffect(() => {
        async function filterGenres() {
            const filtered = genres.filter((genre) => contentType.map((type) => genre[type]).flat().length > 0);
            setFilteredGenres(filtered);
        }
        filterGenres();
    }, [genres, contentType, perPage]);

    const [cardListVisibleWidth, setCardListVisibleWidth] = useState(0);
    const [cardListTotalWidth, setCardListTotalWidth] = useState(1);
    const [cardListScrollPosition, setCardListScrollPosition] = useState(0);

    const scrollbarThumbWidth = cardListVisibleWidth / cardListTotalWidth * 100;
    const scrollbarThumbPosition = cardListScrollPosition / (cardListTotalWidth - cardListVisibleWidth);
    
    const cardListRef = useRef();
    useEffect(() => {
        const updateCardListDimensions = async () => {
            if (cardListRef.current &&cardListRef.current.children.length === filteredGenres.length) {
                setCardListVisibleWidth(cardListRef.current.offsetWidth);
                setCardListTotalWidth(cardListRef.current.scrollWidth);
            } else {
                setTimeout(updateCardListDimensions, 100);
            }
        };
        updateCardListDimensions();
    }, [filteredGenres]);

    const handleCardListScroll = () => {
        if (cardListRef.current) {
            setCardListScrollPosition(cardListRef.current.scrollLeft);
        }
    }

    const handleScrollbarThumbMove = (scrollPosition) => {
        cardListRef.current.scrollLeft = scrollPosition * cardListRef.current.scrollWidth;
        setCardListScrollPosition(cardListRef.current.scrollLeft);
    };


    return (
        <section id={id}>
            <header className="section-header">
                <h3 className="section-title">{title}</h3>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </header>
            <GenreCardList
                contentType={contentType}
                genresData={filteredGenres}
                className={containerClassName}
                page={currentPage}
                perPage={perPage}
                ref={cardListRef}
                onScroll={handleCardListScroll}
            />
            <Scrollbar
                scrollbarThumbWidth={scrollbarThumbWidth}
                scrollbarThumbPosition={scrollbarThumbPosition}
                onScrollbarThumbMove={handleScrollbarThumbMove}
            />
        </section>
    )
}