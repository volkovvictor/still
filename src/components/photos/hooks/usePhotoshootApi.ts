import apiFetch from "@/utils/apiFetch"
import usePhotoshoots from "@/store/usePhotoshoots"
import { PHOTOSHOOT_URL } from "@/constants/api"
import { IPhotoshoot } from "@/types/photoshoots.type"

export function useGetPhotoshoots () {
    
    const setPhotoshoot = usePhotoshoots(state => state.setPhotoshoot)
    const setIsPhotoshootLoading = usePhotoshoots(state => state.setIsPhotoshootLoading)

    return async () => {
        setIsPhotoshootLoading(true)
        try {
            const data: IPhotoshoot[] = await apiFetch({ path: PHOTOSHOOT_URL })
            const photoshoots = data.map(photo => ({ ...photo, id: photo._id }))

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
        setIsPhotoshootLoading(true)
        try {
            const data = await apiFetch({ path: PHOTOSHOOT_URL, method: "POST", body })
            setIsPhotoshootLoading(false)
            return data._id
        } catch(err) {
            console.log('err', err)
            setIsPhotoshootLoading(false)
            return err
        }
    }
}