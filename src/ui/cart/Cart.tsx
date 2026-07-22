import Link from 'next/link'
import style from './cart.module.css'
import Icon from '@/ui/icon/Icon'

export default function Cart () {
    return (
        <div className={style.cart}>
            <div className={style.cart_items}>5</div>
            <Link href={'./cart'}>
                <Icon name="cart"/>
            </Link>
        </div>
    )
}