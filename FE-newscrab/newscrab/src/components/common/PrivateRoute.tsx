import { getCookie } from "@store/user/cookies";

export const useAuth = () => {
  const token = getCookie("accessToken");
  const isLogedIn = Boolean(token); 
  return { isLogedIn };
};