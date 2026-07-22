import style from './empty.module.css'

interface Props {
    text: string
}

export default function Empty({text}: Props) {
    return <div className={style.empty}>{text}</div>
}