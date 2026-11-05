import { useEffect, useState } from 'react';
import api from '../../api/api';

export default function BackgroundMashup({ numberOfMashupImages, children }) {
    const [mashupImages, setMashupImages] = useState([]);
    
    useEffect(() => {
        api.fetchMoviesAndShows().then((moviesAndShows) => {
            const images = [];
            const selectedIndices = new Set();

            for (let i = 0; i < numberOfMashupImages; i++) {
                const randomIndex = Math.floor(Math.random() * moviesAndShows.length);
                if (!selectedIndices.has(randomIndex)) {
                    selectedIndices.add(randomIndex);
                } else if (selectedIndices.size >= moviesAndShows.length) {
                    selectedIndices.clear();
                    selectedIndices.add(randomIndex);
                } else {
                    i--;
                    continue;
                }
                api.fetchContentDetails(moviesAndShows[randomIndex].id).then((details) => {
                    images.push(details);
                    if (images.length === numberOfMashupImages) {
                        setMashupImages(images);
                    }
                });
            }
            
        });
    }, [numberOfMashupImages]);

    return (
        <div className="background-mashup">
            {mashupImages.map((content, index) => (
                <div className="background-mashup-image" key={index}>
                    <img src={content.Poster} alt={content.Title} />
                </div>
            ))}
            {children}
        </div>
    )
}