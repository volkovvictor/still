'use client'

import Icon from '@/ui/icon/Icon'
import style from '../(style)/modal.module.css'
import Title from '@/ui/title/Title'
import locales from '@/locales/locales'
import Button from '@/ui/button/Button'
import Select from '@/ui/select/Select'
import Slider from '@/ui/slider/Slider'
import { useRef } from 'react'

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

    const outsideModalClose = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            closeModal()
        }
    }

    return (
        <div className={style.modal} onClick={outsideModalClose}>
            <div className={style.body}>
                <div className={style.close} onClick={closeModal}>
                    <Icon name="close"/>
                </div>
                <div className={style.content}>
                    <Title title={locale.addPhotos} size="3rem"/>
                        <form className={style.form}>
                            <Select options={options} label={locale.category}/>
                            <label className={style.addFile}>
                                <input type="file" name="photo" multiple/>
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