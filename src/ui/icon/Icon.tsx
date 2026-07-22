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
    ArrowDownIcon } from "./Icons"
import { ACCENT_COLOR, ICON_SIZE } from "@/constants/ui"

export interface IconI {
    fill?: string,
    stroke?: string,
    size?: number,
    strokeWidth?: number,
    style?: React.CSSProperties
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
    'arrowDown'

interface Props extends IconI {
    name: IconNames
}

const defaultProps: IconI = {
    fill: 'transparent',
    stroke: ACCENT_COLOR,
    size: ICON_SIZE,
    strokeWidth: 2,
    style: {}
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
    arrowDown: ArrowDownIcon
}

export default function Icon ({ 
    name, 
    fill = defaultProps.fill, 
    stroke = defaultProps.stroke, 
    size = defaultProps.size, 
    strokeWidth = defaultProps.strokeWidth,
    style = defaultProps.style
}: Props) {
    const Component = Icons[name]

    if (!Component) return null;

    return (
        <Component fill={fill} stroke={stroke} size={size} strokeWidth={strokeWidth} style={style}/>
    )
}