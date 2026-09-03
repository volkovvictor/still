'use client'

import type { PhotoTypes } from '@/types/photos.type'
import { usePathname } from 'next/navigation'
import TypePhotos from './components/TypePhotos'

interface Props {
    isEdit?: boolean
}

export default function Photos({ isEdit = false }:Props) {
    const pathname = usePathname()
    const photosType: PhotoTypes | null = (pathname === '/' && 'preview') ||
        (pathname.includes('portfolio') && 'portfolio') ||
        (pathname.includes('account') && 'account') || null

    if (!photosType) return null
    return <TypePhotos photosType={photosType} isEdit={isEdit}/>
}