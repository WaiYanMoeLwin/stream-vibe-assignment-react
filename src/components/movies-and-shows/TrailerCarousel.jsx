import { useState } from "react";
import Pagination from "../common/Pagination";
import Trailer from "../content-details/Trailer";

export default function TrailerCarousel({ trailers }) {
    const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
    
    return trailers && trailers.length > 0 && (
    <Trailer
        id="trailers-carousel"
        trailer={trailers[currentTrailerIndex]}
        carousel={true}
    >
        <Pagination
            currentPage={currentTrailerIndex + 1}
            totalPages={trailers ? trailers.length : 1}
            onPageChange={(page) => setCurrentTrailerIndex(page - 1)}
        />
    </Trailer>
    )
}