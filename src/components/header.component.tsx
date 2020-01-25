import React from "react";
import { Link } from "react-router-dom";

const HeaderComponent: React.FC = () => {
  const user = () => {
    const strUser = sessionStorage.getItem("user");
    return strUser ? JSON.parse(strUser) : null;
  };

  return (
    <header className="app-header">
      <a href="/" className="app-header-title">
        鸡汤Hub
      </a>
      <Link className="app-header-login-btn" to={"/login"}>
        登陆 {user().name}
      </Link>
    </header>
  );
};

export default HeaderComponent;
