import Icon from "../icon/Icon";
import { MAIN_COLOR } from "@/constants/ui";

interface Props {
    onClose: () => void
}

export default function CloseButton({onClose}: Props) {
    return (
        <button onClick={onClose}>
            <Icon name="close" stroke={MAIN_COLOR}/>
        </button>
    )
}