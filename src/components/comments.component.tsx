import React, { useEffect, useState } from "react";
import { request } from "../http";
import { Api } from "../util";
import { Comment } from "../app.interface";

export const CommentComponent: React.FC<{ comment: Comment }> = ({ comment }) => {
  return (
    <div className="comment" key={comment.id}>
      <div className="comment-avatar">{comment.user.name.substr(0, 1)}</div>
      <div className="comment-content" style={{ flex: 1 }}>
        <div className="comment-time">
          By <a href="#">{comment.user.name}</a> At <span>{comment.createdAt}</span>
        </div>
        <div className="comment-text">{comment.content}</div>
        <div className="comment-action">
          <button className="btn">
            Star <span>(99+)</span>
          </button>
          <button className="btn btn-outline" style={{ marginLeft: ".5rem" }}>
            Reply
          </button>
          <button className="btn btn-outline" style={{ marginLeft: ".5rem" }}>
            Share
          </button>
        </div>
      </div>
    </div>
  );
};

const CommentsComponent: React.FC<{ soupId: number }> = ({ soupId }) => {
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    request(`${Api}/soups/${soupId}/comments`).then(res => {
      setComments(res[1].data);
    });
  }, [soupId]);

  return (
    <div className="comments">
      {comments.map(item => (
        <CommentComponent key={item.id} comment={item} />
      ))}
    </div>
  );
};

export default CommentsComponent;
