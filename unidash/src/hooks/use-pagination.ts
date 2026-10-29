
import { useMemo } from "react";

type PaginationItem = number | "...";

type UsePaginationProps = {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  siblingCount?: number;
  boundaryCount?: number;
};

export function usePagination({
  page,
  totalPages,
  setPage,
  siblingCount = 1,
  boundaryCount = 1,
}: UsePaginationProps) {
  const pageItems = useMemo((): PaginationItem[] => {
    if (totalPages <= 0) return [];

    const currentPage = Math.max(
      1,
      Math.min(page, totalPages)
    );

    const range = (start: number, end: number): number[] =>
      Array.from(
        { length: Math.max(0, end - start + 1) },
        (_, i) => start + i
      );

    const startPages = range(
      1,
      Math.min(boundaryCount, totalPages)
    );

    const endPages = range(
      Math.max(totalPages - boundaryCount + 1, boundaryCount + 1),
      totalPages
    );

    const siblingsStart = Math.max(
      Math.min(
        currentPage - siblingCount,
        totalPages - boundaryCount - siblingCount * 2 - 1
      ),
      boundaryCount + 2
    );

    const siblingsEnd = Math.min(
      Math.max(
        currentPage + siblingCount,
        boundaryCount + siblingCount * 2 + 2
      ),
      totalPages - boundaryCount - 1
    );

    const itemList: PaginationItem[] = [
      ...startPages,
      ...(siblingsStart > boundaryCount + 2
        ? ["..." as const]
        : siblingsStart === boundaryCount + 2
          ? [boundaryCount + 1]
          : []),
      ...range(siblingsStart, siblingsEnd),
      ...(siblingsEnd < totalPages - boundaryCount - 1
        ? ["..." as const]
        : siblingsEnd === totalPages - boundaryCount - 1
          ? [totalPages - boundaryCount]
          : []),
      ...endPages,
    ];

    return itemList.filter(
      (item, index) => itemList.indexOf(item) === index
    );
  }, [page, totalPages, siblingCount, boundaryCount]);

  const goToPage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages || 1)));
  };

  return {
    pageItems,
    goToPage,
    firstPage: () => goToPage(1),
    lastPage: () => goToPage(totalPages),
    previousPage: () => goToPage(page - 1),
    nextPage: () => goToPage(page + 1),
  };
}
