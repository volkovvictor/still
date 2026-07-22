import style from '../(style)/account.module.css'
import Image from 'next/image'

import photo from '@/assets/3.jpg'
import Icon from '@/ui/icon/Icon'

interface InfoI {
    name: string,
    value: string | number
}

export default function AccountInfo() {

    const info: InfoI[] = [
        {
            name: 'ФИО',
            value: 'Имя Фамилия'
        },
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
            <div className={style.accountPhoto}>
                <Image src={photo} alt="avatar"/>
            </div>
            <div className={style.accountInfo}>
                <ul>
                    {
                        info.map(item => (
                            <li key={item.name}>
                                <span>{item.name}: </span>
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