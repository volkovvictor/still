'use client'

import { useCallback, useEffect, useState } from 'react'
import Icon from '../icon/Icon'
import style from './checkbox.module.css'
import { MAIN_COLOR, TEXT_SM } from '@/constants/ui'

interface Props {
    text?: string,
    isChecked?: boolean,
    onChange?: (val: boolean) => void,
    size?: number,
    textSize?: number | string,
    textWeight?: number | string,
}

export default function Checkbox(
    {
        text, 
        isChecked=false,
        onChange,
        size=30, 
        textSize=TEXT_SM, 
        textWeight=400,
    }: Props) {

    const [checked, setChecked] = useState<boolean>(isChecked)

    const isControlled = onChange !== undefined
    const value = isControlled ? isChecked : checked

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const currentCheck = e.target.checked

        if (isControlled) {
            onChange(currentCheck)
        } else {
            setChecked(currentCheck)
        }
    }

    return (
        <label className={style.checkbox}>
            <input type='checkbox' 
                checked={value} 
                onChange={handleChange}/>
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