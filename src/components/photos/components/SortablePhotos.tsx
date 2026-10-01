import { IPhoto } from "@/types/photos.type";
import Photo from "./Photo";
import { useSortable } from "@dnd-kit/react/sortable";
import { IPhotoshoot } from "@/types/photoshoots.type";

interface Props {
    photo: IPhoto | IPhotoshoot,
    onDelete: (id: string) => void,
    onLike: (id: string) => void,
    index: number,
    isEdit?: boolean
}

export default function SortablePhoto({photo, onLike, onDelete, index, isEdit=true}: Props) {

    const { ref } = useSortable({
        id: photo._id,
        index
    })

    return <Photo 
            ref={ref}
            photo={photo}
            onDelete={() => onDelete(photo._id)}
            onLike={() => onLike(photo._id)}
            isEdit={isEdit} />
}