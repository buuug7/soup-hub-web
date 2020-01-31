import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { ReactComponent as LogoIcon } from "../logo.svg";

const HeaderComponent: React.FC = () => {
  const context = useContext(AppContext);

  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="app-header-title">
          <LogoIcon style={{ fontSize: "1.5rem" }} />
          <span style={{ display: "inline-block", marginLeft: ".4rem", fontSize: "1.2rem" }}>
            你的鸡汤
          </span>
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
