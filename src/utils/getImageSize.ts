export default function getImageSize(file: File): Promise<{width: number, height: number}> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        console.log('img', img)

        img.onload = () => {
            resolve({ width: img.naturalWidth, height: img.naturalHeight })
        }

        img.onerror = reject
        img.src = URL.createObjectURL(file)
    })
}