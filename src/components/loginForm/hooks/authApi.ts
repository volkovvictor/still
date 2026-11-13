'use client'

import { AUTH_URL, LOGIN_URL, LOGOUT_URL, REFRESH_URL, REGISTER_URL } from "@/constants/api"
import useToken from "@/store/useToken"
import useUsers from "@/store/useUsers"
import apiFetch from "@/utils/apiFetch"
import { usePathname, useRouter } from "next/navigation"

interface IData {
    email: string
    password: string
}

interface IDataRegister extends IData {
    fullname: string
}

export function useLogin () {

    const onAuth = useAuth()
    const setToken = useToken(state => state.setToken)
    const router = useRouter()

    return async (data: IData) => {
        const token = await apiFetch({
            path: LOGIN_URL,
            method: "POST",
            body: JSON.stringify(data),
            credentials: 'include'
        })

        if (token.accessToken) {
            setToken(token.accessToken)
            router.push('/')
            onAuth()
        }
    }
}

export function useRegister () {
    return async (data: IDataRegister) => {
        const res = await apiFetch({
            path: REGISTER_URL,
            method: "POST",
            body: JSON.stringify(data)
        })

        if (res.success) return true
    }
}

export function useLogout () {

    const pathname = usePathname()
    const router = useRouter()

    const setToken = useToken(state => state.setToken)
    const setCurrentUser = useUsers(state => state.setCurrentUser)

    return async () => {
        const res = await apiFetch({
            path: LOGOUT_URL,
            method: "POST",
            credentials: 'include'
        })

        if (res.success) {
            if (pathname === '/account' || pathname === '/admin') {
                router.push('/')
            }

            setToken(null)
            setCurrentUser(null)
        }
    }
}

export function useRefresh () {
    const setToken = useToken(state => state.setToken)
    const setCurrentUser = useUsers(state => state.setCurrentUser)

    return async () => {
        const res = await apiFetch({
            path: REFRESH_URL,
            method: "POST",
            credentials: "include"
        })

        setToken(res.accessToken || null)
        setCurrentUser(res.user || null)
    }
}

export function useAuth () {
    const token = useToken(state => state.token)
    const setCurrentUser = useUsers(state => state.setCurrentUser)
    const setCurrentUserLoading = useUsers(state => state.setCurrentUserLoading)
    
    const onRefresh = useRefresh()

    return async () => {

        const res = await apiFetch({
            path: AUTH_URL,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })

        if (res.error) {
            await onRefresh()
        } else {
            setCurrentUser(res.user || null)
        }
    }
    
}