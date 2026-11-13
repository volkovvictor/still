'use client'

import style from '../style/photos.module.css'
import Photo from './Photo'
import type { IPhoto, PhotoTypes } from '@/types/photos.type'
import { useCallback, useEffect, useMemo, useState } from 'react'
import SortablePhoto from './SortablePhotos'
import Cells from './Cells'
import { useDeletePhotos, useGetPhotos } from '../hooks/usePhotosApi'
import { useDeletePhotoshoots, useGetPhotoshoots } from '../hooks/usePhotoshootApi'
import usePhotos from '@/store/usePhotos'
import Empty from '@/components/empty/Empty'
import locales from '@/locales/locales'
import Loader from '@/ui/loader/Loader'
import { ParamValue } from 'next/dist/server/request/params'
import usePhotoshoots from '@/store/usePhotoshoots'
import { DragDropProvider } from '@dnd-kit/react'
import { move } from '@dnd-kit/helpers';
import { IPhotoshoot } from '@/types/photoshoots.type'
import { IOrder } from '@/types/general.type'

interface Props {
    photosType: PhotoTypes,
    photoshootID?: string | false,
    onClickPhotoshoot?: (id: string) => void,
    isEdit: boolean
}

export default function TypePhotos({photosType, photoshootID, isEdit, onClickPhotoshoot}: Props) {
    const locale = locales()
    const getPhotos = useGetPhotos()
    const getPhotoshoots = useGetPhotoshoots()
    const deletePhoto = useDeletePhotos()
    const deletePhotoshoot = useDeletePhotoshoots()

    const setNewOrder = usePhotos(state => state.setNewOrder)

    const photosByType = usePhotos(state => state[photosType])
    const isPhotosLoading = usePhotos(state => state.isPhotosLoading)
    const photoshoots = usePhotoshoots(state => state.photoshoots)
    const isPhotoshootLoading = usePhotoshoots(state => state.isPhotoshootLoading)

    const isPhotoshootsPreviews = useMemo(() => photosType === 'portfolio' && !photoshootID, [photosType, photoshootID])

    useEffect(() => {
        if (isPhotoshootsPreviews) {
            getPhotoshoots()
        } else {
            getPhotos(photosType)
        }
    }, [photosType, isPhotoshootsPreviews])

    const photos = useMemo(() => {
        return isPhotoshootsPreviews 
        ? photoshoots : photoshootID
            ? photosByType.filter(photo => photo.photoshootID === photoshootID)
            : photosByType
    }, [photoshootID, photosByType, isPhotoshootsPreviews, photoshoots])
    
    const onLike = useCallback((id: string) => {
        const likedPhoto = photos.find(photo => photo._id === id) // edit
    }, [photos])

    const onDelete = useCallback((id: string) => {
        if (isPhotoshootsPreviews) {
            deletePhotoshoot([id])
        } else if (photos.length === 1 && photoshootID) {
              deletePhotoshoot([photoshootID])
        } else {
            deletePhoto(photosType, [id])
        }
    }, [photosType, deletePhoto, isPhotoshootsPreviews, deletePhotoshoot])

    const cells = useMemo(() => {
        const cellsData = []

        for (let i = 0; i < photos.length; i++) {
            cellsData.push({id: i})
        }

        return cellsData
    }, [photos.length])

    return (
        <div style={{ position: "relative" }}>
            {
                isPhotosLoading && <Loader/> 
            }
            {
                photos.length === 0 && !isPhotosLoading
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
                        <DragDropProvider onDragEnd={(e) => {
                            const photosIDs = photos.map(photo => photo._id)
                            const reordered = move(photosIDs, e)
                            const newPhotosArray: IOrder[] = reordered.map((id, index) => {
                                const photo = photos.find(photo => photo._id === id)

                                return {id: photo?._id || '', position: index}
                                
                            })

                            setNewOrder(newPhotosArray)
                        }}>
                            <div className={`${style.photos} ${isEdit ? " " + style.edit : ""}`}>
                                {
                                    photos.map((photo, index) => {
                                        if (isEdit) {
                                            return <SortablePhoto 
                                                    key={photo._id}
                                                    photo={photo}
                                                    index={index}
                                                    isEdit={isEdit}
                                                    photosType={photosType}/>
                                        }

                                        return <Photo 
                                                key={photo._id} 
                                                photo={photo}
                                                photosType={photosType}
                                                photoshootID={photoshootID}
                                                onDelete={() => onDelete(photo._id)}
                                                onLike={() => onLike(photo._id)}
                                                onClickPhotoshoot={() => onClickPhotoshoot?.(photo._id)} />
                                    })
                                }
                            </div>
                        </DragDropProvider>
                    </div>
            } 
        </div>
    )
}