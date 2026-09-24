import { StaticImageData } from "next/image";

export interface IPhotoshoot {
    id: string,
    _id: string,
    previewSrc: string | StaticImageData,
    previewPhotoPublicId: string,
    position: number,
}