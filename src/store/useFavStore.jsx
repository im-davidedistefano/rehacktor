import { create } from 'zustand';

const useFavStore = create((set) => ({
    fav: [],
    setFav: (favourites) => set({ fav: favourites }),
}));

export default useFavStore;
