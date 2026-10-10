type Props = {
  handlePageChange: (newPage: number) => void;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
};

function PaginationControls({ handlePageChange, pagination }: Props) {
  return (
    <div className="flex justify-center items-center gap-2">
      <div className="join">
        <button
          type="button"
          className="join-item btn btn-outline"
          onClick={() => handlePageChange(pagination.page - 1)}
          disabled={pagination.page <= 1}
        >
          «
        </button>
        <button type="button" className="join-item btn btn-outline btn-active">
          {pagination.page}
        </button>
        <button
          type="button"
          className="join-item btn btn-outline btn-disabled"
        >
          of {pagination.totalPages || 1}
        </button>
        <button
          type="button"
          className="join-item btn btn-outline"
          disabled={pagination.page >= pagination.totalPages}
          onClick={() => handlePageChange(pagination.page + 1)}
        >
          {pagination.page + 1 <= pagination.totalPages
            ? pagination.page + 1
            : pagination.page}
        </button>
        <button
          type="button"
          className="join-item btn btn-outline"
          onClick={() => handlePageChange(pagination.page + 1)}
          disabled={pagination.page >= pagination.totalPages}
        >
          »
        </button>
      </div>
    </div>
  );
}

export default PaginationControls;
