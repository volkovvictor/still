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

export interface IOrder {
    id: string
    position: number
}

export type ThemeType = "light" | "dark"