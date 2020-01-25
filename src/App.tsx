import React from "react";
import "./App.scss";

import SoupsComponent from "./components/soups.component";
import HeaderComponent from "./components/header.component";
import LoginComponent from "./components/login.component";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const App: React.FC = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <HeaderComponent />
        <main style={{ padding: "1rem" }}>
          <Switch>
            <Route exact path={"/"}>
              <SoupsComponent
                paginationParam={{ currentPage: 1 }}
                soupSearchParam={{ content: "" }}
              />
            </Route>
            <Route path={"/login"}>
              <LoginComponent />
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
};

export default App;
