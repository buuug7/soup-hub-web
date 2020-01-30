import React, { useContext, useState } from "react";
import { request } from "../http";
import { Api } from "../util";
import { AppContext } from "../App";

const SoupCreateComponent: React.FC = () => {
  const [content, setContent] = useState("");
  const [reference, updateReference] = useState("http://");
  const context = useContext(AppContext);

  const validate = (): boolean => {
    if (!content) {
      context.updateMessage("content required");
      return false;
    }

    return true;
  };

  return (
    <div className="create-soup container">
      <h2>Soup create</h2>
      <div className="card">
        <div className="body">
          <form>
            <div className="form-group">
              <label>Soup content</label>
              <textarea
                name=""
                id=""
                cols={30}
                rows={10}
                className="form-control"
                style={{ height: "10rem" }}
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>reference</label>
              <input
                className="form-control"
                type="text"
                value={reference}
                onChange={e => updateReference(e.target.value)}
              />
            </div>

            <div className="form-group">
              <button
                className="btn"
                onClick={e => {
                  e.preventDefault();

                  if (!validate()) {
                    return;
                  }

                  context.updateLoading(true);
                  request(`${Api}/soups`, {
                    method: "POST",
                    body: JSON.stringify({
                      content: content,
                      more: {
                        reference: reference,
                      }
                    })
                  }).then(res => {
                    console.log("res=", res);
                    context.updateMessage("create successfully");
                    context.updateLoading(false);
                    setContent("");
                  });
                }}
              >
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SoupCreateComponent;
