import { IconI } from "./Icon"
import Image from "next/image"
import vk from '@/assets/vk-logo-g.png'

export const UserIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4"/>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        </svg>
    )
}

export const LoginIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
            <polyline points="10 17 15 12 10 7"/>
            <line x1="15" y1="12" x2="3" y2="12"/>
        </svg>
    )
}

export const LogoutIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
            <polyline points="16 17 21 12 16 7"/>
            <line x1="21" y1="12" x2="9" y2="12"/>
        </svg>
    )
}

export const AuthIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <line x1="19" y1="8" x2="19" y2="14"/>
            <line x1="22" y1="11" x2="16" y2="11"/>
        </svg>
    )
}

export const TelegramIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
    )
}

export const EmailIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/>
            <polyline points="22 6 12 13 2 6"/>
        </svg>
    )
}

export const VkIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return <Image src={vk} alt="VK" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size}/>
}

export const FavoriteIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
    )
}

export const CartIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"/>
            <circle cx="20" cy="21" r="1"/>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
        </svg>
    )
}

export const ArrowIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <polyline points="19 12 12 19 5 12"/>
        </svg>
    )
}

export const SunIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5"/>
            <line x1="12" y1="1" x2="12" y2="3"/>
            <line x1="12" y1="21" x2="12" y2="23"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
            <line x1="1" y1="12" x2="3" y2="12"/>
            <line x1="21" y1="12" x2="23" y2="12"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
    )
}

export const MoonIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
    )
}

export const EditIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
    )
}

export const TrashIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
            <line x1="10" y1="11" x2="10" y2="17"/>
            <line x1="14" y1="11" x2="14" y2="17"/>
        </svg>
    )
}

export const AddIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
    )
}
export const CloseIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
    )
}

export const CheckIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"/>
        </svg>
    )
}

export const ArrowDownIcon = ({fill, stroke, size, strokeWidth, style}: IconI) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" style={{...style, minWidth: size, minHeight: size, maxHeight: size, maxWidth: size}} width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"/>
        </svg>
    )
}