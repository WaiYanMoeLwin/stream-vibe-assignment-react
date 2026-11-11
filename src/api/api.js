
const apiKey = import.meta.env.VITE_API_KEY;

if (!window.localStorage.getItem('cache')) {
    window.localStorage.setItem('cache', JSON.stringify({}));
}
const cacheStorage = JSON.parse(window.localStorage.getItem('cache'));
const cacheDuration = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

const saveToCache = (key, data) => {
    const cacheData = {
        data: data,
        cachedTimestamp: new Date().toISOString()
    };
    cacheStorage[key] = cacheData;
    window.localStorage.setItem('cache', JSON.stringify(cacheStorage));
};

const getFromCache = (key) => {
    const cachedData = cacheStorage[key];
    if (cachedData) {
        const parsedData = cachedData;
        const cacheTimestamp = new Date(parsedData.cachedTimestamp);
        const now = new Date();
        if ((now - cacheTimestamp) < cacheDuration) {
            return parsedData.data;
        } else {
            delete cacheStorage[key]; // Remove expired cache
            window.localStorage.setItem('cache', JSON.stringify(cacheStorage));
        }
    }
    return null;
};

const api = {
    fetchMoviesAndShows: async () => {
        const response = await fetch('temp/mock-movie-data.json');
        if (!response.ok) {
            console.error('Failed to fetch movies and shows');
        }
        return response.json();
    },
    fetchFAQs: async () => {
        const faqLocalStorage = window.localStorage.getItem('faqData');
        if (faqLocalStorage) {
            return JSON.parse(faqLocalStorage);
        }
        
        const response = await fetch('temp/faqs.json');
        if (!response.ok) {
            console.error('Failed to fetch FAQs');
        }
        const data = await response.json();
        window.localStorage.setItem('faqData', JSON.stringify(data));
        return data;
    },
    askQuestion: async (questionData) => {
        const faqData = JSON.parse(window.localStorage.getItem('faqData')) || [];
        const newQuestion = {
            id: (faqData.length + 1).toString().padStart(2, '0'),
            question: questionData.question,
            answer: "Thank you for your question. Our support team will get back to you shortly." // Mock answer
        };
        faqData.push(newQuestion);
        window.localStorage.setItem('faqData', JSON.stringify(faqData));
        return newQuestion;
    },
    fetchDevices: async () => {
        const response = await fetch('temp/devices.json');
        if (!response.ok) {
            console.error('Failed to fetch devices');
        }
        return response.json();
    },
    fetchPricingPlans: async () => {
        const response = await fetch('temp/pricing-plans.json');
        if (!response.ok) {
            console.error('Failed to fetch pricing plans');
        }
        return response.json();
    },
    fetchContentLists: async () => {
        const response = await fetch('temp/mock-content-list.json');
        if (!response.ok) {
            console.error('Failed to fetch content lists');
        }
        return response.json();
    },
    fetchContentDetails: async (name, season=null, episode=null) => {
        const cacheKey = `${name}-${season}-${episode}`;
        const cachedData = getFromCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const url = `https://www.omdbapi.com/?apiKey=${apiKey}&t=${encodeURIComponent(name)}${season ? `&Season=${season}` : ''}${episode ? `&Episode=${episode}` : ''}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch content details');
        }
        const data = await response.json();
        saveToCache(cacheKey, data); // Save the data to cache
        return data;
    },
    fetchContentDetailsById: async (id) => {
        const cacheKey = `id-${id}`;
        const cachedData = getFromCache(cacheKey);
        if (cachedData) {
            return cachedData;
        }

        const url = `https://www.omdbapi.com/?apiKey=${apiKey}&i=${encodeURIComponent(id)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch content details by ID');
        }
        const data = await response.json();
        saveToCache(cacheKey, data); // Save the data to cache
        return data;
    },
    searchContentByTitle: async (title) => {
        const url = `https://www.omdbapi.com/?apiKey=${apiKey}&s=${encodeURIComponent(title)}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to search content by title');
        }
        return response.json();
    },
    verifyImage: async (url) => {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            // Check if the response is ok and the content type is an image
            if (!response.ok || !response.headers.get('Content-Type').startsWith('image/')) {
                return false;
            }
            return response.ok;
        } catch (error) {
            console.error('Error verifying image:', error);
            return false;
        }
    },
};

export default api;