'use client'

import type { LinkI } from './Menu'
import style from './menu.module.css'
import Link from 'next/link'
import Icon from '@/ui/icon/Icon'
import useColors from '@/hooks/useColors'
import { Fragment } from 'react'

interface Props {
    link: LinkI,
    onClick: () => void
    isList?: boolean,
}

export default function MenuLink({ link, onClick, isList=true}: Props) {

    const Component = isList ? 'li' : Fragment

    return (
        <Component>
            <Link onClick={onClick} className={style.link} href={link.url}>
                <span>{link.name}</span>
            </Link>
        </Component>
    )
}