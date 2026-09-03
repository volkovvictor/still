import Title from "@/ui/title/Title";
import style from './(styles)/cartPage.module.css'
import Icon from "@/ui/icon/Icon";
import locales from "@/locales/locales";

import Button from "@/ui/button/Button";
import Slider from "@/ui/slider/Slider";

const locale = locales()


export default async function Cart() {
    return (
        <div className={style.cart}>
            <Title title={locale.cart}/>
            <Slider style={{ margin: "50px 0" }}/>
            <div className={style.cartFooter}>
                <p className={style.price}><span>4000</span> рублей</p>
                <Button>{locale.order}</Button>
            </div>
        </div>
    )
}