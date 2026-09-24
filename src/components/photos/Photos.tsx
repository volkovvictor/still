'use client'

import type { PhotoTypes } from '@/types/photos.type'
import { usePathname, useParams } from 'next/navigation'
import TypePhotos from './components/TypePhotos'

interface Props {
    isEdit?: boolean,
    activeTab?: PhotoTypes
}

export default function Photos({ isEdit = false, activeTab }:Props) {
    const pathname = usePathname()
    const params = useParams()

    const adminPanelType = pathname.includes('admin') && activeTab
    const previewType = pathname === '/' && 'preview'
    const portfolioType = pathname.includes('portfolio') && 'portfolio'
    const accountType = pathname.includes('account') && 'account'
    const photoshootID = portfolioType && params.photoshootID

    const photosType: PhotoTypes | false = adminPanelType || previewType || portfolioType || accountType
    
    if (!photosType) return null
    return <TypePhotos photosType={photosType} photoshootID={photoshootID} isEdit={isEdit}/>
}