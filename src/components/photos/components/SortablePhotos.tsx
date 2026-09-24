import { IPhoto } from "@/types/photos.type";
import Photo from "./Photo";
import { useSortable } from "@dnd-kit/react/sortable";

interface Props {
    photo: IPhoto,
    onDelete: (id: string) => void,
    onLike: (id: string) => void,
    index: number,
    isEdit?: boolean
}

export default function SortablePhoto({photo, onLike, onDelete, index, isEdit=true}: Props) {

    const { ref } = useSortable({
        id: photo.id,
        index
    })

    return <Photo 
            ref={ref}
            photo={photo}
            onDelete={() => onDelete(photo.id)}
            onLike={() => onLike(photo.id)}
            isEdit={isEdit} />
}