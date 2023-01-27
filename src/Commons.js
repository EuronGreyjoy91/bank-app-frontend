//URLS
const BASE_URL_PATH = 'http://localhost:4000/api/v1';
export const BASE_ACCOUNTS_URL = `${BASE_URL_PATH}/accounts`;
export const BASE_ACCOUNT_TYPES_URL = `${BASE_URL_PATH}/accountTypes`;
export const BASE_CLIENTS_URL = `${BASE_URL_PATH}/clients`;
export const BASE_CLIENT_TYPES_URL = `${BASE_URL_PATH}/clientTypes`;
export const BASE_USER_TYPES_URL = `${BASE_URL_PATH}/userTypes`;
export const BASE_USERS_URL = `${BASE_URL_PATH}/users`;

//VALUES
export const ADMIN_USER_TYPE_DESCRIPTION = 'Admin';
export const CLIENT_USER_TYPE_DESCRIPTION = 'Cliente';
export const CAJA_AHORRO_ACCOUNT_TYPE_CODE = "CAJA_AHORRO";
export const CUENTA_CORRIENTE_ACCOUNT_TYPE_CODE = "CUENTA_CORRIENTE";
export const PERSONA_FISICA_CLIENT_TYPE_CODE = "PERSONA_FISICA";
export const PERSONA_JURIDICA_CLIENT_TYPE_CODE = "PERSONA_JURIDICA";

//ERROR CODES
export const VALIDATION_ERROR = { status: 400, code: 'VALIDATION_ERROR' }
export const REPEATED_DOCUMENT_ERROR = { status: 400, code: 'REPEATED_DOCUMENT_ERROR' };
export const REPEATED_ALIAS_ERROR = { status: 400, code: 'REPEATED_ALIAS_ERROR' };
export const REPEATED_ACCOUNT_TYPE_ERROR = { status: 400, code: 'REPEATED_ACCOUNT_TYPE_ERROR' };
export const REPEATED_USERNAME_ERROR = { status: 400, code: 'REPEATED_USERNAME_ERROR' };
export const NOT_FOUND_ERROR = { status: 404, code: 'NOT_FOUND_ERROR' }

//FILTERS NAME
export const ACCOUNT_TYPE_ID_FILTER = "accountTypeId";
export const ALIAS_FILTER = "alias";
export const ACCOUNT_NUMBER_FILTER = "accountNumber";
export const CLIENT_TYPE_ID_FILTER = "clientTypeId";
export const CUIT_CUIL_FILTER = "cuitCuil";
export const DOCUMENT_FILTER = "document";
export const USER_TYPE_ID_FILTER = "userTypeId";
export const USERNAME_FILTER = "userName";

//UTILS
export function objectsToUrlParamsString(objects) {
    return objects.map((object) => `${object.name}=${object.value}`).join('&');
}

export function userIsLogged() {
    return localStorage.getItem('isLogged') != null && localStorage.getItem('isLogged') === 'true';
}

export function userIsAdmin() {
    return userIsLogged() && JSON.parse(localStorage.getItem('user')).userType === 'ADMIN';
}

export function userIsClient() {
    return userIsLogged() && JSON.parse(localStorage.getItem('user')).userType === 'CLIENT';
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.setItem('isLogged', false);
}