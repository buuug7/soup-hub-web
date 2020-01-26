import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "../App";
import { Api } from "../config";

const ProfileComponent: React.FC = () => {
  const context = useContext(AppContext);
  const history = useHistory();
  const [name, setName] = useState(context.user?.name);
  const [error, setError] = useState<string>("");

  const updateProfile = async () => {
    const token = sessionStorage.getItem("token");

    const res = await fetch(`${Api}/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name
      })
    });

    const rs = await res.json();

    setError("update success");
    console.log("rs=", rs);
  };

  return (
    <div className="profile">
      <h2>Profile settings</h2>

      <div className="card" style={{ width: "40rem" }}>
        <div className="body">
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control disabled"
                value={context.user?.email}
                type="text"
                disabled
              />
            </div>
            <div className="form-group">
              <label>Name</label>
              <input
                className="form-control"
                value={name}
                type="text"
                onChange={e => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>CreatedAt</label>
              <input
                className="form-control disabled"
                value={context.user?.createdAt}
                type="text"
                disabled
              />
            </div>

            <div className="form-group">
              <span style={{ color: "red" }}>{error}</span>
            </div>

            <button
              className="btn btn-outline"
              onClick={e => {
                e.preventDefault();
                updateProfile();
              }}
            >
              更新
            </button>
          </form>
        </div>
      </div>

      <h2>Other</h2>
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
    </div>
  );
};

export default ProfileComponent;
