import React from "react";
import SoupsComponent from "./soups.component";
import { BASE_URL } from "../util";

import "./home.component.scss";

const HomeComponent: React.FC = () => {
  return (
    <div className="home container">
      <SoupsComponent api={`${BASE_URL}/soups`} />
    </div>
  );
};

export default HomeComponent;
