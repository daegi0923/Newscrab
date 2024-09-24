import Cookies, { CookieSetOptions } from "universal-cookie";

const cookies = new Cookies();

export const setCookie = (name: string, value: string, options?: CookieSetOptions) => {
  cookies.set(name, value, { path: "/", ...options });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  cookies.remove(name);
};
