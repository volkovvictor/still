import { useMemo } from "react"
import { IPhotoPreview } from "@/types/general.type"

interface Props {
    files: File[]
    photoshootPreview: File | null
}

export default function usePreviews({ files, photoshootPreview }: Props) {
    const photosPreviews: IPhotoPreview[] = useMemo(() => files.map(file => (
            {
                id: `${file.lastModified}_${file.name}`,
                url: URL.createObjectURL(file)
            }
        )), [files])
    
    const portfolioPreview: string | null = useMemo(() => {
        return photoshootPreview ? URL.createObjectURL(photoshootPreview) : null
    }, [photoshootPreview])

    return { photosPreviews, portfolioPreview }
}