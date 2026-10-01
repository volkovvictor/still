'use client'

import Icon from '@/ui/icon/Icon'
import style from '../(style)/modal.module.css'
import Title from '@/ui/title/Title'
import locales from '@/locales/locales'
import Button from '@/ui/button/Button'
import Select from '@/ui/select/Select'
import Slider from '@/ui/slider/Slider'
import { ReactElement, ReactEventHandler, use, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PhotoTypes } from '@/types/photos.type'
import usePhotos from '@/store/usePhotos'
import { useCreatePhotos, useDeletePhotos, useGetPhotos } from '@/components/photos/hooks/usePhotosApi'
import { IOption } from '@/types/general.type'
import getOptions from '@/utils/addPhotosOptions'
import { useCreatePhotoshoots, useGetPhotoshoots } from '@/components/photos/hooks/usePhotoshootApi'
import usePhotoshoots from '@/store/usePhotoshoots'
import { IPhotoshoot } from '@/types/photoshoots.type'
import useUsers from '@/store/useUsers'
import Input from '@/ui/input/Input'

interface Props {
    closeModal: () => void
}

type PortfolioType = 'new' | number

const locale = locales()

const { categories, portfolioTypes } = getOptions()


export default function AddModal({closeModal}: Props) {

    const [files, setFiles] = useState<FileList | null>(null)
    const [photoshootPreview, setPhotoshootPreview] = useState<File | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<PhotoTypes>('preview')
    const [selectedPortfolioType, setSelectedPortfolioType] = useState<PortfolioType>('new')
    const [selectedUserID, setSelectedUserID] = useState<string | null>(null)
    const [date, setDate] = useState<string>("")

    const photos = usePhotos(state => state)
    const photoshoots = usePhotoshoots(state => state.photoshoots)
    const users = useUsers(state => state.users)

    const usersOptions: IOption[] = useMemo(() => {
        return users.map(user => ({
            name: user.fullname,
            value: user.id
        }))
    }, [users])

    const createPhotos = useCreatePhotos()
    const createPhotoshoots = useCreatePhotoshoots()
    const getPhotoshoots = useGetPhotoshoots()
    

    const outsideModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }
    
    const photosPosition = useMemo(() => {
        return photos[selectedCategory].length ? photos[selectedCategory].map(photo => photo.position) : [0]
    }, [photos, selectedCategory])
    const lastPosition = useMemo(() => Math.max(...photosPosition), [photosPosition])
    console.log('lastPosition', lastPosition)

    const addPhotoshoot = useCallback(async () => {

        if (!files || !photoshootPreview) return;

        const position = photoshoots.length + 1
        const formData = new FormData()

        formData.append('previewSrc', photoshootPreview)
        formData.append('position', String(position))
        
        if (date) {
            formData.append('date', date)
        }

        const photoshoot = await createPhotoshoots(formData)
        await getPhotoshoots() 

        return photoshoot
    }, [files, photoshootPreview, createPhotoshoots, getPhotoshoots, date, photoshoots.length])

    const addPhotos = useCallback((photoshootID: string | null = null) => {

        if (!files) return

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData()

            formData.append('src', files[i])
            formData.append('position', String(lastPosition + i))
            formData.append('type', selectedCategory)

            if (selectedCategory === 'portfolio') {

                if (selectedUserID) {
                    formData.append('userID', selectedUserID)
                }

                if (photoshootID) {
                    formData.append('photoshootID', photoshootID)
                }
            }

            createPhotos(formData)
        }
    }, [files, photos, selectedCategory, createPhotos, selectedUserID])

    const onSubmit = useCallback(async (e: React.SubmitEvent) => {
        e.preventDefault()

        if (selectedCategory === 'portfolio') {
            const photoshootID = await addPhotoshoot()

            if (photoshootID) {
                addPhotos(photoshootID)
            }
        } else {
            addPhotos()
        }

        closeModal()
    }, [selectedCategory, addPhotos, addPhotoshoot, closeModal])

    return (
        <div className={style.modal} onClick={outsideModalClose}>
            <div className={style.body}>
                <div className={style.close} onClick={closeModal}>
                    <Icon name="close"/>
                </div>
                <div className={style.content}>
                    <Title title={locale.addPhotos} size="3rem"/>
                        <form className={style.form} onSubmit={onSubmit}>
                            <div className={style.selects}>
                                <Select options={categories} label={locale.category} setSelectedOption={(option: PhotoTypes) => setSelectedCategory(option)}/>
                                    {
                                        selectedCategory === "portfolio" && (
                                            <>
                                                <Select options={portfolioTypes} label={locale.add} setSelectedOption={(option: PortfolioType) => setSelectedPortfolioType(option)}/>
                                                <Select options={usersOptions} label={locale.account} setSelectedOption={(id: string) => setSelectedUserID(id)}/>
                                                {/* edit */}
                                                <Input label={locale.date} name='date' type='date' onChange={setDate} value={date}/> 
                                            </>
                                        )
                                    }
                            </div>
                            {
                                selectedCategory === "portfolio" && <label className={style.addPreview}>
                                    <input type="file" name="preview" onChange={(e) => setPhotoshootPreview(e.target.files?.[0] || null)}/>
                                    <div className={style.addButton}>
                                        <Icon name="add" size={50}/>
                                    </div>
                            </label>
                            }
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