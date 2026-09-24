export interface ITabs {
    name: string,
    value: string
    isActive: boolean
}

export interface IOption {
    name: string,
    value: string | number
    required?: boolean
}

export type ThemeType = "light" | "dark"