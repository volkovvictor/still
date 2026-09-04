'use client'

import Icon from '@/ui/icon/Icon'
import style from '../(style)/modal.module.css'
import Title from '@/ui/title/Title'
import locales from '@/locales/locales'
import Button from '@/ui/button/Button'
import Select from '@/ui/select/Select'
import Slider from '@/ui/slider/Slider'
import { ReactElement, ReactEventHandler, useCallback, useEffect, useRef, useState } from 'react'
import { PhotoTypes } from '@/types/photos.type'
import usePhotos from '@/store/usePhotos'
import { useCreatePhotos } from '@/components/photos/hooks/usePhotosApi'

interface Props {
    closeModal: () => void
}

const locale = locales()

const options = [
    {
        name: locale.main,
        value: "main"
    },
    {
        name: locale.portfolio,
        value: "portfolio"
    },
    {
        name: locale.photoschoot,
        value: "photoschoot",
    },
]

export default function AddModal({closeModal}: Props) {

    const [files, setFiles] = useState<FileList | null>(null)
    const [category, setCategory] = useState<PhotoTypes>('preview')
    const [selectedUserID, setSelectedUserID] = useState<string | null>(null)

    const photos = usePhotos(state => state)

    const createPhotos = useCreatePhotos()
    

    const outsideModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    const addPhotos = useCallback((e: React.SubmitEvent) => {
        e.preventDefault()

        if (!files) return

        const photosLength = photos[category].length

        console.log('files', files.length)

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData()

            formData.append('src', files[i])
            formData.append('position', String(photosLength + i + 1))
            formData.append('type', category)

            if ((category === 'account' || category === 'portfolio') && selectedUserID) {
                formData.append('userID', selectedUserID)
            }

            console.log(Object.fromEntries(formData))

            createPhotos(formData)
        }
    }, [category, files, photos, selectedUserID, createPhotos])

    const onSelect = useCallback((option: PhotoTypes) => {
        setCategory(option)
    }, [])

    return (
        <div className={style.modal} onClick={outsideModalClose}>
            <div className={style.body}>
                <div className={style.close} onClick={closeModal}>
                    <Icon name="close"/>
                </div>
                <div className={style.content}>
                    <Title title={locale.addPhotos} size="3rem"/>
                        <form className={style.form} onSubmit={addPhotos}>
                            <Select options={options} label={locale.category} setSelectedOption={onSelect}/>
                            <label className={style.addFile}>
                                <input type="file" name="photo" multiple onChange={(e) => setFiles(e.target.files)}/>
                                <div className={style.addButton}>
                                    <Icon name="add" size={50}/>
                                </div>
                            </label>
                            <Slider/>
                            <div className={style.buttons}>
                                <Button onClick={() => {}}>{locale.add}</Button>
                                <Button onClick={closeModal}>{locale.cancel}</Button>
                            </div>
                    </form>
                </div>
            </div>
        </div>
    )
}