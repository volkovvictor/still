'use client'

import style from './switchTheme.module.css'
import SwitchThemeIcon from './SwitchThemeIcon'
import { useTheme } from 'next-themes'

export default function SwitchTheme() {
    const { theme, setTheme } =  useTheme()

    return (
        <div className={style.switch}>
            <SwitchThemeIcon iconName="sun" onSwitch={() => setTheme("light")}/>
            <button className={style.switchTrack} onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                <div className={style.switchThumb}></div>
            </button>
            <SwitchThemeIcon iconName="moon" onSwitch={() => setTheme("dark")}/>
        </div>
    )
}