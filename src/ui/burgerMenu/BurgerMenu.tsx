import style from './burgerMenu.module.css'

interface Props {
    onMenuToggle: () => void
}

export default function BurgerMenu({onMenuToggle}: Props) {
    return (
        <div className={style.burger} onClick={onMenuToggle}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}