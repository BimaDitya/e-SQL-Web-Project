export default function Pagination({
	currentPage,
	previous,
	next,
	totalPages,
}) {
	return (
		<div className="mt-2 w-full h-max flex flex-row justify-center">
			<div className="flex flex-row space-x-8 items-center">
				<button
					title="Previous"
					className="button_secondary px-2"
					onClick={previous}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15.75 19.5L8.25 12l7.5-7.5"
						/>
					</svg>
				</button>
				<p className="text-lg text-secondary-400 font-body font-medium">
					{currentPage} / {totalPages}
				</p>
				<button title="Next" className="button_secondary px-2" onClick={next}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor"
						className="w-6 h-6"
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
