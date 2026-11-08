import { useCallback, useMemo } from "react"
import usePhotos from "@/store/usePhotos"
import { useCreatePhotos } from "@/components/photos/hooks/usePhotosApi"
import { PhotoTypes } from "@/types/photos.type"

interface Props {
    selectedCategory: PhotoTypes
    files: File[]
    selectedUserID: string | null
}

export default function useAddPhotos({ selectedCategory, files, selectedUserID }: Props) {

    const photos = usePhotos(state => state)
    const createPhotos = useCreatePhotos()

    const photosPosition = useMemo(() => {
        return photos[selectedCategory].length ? photos[selectedCategory].map(photo => photo.position) : [0]
    }, [photos, selectedCategory])
    const lastPosition = useMemo(() => Math.max(...photosPosition), [photosPosition])

    return useCallback((photoshootID: string | null = null) => {
    
            if (files.length === 0) return
    
            for (let i = 0; i < files.length; i++) {
                const formData = new FormData()
    
                formData.append('src', files[i])
                formData.append('position', String(lastPosition + i))
                formData.append('type', selectedCategory)
    
                if (selectedCategory === 'portfolio') {
    
                    if (selectedUserID) {
                        formData.append('userID', selectedUserID)
                    }
    
                    if (photoshootID) {
                        formData.append('photoshootID', photoshootID)
                    }
                }
    
                createPhotos(formData)
            }
        }, [files, selectedCategory, createPhotos, selectedUserID, lastPosition])
}