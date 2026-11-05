const BASE_URL = 'http://localhost:5000/api'

export const PHOTOS_URL = `${BASE_URL}/photos`
export const GET_BY_TYPE = `${PHOTOS_URL}/type`
export const PHOTOSHOOT_URL = `${BASE_URL}/photoshoots`

export const AUTH_URL = `${BASE_URL}/auth`
export const LOGIN_URL = `${AUTH_URL}/login`
export const REGISTER_URL = `${AUTH_URL}/register`
export const LOGOUT_URL = `${AUTH_URL}/logout`
export const REFRESH_URL = `${AUTH_URL}/refresh`