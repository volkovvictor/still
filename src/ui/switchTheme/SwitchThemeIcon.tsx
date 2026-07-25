'use client'

import Icon, { IconNames } from '../icon/Icon'
import useColors from '@/hooks/useColors'
import style from './switchTheme.module.css'

interface Props {
    iconName: IconNames,
    onSwitch: () => void
}

export default function SwitchThemeIcon({ iconName, onSwitch }: Props) {
    const { MAIN_COLOR, ACCENT_COLOR } = useColors()
    const color = iconName === 'sun' ? MAIN_COLOR : ACCENT_COLOR

    return (
        <button onClick={onSwitch} className={style[`${iconName}Button`]}>
            <Icon name={iconName} stroke={color}/>
        </button>
    )
}