import { create } from "zustand";

interface TokenState {
    token: string | null
    setToken: (token: string | null) => void

}

const useToken = create<TokenState>((set) => ({
    token: null,
    setToken: (token) => set({ token })
}))

export default useToken;