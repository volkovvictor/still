import { StaticImageData } from "next/image";

export interface IPhotoshoot {
    _id: string,
    src: string | StaticImageData,
    userID: string,
    date: string,
    photoPublicId: string,
    position: number,
}