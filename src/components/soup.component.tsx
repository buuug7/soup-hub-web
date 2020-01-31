import React, { useContext, useEffect, useState } from "react";
import { Soup } from "../app.interface";
import { BASE_URL, isLogin, showdownConvert } from "../util";
import { request } from "../http";
import { AppContext } from "../App";
import CommentsComponents from "./comments.component";
import { ReactComponent as StarIcon } from "bootstrap-icons/icons/star.svg";

import "./soup.component.scss";

const SoupComponent: React.FC<{ soup: Soup }> = ({ soup }) => {
  const [starCount, setStarCount] = useState(0);
  const [isStar, setIsStar] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const context = useContext(AppContext);

  useEffect(() => {
    request(`${BASE_URL}/soups/${soup.id}/starCount`).then(res => {
      setStarCount(res[1]);
    });
  }, [soup.id]);

  useEffect(() => {
    if (!isLogin()) {
      return;
    }

    request(`${BASE_URL}/soups/${soup.id}/isStarByRequestUser`).then(res => {
      setIsStar(res[1]);
    });
  }, [starCount, soup.id]);

  useEffect(() => {
    request(`${BASE_URL}/soups/${soup.id}/comments/count`).then(res => {
      setCommentsCount(res[1]);
    });
  }, [soup.id]);

  return (
    <div
      className="soup"
      style={{
        marginBottom: "1rem"
      }}
    >
      <div className="soup-meta">
        <div className="soup-time">
          By <a href="#">{soup.user.name}</a> At {soup.createdAt}
        </div>
      </div>
      <div
        className="soup-text"
        dangerouslySetInnerHTML={{
          __html: showdownConvert.makeHtml(soup.content)
        }}
      />
      <div className="soup-action">
        <button
          className={`btn sm ${isStar ? "" : "btn-outline"}`}
          onClick={async () => {
            if (!isLogin()) {
              context.updateMessage("please login");
              return;
            }

            const res = await request(`${BASE_URL}/soups/${soup.id}/toggleStar`, {
              method: "POST"
            });

            setStarCount(res[1]);
          }}
        >
          <StarIcon /> ({starCount})
        </button>
        <button
          className={`${showComment ? "btn sm" : "btn sm btn-outline"}`}
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          comment ({commentsCount})
        </button>
        <button className="btn sm btn-outline">Share</button>
      </div>

      {showComment && <CommentsComponents soupId={soup.id} />}
    </div>
  );
};

export default SoupComponent;
