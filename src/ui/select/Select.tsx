'use client'

import { useEffect, useState } from 'react'
import Icon from '../icon/Icon'
import style from './select.module.css'
import { IOption } from '@/types/general.type'

interface Props {
    options: IOption[],
    label?: string,
    styles?: React.CSSProperties
    setSelectedOption?: (option: any) => void
}

export default function Select ({options, label, styles = {}, setSelectedOption}: Props) {

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selected, setIsSelected] = useState<IOption>(options[0])
    
    const onSelect = (option: IOption) => {

        if (option.value !== selected.value) {
            setIsSelected(option)
            setIsOpen(false)

                if (setSelectedOption) {
                    setSelectedOption(option.value)
                }
        }
    }

    return (
        <div className={style.select} style={styles}>
            {
                label && <p className={style.label}>{label}</p>
            }
            <div className={style.container}>
                <div 
                    onClick={() => setIsOpen(!isOpen)}
                    className={isOpen ? `${style.header} ${style.open}` : style.header}>
                    <span>{selected.name}</span>
                    <Icon name="arrowDown"/>
                </div>
                <div className={isOpen ? `${style.options} ${style.open}` : style.options}>
                    {
                        options.map(option => (
                            <div 
                                onClick={() => onSelect(option)}
                                className={option.value === selected.value ? ` ${style.option} ${style.disabled}` : style.option} 
                                key={option.value}>{option.name}</div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}