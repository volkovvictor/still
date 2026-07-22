import Link from 'next/link'
import style from './logo.module.css'

export default function Logo () {
    return (
        <Link href="/" className={style.logo}>Still</Link>
    )
}