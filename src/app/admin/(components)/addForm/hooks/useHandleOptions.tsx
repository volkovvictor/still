import { useCallback } from "react"


export default function useHandleOptions() {
    return useCallback(<T,>(setSelected: React.Dispatch<React.SetStateAction<T>>) => {
        return (selected: T) => {
            setSelected(selected)
        }
    }, [])
}