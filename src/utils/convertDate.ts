export default function convertDate(date: string) {
    return date && new Date(date).toLocaleDateString()
}