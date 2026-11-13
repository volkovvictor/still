import apiFetch from "@/utils/apiFetch"
import usePhotoshoots from "@/store/usePhotoshoots"
import { PHOTOS_URL, PHOTOSHOOT_URL } from "@/constants/api"
import { IPhotoshoot } from "@/types/photoshoots.type"
import { useGetPhotos } from "./usePhotosApi"
import usePhotos from "@/store/usePhotos"
import { useDeletePhotos } from "./usePhotosApi"

export function useGetPhotoshoots () {
    
    const setPhotoshoot = usePhotoshoots(state => state.setPhotoshoot)
    const setIsPhotoshootLoading = usePhotoshoots(state => state.setIsPhotoshootLoading)

    return async () => {
        setIsPhotoshootLoading(true)
        try {
            const photoshoots: IPhotoshoot[] = await apiFetch({ path: PHOTOSHOOT_URL })

            setPhotoshoot(photoshoots)
            setIsPhotoshootLoading(false)
        } catch(err) {
            console.log('err', err)
            setIsPhotoshootLoading(false)
        }
    }
}

export function useCreatePhotoshoots () {

    const setIsPhotoshootLoading = usePhotoshoots(state => state.setIsPhotoshootLoading)

    return async (body: FormData) => {
         console.log('body', body)
        setIsPhotoshootLoading(true)
        try {
            const data = await apiFetch({ path: PHOTOSHOOT_URL, method: "POST", body, isFormData: true })
            console.log('data', data)
            setIsPhotoshootLoading(false)
            return data?._id
        } catch(err) {
            console.log('err', err)
            setIsPhotoshootLoading(false)
            return err
        }
    }
}

export function useDeletePhotoshoots () {
    const photos = usePhotos(state => state.portfolio)
    
    const getPhotoshoots = useGetPhotoshoots()
    const setIsPhotoshootLoading = usePhotoshoots(state => state.setIsPhotoshootLoading)

    const deletePhotos = useDeletePhotos()

    return async (ids: string[]) => {
        setIsPhotoshootLoading(true)
        try {
            ids.forEach(async (id) => {
                const path = `${PHOTOSHOOT_URL}/${id}`

                const thisPhotosIds = photos.filter(photo => photo.photoshootID === id)?.map(photo => photo._id)
                
                await deletePhotos('portfolio', thisPhotosIds)
                await apiFetch({ method: 'DELETE', path })
            })
            await getPhotoshoots()
            setIsPhotoshootLoading(false)
        } catch(err) {
            console.log('err', err)
            setIsPhotoshootLoading(false)
        }
    }
}