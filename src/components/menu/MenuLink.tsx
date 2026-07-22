import type { LinkI } from './Menu'
import style from './menu.module.css'
import Link from 'next/link'
import Icon from '@/ui/icon/Icon'
import { MAIN_COLOR } from '@/constants/ui'

interface Props {
    link: LinkI
}

export default function MenuLink({ link }: Props) {
    
    return (
        <li style={link.iconName ? { padding: "0 50px" } : { padding: "0 50px 0 125px"}}>
            <Link className={style.link} href={link.url}>
            {
                link.iconName && (
                    <div className={style.icon}>
                        <Icon name={link.iconName} stroke={MAIN_COLOR}/>
                    </div>
                )
            }
            <span>{link.name}</span>
            </Link>
        </li>
    )
}