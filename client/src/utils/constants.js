export const HOST = import.meta.env.VITE_SERVER_URL

export const AUTH_ROUTES = "api/auth"
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`
export const GET_USER_INFO =  `${AUTH_ROUTES}/userinfo`
export const UPDATE_PROFILE =  `${AUTH_ROUTES}/update-profile`
export const UPDATE_PROFILE_IMAGE = `${AUTH_ROUTES}/add-profile-image`
export const REMOVE_PROFILE_IMAGE = `${AUTH_ROUTES}/remove-profile-image`

export const CONTACTS_ROUTES = `api/contacts`
export const ADD_CONTACT = `${CONTACTS_ROUTES}/add-contact`
export const GET_CONTACTS = `${CONTACTS_ROUTES}/get-contacts`
export const SEARCH_CONTACTS_ROUTES = `${CONTACTS_ROUTES}/search`
