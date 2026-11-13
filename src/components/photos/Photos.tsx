'use client'

import type { PhotoTypes } from '@/types/photos.type'
import { usePathname, useParams } from 'next/navigation'
import TypePhotos from './components/TypePhotos'
import { useEffect, useMemo } from 'react'
import useSelectedType from '@/store/useSelectedType'

interface Props {
    isEdit?: boolean,
    photoshootId?: string,
    activeTab?: PhotoTypes,
    onClickPhotoshoot?: (id: string) => void
}

export default function Photos({ isEdit = false, activeTab, photoshootId, onClickPhotoshoot }:Props) {
    const pathname = usePathname()
    const params = useParams()

    const adminPanelType = useMemo(() => (pathname.includes('admin') && activeTab), [activeTab, pathname])
    const previewType = pathname === '/' && 'preview'
    const portfolioType = pathname.includes('portfolio') && 'portfolio'
    const accountType = pathname.includes('account') && 'account'
    const photoshootID = useMemo(() => (portfolioType || adminPanelType === 'portfolio') && (photoshootId || params.photoshootID as string), [photoshootId,  params.photoshootID, portfolioType, adminPanelType])

    const photosType: PhotoTypes | false = adminPanelType || previewType || portfolioType || accountType
    
    if (!photosType) return null
    return <TypePhotos 
            photosType={photosType} 
            photoshootID={photoshootID} 
            isEdit={isEdit}
            onClickPhotoshoot={onClickPhotoshoot}/>
}