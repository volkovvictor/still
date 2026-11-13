import { IUser } from "@/types/users.type"
import { useState, useEffect } from "react"
import { useGetUserById } from "./useUsersApi"

export default function useGetUser(id: string) {
    const [user, setUser] = useState<IUser | null>(null)
    const getUserById = useGetUserById()

    useEffect(() => {
            getUserById(id).then(user => setUser(user))
        }, [id])
    
    return user
}