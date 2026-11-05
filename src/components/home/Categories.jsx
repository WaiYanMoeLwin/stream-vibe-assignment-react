import { useEffect, useRef, useState } from 'react';
import api from '../../api/api';
import GenreCardList from '../common/GenreCardList';
import Pagination from '../common/Pagination';
import Scrollbar from '../common/Scrollbar';

export default function Categories({perPage = 5}) {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [categories, setCategories] = useState([]);

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


    useEffect(() => {
        api.fetchContentLists().then((contentListData) => {
            setCategories(contentListData.genres);
            setTotalPages(Math.ceil(contentListData.genres.length / perPage));
            if (perPage === null) {
                setCurrentPage(1);
                setTotalPages(1); // Show all categories on small screens
            }
        });
    }, [perPage]);
    return (
        <section id="categories">
            <header className="section-header">
                <article>
                    <h2 className="section-title">Explore our wide variety of categories</h2>
                    <p className="section-description">
                        Whether you're looking for a comedy to make you laugh, a drama to make
                        you think, or a documentary to learn something new
                    </p>
                </article>
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </header>
            <GenreCardList
                className="category-cards"
                contentType={["movie", "show"]}
                genresData={categories}
                perPage={perPage}
                page={currentPage}
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