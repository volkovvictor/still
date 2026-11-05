import { LinkI } from "../Menu";
import { useMemo } from "react";
import locales from "@/locales/locales";
import { IUser } from "@/types/users.type";

const locale = locales()

export default function useMenuLinks(user: IUser | null) {
 const pagesLinks = useMemo(() => {
        const links: LinkI[] = [
            {
                url: '/portfolio',
                name: locale.portfolio,
            },
            {
                url: '/contacts',
                name: locale.contacts,
            },
        ]

        if (user) {
            links.unshift(
                {
                    url: user.role === 'admin' ? '/admin' : '/account',
                    name: user.role === 'admin' ? locale.admin : locale.account,
                }
            )
        }

        return links
    }, [user])

    const loginLink = {
        url: '/login',
        name: locale.login,
    }

    return { pagesLinks, loginLink }
}