import apiFetch from "@/utils/apiFetch"
import { IPhoto, PhotoTypes } from "@/types/photos.type"
import { GET_BY_TYPE, PHOTOS_URL } from "@/constants/api"
import usePhotos from "@/store/usePhotos"

export function useGetPhotos () {
    
    const setPhotos = usePhotos(state => state.setPhotos)
    const setIsPhotosLoading = usePhotos(state => state.setIsPhotosLoading)

    return async (photosType: PhotoTypes) => {
        setIsPhotosLoading(true)
        try {
            const path = `${GET_BY_TYPE}/${photosType}`
            const data = await apiFetch({ path })

            console.log('data', data)

            setPhotos(photosType, data)
            setIsPhotosLoading(false)
        } catch(err) {
            console.log('err', err)
            setIsPhotosLoading(false)
        }
    }
}

export function useCreatePhotos () {

    const setIsPhotosLoading = usePhotos(state => state.setIsPhotosLoading)

    return async (body: FormData) => {
        setIsPhotosLoading(true)
        try {
            const path = PHOTOS_URL
            console.log('path', path)
            console.log('body', body)
            await apiFetch({ path, method: "POST", body })
            setIsPhotosLoading(false)
        } catch(err) {
            console.log('err', err)
            setIsPhotosLoading(false)
        }
    }
}