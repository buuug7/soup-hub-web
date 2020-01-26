import React, { useEffect, useState } from "react";
import { Soup } from "../app.interface";
import dayjs from "dayjs";
import { Api } from "../config";

const SoupComponent: React.FC<{ soup: Soup }> = ({ soup }, marginRight = ".5rem") => {
  const [starCount, setStarCount] = useState(0);

  const star = async (id: number) => {
    const token = sessionStorage.getItem("token");
    const res = await fetch(`${Api}/soups/${id}/star`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    });

    const rs = await res.json();

    setStarCount(rs);

    console.log(rs);
  };

  useEffect(() => {
    const getStarCount = async () => {
      const res = await fetch(`${Api}/soups/${soup.id}/starCount`);
      const rs = await res.json();
      console.log("cout=", rs);

      setStarCount(rs);
    };

    getStarCount();
  }, [soup]);

  return (
    <div
      className="soup"
      style={{
        marginBottom: "1rem"
      }}
    >
      <div className="soup-text">{soup.content}</div>
      <div className="soup-meta">
        <div className="soup-time">
          {soup.user.name} / {dayjs(soup.createdAt).format("YYYY-MM-DD HH:mm")}
        </div>
      </div>
      <div className="soup-action">
        <button
          className="btn btn-text"
          onClick={() => {
            star(soup.id);
          }}
        >
          star ({starCount})
        </button>
        <button className="btn btn-text">comment (999+)</button>
      </div>
    </div>
  );
};

export default SoupComponent;
