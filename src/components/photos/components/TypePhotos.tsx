'use client'

import style from '../style/photos.module.css'
import Photo from './Photo'
import type { IPhoto, PhotoTypes } from '@/types/photos.type'
import { useCallback, useEffect, useMemo } from 'react'
import SortablePhoto from './SortablePhotos'
import Cells from './Cells'
import { useGetPhotos } from '../hooks/usePhotosApi'
import usePhotos from '@/store/usePhotos'

interface Props {
    photosType: PhotoTypes,
    isEdit: boolean
}

export default function TypePhotos({photosType, isEdit}: Props) {
    const getPhotos = useGetPhotos()
    const photos = usePhotos(state => state[photosType])

    useEffect(() => {
        getPhotos(photosType)
    }, [photosType])

    console.log('photos', photos)

    const onLike = useCallback((id: string) => {
        const likedPhoto = photos.find(photo => photo.id === id) // edit
        console.log(likedPhoto)
    }, [photos])

    const cells = useMemo(() => {
        const cellsData = []

        for (let i = 0; i < photos.length; i++) {
            cellsData.push({id: i})
        }

        return cellsData
    }, [photos.length])

    // console.log('cells', cells)

    return (
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
                                key={photo._id}
                                photo={photo}
                                onLike={() => onLike(photo.id)}
                                index={index}
                                isEdit={isEdit}/>
                    }

                    return <Photo 
                            key={photo.id} 
                            photo={photo}
                            onLike={() => onLike(photo.id)} />
                })
            }
        </div>
        </div>
    )
}