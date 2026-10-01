import { create } from "zustand";
import { IPhoto, PhotoTypes } from "@/types/photos.type";
import { IOrder } from "@/types/general.type";


interface PhotosState {
    preview: IPhoto[],
    portfolio: IPhoto[],
    account: IPhoto[],
    newOrder: IOrder[],
    isPhotosLoading: boolean,
    setIsPhotosLoading: (val: boolean) => void,
    setPhotos: (type: PhotoTypes, photos: IPhoto[]) => void
    setNewOrder: (order: IOrder[]) => void,
    cleanNewOrder: () => void
}

const usePhotos = create<PhotosState>((set) => ({
    preview: [],
    portfolio: [],
    account: [],
    newOrder: [],
    isPhotosLoading: false,
    setIsPhotosLoading: (val) => set({
        isPhotosLoading: val
    }),
    setPhotos: (type, photos) => set({
        [type]: photos
    }),
    setNewOrder: (order) => set(state => ({
        newOrder: [...state.newOrder, ...order]
    })),
    cleanNewOrder: () => set({
        newOrder: []
    }),
}))

export default usePhotos;