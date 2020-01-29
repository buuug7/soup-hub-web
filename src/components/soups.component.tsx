import React, { useContext, useEffect, useState } from "react";
import { PaginationParam, PaginationResponse, Soup, SoupSearchParam } from "../app.interface";
import CommentsComponent from "./soup.component";
import qs from "qs";
import { Api } from "../util";
import { request } from "../http";
import { AppContext } from "../App";

const SoupsComponent: React.FC<{
  paginationParam: PaginationParam;
  soupSearchParam?: SoupSearchParam;
}> = ({ paginationParam, soupSearchParam }) => {
  const [soups, setSoups] = useState<Soup[]>([]);
  const context = useContext(AppContext);

  const fetchSoups = async () => {
    const url = `${Api}/soups`;
    const query = qs.stringify({
      paginationParam: paginationParam.currentPage,
      perPage: paginationParam.perPage,
      ...soupSearchParam
    });
    const [error, res]: [Error, PaginationResponse] = await request(`${url}?${query}`);
    console.log("error=", error);
    setSoups(res.data);
  };

  useEffect(() => {
    context.updateLoading(true);
    fetchSoups().then(r => {
      context.updateLoading(false);
    });
  }, []);

  return (
    <div className="soup-list">
      {soups.map((item: Soup, index) => (
        <CommentsComponent key={index} soup={item} />
      ))}
    </div>
  );
};

export default SoupsComponent;
