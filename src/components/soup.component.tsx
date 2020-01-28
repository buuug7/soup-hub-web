import React, { useContext, useEffect, useState } from "react";
import { Soup } from "../app.interface";
import dayjs from "dayjs";
import { Api, isLogin } from "../util";
import { request } from "../http";
import { AppContext } from "../App";

const SoupComponent: React.FC<{ soup: Soup }> = ({ soup }, marginRight = ".5rem") => {
  const [starCount, setStarCount] = useState(0);
  const [isStar, setIsStar] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    request(`${Api}/soups/${soup.id}/starCount`).then(res => {
      setStarCount(res);
    });
  }, [soup]);

  useEffect(() => {
    if (!isLogin()) {
      return;
    }

    request(`${Api}/soups/${soup.id}/isStarByRequestUser`).then(res => {
      console.log("res=", res);
      setIsStar(res[1]);
    });
  }, [starCount]);

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
          className={`btn ${isStar ? "btn-outline" : "btn-text"}`}
          onClick={async () => {
            if (!isLogin()) {
              context.updateMessage("please login");
              return;
            }

            const [error, res] = await request(`${Api}/soups/${soup.id}/toggleStar`, {
              method: "POST"
            });

            setStarCount(res);
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
