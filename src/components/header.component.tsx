import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";
import { ReactComponent as LogoIcon } from "../logo.svg";
import { ReactComponent as IconGrid } from "bootstrap-icons/icons/list-ol.svg";
import { ReactComponent as IconPeople } from "bootstrap-icons/icons/people.svg";
import { ReactComponent as IconPerson } from "bootstrap-icons/icons/sun.svg";

import { ReactComponent as IconSearch } from "bootstrap-icons/icons/search.svg";

import "./header.component.scss";

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
          <div className="app-menu">
            <Link to="/rank" className="app-header-link">
              <IconGrid style={{ fontSize: "1.5rem", marginRight: ".2rem" }} />
              <span>排行</span>
            </Link>
            <Link to={"/some"} className="app-header-link">
              <IconPeople style={{ fontSize: "1.5rem", marginRight: ".2rem" }} />
              其他
            </Link>
          </div>
          <div style={{ flex: 1 }}></div>
          <div className="app-header-search">
            <form>
              <div className="input-group">
                <div className="input-group-append">
                  <IconSearch />
                </div>
                <input type="text" className="form-control search-input" />
              </div>
            </form>
          </div>
          <div className="app-menu">
            <Link to={"/"} className="app-header-link">
              <IconPerson style={{ fontSize: "1.5rem", marginRight: ".2rem" }} />
            </Link>
            <Link to={context.user ? "/me" : "/login"} className="app-header-link">
              {context.user?.name || "登陆"}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
