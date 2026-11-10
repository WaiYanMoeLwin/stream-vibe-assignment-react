import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { replaceImageSource } from '../../utils/utils';

export default function SearchScreen({onClose}) {
    const keywordInputRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (keywordInputRef.current) {
            keywordInputRef.current.focus();
        }
    }, []);

    const handleSearch = () => {
        const keyword = keywordInputRef.current.value.trim();
        if (keyword) {
            api.searchContentByTitle(keyword).then((results) => {
                Promise.all(results.Search.map(async (result) => {
                    result.Poster = await replaceImageSource(result.Poster);
                    return result;
                })).then((updatedResults) => {
                    setSearchResults(updatedResults);
                });
            });
        } else {
            setSearchResults([]);
        }
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        } else if (event.key === 'Escape') {
            onClose();
        }
    }

    const handleInputChange = () => {
        const keyword = keywordInputRef.current.value.trim();
        if (!keyword) {
            setSearchResults([]);
        } else if (keyword.length >= 3) {
            handleSearch();
        }
    }

    const handleSearchResultClick = (title) => {
        navigate(`/content-details?id=${title.toLowerCase().replace(/\s+/g, '-')}`);
        onClose();
    }

    return (
        <div className="search-screen">
            <div className="search-bar">
                <input ref={keywordInputRef} type="text" placeholder="Search for movies or shows..." onKeyDown={handleKeyPress} onChange={handleInputChange} />
                <button className="search-button" onClick={handleSearch}>
                    <img src="/images/icons/search.svg" alt="Search" />
                </button>
                <button className="close-button" onClick={onClose}>
                    <img src="/images/icons/close.svg" alt="Close Search" />
                </button>
            </div>
            <div className="search-results">
                {searchResults ? searchResults.map((result) => (
                    <div key={result.imdbID} className="search-result-card" onClick={() => handleSearchResultClick(result.Title)}>
                        <img src={result.Poster} alt={result.Title} />
                        <h4>{result.Title} ({result.Year})</h4>
                    </div>
                )) : (
                    <p className="no-results">No results found.</p>
                )}
            </div>
        </div>
    );
}