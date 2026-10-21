'use client'

import style from './header.module.css'
import Logo from '@/ui/logo/Logo'
import BurgerMenu from '@/ui/burgerMenu/BurgerMenu'
import Cart from '@/ui/cart/Cart'
import Menu from '@/components/menu/Menu'
import { useCallback, useState } from 'react'
import Title from '@/ui/title/Title'
import useTitle from '@/hooks/useTitle'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Icon from '@/ui/icon/Icon'

export default function Header () {

    const pathname = usePathname()
    const router = useRouter()
    
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false)

    const onMenuToggle = useCallback(() => {
        setMenuOpen(state => !state)
    }, [setMenuOpen])

    const isLoginPage = pathname === '/login'

    const title = useTitle()

    console.log('router', router)

    return (
        <>
            <div className={`${style.header} container`}>
                <div className={style.header_left} style={ isLoginPage ? { flex: "0 0 50%", justifyContent: "space-between" } : {} }>
                    {
                        isLoginPage && <div className={style.back} onClick={() => router.back()}>
                            <Icon name="arrow"/>
                        </div>
                    }
                    <div className={style.header_logo} style={ isLoginPage ? { transform: "translateX(50%)" } : {}}>
                        <Logo/>
                        { title && <Title title={title}/>}
                    </div>
                </div>
                {
                    !isLoginPage && ( // edit to isLogined
                        <div className={style.header_right}>
                            <Cart/>
                            <BurgerMenu onMenuToggle={onMenuToggle}/>
                        </div>
                    )
                }
            </div>
            <Menu setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen}/>
        </>
    )
}