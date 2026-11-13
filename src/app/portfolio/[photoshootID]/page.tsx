import Photos from "@/components/photos/Photos";
import Title from "@/ui/title/Title";
import type { IPhoto } from "@/types/photos.type";
import apiFetch from "@/utils/apiFetch";
import { PHOTOSHOOT_URL, USERS_URL } from "@/constants/api";
import convertDate from "@/utils/convertDate";
import { IUser } from "@/types/users.type";

interface Props {
    params: Promise<{ photoshootID: string }>
}

export default async function Photoschoot({params}: Props) {
    const id = (await params).photoshootID
    const photoshoot = await apiFetch({ path: `${PHOTOSHOOT_URL}/${id}` })
    console.log('photoshoot', photoshoot)

    if (!photoshoot) return null

    const date = convertDate(photoshoot.date)
    const user: IUser | null = photoshoot.userID ? await apiFetch({ path: `${USERS_URL}/${photoshoot.userID}` }) : null

    return (
        <div>
            <Title title={date} subtitle={user?.fullname}/>
            <Photos/>
        </div>
    )
}