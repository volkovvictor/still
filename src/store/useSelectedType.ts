import { PhotoTypes } from "@/types/photos.type";
import { create } from "zustand";

interface SelectedTypeState {
    type: PhotoTypes | null
    setType: (type: PhotoTypes | null) => void

}

const useSelectedType = create<SelectedTypeState>((set) => ({
    type: null,
    setType: (type) => set({ type })
}))

export default useSelectedType;