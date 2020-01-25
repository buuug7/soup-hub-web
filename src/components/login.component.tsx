import React, { useState } from "react";
import { Api } from "../config";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
  };

  return (
    <div className="login">
      <h4>鸡汤Hub｜用户登陆</h4>
      <form className="login-form">
        <div className="form-group">
          <input
            className="form-control"
            type="text"
            placeholder={"邮箱"}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            className="form-control"
            type="password"
            placeholder={"密码"}
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
  );
};

export default LoginComponent;
