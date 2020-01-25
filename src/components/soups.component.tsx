import React, { useEffect, useState } from "react";
import { PaginationParam, PaginationResponse, Soup, SoupSearchParam } from "../app.interface";
import SoupComponent from "./soup.component";
import qs from "qs";
import { Api } from "../config";

const SoupsComponent: React.FC<{
  paginationParam: PaginationParam;
  soupSearchParam?: SoupSearchParam;
}> = ({ paginationParam, soupSearchParam }) => {
  const [soups, setSoups] = useState<Soup[]>([]);

  useEffect(() => {
    const fetchSoups = async () => {
      const url = `${Api}/soups`;
      const query = qs.stringify({
        paginationParam: paginationParam.currentPage,
        perPage: paginationParam.perPage,
        ...soupSearchParam
      });
      const res = await fetch(`${url}?${query}`);
      const jsonData: PaginationResponse = await res.json();
      setSoups(jsonData.data);
    };
    fetchSoups().then(r => {});
  }, [paginationParam, soupSearchParam]);

  return (
    <div className="soup-list">
      {soups.map((item: Soup, index) => (
        <SoupComponent key={index} soup={item} />
      ))}
    </div>
  );
};

export default SoupsComponent;
