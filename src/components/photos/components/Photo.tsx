'use client'

import style from '../style/photos.module.css'
import Image from "next/image"
import type { IPhoto } from '@/types/photos.type'
import Link from 'next/link'
import Icon from '@/ui/icon/Icon'
import Button from '@/ui/button/Button'
import { usePathname } from 'next/navigation'
import locales from '@/locales/locales'
import Checkbox from '@/ui/checkbox/Checkbox'
import { useCallback, useEffect, useMemo } from 'react'
import useAllCheck from '@/store/useAllCheck'
import { IPhotoshoot } from '@/types/photoshoots.type'

interface Props {
    photo: IPhoto | IPhotoshoot,
    onDelete: () => void,
    onLike: () => void,
    ref?: (element: Element | null) => void,
    isEdit?: boolean
}

const locale = locales()

export default function Photo({photo, onLike, onDelete, ref, isEdit}: Props) {

    const selectedIds = useAllCheck(state => state.selectedIds)
    const onSelectId = useAllCheck(state => state.onSelectId)

    const pathname = usePathname()
    const isLiked = photo.isLiked && {
        fill: "#FF4757"
    }

    const isChecked = !!selectedIds.find(id => id === photo._id)

    const onChange = useCallback((val: boolean) => {
        onSelectId(photo._id, val)
    }, [onSelectId, photo])

    return (
        <div ref={ref} className={style.photoContainer} style={{
            gridRow: `span ${photo.size}`
        }}>
            {
                (pathname === '/admin' && !isEdit) &&  ( // add admin role // edit
                    <div className={`${style.action} ${style.choose}`}>
                        <Checkbox size={20} isChecked={isChecked} onChange={onChange}/>
                    </div>
                )
            }
            <div className={style.photo}>
                <Image src={photo.src} alt={photo.photoPublicId} width={photo.width} height={photo.height}/>
                {
                    pathname === "/account" && (
                        <button className={style.like} onClick={onLike}>
                            <Icon name="favorite" stroke="#FF4757" {...isLiked} size={25}/>
                        </button>
                    )
                }
                {
                    pathname === "/portfolio" && (
                        <Link href={`/portfolio/${photo._id}`} className={style.info}>
                            <div>{photo.userId}</div> {/* photo.userId */}
                            <div>{photo.date}</div> {/* photo.date */}
                        </Link>
                    )
                }
            </div>
            {
                (pathname === '/admin' && !isEdit) && ( // add admin role // edit
                    <div className={`${style.action} ${style.delete}`} onClick={onDelete}>
                        <Icon name="trash" size={20}/>
                    </div>
                )
            }
            {
                pathname === "/account" && <Button buttonSize="small" bordered={false}>{photo.isAddedToCart ? locale.order : locale.toCart}</Button>
            }
        </div>
    )
}