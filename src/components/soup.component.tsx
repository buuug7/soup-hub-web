import React, { useContext, useEffect, useState } from "react";
import { Soup } from "../app.interface";
import { Api, isLogin } from "../util";
import { request } from "../http";
import { AppContext } from "../App";
import CommentsComponents from "./comments.component";

const SoupComponent: React.FC<{ soup: Soup }> = ({ soup }) => {
  const [starCount, setStarCount] = useState(0);
  const [isStar, setIsStar] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentsCount, setCommentsCount] = useState(0);
  const context = useContext(AppContext);

  useEffect(() => {
    request(`${Api}/soups/${soup.id}/starCount`).then(res => {
      setStarCount(res[1]);
    });
  }, [soup.id]);

  useEffect(() => {
    if (!isLogin()) {
      return;
    }

    request(`${Api}/soups/${soup.id}/isStarByRequestUser`).then(res => {
      setIsStar(res[1]);
    });
  }, [starCount, soup.id]);

  useEffect(() => {
    request(`${Api}/soups/${soup.id}/comments/count`).then(res => {
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
      <div className="soup-text">{soup.content}</div>
      <div className="soup-more">
        参考: {soup.more.reference || '未知'}
      </div>
      <div className="soup-action">
        <button
          className={`btn ${isStar ? "" : "btn-outline"}`}
          onClick={async () => {
            if (!isLogin()) {
              context.updateMessage("please login");
              return;
            }

            const res = await request(`${Api}/soups/${soup.id}/toggleStar`, {
              method: "POST"
            });

            setStarCount(res[1]);
          }}
        >
          star ({starCount})
        </button>
        <button
          className={`${showComment ? "btn" : "btn btn-outline"}`}
          style={{ marginLeft: ".5rem" }}
          onClick={() => {
            setShowComment(!showComment);
          }}
        >
          comment ({commentsCount})
        </button>
        <button className="btn btn-outline" style={{ marginLeft: ".5rem" }}>
          Share
        </button>
      </div>

      {showComment && <CommentsComponents soupId={soup.id} />}
    </div>
  );
};

export default SoupComponent;
