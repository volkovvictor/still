'use client'

import style from '../(style)/admin.module.css'
import Tabs from "@/ui/tabs/Tabs";
import locales from "@/locales/locales";
import { useCallback, useEffect, useMemo, useState } from "react";
import Photos from "@/components/photos/Photos";
import Checkbox from "@/ui/checkbox/Checkbox";
import Icon from '@/ui/icon/Icon';
import useColors from '@/hooks/useColors';
import AddModal from './AddModal';
import type { ITabs } from '@/types/general.type';
import type { IPhoto } from "@/types/photos.type";

const locale = locales()

//delete
import photo1 from '@/assets/1.jpg' 
import photo2 from '@/assets/2.jpg' 
import photo3 from '@/assets/3.jpg' 
import photo4 from '@/assets/4.jpg' 
import photo5 from '@/assets/5.jpg' 
import Button from '@/ui/button/Button';
import Title from '@/ui/title/Title';
import useAllCheck from '@/store/useAllCheck';


const data: IPhoto[] = [ //delete
    {
        id: "1",
        src: photo1,
        alt: "photo_1",
        position: 1,
    },
    {
        id: "2",
        src: photo2,
        alt: "photo_2",
        position: 2,
        isLiked: true
    },
    {
        id: "3",
        src: photo3,
        alt: "photo_3",
        position: 3,
        isAddedToCart: true
    },
    {
        id: "4",
        src: photo4,
        alt: "photo_4",
        position: 4,
    },
    {
        id: "5",
        src: photo5,
        alt: "photo_5",
        position: 5,
    },
]

const defTabs: ITabs[] = [
    {
        name: "main",
        value: locale.main,
        isActive: true
    },
    {
        name: "portfolio",
        value: locale.portfolio,
        isActive: false
    },
    {
        name: "photoschoot",
        value: locale.photoschoot,
        isActive: false
    },
]

export default function Admin() {

    const { MAIN_COLOR } = useColors()

    const [ tabs, setTabs ] = useState<ITabs[]>(defTabs)
    const [activeTab, setActiveTab] = useState<string>("main")
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
    const [ isEdit, setIsEdit ] = useState<boolean>(false)

    const { isSelectAllChecked, selectedIds, toggleAllCheck, clearAll } = useAllCheck()

    const photosIds = useMemo(() => data.map(photo => photo.id), [])

    const onChange = useCallback((val: boolean) => {
        toggleAllCheck(photosIds, val)
    }, [photosIds, toggleAllCheck])

    useEffect(() => {
        if (isEdit) {
            clearAll()
        }
    }, [isEdit, clearAll])

    useEffect(() => {
        if (selectedIds.length < photosIds.length) {
            toggleAllCheck(photosIds, false)
        }
    }, [photosIds, toggleAllCheck, selectedIds])

    return (
        <>
            <div className={style.admin}>
                <Tabs tabs={tabs} setTabs={setTabs} setActiveTab={setActiveTab}/>
                <div className={style.actions}>
                    <Checkbox 
                        text={locale.chooseAll} 
                        textWeight={700} 
                        isChecked={isSelectAllChecked} 
                        onChange={onChange}/>
                    <div className={style.tools}>
                        <div className={style.tool} onClick={() => setIsModalOpen(true)}>
                            <Icon name="add" size={35} stroke={MAIN_COLOR}/>
                        </div>
                        <div className={`${style.tool}${isEdit ? " " + style.active : ""}`} onClick={() => setIsEdit(!isEdit)}>
                            <Icon name="edit" size={35} stroke={MAIN_COLOR}/>
                        </div>
                    </div>
                </div>
                {
                    isEdit && (
                        <div className={style.editBlock}>
                            <Button buttonSize='small'>{locale.save}</Button>
                            <p>{locale.editing}</p>
                            <Button onClick={() => setIsEdit(false)} buttonSize='small'>{locale.cancel}</Button>
                        </div>
                    )
                }
                <Photos isEdit={isEdit}/>
            </div>
            {
                isModalOpen && <AddModal closeModal={() => setIsModalOpen(false)}/>
            }
        </>
    )
}