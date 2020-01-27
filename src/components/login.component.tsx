import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Api } from "../config";
import { AppContext } from "../App";
import { request } from "../http";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("youpp@126.com");
  const [password, setPassword] = useState<string>("111111");
  const history = useHistory();
  const context = useContext(AppContext);

  const login = async () => {
    const [error, resLogin] = await request(`${Api}/auth/login`, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    if (error) {
      context.updateMessage(error.message);
      return;
    }

    sessionStorage.setItem("token", resLogin.token);

    const [error2, user] = await request(`${Api}/users/profile`);

    if (error2) {
      context.updateMessage(error2.message);
      return;
    }

    sessionStorage.setItem("user", JSON.stringify(user));

    context.updateUser(user);

    history.replace("/");
  };

  return (
    <div className="login">
      <h2>用户登陆</h2>

      <div className="card" style={{ width: "40rem" }}>
        <div className="body">
          <form>
            <div className="form-group">
              <label>邮箱</label>
              <input
                className="form-control"
                type="text"
                placeholder={"邮箱"}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>密码</label>
              <input
                className="form-control"
                type="password"
                placeholder={"密码"}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-outline"
              type="submit"
              onClick={e => {
                e.preventDefault();
                login();
              }}
            >
              登陆
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
