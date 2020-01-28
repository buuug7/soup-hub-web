export const Api = "http://localhost:3000";

export const isLogin = () => {
  return sessionStorage.getItem("user");
};
