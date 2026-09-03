import { StaticImageData } from "next/image";

export type PhotoTypes = 'preview' | 'portfolio' | 'account'
export interface IPhoto {
    id: string,
    src: string | StaticImageData,
    alt: string,
    position: number,
    size: number,
    type: PhotoTypes,
    width?: number,
    height?: number,
    isLiked?: boolean,
    isAddedToCart?: boolean,
    isSelled?: boolean,
    photoshootId?: string,
    userId?: string,
    date?: string,
}