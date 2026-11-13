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
import useUsers from '@/store/useUsers';
import { useRouter } from 'next/navigation';
import Loader from '@/ui/loader/Loader';
import { useGetAllUsers } from '@/hooks/useUsersApi';
import usePhotoshoots from '@/store/usePhotoshoots';
import PhotoshootHead from './photoshootHead/PhotoshootHead';
import { useDeletePhotoshoots } from '@/components/photos/hooks/usePhotoshootApi';

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
]

export default function Admin() {

    const { MAIN_COLOR } = useColors()

    const photos = usePhotos()
    
    const user = useUsers(state => state.currentUser)
    const isCurrentUserLoading = useUsers(state => state.isCurrentUserLoading)

    const cleanNewOrder = usePhotos(state => state.cleanNewOrder)
    const newOrder = usePhotos(state => state.newOrder)
    const isPhotosLoading = usePhotos(state => state.isPhotosLoading)

    const photoshoots = usePhotoshoots(state => state.photoshoots)

    const updatePhotosOrder = useUpdatePhotosOrder()
    const deletePhotos = useDeletePhotos()
    const deletePhotoshoots = useDeletePhotoshoots()

    const getAllUsers = useGetAllUsers()

    const [ tabs, setTabs ] = useState<ITabs[]>(defTabs)
    const [activeTab, setActiveTab] = useState<PhotoTypes>("preview")
    const [ isModalOpen, setIsModalOpen ] = useState<boolean>(false)
    const [ isEdit, setIsEdit ] = useState<boolean>(false)
    const [ photoshootId, setPhotoshootId ] = useState<string>("")

    const { isSelectAllChecked, selectedIds, toggleCheck, clearAll } = useAllCheck()

    const isPhotoshootsPreviews = useMemo(() => activeTab ==="portfolio" && !photoshootId, [activeTab, photoshootId])

    const photosIds =  useMemo(() => {
        return isPhotoshootsPreviews
            ? photoshoots.map(photoshoot => photoshoot._id)
            : photos[activeTab].map(photo => photo._id)
    }, [isPhotoshootsPreviews, activeTab, photos, photoshoots])

    const onChange = useCallback((val: boolean) => {
        toggleCheck(photosIds, val)
    }, [photosIds, toggleCheck])

    const onChangeTab = useCallback((val: PhotoTypes) => {
        if (val === 'preview') {
            setPhotoshootId("")
        }
        setActiveTab(val)
    }, [])

    useEffect(() => {
        getAllUsers()
    }, [])

    useEffect(() => {
        clearAll()
    }, [isEdit, clearAll, activeTab, photoshootId])

    useEffect(() => {
        if (selectedIds.length < photosIds.length) {
            toggleCheck(photosIds, false)
        }
        if (selectedIds.length === photosIds.length) {
            toggleCheck(photosIds, true)
        }
    }, [photosIds, toggleCheck, selectedIds])

    const onCloseEditing = useCallback(() => {
        cleanNewOrder()
        setIsEdit(false)
    }, [cleanNewOrder])

    const onReorder = useCallback(() => {
        updatePhotosOrder('preview', newOrder)
        onCloseEditing()
    }, [newOrder, onCloseEditing, updatePhotosOrder])

    const onDeleteMany = useCallback(() => {
        if (isPhotoshootsPreviews) {
            deletePhotoshoots(selectedIds)
        } else if (isSelectAllChecked && photoshootId) {
             deletePhotoshoots([photoshootId])
        } else {
            deletePhotos(activeTab, selectedIds)
        }
    }, [selectedIds, deletePhotos, isPhotoshootsPreviews, deletePhotoshoots, activeTab])

    const onClickPhotoshoot = (id: string) => {
        setPhotoshootId(id)
    }

    return (
        <div style={{ position: "relative" }}>
            {
                isCurrentUserLoading
                ? <Loader/>
                : !user && !isCurrentUserLoading
                    ? <div style={{ textAlign: "center" }}>Нет доступа</div>
                    : (
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
                                    photoshootId && <PhotoshootHead photoshootId={photoshootId} setPhotoshootId={setPhotoshootId}/>
                                }
                                {
                                    isEdit && (
                                        <div className={style.editBlock}>
                                            <Button buttonSize='small' onClick={onReorder}>{locale.save}</Button>
                                            <Button onClick={onCloseEditing} buttonSize='small'>{locale.cancel}</Button>
                                        </div>
                                    )
                                }
                                <Photos isEdit={isEdit} activeTab={activeTab} photoshootId={photoshootId} onClickPhotoshoot={onClickPhotoshoot}/>
                            </div>
                            {
                                isModalOpen && <AddModal closeModal={() => setIsModalOpen(false)}/>
                            }
                        </>
                    )
            }
        </div>
    )
}