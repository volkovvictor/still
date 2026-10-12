'use client'

import type { LinkI } from './Menu'
import style from './menu.module.css'
import Link from 'next/link'
import Icon from '@/ui/icon/Icon'
import useColors from '@/hooks/useColors'

interface Props {
    link: LinkI
}

export default function MenuLink({ link }: Props) {

    const { MAIN_COLOR } = useColors()
    
    return (
        <li>
            <Link className={style.link} href={link.url}>
                <span>{link.name}</span>
            </Link>
        </li>
    )
}