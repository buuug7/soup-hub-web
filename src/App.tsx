import React, { createContext, useContext, useState } from "react";
import "./App.scss";

import HeaderComponent from "./components/header.component";
import LoginComponent from "./components/login.component";
import MyComponent from "./components/my.component";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { AppContextInterface, User } from "./app.interface";
import HomeComponent from "./components/home.component";
import SoupCreateComponent from "./components/soup.create.component";
import { getSessionUser } from "./util";
import ContributionGuideComponent from "./components/contribution.guide.component";

import { ReactComponent as IconPlus } from "bootstrap-icons/icons/plus.svg";
import RankComponent from "./components/rank.component";

const defaultContentValue = {
  user: null,
  theme: "default",
  message: "",
  loading: false,
  updateUser: () => {},
  updateTheme: () => {},
  updateMessage: () => {},
  updateLoading: () => {}
};

export const AppContext = createContext<AppContextInterface>(defaultContentValue);

export const MessageComponent: React.FC = () => {
  const context = useContext(AppContext);
  return (
    <div className="message">
      {context.message && (
        <div
          className="alert"
          style={{ margin: ".5rem" }}
          onClick={() => {
            context.updateMessage("");
          }}
        >
          {context.message}
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const defaultUser = getSessionUser();
  const [message, setMessage] = useState<string>("");
  const [theme, setTheme] = useState<string>("default");
  const [user, setUser] = useState<User | null>(defaultUser);
  const [loading, setLoading] = useState<boolean>(false);

  const contextValue = {
    theme,
    user,
    message,
    loading,
    updateUser: (user: User) => setUser(user),
    updateTheme: (theme: string) => setTheme(theme),
    updateMessage: (message: string) => setMessage(message),
    updateLoading: (loading: boolean) => setLoading(loading)
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="app">
        {loading && (
          <div className="fullscreen_loader">
            <h4> Please wait. Loading data... </h4>
            <div className="loader" />
          </div>
        )}

        <BrowserRouter>
          <Link to={"/create-soup"} className="btn add-soup-btn">
            <IconPlus style={{ fontSize: "2rem" }} />
          </Link>
          <HeaderComponent />
          <MessageComponent />
          <Switch>
            <Route exact path="/" children={<HomeComponent />} />
            <Route exact path="/create-soup" children={<SoupCreateComponent />} />
            <Route exact path="/login" children={<LoginComponent />} />
            <Route path="/me" children={<MyComponent />} />
            <Route path="/rank" exact children={<RankComponent />} />
            <Route path="/contribution-guide" exact children={<ContributionGuideComponent />} />
          </Switch>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
};

export default App;
