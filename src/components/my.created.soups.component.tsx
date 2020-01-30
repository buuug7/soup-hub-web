import React from "react";
import SoupsComponent from "./soups.component";
import { BASE_URL, getSessionUser } from "../util";

const MyCreatedSoupsComponent: React.FC = () => {
  const user = getSessionUser();

  return (
    <div className="my-create-soups" style={{ maxWidth: "50rem" }}>
      <h2>My created soups</h2>

      <SoupsComponent api={`${BASE_URL}/users/${user?.id}/createdSoups`} />
    </div>
  );
};

export default MyCreatedSoupsComponent;
