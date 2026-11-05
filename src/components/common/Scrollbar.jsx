import { useEffect, useRef, useState } from 'react';

export default function Scrollbar({ scrollbarThumbWidth, scrollbarThumbPosition, onScrollbarThumbMove }) {
    const scrollbarRef = useRef();
    const scrollbarThumbRef = useRef();
    const [scrollbarWidth, setScrollbarWidth] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    // const [isFullyVisible, setIsFullyVisible] = useState(false);
    const [scrollbarThumbWidthInPixels, setScrollbarThumbWidthInPixels] = useState(0);

    useEffect(() => {
        if (scrollbarThumbRef.current) {
            setScrollbarThumbWidthInPixels(scrollbarThumbRef.current.offsetWidth);
        }
        if (scrollbarRef.current) {
            setScrollbarWidth(scrollbarRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        if (scrollbarThumbRef.current) {
            setScrollPosition(scrollbarThumbPosition * (scrollbarWidth - scrollbarThumbWidthInPixels));
        }
    }, [scrollbarThumbPosition, scrollbarWidth, scrollbarThumbWidthInPixels]);

    return (
        <div className="scrollbar hidden" ref={scrollbarRef}
            onClick={(e) => {
                const clickPosition = e.clientX - scrollbarRef.current.getBoundingClientRect().left;
                let newScrollPosition = clickPosition - scrollbarThumbWidthInPixels / 2;
                newScrollPosition = Math.max(0, Math.min(newScrollPosition, scrollbarWidth - scrollbarThumbWidthInPixels));
                setScrollPosition(newScrollPosition);
                onScrollbarThumbMove(newScrollPosition / (scrollbarWidth - scrollbarThumbWidthInPixels));
            }}>
            <div 
                className="scrollbar-thumb" ref={scrollbarThumbRef}
                style={{ width: `${scrollbarThumbWidth}%`, left: `${scrollPosition}px` }}
                onMouseDown={(e) => {
                    const startX = e.clientX;
                    const startLeft = scrollbarThumbRef.current.offsetLeft;

                    const onMouseMove = (e) => {
                        const deltaX = e.clientX - startX;
                        let newLeft = startLeft + deltaX;

                        // Ensure the thumb doesn't go out of bounds
                        newLeft = Math.max(0, Math.min(newLeft, scrollbarWidth - scrollbarThumbWidthInPixels));

                        setScrollPosition(newLeft);
                        onScrollbarThumbMove(newLeft / (scrollbarWidth - scrollbarThumbWidthInPixels));
                    };

                    const onMouseUp = () => {
                        document.removeEventListener('mousemove', onMouseMove);
                        document.removeEventListener('mouseup', onMouseUp);
                    };

                    document.addEventListener('mousemove', onMouseMove);
                    document.addEventListener('mouseup', onMouseUp);
                }}
                >
            </div>
        </div>
    )
}