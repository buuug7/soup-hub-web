import React, { useContext, useState } from "react";
import { request } from "../http";
import { BASE_URL, showdownConvert } from "../util";
import { AppContext } from "../App";

import ReactMde from "react-mde";
import "react-mde/lib/styles/css/react-mde-all.css";

const SoupCreateComponent: React.FC = () => {
  const [content, setContent] = useState("");
  const [selectedTab, setSelectedTab] = useState<"write" | "preview">("write");
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
        <div className="card-body">
          <form>
            <div className="form-group">
              <ReactMde
                value={content}
                onChange={setContent}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={markdown =>
                  Promise.resolve(showdownConvert.makeHtml(markdown))
                }
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
                  request(`${BASE_URL}/soups`, {
                    method: "POST",
                    body: JSON.stringify({
                      content: content,
                      more: {}
                    })
                  }).then(res => {
                    console.log("res=", res);
                    context.updateMessage("create successfully");
                    context.updateLoading(false);
                    setContent("");
                  });
                }}
              >
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SoupCreateComponent;
