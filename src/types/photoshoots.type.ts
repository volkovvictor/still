import { StaticImageData } from "next/image";

export interface IPhotoshoot {
    _id: string,
    src: string | StaticImageData,
    photoPublicId: string,
    position: number,
}