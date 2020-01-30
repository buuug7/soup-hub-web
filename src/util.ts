import { User } from "./app.interface";

export const BASE_URL = "http://localhost:3000";

export const isLogin = () => {
  return sessionStorage.getItem("user");
};

export const getSessionUser = (): User | null => {
  const sessionUser = sessionStorage.getItem("user");
  return sessionUser ? JSON.parse(sessionUser) : null;
};
