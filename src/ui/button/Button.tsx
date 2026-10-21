import style from './button.module.css'
import { BUTTON_BASE, BUTTON_SMALL } from '@/constants/ui'

type Size = 'base' | 'small'

interface Props {
    children: string | React.ReactElement,
    buttonSize?: Size,
    bordered?: boolean,
    onClick?: () => void,
    addStyles?: React.CSSProperties
}

interface ButtonStyle {
    height: string,
    borderRadius?: string
}

const size: Record<Size, string> = {
    base: BUTTON_BASE,
    small: BUTTON_SMALL
}

export default function Button({children, addStyles, buttonSize='base', bordered=true, onClick}: Props) {
    const styles: ButtonStyle = {height: size[buttonSize]}
    
    if (bordered) {
        styles.borderRadius = '10px'
    }

    return <button className={style.button} style={{...styles, ...addStyles}} onClick={onClick}>{children}</button>
}