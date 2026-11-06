import style from './burgerMenu.module.css'

interface Props {
    onMenuOpen: () => void
}

export default function BurgerMenu({onMenuOpen}: Props) {
    return (
        <div className={style.burger} onClick={onMenuOpen}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}