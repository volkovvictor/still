import style from './style/addForm.module.css'
import Select from '@/ui/select/Select'
import Icon from '@/ui/icon/Icon';
import Slider from '@/ui/slider/Slider';
import Button from '@/ui/button/Button';
import Input from '@/ui/input/Input';
import Image from 'next/image';
import { useCallback, useMemo, useEffect, useState } from 'react';
import useOptions from './hooks/useOptions';
import { PhotoTypes } from '@/types/photos.type';
import useUsers from '@/store/useUsers';
import { IOption } from '@/types/general.type';
import { IPhotoPreview } from '@/types/general.type';
import locales from '@/locales/locales';
import useAddPhotos from './hooks/useAddPhotos';
import useAddPhotoshoot from './hooks/useAddPhotoshoot';
import usePreviews from './hooks/usePreviews';
import AddFormSelects from './components/AddFormSelects';
import useHandleOptions from './hooks/useHandleOptions';

export type PortfolioType = 'new' | number
interface Props {
    closeModal: () => void
}

const locale = locales()

export default function AddForm({ closeModal }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<PhotoTypes>('preview')
    const [selectedPortfolioType, setSelectedPortfolioType] = useState<PortfolioType>('new')
    const [selectedUserID, setSelectedUserID] = useState<string | null>(null)
    const [date, setDate] = useState<string>("")
    const [files, setFiles] = useState<File[]>([])
    const [photoshootPreview, setPhotoshootPreview] = useState<File | null>(null)

    const onHandleOptions = useHandleOptions()

    useEffect(() => {
        console.log('selectedCategory', selectedCategory)
    }, [selectedCategory])

    const addPhotos = useAddPhotos({ files, selectedCategory, selectedUserID })
    const addPhotoshoot = useAddPhotoshoot({ photoshootPreview, date, files })

    const { photosPreviews, portfolioPreview } = usePreviews({ files, photoshootPreview })

    const onRemovePhotoPreview = useCallback((preview: IPhotoPreview) => {
        const removedFile = files.find(file => `${file.lastModified}_${file.name}` === preview.id)
        
        if (!removedFile) return

        URL.revokeObjectURL(preview.url)

        const newFiles = files.filter(file => `${file.lastModified}_${file.name}` !== preview.id)

        setFiles(newFiles)
    }, [files])

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

    const onSelectPhotos = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = e.target?.files

        if (!newFiles) return

        const filesArray: File[] = []

        for (const file of newFiles) {
            filesArray.push(file)
        }

        setFiles(filesArray)
    }

    useEffect(() => {
        return () => {
            photosPreviews.forEach(preview => {
                URL.revokeObjectURL(preview.url)
            })
        }
    }, [photosPreviews])

    return (
        <form className={style.form} onSubmit={onSubmit}>
            <AddFormSelects 
                selectedCategory={selectedCategory}
                date={date}
                onSelectCategory={onHandleOptions<PhotoTypes>(setSelectedCategory)}
                onSelectPortfolioType={onHandleOptions<PortfolioType>(setSelectedPortfolioType)}
                onSelectUser={onHandleOptions<string | null>(setSelectedUserID)}
                onSetDate={onHandleOptions<string>(setDate)}/>
            {
                selectedCategory === "portfolio" && <label className={style.addPreview}>
                    <input type="file" name="preview" onChange={(e) => setPhotoshootPreview(e.target.files?.[0] || null)}/>
                    {
                        portfolioPreview
                        ? <Image src={portfolioPreview} alt="preview" width={200} height={200}/>
                        : (
                            <div className={style.previewPlaceholder}>
                                <div className={style.addButton}>
                                    <Icon name="add" size={50}/>
                                </div>
                            </div>
                        )
                    }
            </label>
            }
            <label className={style.addFile}>
                <input type="file" name="photo" multiple onChange={onSelectPhotos}/>
                <div className={style.addButton}>
                    <Icon name="add" size={50}/>
                </div>
            </label>
            <Slider previews={photosPreviews} onRemove={onRemovePhotoPreview}/>
            <div className={style.buttons}>
                <Button>{locale.add}</Button>
                <Button onClick={closeModal}>{locale.cancel}</Button>
            </div>
        </form>
    )
}