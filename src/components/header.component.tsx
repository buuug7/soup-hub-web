import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const HeaderComponent: React.FC = () => {
  const context = useContext(AppContext);

  console.log("context=", context);

  return (
    <header className="app-header">
      <a href="/" className="app-header-title">
        鸡汤Hub
      </a>
      <div>
        <Link to={context.user ? "/profile" : "/login"} className="app-header-login-btn">
          {context.user?.name || "登陆"}
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
