import { create } from 'zustand';

const useSessionStore = create((set) => ({
    redirectAfterLogin: null,
    setRedirectAfterLogin: (path) => set({ redirectAfterLogin: path }),
    clearRedirectAfterLogin: () => set({ redirectAfterLogin: null }),
}));

export default useSessionStore;