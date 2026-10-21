import { useState } from 'react'
import style from './info.module.css'

interface Props {
    text: string,
    styles?: React.CSSProperties
}

export default function Info ({ text, styles }: Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false)

    return (
        <div style={{...styles}} className={style.info} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <div className={style.infoButton}>?</div>
            {
                isOpen && <div className={style.infoBody}>{text}</div>
            }
        </div>
    )
}