'use client'

import Title from '@/ui/title/Title'
import locales from '@/locales/locales'
import Tabs from '@/ui/tabs/Tabs'
import type { ITabs } from '@/types/general.type'
import type { IPhoto } from '@/types/photos.type'
import { useMemo, useState } from 'react'
import Photos from '@/components/photos/Photos'

//delete
import photo1 from '@/assets/1.jpg' 
import photo2 from '@/assets/2.jpg' 
import photo3 from '@/assets/3.jpg' 
import photo4 from '@/assets/4.jpg' 
import photo5 from '@/assets/5.jpg' 
import Empty from '@/components/empty/Empty'

const locale = locales()

const defTabs: ITabs[] = [
    {
        name: "all",
        value: locale.all,
        isActive: true
    },
    {
        name: "liked",
        value: locale.liked,
        isActive: false
    },
    {
        name: "added",
        value: locale.purchased,
        isActive: false
    },
]

const data: IPhoto[] = [ //delete
    {
        id: "1",
        src: photo1,
        alt: "photo_1",
        position: 1,
        isLiked: true
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
        // isAddedToCart: true
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

export default function UserPhotos() {

    const [tabs, setTabs] = useState<ITabs[]>(defTabs)
    const [activeTab, setActiveTab] = useState<string>("all")

    const activePhotos = useMemo(() => {
        if (activeTab === "liked") {
            return data.filter(photo => photo.isLiked)
        }
        if (activeTab === "added") {
            return data.filter(photo => photo.isSelled)
        }

        return data
    }, [activeTab])

    return (
        <div>
            <Title tag='h2' title={locale.myPhotos} size="3rem"/>
            <Tabs tabs={tabs} setTabs={setTabs} setActiveTab={setActiveTab}/>
            <div style={{paddingTop: 50}}>
                {
                    activePhotos.length ?
                    <Photos photos={activePhotos}/>
                    :
                    <Empty text={locale.noPhotos}/>
                }
            </div>
        </div>
    )
}