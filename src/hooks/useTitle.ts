import { usePathname } from "next/navigation";
import locales from "@/locales/locales";

export default function useTitle() {
    const pathname = usePathname()
    const locale = locales()
    const pageTitle = pathname.replace("/", "")

    return locale?.[pageTitle]
}