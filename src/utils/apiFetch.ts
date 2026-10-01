import { RequestInit } from "next/dist/server/web/spec-extension/request"

interface Params extends RequestInit {
    path: string,
    isFormData?: boolean
}

export default async function apiFetch ({path, method='GET', body, headers, isFormData=false}: Params) {
    try {
        console.log('body', body)
        const res = await fetch(path, { method, body, headers: isFormData ? headers : { 'Content-Type': 'application/json', ...headers }, })
        const data = await res.json()

        return data
    } catch (err) {
        console.log('err', err)
    }
}