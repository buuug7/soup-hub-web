import React, { useContext, useEffect, useState } from "react";
import { request } from "../http";
import { BASE_URL } from "../util";
import { Comment } from "../app.interface";
import { AppContext } from "../App";

import "./comments.component.scss";

export const CommentComponent: React.FC<{ comment: Comment; repliedDone: Function }> = ({
  comment,
  repliedDone
}) => {
  const [reply, setReply] = useState(false);

  return (
    <div>
      <div className="comment" key={comment.id}>
        <div className="comment-avatar">{comment.user.name.substr(0, 1)}</div>
        <div className="comment-content" style={{ flex: 1 }}>
          <div className="comment-time">
            By <a href="#">{comment.user.name}</a> At <span>{comment.createdAt}</span>
          </div>
          <div className="comment-text">
            {comment.parent && (
              <blockquote>
                <a href="#">@Tom</a> <br />
                {comment.content}
              </blockquote>
            )}
            <div>{comment.content}</div>
          </div>
          <div className="comment-action">
            <button className="btn sm">
              Star <span>(99+)</span>
            </button>
            <button
              className={`btn sm ${reply ? "" : "btn-outline"}`}
              onClick={() => setReply(!reply)}
            >
              Reply
            </button>
            <button className="btn sm btn-outline">Share</button>
          </div>
        </div>
      </div>
      {reply && (
        <CommentCreateComponent
          isReply={true}
          commentId={comment.id}
          successFn={() => {
            setReply(false);
            repliedDone();
          }}
        />
      )}
    </div>
  );
};

const CommentCreateComponent: React.FC<{
  soupId?: number;
  commentId?: number;
  successFn: Function;
  isReply: boolean;
}> = ({ soupId, commentId, successFn, isReply }) => {
  const context = useContext(AppContext);
  const [newCommentContent, setNewCommentContent] = useState<string>("");

  return (
    <div className="create-comment">
      <div className="comment-avatar">B</div>
      <form>
        <textarea
          value={newCommentContent}
          onChange={e => setNewCommentContent(e.target.value)}
          className="form-control"
        />
        <button
          className="btn sm btn-outline mt-1"
          onClick={async e => {
            e.preventDefault();
            context.updateLoading(true);

            let url;

            isReply
              ? (url = `${BASE_URL}/comments/${commentId}/reply`)
              : (url = `${BASE_URL}/soups/${soupId}/comment`);

            await request(url, {
              method: "POST",
              body: JSON.stringify({
                content: newCommentContent
              })
            });

            setNewCommentContent("");
            context.updateLoading(false);
            successFn();
          }}
        >
          确定
        </button>
      </form>
    </div>
  );
};

const CommentsComponent: React.FC<{ soupId: number }> = ({ soupId }) => {
  const context = useContext(AppContext);
  const [comments, setComments] = useState<Comment[]>([]);

  const getComments = () => {
    request(`${BASE_URL}/soups/${soupId}/comments`).then(res => {
      setComments(res[1].data);
      context.updateLoading(false);
    });
  };

  useEffect(() => {
    context.updateLoading(true);
    getComments();
  }, [soupId]);

  return (
    <div className="comments">
      <CommentCreateComponent isReply={false} soupId={soupId} successFn={() => getComments()} />
      {comments.map(item => (
        <CommentComponent key={item.id} comment={item} repliedDone={() => getComments()} />
      ))}
    </div>
  );
};

export default CommentsComponent;
