import { create } from "zustand";
import { IUser } from "@/types/users.type";


interface UsersState {
    users: IUser[]
    currentUser: IUser | null
    isCurrentUserLoading: boolean
    isUsersLoading: boolean
    setUsers: (users: IUser[]) => void
    setCurrentUser: (user: IUser | null) => void
    setCurrentUserLoading: (val: boolean) => void
    setUsersLoading: (val: boolean) => void
}

const useUsers = create<UsersState>((set) => ({
    users: [],
    currentUser: null,
    isCurrentUserLoading: false,
    isUsersLoading: false,
    setUsers: (users) => set({ users }),
    setCurrentUser: (user) => set({ currentUser: user }),
    setCurrentUserLoading: (val) => set({ isCurrentUserLoading: val }),
    setUsersLoading: (val) => set({ isUsersLoading: val })
}))

export default useUsers;