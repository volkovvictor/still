import { StaticImageData } from "next/image";

export type PhotoTypes = 'preview' | 'portfolio' | 'account'
export interface IPhoto {
    id: string,
    _id: string,
    src: string | StaticImageData,
    photoPublicId: string,
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