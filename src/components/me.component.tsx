import React from "react";
import { Link, Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import ProfileComponent from "./profile.component";

const MeComponent: React.FC = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  return (
    <div className="me container">
      <Switch>
        <Route exact path={path}>
          <h2>Me</h2>
          <div className="card" style={{width: '40rem'}}>
            <div className="body">
              <ul>
                <li>
                  <Link to={`${url}/profile`}>Profile</Link>
                </li>
                <li>
                  <Link to={`${url}/logout`}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </Route>
        <Route exact path={`${path}/profile`} children={<ProfileComponent />} />
        <Route exact path={`${path}/logout`}>
          <h2>Logout</h2>
          <div className="card" style={{ width: "40rem" }}>
            <div className="body">
              <button
                className="btn btn-outline"
                onClick={() => {
                  sessionStorage.clear();
                  history.replace("/");
                  window.location.reload();
                }}
              >
                登出
              </button>
            </div>
          </div>
        </Route>
      </Switch>
    </div>
  );
};

export default MeComponent;
