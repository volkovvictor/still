import apiFetch from "@/utils/apiFetch"
import { IPhoto, PhotoTypes } from "@/types/photos.type"
import { GET_BY_TYPE, PHOTOS_URL } from "@/constants/api"
import usePhotos from "@/store/usePhotos"
import { IOrder } from "@/types/general.type"

export function useGetPhotos () {
    
    const setPhotos = usePhotos(state => state.setPhotos)
    const setIsPhotosLoading = usePhotos(state => state.setIsPhotosLoading)

    return async (photosType: PhotoTypes) => {
        setIsPhotosLoading(true)
        try {
            const path = `${GET_BY_TYPE}/${photosType}`
            const photos: IPhoto[] = await apiFetch({ path })

            setPhotos(photosType, photos)
            setIsPhotosLoading(false)
        } catch(err) {
            console.log('err', err)
            setIsPhotosLoading(false)
        }
    }
}

export function useCreatePhotos () {

    const getPhotos = useGetPhotos()
    const setIsPhotosLoading = usePhotos(state => state.setIsPhotosLoading)

    return async (body: FormData) => {
        setIsPhotosLoading(true)
        try {
            const path = PHOTOS_URL
            await apiFetch({ path, method: "POST", body, isFormData: true })
            await getPhotos(body.get('type') as PhotoTypes)
            setIsPhotosLoading(false)
        } catch(err) {
            console.log('err', err)
            setIsPhotosLoading(false)
        }
    }
}

export function useDeletePhotos () {
    
    const getPhotos = useGetPhotos()
    const setIsPhotosLoading = usePhotos(state => state.setIsPhotosLoading)

    return async (photosType: PhotoTypes, ids: string[]) => {
        setIsPhotosLoading(true)
        try {

            ids.forEach(async (id) => {
                const path = `${PHOTOS_URL}/${id}`
                await apiFetch({ method: 'DELETE', path })
            })
            await getPhotos(photosType)
            setIsPhotosLoading(false)
        } catch(err) {
            console.log('err', err)
            setIsPhotosLoading(false)
        }
    }
}

export function useUpdatePhotosOrder () {
    
    const getPhotos = useGetPhotos()
    const setIsPhotosLoading = usePhotos(state => state.setIsPhotosLoading)

    return async (photosType: PhotoTypes, newOrder: IOrder[]) => {
        setIsPhotosLoading(true)
        try {
            newOrder.forEach(async (order) => {
                const path = `${PHOTOS_URL}/${order.id}`
                const body = { position: order.position }
                await apiFetch({ method: 'PUT', path, body: JSON.stringify(body) })
            })
            await getPhotos(photosType)
            setIsPhotosLoading(false)
        } catch(err) {
            console.log('err', err)
            setIsPhotosLoading(false)
        }
    }
}