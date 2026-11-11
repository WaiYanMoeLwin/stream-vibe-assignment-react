import { useEffect, useState } from 'react';
import useContentStore from '../../stores/content-store';

export default function BackgroundMashup({ numberOfMashupImages, children }) {
    const [mashupImages, setMashupImages] = useState([]);
    const content = useContentStore((state) => state.content);
    
    useEffect(() => {
        const moviesAndShows = content.map((item) => item.details);
        const images = [];
        const selectedIndices = new Set();
        async function selectRandomImages() {
            for (let i = 0; i < numberOfMashupImages; i++) {
                if (moviesAndShows.length === 0) {
                    break;
                }
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
                images.push(moviesAndShows[randomIndex]);
                if (images.length === numberOfMashupImages) {
                    setMashupImages(images);
                }
            }
        };
        selectRandomImages();
    }, [numberOfMashupImages, content]);

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