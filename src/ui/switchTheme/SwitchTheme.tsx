'use client'

import { useMemo, useState } from 'react'
import style from './switchTheme.module.css'
import SwitchThemeIcon from './SwitchThemeIcon'
import { ACCENT_COLOR, MAIN_COLOR } from '@/constants/ui'

export default function SwitchTheme() {

    const [theme, setTheme] = useState<"light" | "dark">("light")

    const thumbStyle = useMemo(() => {
        return theme === "light" ? { left: 5, backgroundColor: MAIN_COLOR } : { left: 45, backgroundColor: ACCENT_COLOR }
    }, [theme])

    return (
        <div className={style.switch}>
            <SwitchThemeIcon iconName="sun" theme={theme} onSwitch={() => setTheme("light")}/>
            <button className={style.switchTrack} onClick={() => setTheme(theme => theme === "light" ? "dark" : "light")}>
                <div className={style.switchThumb} style={thumbStyle}></div>
            </button>
            <SwitchThemeIcon iconName="moon" theme={theme} onSwitch={() => setTheme("dark")}/>
        </div>
    )
}