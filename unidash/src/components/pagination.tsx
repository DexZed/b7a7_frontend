type PaginationControlsProps = {
  firstPage: () => void;
  previousPage: () => void;
  nextPage: () => void;
  lastPage: () => void;
  pageItems: (number | "...")[];
  page: number;
  totalPages: number;
  goToPage: (page: number) => void;
};
export function PaginationControls({
  firstPage,
  previousPage,
  nextPage,
  lastPage,
  pageItems,
  page,
  totalPages,
  goToPage,
}: PaginationControlsProps) {
  return (
    <>
      <div className="join inline-flex">
        <button
          className="join-item btn glass-morphism"
          onClick={firstPage}
          disabled={page === 1}
        >
          {"<<"}
        </button>

        <button
          className="join-item btn glass-morphism"
          onClick={previousPage}
          disabled={page === 1}
        >
          {"<"}
        </button>

        {pageItems.map((item, index) =>
          item === "..." ? (
            <button
              key={`ellipsis-${index}`}
              className="join-item btn btn-disabled glass-morphism"
              disabled
            >
              ...
            </button>
          ) : (
            <button
              key={item}
              className={`join-item btn glass-morphism ${page === item ? "btn-active " : ""}`}
              onClick={() => goToPage(item)}
              aria-current={page === item ? "page" : undefined}
              disabled={page === item ? true : false}
            >
              {item}
            </button>
          ),
        )}

        <button
          className="join-item btn glass-morphism"
          onClick={nextPage}
          disabled={page >= totalPages || totalPages === 0}
        >
          {">"}
        </button>

        <button
          className="join-item btn glass-morphism"
          onClick={lastPage}
          disabled={page >= totalPages || totalPages === 0}
        >
          {">>"}
        </button>
      </div>
    </>
  );
}
