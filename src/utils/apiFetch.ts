import { RequestInit } from "next/dist/server/web/spec-extension/request"

interface Params extends RequestInit {
    path: string
}

export default async function apiFetch ({path, method='GET', body, headers}: Params) {
    try {
        console.log('body', body)
        const res = await fetch(path, { method, body, headers })
        const data = await res.json()

        return data
    } catch (err) {
        console.log('err', err)
    }
}