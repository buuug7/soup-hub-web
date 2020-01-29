import React, { useEffect, useState } from "react";
import { request } from "../http";
import { Api } from "../util";

const Comments: React.FC<{ soupId: number }> = ({ soupId }) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    request(`${Api}/soups/${soupId}/comments`).then(res => {
      console.log("comments=", res);
      setComments(res[1].data);
    });
  }, [soupId]);

  return (
    <div className="comments">
      {comments.map(item => (
        <div className="comment" key={item.id}>
          <div className="comment-avatar">{item.user.name.substr(0, 1)}</div>
          <div className="comment-content" style={{ flex: 1 }}>
            <div className="comment-time">
              By <a href="#">{item.user.name}</a> At <span>{item.createdAt}</span>
            </div>
            <div className="comment-text">{item.content}</div>
            <div className="comment-action">
              <button className="btn">Star <span>(99+)</span></button>
              <button className="btn btn-outline" style={{ marginLeft: ".5rem" }}>
                Reply
              </button>
              <button className="btn btn-outline" style={{ marginLeft: ".5rem" }}>
                Share
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Comments;
