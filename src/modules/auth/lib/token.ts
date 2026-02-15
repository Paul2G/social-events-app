import Cookies from 'js-cookie';

const USER_TOKEN_COOKIE_KEY = 'vite.user-token';

export function getUserToken() {
  return Cookies.get(USER_TOKEN_COOKIE_KEY);
}

export function setUserToken(token: string) {
  return Cookies.set(USER_TOKEN_COOKIE_KEY, token, { expires: 7 * 2 });
}

export function removeUserToken() {
  return Cookies.remove(USER_TOKEN_COOKIE_KEY);
}
