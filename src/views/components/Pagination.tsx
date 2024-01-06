import { type FC } from "react";

interface PaginationProps {
  total: number;
  limit: number;
  currentPage: number;
  onGoToPage: (page: number) => void;
}

const Pagination: FC<PaginationProps> = ({ total, limit, currentPage, onGoToPage }) => {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    pages.push(i);
  }

  return (
    <div className="items-center gap-1 justify-center">
      <div
        className="bg-secondary/80 px-4 py-2 rounded-md"
        onClick={() => {
          if (currentPage === 1) {
            return;
          }
          onGoToPage(currentPage - 1);
        }}
      >
        <i className="fa-solid fa-play fa-rotate-180"></i>
      </div>

      <div className="gap-1">
        {pages.map((page) => {
          let activeStyle = "";
          if (currentPage === page) {
            activeStyle = "bg-primary/50 text-white";
          }

          return (
            <button
              key={page.toString()}
              className={`bg-secondary/50 w-8 h-8 flex justify-center items-center rounded-2xl ${activeStyle}`}
              onClick={() => {
                onGoToPage(page);
              }}
            >
              {page}
            </button>
          );
        })}
      </div>

      <div
        className="bg-secondary/80 px-4 py-2 justify-center items-center rounded-md"
        onClick={() => {
          if (currentPage === total) {
            return;
          }
          onGoToPage(currentPage + 1);
        }}
      >
        <i className="fa-solid fa-play"></i>
      </div>
    </div>
  );
};

export default Pagination;
