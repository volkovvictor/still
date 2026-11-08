import { useCallback, useMemo } from "react"
import { PhotoTypes } from "@/types/photos.type"
import { useCreatePhotoshoots, useGetPhotoshoots } from "@/components/photos/hooks/usePhotoshootApi"
import usePhotoshoots from "@/store/usePhotoshoots"

interface Props {
    photoshootPreview: File | null
    files: File[]
    date: string
}

export default function useAddPhotoshoot({ photoshootPreview, date, files }: Props) {

    const photoshoots = usePhotoshoots(state => state.photoshoots)

    const createPhotoshoots = useCreatePhotoshoots()
    const getPhotoshoots = useGetPhotoshoots()

    return useCallback(async () => {
    
            if (!files || !photoshootPreview) return;
    
            const position = photoshoots.length + 1
            const formData = new FormData()
    
            formData.append('src', photoshootPreview)
            formData.append('position', String(position))
            
            if (date) {
                formData.append('date', date)
            }
    
            console.log('formData', formData)
    
            const photoshoot = await createPhotoshoots(formData)
            await getPhotoshoots() 
    
            return photoshoot
        }, [files, photoshootPreview, createPhotoshoots, getPhotoshoots, date, photoshoots.length])
}