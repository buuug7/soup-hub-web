import { User } from "./app.interface";
import Showdown from "showdown";

export const BASE_URL = "http://localhost:3000";

export const isLogin = () => {
  return sessionStorage.getItem("user");
};

export const getSessionUser = (): User | null => {
  const sessionUser = sessionStorage.getItem("user");
  return sessionUser ? JSON.parse(sessionUser) : null;
};

Showdown.setFlavor("github");

export const showdownConvert = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});
