import { PostAction } from "../../types/post";
import "./Pagination.css";
import React from "react";

interface PaginationProps {
  setPostPage: (page: number) => PostAction;
  pages: number[];
  page: number;
}

const Pagination: React.FC<PaginationProps> = ({
  setPostPage,
  pages,
  page,
}) => {
  return (
    <div className="buttons">
      <button
        disabled={page === 1 ? true : false}
        onClick={() => setPostPage(page === 1 ? 1 : page - 1)}
      >
        Назад
      </button>
      <div className="pages">
        {pages.map((p: number) => (
          <div
            key={p}
            onClick={() => setPostPage(p)}
            className="page"
            style={{
              color: p === page ? "#7EBC3C" : "",
            }}
          >
            {p}
          </div>
        ))}
      </div>
      <button
        disabled={page === 5 ? true : false}
        onClick={() => setPostPage(page === 5 ? 5 : page + 1)}
      >
        Далее
      </button>
    </div>
  );
};

export default Pagination;
