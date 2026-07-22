'use client'

import { useState } from 'react'
import Icon from '../icon/Icon'
import style from './checkbox.module.css'
import { MAIN_COLOR, TEXT_SM } from '@/constants/ui'

interface Props {
    text?: string,
    isChecked?: boolean,
    size?: number,
    textSize?: number | string,
    textWeight?: number | string,
    setAllChecked?: (val: boolean) => void
}

export default function Checkbox({text, isChecked=false, size=30, textSize=TEXT_SM, textWeight=400, setAllChecked}: Props) {

    const [checked, setChecked] = useState<boolean>(isChecked)

    return (
        <label className={style.checkbox}>
            <input type='checkbox' checked={checked} onChange={(e) => {
                setChecked(e.target.checked)
                if (setAllChecked) {
                    setAllChecked(e.target.checked)
                }
            }}/>
            <div className={style.visibleCheckbox} style={{width: size, height: size}}>
                <div className={style.checked}>
                    <Icon name="check" stroke={MAIN_COLOR} size={size}/>
                </div>
            </div>
            {
                text && <p style={{ fontSize: textSize, fontWeight: textWeight }}>{text}</p>
            }
        </label>
    )
}