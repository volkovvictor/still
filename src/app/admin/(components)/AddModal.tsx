'use client'

import Icon from '@/ui/icon/Icon'
import style from '../(style)/modal.module.css'
import Title from '@/ui/title/Title'
import locales from '@/locales/locales'
import AddForm from './addForm/AddForm'

interface Props {
    closeModal: () => void
}

const locale = locales()

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
                        <AddForm closeModal={closeModal}/>
                </div>
            </div>
        </div>
    )
}