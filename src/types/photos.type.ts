import { StaticImageData } from "next/image";

export interface IPhoto {
    id: string,
    src: string | StaticImageData,
    alt: string,
    position: number,
    width?: number,
    height?: number,
    isLiked?: boolean,
    isAddedToCart?: boolean,
    isSelled?: boolean,
    photoshootId?: string,
    userId?: string,
    date?: string,
}