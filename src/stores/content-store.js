import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/api';
import { replaceImageSource } from '../utils/utils';

const useContentStore = create(persist((set, get) => ({
    content: [],
    isLoading: false,
    error: null,
    loadContent: async () => {
        set({ isLoading: true });
        if (get().content.length > 0) {
            set({ isLoading: false });
            return get().content;
        }
        try {
            const contentData = await api.fetchMoviesAndShows();
            if (contentData) {
                const processedContent = await Promise.all(contentData.map(async (item) => {
                    const id = item.title.replace(/\s+/g, '-').toLowerCase();
                    const details = await api.fetchContentDetails(id);
                    details.Poster = await replaceImageSource(details.Poster);

                    return { id, mockData: item, details };
                }));
                set({ content: processedContent });
                return contentData;
            } else {
                set({ error: 'Failed to load content data' });
            }
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    },
    setContent: (newContent) => set({ content: newContent }),
    addContent: (newContentItem) => set((state) => ({ content: [...state.content, newContentItem] })),
    updateContent: (updatedContentItem) => set((state) => ({
        content: state.content.map(item => item.id === updatedContentItem.id ? updatedContentItem : item)
    })),
    loadContentDetails: async (id) => {
        try {
            const contentItem = get().content.find(item => item.id === id);
            if (!contentItem || !contentItem.details) {
                set({ isLoading: true });
                const details = await api.fetchContentDetails(id);
                details.Poster = await replaceImageSource(details.Poster);
                if (details) {
                    set((state) => ({
                        content: state.content.map(item => item.id === id ? { ...item, details } : item)
                    }));
                }
                if (!contentItem) {
                    set((state) => {
                        if (state.content.some(item => item.id === id)) {
                            return state; // Skip adding if already exists
                        }
                        return {
                            content: [...state.content, { id, details }]
                        };
                    })
                }
            }
            if (contentItem && contentItem.details && contentItem.details.Type === 'series' && !contentItem.seasons) {
                console.log(`Loading seasons for content ID: ${id}`);
                for (let seasonNumber = 1; seasonNumber <= contentItem.details.totalSeasons; seasonNumber++) {
                    api.fetchContentDetails(contentItem.details.imdbID, seasonNumber)
                        .then(async (seasonDetails) => {
                            set((state) => ({
                                content: state.content.map(item => {
                                    if (item.id === id) {
                                        const updatedSeasons = item.seasons ? [...item.seasons] : [];
                                        if (updatedSeasons.some(season => season.seasonNumber === seasonNumber)) {
                                            return item;
                                        }
                                        updatedSeasons.push({ seasonNumber, episodes: seasonDetails.Episodes });
                                        updatedSeasons.sort((a, b) => a.seasonNumber - b.seasonNumber);
                                        return { ...item, seasons: updatedSeasons };
                                    }
                                    return item;
                                })
                            }));
                            for (const episode of seasonDetails.Episodes) {
                                api.fetchContentDetailsById(episode.imdbID).then(async (episodeDetails) => {
                                    episodeDetails.Poster = await replaceImageSource(episodeDetails.Poster);
                                    set((state) => ({
                                        content: state.content.map(item => {
                                            if (item.id === id) {
                                                const updatedSeasons = item.seasons.map(season => {
                                                    if (season.seasonNumber === seasonNumber) {
                                                        const updatedEpisodes = season.episodes.map(ep => ep.imdbID === episodeDetails.imdbID ? episodeDetails : ep);
                                                        updatedEpisodes.sort((a, b) => a.Episode - b.Episode);
                                                        return { ...season, episodes: updatedEpisodes };
                                                    }
                                                    return season;
                                                });
                                                return { ...item, seasons: updatedSeasons };
                                            }
                                            return item;
                                        })
                                    }))
                                })
                            }
                        })
                }
            }
        } catch (error) {
            set({ error: error.message });
        } finally {
            set({ isLoading: false });
        }
    }
})));

export default useContentStore;