import style from './title.module.css'
import React from 'react'

type tag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

interface Props {
    title: string,
    tag?: tag
    subtitle?: string,
    size?: string
}

interface ElementProps {
    tag: tag,
    style: React.CSSProperties,
    className: string,
    children: string | React.ReactElement,
}

const Element = ({ tag, className, style, children }: ElementProps) => {
    return React.createElement(tag, {style, className}, children)
}

export default function Title({tag = "h1", title, subtitle, size}: Props) {

    // console.log("element", <Element></Element>)

    return (
        <div className={style.container}>
            <Element tag={tag} className={style.title} style={size ? {fontSize: size} : {}}>{title}</Element>
            { subtitle && <h2 className={style.subtitle}>{subtitle}</h2>}
        </div>
    )
}