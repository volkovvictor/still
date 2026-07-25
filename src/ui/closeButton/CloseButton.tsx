'use client'

import Icon from "../icon/Icon";
import useColors from "@/hooks/useColors";

interface Props {
    onClose: () => void
}

export default function CloseButton({onClose}: Props) {

    const { MAIN_COLOR } = useColors()

    return (
        <button onClick={onClose}>
            <Icon name="close" stroke={MAIN_COLOR}/>
        </button>
    )
}