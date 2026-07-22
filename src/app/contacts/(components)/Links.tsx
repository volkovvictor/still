import Title from '@/ui/title/Title'
import style from '../(styles)/contacts.module.css'
import locales from '@/locales/locales'
import { IconNames } from '@/ui/icon/Icon'
import SocialLink from './SocialLink'
import { TEXT_BASE } from '@/constants/ui'

const locale = locales()

export interface LinksI {
    iconName: IconNames,
    name: string,
    href: '/'
}

const data: LinksI[] = [
    {
        iconName: "telegram",
        name: locale.telegram,
        href: '/'
    },
    {
        iconName: "email",
        name: locale.email,
        href: '/'
    },
    {
        iconName: "vk",
        name: locale.vk,
        href: '/'
    },
]

export default function Links() {
    return (
        <div className={style.contactsLinks}>
            <Title tag="h2" title={locale.booking} size={TEXT_BASE}/>
            <ul>
                {
                    data.map(link => <SocialLink key={link.name} link={link}/>)
                }
            </ul>
        </div>
    )
}