import Link from "next/link";

export default function NavbarPlayground({ exercise, sumScore, material }) {
	const totalScore = !sumScore?._sum?.Score
		? "Total Skor: 0"
		: `Total Skor: ${sumScore?._sum?.Score}`;
	return (
		<div className="sticky h-14 top-0 left-0 right-0 z-50">
			<nav className="bg-white/50 backdrop-blur-sm px-16 py-4 shadow-md">
				<div className="flex items-center justify-between font-head">
					<Link
						href={`/material/${material}`} passHref
						className="text-xl font-head font-semibold text-secondary-400 flex flex-row items-center hover:text-secondary-200 transition ease-in-out duration-300 py-2.5"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							strokeWidth={2}
							stroke="currentColor"
							className="mr-2 w-6 h-6"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="bevel"
								d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
							/>
						</svg>
						<p>{` ${exercise.Title} `}</p>
					</Link>
					<div className="flex flex-row space-x-4">
						<p className="text-xl font-head font-semibold text-secondary-400 flex flex-row items-center hover:text-secondary-200 transition ease-in-out duration-300 py-2.5">
							{totalScore}
						</p>
					</div>
				</div>
			</nav>
		</div>
	);
}
