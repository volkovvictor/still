import { create } from "zustand";
import { IPhoto, PhotoTypes } from "@/types/photos.type";


interface PhotosState {
    preview: IPhoto[],
    portfolio: IPhoto[],
    account: IPhoto[],
    isPhotosLoading: boolean,
    setIsPhotosLoading: (val: boolean) => void,
    setPhotos: (type: PhotoTypes, photos: IPhoto[]) => void,
}

const usePhotos = create<PhotosState>((set) => ({
    preview: [],
    portfolio: [],
    account: [],
    isPhotosLoading: false,
    setIsPhotosLoading: (val) => set({
        isPhotosLoading: val
    }),
    setPhotos: (type, photos) => set({
        [type]: photos
    })
}))

export default usePhotos;