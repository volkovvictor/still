import { Dispatch, SetStateAction, useEffect, useMemo, useState } from 'react'
import style from './style/photoshootHead.module.css'
import Icon from '@/ui/icon/Icon'
import usePhotoshoots from '@/store/usePhotoshoots'
import convertDate from '@/utils/convertDate'
import { useGetUserById } from '@/hooks/useUsersApi'
import { IUser } from '@/types/users.type'
import useGetUser from '@/hooks/useGetUser'

interface Props {
    photoshootId: string,
    setPhotoshootId: (val: string) => void
}

export default function PhotoshootHead({ photoshootId, setPhotoshootId }: Props) {
    const getUserById = useGetUserById()
    const photoshoot = usePhotoshoots(state => state.photoshoots).filter(p => p._id === photoshootId)?.[0]
    const date = convertDate(photoshoot?.date)

    const user = useGetUser(photoshoot?.userID || "")

    if (!photoshoot) return null

    return (
        <div className={style.photoshootHead}>
            <div className={style.back} onClick={() => setPhotoshootId("")}>
                <Icon style={{ transform: "rotate(90deg)" }} name='arrow'/>
            </div>
            <div className={style.photoshootInfo}>
                { user && <div>{user.fullname}</div> }
                <div>{date}</div>
            </div>
        </div>
    )
}