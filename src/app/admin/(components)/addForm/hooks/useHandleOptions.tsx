import { useState } from "react"
import { PhotoTypes } from "@/types/photos.type"
import { PortfolioType } from "../components/AddFormSelects"

export default function useHandleOptions() {
    const [selectedCategory, setSelectedCategory] = useState<PhotoTypes>('preview')
    const [selectedPortfolioType, setSelectedPortfolioType] = useState<PortfolioType>('new')
    const [selectedUserID, setSelectedUserID] = useState<string | null>(null)
    const [date, setDate] = useState<string>("")

    return {
        selectedCategory,
        setSelectedCategory,
        selectedPortfolioType,
        setSelectedPortfolioType,
        selectedUserID,
        setSelectedUserID,
        date,
        setDate
    }
}