import apiFetch from "@/utils/apiFetch"
import { IPhoto, PhotoTypes } from "@/types/photos.type"
import { GET_BY_TYPE, PHOTOS_URL } from "@/constants/api"
import usePhotos from "@/store/usePhotos"

export function useGetPhotos () {
    
    const setPhotos = usePhotos(state => state.setPhotos)

    return async (photosType: PhotoTypes) => {
        try {
            const path = `${GET_BY_TYPE}/${photosType}`
            const data = await apiFetch({ path })

            console.log('data', data)

            setPhotos(photosType, data)
        } catch(err) {
            console.log('err', err)
        }
    }
}

export function useCreatePhotos () {
    return async (body: FormData) => {
        try {
            const path = PHOTOS_URL
            console.log('path', path)
            console.log('body', body)
            const data = await apiFetch({ path, method: "POST", body })

            return data
        } catch(err) {
            console.log('err', err)
        }
    }
}