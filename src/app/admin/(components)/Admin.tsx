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
import type { IPhoto, PhotoTypes } from "@/types/photos.type";
import Button from '@/ui/button/Button';
import useAllCheck from '@/store/useAllCheck';
import usePhotos from '@/store/usePhotos';
import { useDeletePhotos, useUpdatePhotosOrder } from '@/components/photos/hooks/usePhotosApi';

const locale = locales()

const defTabs: ITabs[] = [
    {
        name: "preview",
        value: locale.main,
        isActive: true
    },
    {
        name: "portfolio",
        value: locale.portfolio,
        isActive: false
    },
    {
        name: "account",
        value: locale.account,
        isActive: false
    },
]

export default function Admin() {

    const { MAIN_COLOR } = useColors()

    const photos = usePhotos()

    const cleanNewOrder = usePhotos(state => state.cleanNewOrder)
    const newOrder = usePhotos(state => state.newOrder)
    const isPhotosLoading = usePhotos(state => state.isPhotosLoading)

    const updatePhotosOrder = useUpdatePhotosOrder()
    const deletePhotos = useDeletePhotos()

    const [ tabs, setTabs ] = useState<ITabs[]>(defTabs)
    const [activeTab, setActiveTab] = useState<PhotoTypes>("preview")
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
    const [ isEdit, setIsEdit ] = useState<boolean>(false)

    const { isSelectAllChecked, selectedIds, toggleAllCheck, clearAll } = useAllCheck()

    const photosIds = useMemo(() => photos[activeTab].map(photo => photo._id), [activeTab, photos])

    const onChange = useCallback((val: boolean) => {
        toggleAllCheck(photosIds, val)
    }, [photosIds, toggleAllCheck])

    const onChangeTab = useCallback((val: PhotoTypes) => {
        setActiveTab(val)
    }, [])

    useEffect(() => {
        if (isEdit) {
            clearAll()
        }
    }, [isEdit, clearAll])

    useEffect(() => {
        if (selectedIds.length < photosIds.length) {
            toggleAllCheck(photosIds, false)
        }
        if (selectedIds.length === photosIds.length) {
            toggleAllCheck(photosIds, true)
        }
    }, [photosIds, toggleAllCheck, selectedIds])

    const onCloseEditing = useCallback(() => {
        cleanNewOrder()
        setIsEdit(false)
    }, [cleanNewOrder])

    const onReorder = useCallback(() => {
        console.log('newOrder', newOrder)
        updatePhotosOrder('preview', newOrder)
        onCloseEditing()
    }, [newOrder, onCloseEditing, updatePhotosOrder])

    const onDeleteMany = useCallback(() => {
        deletePhotos('preview', selectedIds)
    }, [selectedIds, deletePhotos])

    return (
        <>
            <div className={style.admin}>
                <Tabs tabs={tabs} setTabs={setTabs} onChangeTab={(val) => onChangeTab(val as PhotoTypes)}/>
                <div className={style.topPanel}>
                    <div className={style.actions}>
                        {
                        photosIds.length > 0 && <Checkbox 
                                                    text={locale.chooseAll} 
                                                    textWeight={700} 
                                                    isChecked={isSelectAllChecked} 
                                                    onChange={onChange}/>
                        }
                        {
                           selectedIds.length > 0 && (
                            <button className={style.allRemoveButton} onClick={onDeleteMany}>
                                <Icon size={30} name="trash"/>
                                <span>{locale.removeSelected}</span>
                            </button>
                           ) 
                        }
                    </div>
                    <div className={style.tools}>
                        <div className={style.tool} onClick={() => setIsModalOpen(true)}>
                            <Icon name="add" size={35} stroke={MAIN_COLOR}/>
                        </div>
                        {
                            photosIds.length > 0 && (
                                <div className={`${style.tool}${isEdit ? " " + style.active : ""}`} onClick={() => setIsEdit(!isEdit)}>
                                    <Icon name="edit" size={35} stroke={MAIN_COLOR}/>
                                </div>
                        )
                        }
                    </div>
                </div>
                {
                    isEdit && (
                        <div className={style.editBlock}>
                            <Button buttonSize='small' onClick={onReorder}>{locale.save}</Button>
                            <p>{locale.editing}</p>
                            <Button onClick={onCloseEditing} buttonSize='small'>{locale.cancel}</Button>
                        </div>
                    )
                }
                <Photos isEdit={isEdit} activeTab={activeTab}/>
            </div>
            {
                isModalOpen && <AddModal closeModal={() => setIsModalOpen(false)}/>
            }
        </>
    )
}