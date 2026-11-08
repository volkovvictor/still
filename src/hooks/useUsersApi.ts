'use client'

import { USERS_URL } from "@/constants/api";
import useUsers from "@/store/useUsers";
import { IUser } from "@/types/users.type";
import apiFetch from "@/utils/apiFetch";


export function useGetAllUsers() {
    const setUsers = useUsers(state => state.setUsers)

    return () => {
        apiFetch({ path: USERS_URL })
        .then((users: IUser[]) => setUsers(users))
    }
}