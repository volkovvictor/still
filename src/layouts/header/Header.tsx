'use client'

import style from './header.module.css'
import Logo from '@/ui/logo/Logo'
import BurgerMenu from '@/ui/burgerMenu/BurgerMenu'
import Cart from '@/ui/cart/Cart'
import Menu from '@/components/menu/Menu'
import { useCallback, useState } from 'react'

export default function Header () {
    
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false)

    const onMenuToggle = useCallback(() => {
        setMenuOpen(state => !state)
    }, [setMenuOpen])

    return (
        <>
            <div className={`${style.header} container`}>
                <Logo/>
                <div className={style.header_right}>
                    <Cart/>
                    <BurgerMenu onMenuToggle={onMenuToggle}/>
                </div>
            </div>
            <Menu setMenuOpen={setMenuOpen} isMenuOpen={isMenuOpen}/>
        </>
    )
}