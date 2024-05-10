import { create } from "zustand";

interface UnsplashState {
    query: string;
    color: string;
    sortByLatest: boolean;
    page: number;
    setQuery: (query: string) => void;
    setColor: (color: string) => void;
    setSortByLatest: (orderBy: boolean) => void;
    setPage: (page: number) => void;
}

export const useUnsplashStore = create<UnsplashState>((set) => ({
    query: '',
    color: '',
    sortByLatest: false,
    page: 1,
    setQuery: (query) => set({ query }),
    setColor: (color) => set({ color }),
    setSortByLatest: (sortByLatest) => set({ sortByLatest }),
    setPage: (page) => set({ page })
}));