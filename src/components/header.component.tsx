import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const HeaderComponent: React.FC = () => {
  const context = useContext(AppContext);

  console.log("context=", context);

  return (
    <header className="app-header">
      <div className="container">
        <a href="/" className="app-header-title">
          鸡汤文
        </a>
        <div className="app-header-right">
          <div />
          <ul>
            <li>
              <Link to={context.user ? "/profile" : "/login"} className="app-header-link">
                {context.user?.name || "登陆"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
