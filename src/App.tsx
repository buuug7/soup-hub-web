import React, { createContext, useContext, useState } from "react";
import "./App.scss";

import HeaderComponent from "./components/header.component";
import LoginComponent from "./components/login.component";
import MeComponent from "./components/me.component";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppContextInterface, User } from "./app.interface";
import HomeComponent from "./components/home.component";

const defaultContentValue = {
  user: null,
  theme: "default",
  message: "",
  updateUser: () => {},
  updateTheme: () => {},
  updateMessage: () => {}
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
  const sessionUser = sessionStorage.getItem("user");
  const defaultUser = sessionUser ? JSON.parse(sessionUser) : null;
  const [message, setMessage] = useState<string>("");
  const [theme, setTheme] = useState<string>("default");
  const [user, setUser] = useState<User | null>(defaultUser);

  const contextValue = {
    theme,
    user,
    message,
    updateUser: (user: User) => setUser(user),
    updateTheme: (theme: string) => setTheme(theme),
    updateMessage: (message: string) => setMessage(message)
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <BrowserRouter>
          <HeaderComponent />
          <MessageComponent />
          <Switch>
            <Route exact path={"/"} children={<HomeComponent />} />
            <Route exact path={"/login"} children={<LoginComponent />} />
            <Route path={"/me"} children={<MeComponent />} />
          </Switch>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
};

export default App;
