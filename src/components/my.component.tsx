import React from "react";
import { Link, Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import MyProfileComponent from "./my.profile.component";
import MyCreatedSoupsComponent from "./my.created.soups.component";

const MyComponent: React.FC = () => {
  const { path, url } = useRouteMatch();
  const history = useHistory();

  return (
    <div className="me container">
      <Switch>
        <Route exact path={path}>
          <h2>My related</h2>
          <div className="card" style={{ width: "40rem" }}>
            <div className="card-body">
              <ul>
                <li>
                  <Link to={`${url}/my-profile`}>My profile</Link>
                </li>
                <li>
                  <Link to={`${url}/my-create-soups`}>My created soups</Link>
                </li>
                <li>
                  <Link to={`${url}/my-star-soups`}>My star soups</Link>
                </li>
                <li>
                  <Link to={`${url}/my-star-comments`}>My star comments</Link>
                </li>
                <li>
                  <Link to={`${url}/logout`}>Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        </Route>
        <Route exact path={`${path}/my-profile`} children={<MyProfileComponent />} />
        <Route exact path={`${path}/my-create-soups`} children={<MyCreatedSoupsComponent />} />
        <Route exact path={`${path}/logout`}>
          <h2>Logout</h2>
          <div className="card" style={{ width: "40rem" }}>
            <div className="card-body">
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

export default MyComponent;
