import { useTheme } from "next-themes";

export default function useColors() {
    const { theme } = useTheme()

    if (theme === "dark") {
        return {
            MAIN_COLOR: "#4D4D4D",
            ACCENT_COLOR: "#ffffff",
            ACCENT_HOVER: "#cdcdcd",
            OPACITY_BG_COLOR: "rgba(255, 255, 255, 0.7)"
        }
    }

    return {
        MAIN_COLOR: "#ffffff",
        ACCENT_COLOR: "#4D4D4D",
        ACCENT_HOVER: "#323232",
        OPACITY_BG_COLOR: "rgba(77, 77, 77, 0.7)"
    }
}