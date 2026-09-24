import { IOption } from "@/types/general.type"
import locales from "@/locales/locales"

const locale = locales()

export default function getOptions () {
    const categories: IOption[] = [
        {
            name: locale.main,
            value: "preview",
        },
        {
            name: locale.portfolio,
            value: "portfolio"
        },
        {
            name: locale.account,
            value: "account",
        },
    ]
    
    const portfolioTypes: IOption[] = [
        {
            name: locale.new,
            value: "new"
        },
        {
            name: locale.choose,
            value: "old"
        }
    ]

    return { categories, portfolioTypes }
}