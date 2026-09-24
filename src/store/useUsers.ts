import { create } from "zustand";
import { IUser } from "@/types/users.type";


interface UsersState {
    users: IUser[]
    setUsers: (data: IUser[]) => void,
}

const useUsers = create<UsersState>((set) => ({
    users: [
        {
            id: "1",
            _id: "1",
            fullname: "Какой-то чел",
            email: "email@tata.hf",
            role: "user"
        },
        {
            id: "2",
            _id: "2",
            fullname: "Анатолий Хуй",
            email: "email@tata.hf",
            role: "user"
        },
        {
            id: "3",
            _id: "3",
            fullname: "Квантовая Физика",
            email: "email@tata.hf",
            role: "user"
        },
    ],
    setUsers: (data) => set({ users: data })
}))

export default useUsers;