import * as vars from '../constants/ui'

export default function setUiVariables() {
    return Object.entries(vars || {}).reduce((prev, cur) => {
        const key = `--${cur[0].replace(/_/g, '-').toLowerCase()}`
        const value = cur[1]

        return {
            ...prev,
            [key]: value
        }
    }, {}) 
}