'use client'

import style from './menu.module.css'
import locales from '@/locales/locales'
import { IconNames } from '@/ui/icon/Icon'
import MenuLink from './MenuLink'
import CloseButton from '@/ui/closeButton/CloseButton'
import SwitchTheme from '@/ui/switchTheme/SwitchTheme'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import useToken from '@/store/useToken'
import useMenuLinks from './hooks/useMenuLinks'
import LogoutLink from './LogoutLink'
import useUsers from '@/store/useUsers'

export interface LinkI {
    url: string,
    name: string,
    iconName?: IconNames,
    actionOnLink?: () => void
}

interface Props {
    isMenuOpen: boolean,
    setMenuOpen: (arg: boolean) => void
}

const local = locales()

export default function Menu({setMenuOpen, isMenuOpen}: Props) {
    const user = useUsers(state => state.currentUser)
    const { pagesLinks, loginLink} = useMenuLinks(user)

    const onMenuClose = () => setMenuOpen(false)

    return (
        <div className={`${style.menu}${isMenuOpen ? ` ${style.isOpen}` : ''}`}>
            <div className={style.menuTop}>
                <SwitchTheme/>
                <CloseButton onClose={onMenuClose}/>
            </div>
            <ul>
                {
                    pagesLinks.map((link) => <MenuLink key={link.url} link={link} onClick={onMenuClose}/>)
                }
            </ul>
            {
                !user
                    ? <MenuLink link={loginLink} isList={false} onClick={onMenuClose}/>
                    : <LogoutLink onMenuClose={onMenuClose}/>
            }
        </div>
    )
}