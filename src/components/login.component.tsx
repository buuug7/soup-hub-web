import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Api } from "../config";
import { AppContext } from "../App";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("youpp@126.com");
  const [password, setPassword] = useState<string>("111111");
  const [error, setError] = useState<string>("");
  const history = useHistory();
  const context = useContext(AppContext);

  const login = async () => {
    const response = await fetch(`${Api}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    });

    const res = await response.json();

    if (res.error) {
      setError(res.error);
      return;
    }

    const token = res.access_token;

    sessionStorage.setItem("token", token);

    const responseProfile = await fetch(`${Api}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const rsProfile = await responseProfile.json();

    sessionStorage.setItem("user", JSON.stringify(rsProfile));

    console.log("rsProfile=", rsProfile);

    context.updateUser(rsProfile);

    history.push("/");
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

            <div className="form-group">
              <span style={{ color: "red" }}>{error}</span>
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
