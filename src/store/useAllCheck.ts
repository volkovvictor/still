import { create } from "zustand";

interface AllCheckState {
    selectedIds: string[],
    isSelectAllChecked: boolean,
    // setAllIds: (ids: string[]) => void,
    onSelectId: (id: string, val: boolean) => void
    toggleAllCheck: (ids: string[], val: boolean) => void,
    clearAll: () => void

}

const useAllCheck = create<AllCheckState>((set) => ({
    selectedIds: [],
    isSelectAllChecked: false,
    // setAllIds: (allIds) => set({
    //     allIds: allIds
    // }),
    onSelectId: (id, val) => set(state => ({
        selectedIds: val === true ? 
            [...state.selectedIds, id] : 
            state.selectedIds.filter(selectedId => selectedId !== id)
    })),
    toggleAllCheck: (allIds, val) => set(state => ({
        isSelectAllChecked: val,
        selectedIds: val === true ? allIds : allIds.length === state.selectedIds.length ? [] : state.selectedIds
    })),
    clearAll: () => set({
        selectedIds: [],
        isSelectAllChecked: false
    })
}))

export default useAllCheck;