

import { useEffect, useRef, useState } from "react";
import Pagination from "../common/Pagination";
import Scrollbar from "../common/Scrollbar";
import ContentCard from "./ContentCard";


export default function ContentCards({ contentType, contentList, title, id, containerClassName, perPage, contentInfos}) {
    const [currentPage, setCurrentPage] = useState(1);
    const content = contentList[contentType] || [];
    const totalPages = perPage ? Math.ceil(content.length / perPage) : 1;
    perPage = perPage || content.length; // Show all content if perPage is not provided

    const contentToShow = content.slice((currentPage - 1) * perPage, (currentPage * perPage) > content.length ? content.length : (currentPage * perPage));

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
            <div className={`${containerClassName} content-cards`} ref={cardListRef} onScroll={handleCardListScroll}>
                {contentToShow.map((content) => (
                    <ContentCard
                        key={content}
                        contentId={content}
                        contentInfos={contentInfos}
                    />
                ))}
            </div>
            <Scrollbar
                scrollbarThumbWidth={scrollbarThumbWidth}
                scrollbarThumbPosition={scrollbarThumbPosition}
                onScrollbarThumbMove={handleScrollbarThumbMove}
            />
        </section>
    )
}