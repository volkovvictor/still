'use client'

import style from './style/photos.module.css'
import Photo from './components/Photo'
import type { IPhoto } from '@/types/photos.type'
import { useCallback, useMemo } from 'react'
import SortablePhoto from './components/SortablePhotos'
import Cells from './components/Cells'

interface Props {
    photos: IPhoto[],
    isEdit?: boolean
}

export default function Photos({photos, isEdit=false}: Props) {
    const onLike = useCallback((id: string) => {
        const likedPhoto = photos.find(photo => photo.id === id) // edit
        console.log(likedPhoto)
    }, [])

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
                                key={photo.id}
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