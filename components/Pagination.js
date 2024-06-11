export default function Pagination({
  currentPage,
  totalPages,
  previous,
  next,
}) {
  return (
    <div className="mt-2 flex h-max w-full flex-row justify-center">
      <div className="flex flex-row items-center space-x-8">
        <button
          title="Previous"
          className="button-default px-2"
          onClick={previous}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <p className="font-body text-lg font-medium text-secondary-400">
          {!totalPages ? "0" : currentPage} / {totalPages}
        </p>
        <button title="Next" className="button-default px-2" onClick={next}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
