import Icon, { IconNames } from '../icon/Icon'
import { MAIN_COLOR, ACCENT_COLOR } from '@/constants/ui'

interface Props {
    iconName: IconNames,
    theme: "light" | "dark",
    onSwitch: () => void
}

export default function SwitchThemeIcon({ iconName, theme, onSwitch }: Props) {
    const lightStyle = iconName === 'sun' && theme === 'light'
    const darkStyle = iconName === 'moon' && theme === 'dark'

    const style = (lightStyle || darkStyle) ? {} : { opacity: 0.7 }
    const color = iconName === 'sun' ? MAIN_COLOR : iconName === "moon" ? ACCENT_COLOR : "transparent"

    return (
        <button onClick={onSwitch}>
            <Icon name={iconName} stroke={color} style={style}/>
        </button>
    )
}