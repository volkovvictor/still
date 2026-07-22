'use client'

import style from './menu.module.css'
import locales from '@/locales/locales'
import { IconNames } from '@/ui/icon/Icon'
import MenuLink from './MenuLink'
import CloseButton from '@/ui/closeButton/CloseButton'
import SwitchTheme from '@/ui/switchTheme/SwitchTheme'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export interface LinkI {
    url: string,
    name: string,
    access: 'all' | 'admin' | 'user',
    iconName?: IconNames
}

interface Props {
    isMenuOpen: boolean,
    setMenuOpen: (arg: boolean) => void
}

const local = locales()

const links: LinkI[] = [
    {
        url: '/account',
        name: local.account,
        access: 'user',
        iconName: 'user'
    },
    {
        url: '/portfolio',
        name: local.portfolio,
        access: 'all'
    },
    {
        url: '/contacts',
        name: local.contacts,
        access: 'all'
    },
]

export default function Menu({setMenuOpen, isMenuOpen}: Props) {

    const pathname = usePathname()

    useEffect(() => {
        if (isMenuOpen) {
            setMenuOpen(false)
        }
    }, [pathname])

    return (
        <div className={`${style.menu}${isMenuOpen ? ` ${style.isOpen}` : ''}`}>
            <div className={style.menuTop}>
                <SwitchTheme/>
                <CloseButton onClose={() => setMenuOpen(false)}/>
            </div>
            <ul>
                {
                    links.map((link) => <MenuLink key={link.url} link={link}/>)
                }
            </ul>
        </div>
    )
}