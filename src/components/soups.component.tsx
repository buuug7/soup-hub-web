import React, { useContext, useEffect, useState } from "react";
import { Pagination, Soup } from "../app.interface";
import CommentsComponent from "./soup.component";
import qs from "qs";
import { request } from "../http";
import { AppContext } from "../App";

const SoupsComponent: React.FC<{ api: string }> = ({ api }) => {
  const [moreText, setMoreText] = useState("加载更多");
  const [pagination, setPagination] = useState<Pagination>({
    total: 0,
    totalPage: 0,
    perPage: 5,
    currentPage: 1,
    data: []
  });

  const context = useContext(AppContext);

  const fetchSoups = async (pagination: Pagination) => {
    context.updateLoading(true);
    const query = qs.stringify({
      currentPage: pagination.currentPage,
      perPage: pagination.perPage
    });
    const [error, res]: [Error, Pagination] = await request(`${api}?${query}`);
    console.log("error=", error);
    setPagination({
      ...res,
      data: pagination.data.concat(res.data)
    });
    context.updateLoading(false);
  };

  useEffect(() => {
    fetchSoups(pagination);
  }, []);

  return (
    <div className="soup-list">
      {pagination.data.map((item: Soup, index) => (
        <CommentsComponent key={index} soup={item} />
      ))}

      <button
        className="btn btn-text block"
        onClick={() => {
          if (pagination.currentPage < pagination.totalPage) {
            fetchSoups({
              ...pagination,
              currentPage: pagination.currentPage + 1
            });
          } else {
            setMoreText("没有更多了！");
          }
        }}
      >
        {moreText}
      </button>
    </div>
  );
};

export default SoupsComponent;
