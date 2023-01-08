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

//ERROR CODES
export const REPEATED_ERROR = { status: 400, code: 'REPEATED_ERROR' };

//FILTERS NAME
export const ACCOUNT_TYPE_ID_FILTER = 'accountTypeId';
export const ALIAS_FILTER = "alias";
export const ACCOUNT_NUMBER_FILTER = "accountNumber";

//UTILS
export function objectsToUrlParamsString(objects) {
    return objects.map((object) => `${object.name}=${object.value}`).join('&');
}