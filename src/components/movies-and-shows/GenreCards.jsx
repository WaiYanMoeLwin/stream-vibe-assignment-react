import { useEffect, useRef, useState } from "react";
import GenreCardList from "../common/GenreCardList";
import Pagination from "../common/Pagination";
import Scrollbar from "../common/Scrollbar";


export default function GenreCards({ contentType, genres, title, id, containerClassName, perPage}) {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = perPage ? Math.ceil(genres.length / perPage) : 1;
    perPage = perPage || genres.length; // Show all genres if perPage is not provided

    const [cardListVisibleWidth, setCardListVisibleWidth] = useState(0);
    const [cardListTotalWidth, setCardListTotalWidth] = useState(1);
    const [cardListScrollPosition, setCardListScrollPosition] = useState(0);

    const scrollbarThumbWidth = cardListVisibleWidth / cardListTotalWidth * 100;
    const scrollbarThumbPosition = cardListScrollPosition / (cardListTotalWidth - cardListVisibleWidth);
    
    const cardListRef = useRef();
    useEffect(() => {
        if (cardListRef.current) {
            setCardListVisibleWidth(cardListRef.current.offsetWidth);
            setCardListTotalWidth(cardListRef.current.scrollWidth);
        }
    });

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
                genresData={genres}
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