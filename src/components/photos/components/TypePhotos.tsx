'use client'

import style from '../style/photos.module.css'
import Photo from './Photo'
import type { IPhoto, PhotoTypes } from '@/types/photos.type'
import { useCallback, useEffect, useMemo } from 'react'
import SortablePhoto from './SortablePhotos'
import Cells from './Cells'
import { useDeletePhotos, useGetPhotos } from '../hooks/usePhotosApi'
import { useGetPhotoshoots } from '../hooks/usePhotoshootApi'
import usePhotos from '@/store/usePhotos'
import Empty from '@/components/empty/Empty'
import locales from '@/locales/locales'
import Loader from '@/ui/loader/Loader'
import { ParamValue } from 'next/dist/server/request/params'
import usePhotoshoots from '@/store/usePhotoshoots'

interface Props {
    photosType: PhotoTypes,
    photoshootID?: ParamValue | false,
    isEdit: boolean
}

export default function TypePhotos({photosType, photoshootID, isEdit}: Props) {
    const locale = locales()
    const getPhotos = useGetPhotos()
    const getPhotoshoots = useGetPhotoshoots()
    const deletePhoto = useDeletePhotos()

    const photosByType = usePhotos(state => state[photosType])
    const isPhotosLoading = usePhotos(state => state.isPhotosLoading)
    const photoshoots = usePhotoshoots(state => state.photoshoots)
    const isPhotoshootLoading = usePhotoshoots(state => state.isPhotoshootLoading)

    const isPhotoshootsPreviews = useMemo(() => photosType === 'portfolio' && !photoshootID, [photosType, photoshootID])

    console.log('photoshootID', photoshootID)

    useEffect(() => {
        if (isPhotoshootsPreviews) {
            getPhotoshoots()
        } else {
            getPhotos(photosType)
        }
    }, [photosType, isPhotoshootsPreviews])

    console.log('photosByType', photosByType)

    const photos = useMemo(() => {
        return isPhotoshootsPreviews
        ? photoshoots.map(photoshoot => ({
            ...photoshoot,
            src: photoshoot.previewSrc,
            photoPublicId: photoshoot.previewPhotoPublicId
        }))
        : photoshootID
            ? photosByType.filter(photo => photo.photoshootID === photoshootID)
            : photosByType
    }, [photoshootID, photosByType, isPhotoshootsPreviews, photoshoots])
    
    const onLike = useCallback((id: string) => {
        const likedPhoto = photos.find(photo => photo.id === id) // edit
    }, [photos])

    const onDelete = useCallback((id: string) => {
        deletePhoto(photosType, id)
    }, [photosType, deletePhoto])

    console.log('photos', photos)

    const cells = useMemo(() => {
        const cellsData = []

        for (let i = 0; i < photos.length; i++) {
            cellsData.push({id: i})
        }

        return cellsData
    }, [photos.length])

    // console.log('cells', cells)

    return (
        <>
            {
                isPhotosLoading 
                    ? 
                    <Loader/>
                    :
                    photos.length === 0 
                        ?
                        <Empty text={locale.noPhotos}/>
                        :
                        <div style={{position: 'relative'}}>
                            {
                                isEdit && (
                                    <div className={style.cells}>
                                        <Cells cells={cells}/>
                                    </div>
                                )
                            }
                            <div className={`${style.photos} ${isEdit ? " " + style.edit : ""}`}>
                            {
                                photos.map((photo, index) => {
                                    if (isEdit) {
                                        return <SortablePhoto 
                                                key={photo.id}
                                                photo={photo}
                                                onDelete={() => onDelete(photo.id)}
                                                onLike={() => onLike(photo.id)}
                                                index={index}
                                                isEdit={isEdit}/>
                                    }

                                    return <Photo 
                                            key={photo.id} 
                                            photo={photo}
                                            onDelete={() => onDelete(photo.id)}
                                            onLike={() => onLike(photo.id)} />
                                })
                            }
                        </div>
                        </div>
            } 
        </>
    )
}