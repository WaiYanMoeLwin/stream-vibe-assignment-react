
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

const updateUsers = (user) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    users[user.email] = user;
    localStorage.setItem('users', JSON.stringify(users));
}

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
            console.error('Failed to fetch content details');
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
            console.error('Failed to fetch content details by ID');
        }
        const data = await response.json();
        saveToCache(cacheKey, data); // Save the data to cache
        return data;
    },
    searchContentByTitle: async (title) => {
        const url = `https://www.omdbapi.com/?apiKey=${apiKey}&s=${encodeURIComponent(title)}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.error('Failed to search content by title');
        }
        return response.json();
    },

    // mock API call for local storage data
    checkDuplicateUser: async (email) => {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        return users[email] ? true : false;
    },
    registerUser: async (user) => {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[user.email]) {
            throw new Error('User already exists');
        }
        users[user.email] = user;
        localStorage.setItem('users', JSON.stringify(users));
    },
    authenticateUser: async (email, password) => {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        const user = users[email];
        if (user && user.password === password) {
            return user;
        } else {
            throw new Error('Invalid email or password');
        }
    },
    addToWatchList: async (item) => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user) {
            throw new Error('User not logged in');
        }
        if (!user.watchList) {
            user.watchList = [];
        }
        if (user.watchList.includes(item)) {
            throw new Error('Item already in watch list');
        }
        user.watchList.push(item);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        updateUsers(user); // Update the user in the users list
    },
    removeFromWatchList: async (item) => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user || !user.watchList) {
            throw new Error('User not logged in or watch list is empty');
        }
        const index = user.watchList.indexOf(item);
        if (index > -1) {
            user.watchList.splice(index, 1);
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            updateUsers(user); // Update the user in the users list
        } else {
            throw new Error('Item not found in watch list');
        }
    },
    fetchWatchList: async () => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user || !user.watchList) {
            return [];
        }
        return user.watchList;
    },
    fetchActivePlan: async () => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user || !user.activePlan ) {
            return null;
        }
        if (new Date(user.activePlan.expiryDate) < new Date()) {
            const renewalDate = new Date(user.activePlan.renewAt);
            if (renewalDate && renewalDate < new Date()) {
                // If the renewal date has passed, assume the renewal has done at that date
                const newExpiryDate = new Date(renewalDate) + (user.activePlan.billingCycle === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000;
                user.activePlan.expiryDate = newExpiryDate.toISOString().slice(0, 10);
                user.activePlan.renewAt = newExpiryDate.toISOString().slice(0, 10);
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                updateUsers(user); // Update the user in the users list
            } else {
                // If there is no renewal date or it hasn't passed yet, consider the plan expired
                user.activePlan = null;
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                updateUsers(user); // Update the user in the users list
                return null;
            }
        }
        return user.activePlan;
    },
    subscribeToPlan: async (plan) => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user) {
            throw new Error('User not logged in');
        }
        user.activePlan = plan;
        console.log('User after subscribing to plan:', user);
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        updateUsers(user); // Update the user in the users list
        console.log('User after updating users list:', JSON.parse(localStorage.getItem('users'))[user.email]);
    },
    processPayment: async (paymentInfo) => {
        // Mock payment processing
        if (!paymentInfo.cardNumber || !paymentInfo.expirationDate || !paymentInfo.cvv) {
            throw new Error('Invalid payment information');
        }
        // Simulate a delay for payment processing
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true, message: 'Payment processed successfully' });
            }, 1000);
        });
    },
    cancelSubscription: async () => {
        const user = JSON.parse(localStorage.getItem('loggedInUser'));
        if (!user) {
            throw new Error('User not logged in');
        }
        if (user.activePlan) {
            user.activePlan = null;
            localStorage.setItem('loggedInUser', JSON.stringify(user));
            updateUsers(user); // Update the user in the users list
        }
    }
};

export default api;