export const BASE_URL = "http://localhost:3001/";
export const API_BASE_URL = "http://localhost:3001/api/";

//LOGIN
export const AUTH_LOGIN_URL = `${BASE_URL}auth/login`;

//ADMIN URL - USERS
export const API_GET_ALL_USERS = `${API_BASE_URL}admin/users`;
export const API_GET_USER_BY_ID = (id) => `${API_BASE_URL}reservations/user/${id}`;
export const API_GET_RESERVATIONS_BY_USER = (id) => `${API_BASE_URL}reservations/user/${id}`;
export const API_UPDATE_USER = (id) => `${API_BASE_URL}admin/update/user/${id}`;
export const API_CREATE_USER = `${API_BASE_URL}admin/create/user`;
export const API_DELETE_USER = (id) => `${API_BASE_URL}admin/delete/user/${id}`;

//SPACES
export const API_GET_SPACES_TABLES = `${API_BASE_URL}spaces/tables/date-range`;
export const API_GET_SPACE_BY_ID = (id) => `${API_BASE_URL}spaces/${id}`;
export const API_GET_TABLES_BY_DATE = `${API_BASE_URL}spaces/tables/date-range`;

// RESERVATIONS

export const API_GET_RESERVATIONS_BY_ID= (id) => `${API_BASE_URL}spaces/${id}/date-range`;
export const API_GET_RESERVATIONS_BY_DATE=`${API_BASE_URL}admin/spaces/tables/reservations/date-range`;

export const API_DELETE_RESERVATION= (id) => `${API_BASE_URL}reservations/delete/${id}`;

export const API_CREATE_RESERVATION_TABLES_BY_USER= `${API_BASE_URL}user/reservations/create/tables`;
export const API_CREATE_RESERVATION_LONG_TERM_BY_ADMIN= `${API_BASE_URL}admin/reservations/create/longterm`;


