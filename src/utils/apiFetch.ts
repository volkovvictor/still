import { RequestInit } from "next/dist/server/web/spec-extension/request"

interface Params extends RequestInit {
    path: string,
    isFormData?: boolean
}

export default async function apiFetch ({path, method='GET', body, headers, isFormData=false, ...params}: Params) {
    try {
        const res = await fetch(path, { method, body, headers: isFormData || !body ? headers : { 'Content-Type': 'application/json', ...headers }, ...params })

        const data = await res.json()

        return data
    } catch (err) {
        console.log('err', err)
    }
}