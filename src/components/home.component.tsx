import React from "react";
import SoupsComponent from "./soups.component";
import {BASE_URL} from "../util";
import {Link} from "react-router-dom";

const HomeComponent: React.FC = () => {
  return (
    <div className="home">
      <div className="container content" style={{paddingTop: "1rem", display: "flex"}}>
        <main style={{flex: 2, marginBottom: "1rem"}}>
          <SoupsComponent api={`${BASE_URL}/soups`}/>
        </main>
        <aside style={{flex: 1, padding: "0 0 0 1rem"}}>
          <div className="card">
            <div className="card-header">Tips</div>
            <div className="card-body">
              鸡汤文 网站的发展离不开各位汤友的贡献,我们非常欢迎各位汤友为网站贡献各类汤文,鸡汤文的贡献规则请查看
              <Link to={'/contribution-guide'}>贡献规则</Link>,我们希望将有些转瞬即逝的灵感永恒的流传,并且通过反复阅读来提升自我.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomeComponent;
