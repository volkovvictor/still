import { create } from "zustand";
import { IPhotoshoot } from "@/types/photoshoots.type";


interface PhotoshootState {
    photoshoots: IPhotoshoot[]
    isPhotoshootLoading: boolean,
    setIsPhotoshootLoading: (val: boolean) => void,
    setPhotoshoot: (data: IPhotoshoot[]) => void,
}

const usePhotoshoots = create<PhotoshootState>((set) => ({
    photoshoots: [],
    isPhotoshootLoading: false,
    setIsPhotoshootLoading: (val) => set({
        isPhotoshootLoading: val
    }),
    setPhotoshoot: (data) => set({ photoshoots: data })
}))

export default usePhotoshoots;