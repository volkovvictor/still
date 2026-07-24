import { IPhoto } from "@/types/photos.type";
import Photo from "./Photo";
import { useSortable } from "@dnd-kit/react/sortable";

interface Props {
    photo: IPhoto,
    onLike: (id: string) => void,
    index: number,
    isEdit?: boolean
}

export default function SortablePhoto({photo, onLike, index, isEdit=true}: Props) {

    const { ref } = useSortable({
        id: photo.id,
        index
    })

    return <Photo 
            ref={ref}
            photo={photo}
            onLike={() => onLike(photo.id)}
            isEdit={isEdit} />
}