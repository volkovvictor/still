import Photos from "@/components/photos/Photos";
import Title from "@/ui/title/Title";
import type { IPhoto } from "@/types/photos.type";

interface Props {
    params: Promise<{ photoshootID: string }>
}

export default async function Photoschoot({params}: Props) {
    return (
        <div>
            <Title title="Фотосъёмка от 01.01.2026" subtitle="Имя Фамилия"/>
            <Photos/>
        </div>
    )
}