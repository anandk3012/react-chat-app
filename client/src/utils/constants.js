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


export const MESSAGES_ROUTES = `api/messages`
export const SEND_MESSAGE = `${MESSAGES_ROUTES}/send`
export const GET_MESSAGES = `${MESSAGES_ROUTES}/get-messages`
export const READ_MESSAGE = `${MESSAGES_ROUTES}/read`
export const DELETE_MESSAGE = `${MESSAGES_ROUTES}/delete`
export const UPLOAD_IMAGE = `api/images/upload`
export const GET_IMAGE = `api/images/`
export const GET_IMAGE_BY_ID = (imageId) => `api/images/${imageId}`
export const SEND_MESSAGE_SOCKET_EVENT = "send-message"
export const RECEIVE_MESSAGE_SOCKET_EVENT = "receive-message"
export const TYPING_SOCKET_EVENT = "typing"
export const STOP_TYPING_SOCKET_EVENT = "stop-typing"
export const ONLINE_USERS_SOCKET_EVENT = "online-users"
export const USER_CONNECTED_SOCKET_EVENT = "user-connected"
export const USER_DISCONNECTED_SOCKET_EVENT = "user-disconnected"
export const LOGOUT_SOCKET_EVENT = "logout"
export const NEW_CONTACT_SOCKET_EVENT = "new-contact"
export const MESSAGE_DELIVERED_SOCKET_EVENT = "message-delivered"
export const MESSAGE_SEEN_SOCKET_EVENT = "message-seen"
export const DELIVERY_STATUS_DELIVERED = "delivered"
export const DELIVERY_STATUS_SEEN = "seen"
export const MESSAGE_TYPE_TEXT = "text"
export const MESSAGE_TYPE_IMAGE = "image"
export const TYPING_TIMER_LENGTH = 3000 // in ms
export const MAX_IMAGE_SIZE = 5 * 1024 * 1024 // 5 MB
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
export const MAX_MESSAGE_LENGTH = 2000 // characters
export const DEBOUNCE_DELAY = 300 // in ms
export const CONTACTS_PER_PAGE = 20
export const MESSAGES_PER_PAGE = 30
export const SCROLL_THRESHOLD = 150 // in px
export const RECONNECT_INTERVAL = 5000 // in ms
export const MAX_RECONNECT_ATTEMPTS = 10
export const SOCKET_CONNECTION_OPTIONS = {
    reconnectionAttempts: MAX_RECONNECT_ATTEMPTS,
    reconnectionDelay: RECONNECT_INTERVAL,
    transports: ['websocket'],
}
export const TAILWIND_COLORS = [
    'bg-red-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-yellow-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-gray-500',

    'bg-teal-500',
    'bg-cyan-500',
    'bg-amber-500',
    'bg-lime-500',
    'bg-emerald-500',
    'bg-violet-500',
    'bg-fuchsia-500',
    'bg-rose-500',
]
export const DEFAULT_PROFILE_PIC = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'
export const STATUS_ACTIVE = 'active'
export const STATUS_INACTIVE = 'inactive'
export const STATUS_BUSY = 'busy'

export const STATUS_OPTIONS = [
    STATUS_ACTIVE,
    STATUS_INACTIVE,
    STATUS_BUSY
]
export const STATUS_COLORS = {
    [STATUS_ACTIVE]: 'bg-green-500',
    [STATUS_INACTIVE]: 'bg-gray-500',
    [STATUS_BUSY]: 'bg-red-500'
}
export const MESSAGE_STATUS_SENT = 'sent'
export const MESSAGE_STATUS_DELIVERED = 'delivered'
export const MESSAGE_STATUS_SEEN = 'seen'
export const MESSAGE_STATUS_FAILED = 'failed'
export const MESSAGE_STATUS_OPTIONS = [
    MESSAGE_STATUS_SENT,
    MESSAGE_STATUS_DELIVERED,
    MESSAGE_STATUS_SEEN,
    MESSAGE_STATUS_FAILED
]
export const DELIVERY_STATUS_OPTIONS = [
    DELIVERY_STATUS_DELIVERED,
    DELIVERY_STATUS_SEEN
]
export const REACTION_TYPES = [
    'like',
    'love',
    'laugh',
    'sad',
    'angry',
    'surprised'
]
export const REACTION_EMOJIS = {
    'like': '👍',
    'love': '❤️',
    'laugh': '😂',
    'sad': '😢',
    'angry': '😠',
    'surprised': '😲'
}

export const DEFAULT_COLOR_INDEX = 0
export const MAX_COLOR_INDEX = TAILWIND_COLORS.length - 1
export const COLOR_INDEX_STORAGE_KEY = 'user-color-index'
export const THEME_STORAGE_KEY = 'user-theme'
export const THEME_LIGHT = 'light'
export const THEME_DARK = 'dark'
export const THEME_SYSTEM = 'system'
export const THEME_OPTIONS = [
    THEME_LIGHT,
    THEME_DARK,
    THEME_SYSTEM
]
