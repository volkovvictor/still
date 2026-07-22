import Title from "@/ui/title/Title";
import locales from "@/locales/locales";
import style from './(styles)/contacts.module.css'
import Links from "./(components)/Links";

const locale = locales()

export default function Contacts() {
    return (
        <div className={style.contacts}>
            <Title title={locale.contacts}/>
            <p className={style.text}>Одна фотография - это одна тысяча рублей. Когда, за что и сколько платить решаете только вы!</p>
            <Links/>
        </div>
    )
}