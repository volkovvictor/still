'use client'

import style from '../(style)/account.module.css'
import Image from 'next/image'

import photo from '@/assets/3.jpg'
import Icon from '@/ui/icon/Icon'
import useUsers from '@/store/useUsers'

interface InfoI {
    name?: string,
    value: string | number
}

export default function AccountInfo() {

    const user = useUsers(state => state.currentUser)

    const info: InfoI[] = [
        {
            name: 'Сделано фотографий',
            value: 30
        },
        {
            name: 'Понравилось фотографий',
            value: 20
        },
        {
            name: 'Куплено фотографий',
            value: 10
        },
    ]

    return (
        <div className={style.account}>
            <div className={style.accountInfo}>
                <ul>
                    <li>{user?.fullname}</li>
                    {
                        info.map(item => (
                            <li key={item.name}>
                                { item.name && <span>{item.name}: </span>}
                                {item.value}
                            </li>
                        ))
                    }
                </ul>
                <button className={style.edit}>
                    <Icon name='edit'/>
                </button>
            </div>
        </div>
    )
}