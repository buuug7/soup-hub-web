import React from "react";
import SoupsComponent from "./soups.component";

const HomeComponent: React.FC = () => {
  return (
    <div className="home">
      <div className="container content" style={{ paddingTop: "1rem", display: "flex" }}>
        <main style={{ flex: 2, marginBottom: "1rem" }}>
          <SoupsComponent paginationParam={{ currentPage: 1 }} soupSearchParam={{ content: "" }} />
        </main>
        <aside style={{ flex: 1, padding: "0 0 0 1rem" }}>
          <div className="card">
            <div className="card-header">nimi autem commodi</div>
            <div className="card-body">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi autem commodi
              consequuntur dolore ea. Ab deleniti distinctio facere fuga neque quis reiciendis
              sapiente tenetur velit? Mollitia non omnis sapiente sunt!
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default HomeComponent;
