import { useRouter } from "next/router";

export default function NavbarContent({
	status,
	contents,
	accounts,
	materials,
	UpdateStatus,
}) {
	const router = useRouter();
	const roles = accounts?.Role;
	const complete = status[0]?.Progress[0]?.Complete
	return (
		<div className="sticky h-14 top-0 left-0 right-0 z-50">
			<nav className="bg-white/50 backdrop-blur-sm px-16 py-4 shadow-md">
				<div className="flex items-center justify-between font-head">
					<button
						onClick={() => router.push(`/material/${materials}`)}
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
						</svg>{" "}
						{contents?.viewContent[0]?.Title}
					</button>
					<div className="flex flex-row space-x-4">
						<button
							disabled={complete === "TRUE" || roles === "ADMIN"}
							onClick={UpdateStatus}
							type="submit"
							className="button_default disabled:text-gray-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
						>
							Selesai
						</button>
						{roles === "ADMIN" && (
							<button
								type="submit"
								onClick={() => {
									router.push(router.asPath);
								}}
								className="button_default"
							>
								Refresh
							</button>
						)}
					</div>
				</div>
			</nav>
		</div>
	);
}
