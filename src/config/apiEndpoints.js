export const API_BASE_URL = "http://localhost:3001/api/";

//ADMIN URL - USERS
export const API_GET_ALL_USERS = () => `${API_BASE_URL}admin/users`;

export const API_GET_USER_BY_ID = (id) => `${API_BASE_URL}reservations/user/${id}`;

export const API_GET_RESERVATIONS_BY_USER = (id) => `${API_BASE_URL}reservations/user/${id}`;

export const API_GET_SPACES_TABLES = () =>`${API_BASE_URL}spaces/tables/date-range`;
/* export const API_GET_USER_BY_ID = API_BASE_URL + ""; */
/* 
export const API_GET_USER_BY_ID = API_BASE_URL + "";


export const API_GET_RESERVATION = API_BASE_URL + "reservation";

export const API_POST_USER = API_BASE_URL + "users/register"

export const API_POST_LOG_USER = API_BASE_URL + "users/login"

export const API_POST_RESERVATION = API_BASE_URL + "reservation";

export const API_GET_USER_ID = API_BASE_URL + "users/user"

export const API_PUT_RESERVATION = (id) => API_BASE_URL + "reservation/" + id; */