import React, { createContext, useState } from "react";
import "./App.scss";

import SoupsComponent from "./components/soups.component";
import HeaderComponent from "./components/header.component";
import LoginComponent from "./components/login.component";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { AppContextInterface, User } from "./app.interface";
import ProfileComponent from "./components/profile.component";

const defaultContentValue = {
  user: null,
  theme: "default",
  updateUser: () => {},
  updateTheme: () => {}
};

export const AppContext = createContext<AppContextInterface>(defaultContentValue);

const App: React.FC = () => {
  const sessionUser = sessionStorage.getItem("user");
  const defaultUser = sessionUser ? JSON.parse(sessionUser) : null;

  const [theme, setTheme] = useState<string>("default");
  const [user, setUser] = useState<User | null>(defaultUser);

  const contextValue = {
    theme,
    user,
    updateUser: (user: User) => setUser(user),
    updateTheme: (theme: string) => setTheme(theme)
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className="App">
        <BrowserRouter>
          <HeaderComponent />
          <div className="container" style={{ paddingTop: "1rem", display: "flex" }}>
            <main style={{ flex: 2 }}>
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
                <Route path={"/profile"}>
                  <ProfileComponent />
                </Route>
              </Switch>
            </main>
            <aside style={{ flex: 1, padding: "0 0 0 1rem" }}>
              <div className="card">
                <div className="header">nimi autem commodi</div>
                <div className="body">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem commodi
                  consequuntur dolore ea. Ab deleniti distinctio facere fuga neque quis reiciendis
                  sapiente tenetur velit? Mollitia non omnis sapiente sunt!
                </div>
              </div>
            </aside>
          </div>
        </BrowserRouter>
      </div>
    </AppContext.Provider>
  );
};

export default App;
