import React from "react";
import SoupsComponent from "./soups.component";

const MyCreatedSoupsComponent: React.FC = () => {
  return (
    <div className="my-create-soups" style={{maxWidth: '50rem'}}>
      <h2>My created soups</h2>

      <SoupsComponent
        paginationParam={{ currentPage: 1 }}
        soupSearchParam={{ content: "", username: "buuug7" }}
      />
    </div>
  );
};

export default MyCreatedSoupsComponent;
