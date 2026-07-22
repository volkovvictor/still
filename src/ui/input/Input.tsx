'use client'

import { useState } from 'react'
import style from './input.module.css'

interface Props {
    name: string,
    label?: string,
    value?: string,
    type?: "text" | "password" | "number",
    placeholder?: string
}

export default function Input({ name, label, value="", type="text", placeholder="" }: Props) {

    const [ inputValue, setInputValue ] = useState<string>(value)

    return (
        <label className={style.input}>
            {label && <div className={style.label}>{label}</div>}
            <input 
                type={type} 
                name={name} 
                value={inputValue} 
                placeholder={placeholder}
                onChange={(e) => setInputValue(e.target.value)}/>
        </label>
    )
}