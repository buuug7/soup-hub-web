import React from "react";
import { Soup } from "../app.interface";
import dayjs from "dayjs";

const SoupComponent: React.FC<{ soup: Soup }> = ({ soup }, marginRight = ".5rem") => {
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
        <button className="btn btn-text">star (435)</button>
        <button className="btn btn-text">comment (999+)</button>
      </div>
    </div>
  );
};

export default SoupComponent;
