export const API_BASE_URL = "http://localhost:3001/";

export const API_GET_RESERVATION = API_BASE_URL + "reservation";

export const API_POST_USER = API_BASE_URL + "users/register"

export const API_POST_LOG_USER = API_BASE_URL + "users/login"

export const API_POST_RESERVATION = API_BASE_URL + "reservation";

export const API_GET_USER_ID = API_BASE_URL + "users/user"

export const API_PUT_RESERVATION = (id) => API_BASE_URL + "reservation/" + id;