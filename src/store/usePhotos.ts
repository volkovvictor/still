import { create } from "zustand";
import { IPhoto, PhotoTypes } from "@/types/photos.type";


interface PhotosState {
    preview: IPhoto[],
    portfolio: IPhoto[],
    account: IPhoto[],
    setPhotos: (type: PhotoTypes, photos: IPhoto[]) => void,
}

const usePhotos = create<PhotosState>((set) => ({
    preview: [],
    portfolio: [],
    account: [],
    setPhotos: (type, photos) => set({
        [type]: photos
    })
}))

export default usePhotos;