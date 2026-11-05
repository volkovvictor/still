'use client'

import style from './menu.module.css'
import { useLogout } from '../loginForm/hooks/authApi'
import locales from '@/locales/locales'


export default function LogoutLink() {
    const locale = locales()
    const onLogout = useLogout()

    return (
        <div className={style.link} onClick={onLogout}>
            <span>{locale.logout}</span>
        </div>
    )
}