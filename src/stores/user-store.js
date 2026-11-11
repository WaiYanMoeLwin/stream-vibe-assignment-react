import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(persist((set, get) => ({
    users: [],
    register: async (user) => {
        const existingUser = get().users.find((u) => u.email === user.email);
        if (existingUser) {
            throw new Error('Email is already registered. Please use a different email.');
        }
        set((state) => ({ users: [...state.users, { ...user, watchList: [], activePlan: null }] }));
        return true;
    },
    loggedInUser: null,
    isLoggedIn: () => get().loggedInUser !== null,
    logout: () => set({ loggedInUser: null }),
    login: async (email, password) => {
        const user = get().users.find((user) => user.email === email && user.password === password);
        if (user) {
            set({ loggedInUser: user });
            return user;
        } else {
            throw new Error('Invalid email or password');
        }
    },
    setActivePlan: async (plan) => {
        set((state) => ({
            loggedInUser: {
                ...state.loggedInUser,
                activePlan: plan,
            },
            users: state.users.map((user) =>
                user.email === state.loggedInUser.email ? { ...user, activePlan: plan } : user
            ),
        }));
    },
    getActivePlan: async () => {
        const loggedInUser = get().loggedInUser;
        return loggedInUser ? loggedInUser.activePlan : null;
    },
    processPayment: async (paymentInfo) => {
        console.log('Processing payment with info:', paymentInfo);
        if (!paymentInfo.cardNumber || !paymentInfo.expirationDate || !paymentInfo.cvv) {
            throw new Error('Invalid payment information');
        }
        
        // Simulate payment processing
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({success: true, message: 'Payment processed successfully'});
            }, 1000);
        });
    },
    cancelActivePlan: async () => {
        set((state) => ({
            loggedInUser: {
                ...state.loggedInUser,
                activePlan: null,
            },
            users: state.users.map((user) =>
                user.email === state.loggedInUser.email ? { ...user, activePlan: null } : user
            ),
        }));
    },
    getWatchList: async () => {
        const loggedInUser = get().loggedInUser;
        return loggedInUser ? loggedInUser.watchList : [];
    },
    addToWatchList: async (item) => {
        const existingWatchList = get().loggedInUser.watchList;
        if (existingWatchList.includes(item)) {
            throw new Error('Item already exists in watch list');
        }
        set((state) => {
            const updatedWatchList = [...state.loggedInUser.watchList, item];
            return {
                loggedInUser: {
                    ...state.loggedInUser,
                    watchList: updatedWatchList,
                },
                users: state.users.map((user) =>
                    user.email === state.loggedInUser.email ? { ...user, watchList: updatedWatchList } : user
                ),
            };
        });
    },
    removeFromWatchList: async (item) => {
        const existingWatchList = get().loggedInUser.watchList;
        if (!existingWatchList.includes(item)) {
            throw new Error('Item not found in watch list');
        }
        set((state) => {
            const updatedWatchList = state.loggedInUser.watchList.filter((i) => i !== item);
            return {
                loggedInUser: {
                    ...state.loggedInUser,
                    watchList: updatedWatchList,
                },
                users: state.users.map((user) =>
                    user.email === state.loggedInUser.email ? { ...user, watchList: updatedWatchList } : user
                ),
            };
        });
    },
})), {
    name: 'users'
});

export default useUserStore;