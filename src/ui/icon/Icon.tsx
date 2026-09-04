'use client'

import { 
    UserIcon,
    LoginIcon,
    LogoutIcon,
    AuthIcon,
    TelegramIcon,
    EmailIcon,
    VkIcon,
    FavoriteIcon,
    CartIcon,
    ArrowIcon,
    SunIcon,
    MoonIcon,
    EditIcon,
    TrashIcon,
    AddIcon,
    CloseIcon,
    CheckIcon,
    ArrowDownIcon,
    LoaderIcon } from "./Icons"
import { ICON_SIZE } from "@/constants/ui"
import useColors from "@/hooks/useColors"
import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { ThemeType } from "@/types/general.type"

export interface IconI {
    fill?: string,
    stroke?: string,
    size?: number,
    strokeWidth?: number,
    style?: React.CSSProperties,
    vkIconColor?: ThemeType
}

export type IconNames = 
    'user' |
    'login' |
    'logout' |
    'auth' |
    'telegram' |
    'email' |
    'vk' |
    'favorite' |
    'cart' |
    'arrow' |
    'sun' |
    'moon' |
    'edit' |
    'trash' |
    'add' |
    'close' |
    'check' |
    'arrowDown' |
    'loader'

interface Props extends IconI {
    name: IconNames
}

const Icons: Record<IconNames, React.FC<IconI>> = {
    user: UserIcon,
    login: LoginIcon,
    logout: LogoutIcon,
    auth: AuthIcon,
    telegram: TelegramIcon,
    email: EmailIcon,
    vk: VkIcon,
    favorite: FavoriteIcon,
    cart: CartIcon,
    arrow: ArrowIcon,
    sun: SunIcon,
    moon: MoonIcon,
    edit: EditIcon,
    trash: TrashIcon,
    add: AddIcon,
    close: CloseIcon,
    check: CheckIcon,
    arrowDown: ArrowDownIcon,
    loader: LoaderIcon,
}

export default function Icon ({ 
    name, 
    fill, 
    stroke, 
    size, 
    strokeWidth,
    style
}: Props) {
    const [mounted, setMounted] = useState<boolean>(false)
    const { theme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    const Component = Icons[name]
    const { ACCENT_COLOR } = useColors()

    if (!Component) return null;

    const safeColor = mounted ? stroke || ACCENT_COLOR : "#fff"
    const vkIconColor = mounted ? theme as ThemeType : "light"

    const defaultProps: IconI = {
        fill: fill || 'transparent',
        stroke: safeColor,
        size: size || ICON_SIZE,
        strokeWidth: strokeWidth || 2,
        style: style || {},
        vkIconColor: vkIconColor
    }

    return (
        <Component {...defaultProps}/>
    )
}