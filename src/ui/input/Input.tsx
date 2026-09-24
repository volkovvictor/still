'use client'

import { useState } from 'react'
import style from './input.module.css'

interface Props {
    name: string,
    label?: string,
    value?: string,
    type?: "text" | "password" | "number" | "date",
    placeholder?: string,
    onChange?: (value: any) => void
}

export default function Input({ name, label, value="", type="text", placeholder="", onChange }: Props) {

    const [ inputValue, setInputValue ] = useState<string>(value)

    return (
        <label className={style.input}>
            {label && <div className={style.label}>{label}</div>}
            <input 
                type={type} 
                name={name} 
                value={value || inputValue} 
                placeholder={placeholder}
                onChange={(e) => {
                    if (onChange) {
                        onChange(e.target.value)
                    } else {
                        setInputValue(e.target.value)
                    }
                }}/>
        </label>
    )
}