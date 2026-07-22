import style from '../(styles)/contacts.module.css'
import Icon from "@/ui/icon/Icon"
import type { LinksI } from "./Links"
import Link from "next/link"

interface Props {
    link: LinksI
}

export default function SocialLink({ link }: Props) {
    return (
        <li>
            <Link className={style.link} href={link.href}>
                <Icon name={link.iconName}/>
                <span>{link.name}</span>
            </Link>
        </li>
    )
}