'use client'

import type { PhotoTypes } from '@/types/photos.type'
import { usePathname } from 'next/navigation'
import TypePhotos from './components/TypePhotos'

interface Props {
    isEdit?: boolean,
    activeTab?: PhotoTypes
}

export default function Photos({ isEdit = false, activeTab }:Props) {
    const pathname = usePathname()
    const photosType: PhotoTypes | null = activeTab || (pathname === '/' && 'preview') ||
        (pathname.includes('portfolio') && 'portfolio') ||
        (pathname.includes('account') && 'account') || null

    console.log(pathname)

    if (!photosType) return null
    return <TypePhotos photosType={photosType} isEdit={isEdit}/>
}