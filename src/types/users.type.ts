export type RoleType = "admin" | "user"

export interface IUser {
    id: string,
    _id: string,
    fullname: string,
    email: string,
    role: RoleType
}