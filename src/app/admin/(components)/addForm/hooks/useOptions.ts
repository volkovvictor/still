import { IOption } from "@/types/general.type"
import locales from "@/locales/locales"
import { useMemo } from "react"
import useUsers from "@/store/useUsers"

const locale = locales()

export default function useOptions () {
    const users = useUsers(state => state.users)

    const categories: IOption[] = useMemo(() => (
        [
            {
                name: locale.main,
                value: "preview",
            },
            {
                name: locale.portfolio,
                value: "portfolio"
            },
        ]
    ), [])

    const portfolioTypes: IOption[] = useMemo(() => (
        [
            {
                name: locale.new,
                value: "new"
            },
            {
                name: locale.choose,
                value: "old"
            }
        ]
    ), [])

    const usersOptions: IOption[] = useMemo(() => {
            const allUsers = users.map(user => ({
                name: user.fullname,
                value: user._id
            }))

            return [
                {
                    name: locale.notSelected,
                    value: ""
                },
                ...allUsers
            ]
        }, [users])

    return { categories, portfolioTypes, usersOptions }
}