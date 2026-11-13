import useGetUser from '@/hooks/useGetUser'
import style from '../style/photos.module.css'
import { IPhoto } from "@/types/photos.type"
import { IPhotoshoot } from '@/types/photoshoots.type'
import Link from 'next/link'
import convertDate from '@/utils/convertDate'

interface Props {
    pathname: string,
    photo: IPhoto | IPhotoshoot,
    onClick?: () => void
}

function PhotoshootInfoChildren({photo}:Pick<Props, 'photo'>) {

    const user = useGetUser(photo.userID || "")
    const date = convertDate(photo.date || "")

    return (
        <>
            { user && <div>{user.fullname}</div> }
            <div>{date}</div>
        </>
    )
}

export default function PhotoshootInfo({ pathname, photo, onClick }: Props) {
    return pathname === "/portfolio"
        ? <Link href={`/portfolio/${photo._id}`} className={style.info}><PhotoshootInfoChildren photo={photo}/></Link>
        : <div style={{ cursor: "pointer" }} onClick={onClick} className={style.info}><PhotoshootInfoChildren photo={photo}/></div>
}
