'use client'

import style from './menu.module.css'
import { useLogout } from '../loginForm/hooks/authApi'
import locales from '@/locales/locales'

interface Props {
    onMenuClose: () => void
}

export default function LogoutLink({onMenuClose}: Props) {
    const locale = locales()
    const onLogout = useLogout()

    const onLogoutClick = () => {
        onMenuClose()
        onLogout()
    }

    return (
        <div className={style.link} onClick={onLogoutClick}>
            <span>{locale.logout}</span>
        </div>
    )
}