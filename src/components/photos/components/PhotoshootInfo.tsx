import style from '../style/photos.module.css'
import { IPhoto } from "@/types/photos.type"
import { IPhotoshoot } from '@/types/photoshoots.type'
import Link from 'next/link'

interface Props {
    pathname: string,
    photo: IPhoto | IPhotoshoot,
    onClick?: () => void
}

function PhotoshootInfoChildren({photo}:Pick<Props, 'photo'>) {
    return (
        <>
            <div>{photo.userID}</div>
            <div>{photo.date}</div>
        </>
    )
}

export default function PhotoshootInfo({ pathname, photo, onClick }: Props) {
    return pathname === "/portfolio"
        ? <Link href={`/portfolio/${photo._id}`} className={style.info}><PhotoshootInfoChildren photo={photo}/></Link>
        : <div onClick={onClick} className={style.info}><PhotoshootInfoChildren photo={photo}/></div>
}
