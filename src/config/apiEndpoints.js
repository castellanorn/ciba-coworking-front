export const API_BASE_URL = "http://localhost:3001/api/";

//ADMIN URL - USERS
export const API_GET_ALL_USERS = () => `${API_BASE_URL}admin/users`;

export const API_GET_USER_BY_ID = (id) => `${API_BASE_URL}reservations/user/${id}`;

export const API_GET_RESERVATIONS_BY_USER = (id) => `${API_BASE_URL}reservations/user/${id}`;

//ADMIN URL - RESERVATIONS
export const API_GET_RESERVATIONS_BY_DATE=`${API_BASE_URL}admin/spaces/tables/reservations/date-range`;
