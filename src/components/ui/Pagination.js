export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-end gap-2">
      <button
        type="button"
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page <= 1}
        className="rounded-md border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
      >
        Prev
      </button>
      <span className="text-sm text-slate-600">
        {page} / {totalPages}
      </span>
      <button
        type="button"
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages}
        className="rounded-md border border-slate-300 px-3 py-1 text-sm disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
