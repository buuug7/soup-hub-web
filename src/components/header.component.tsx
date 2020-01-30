import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

const HeaderComponent: React.FC = () => {
  const context = useContext(AppContext);

  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="app-header-title">
          鸡汤
        </Link>
        <div className="app-header-right">
          <div />
          <ul>
            <li>
              <Link to={context.user ? "/me" : "/login"} className="app-header-link">
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
