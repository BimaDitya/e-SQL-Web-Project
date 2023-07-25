import Link from "next/link";
import { useRouter } from "next/router";
	
export default function SideMenu({ accounts }) {
	const router = useRouter();
	return (
		<div className="p-2">
			<div className="px-4 pt-2">
				<p className="font-head text-secondary-400">Selamat Datang Admin,</p>
				<p className="font-head font-semibold text-lg text-primary-400">
					{accounts.Profile?.FirstName} {accounts.Profile?.LastName}
				</p>
			</div>
			<div className="px-4 py-2 space-y-4">
				<ul className="flex flex-col space-y-3">
					{/* Pengguna */}
					<li className="flex flex-row justify-between items-center space-x-2 font-head">
						<Link
							href="/admin/user" passHref
							className={
								router.pathname == "/admin/user"
									? "sidemenu-active-state flex flex-row items-center"
									: "sidemenu-default-state flex flex-row items-center"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.75}
								stroke="currentColor"
								className="w-6 h-6 mx-2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
								/>
							</svg>
							Pengguna
						</Link>
					</li>
					{/* Materi */}
					<li className="flex flex-row justify-between items-center space-x-2 font-head">
						<Link
							href="/admin/material" passHref
							className={
								router.pathname == "/admin/material"
									? "sidemenu-active-state flex flex-row items-center"
									: "sidemenu-default-state flex flex-row items-center"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.75}
								stroke="currentColor"
								className="w-6 h-6 mx-2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
								/>
							</svg>
							Materi
						</Link>
					</li>
					{/* Konten */}
					<li className="flex flex-row justify-between items-center space-x-2 font-head">
						<Link
							href="/admin/content" passHref
							className={
								router.pathname == "/admin/content"
									? "sidemenu-active-state flex flex-row items-center"
									: "sidemenu-default-state flex flex-row items-center"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.75}
								stroke="currentColor"
								className="w-6 h-6 mx-2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
								/>
							</svg>
							Konten
						</Link>
					</li>
					{/* Latihan */}
					<li className="flex flex-row justify-between items-center space-x-2 font-head">
						<Link
							href="/admin/exercise" passHref
							className={
								router.pathname == "/admin/exercise"
									? "sidemenu-active-state flex flex-row items-center"
									: "sidemenu-default-state flex flex-row items-center"
							}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.75}
								stroke="currentColor"
								className="w-6 h-6 mx-2"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
								/>
							</svg>
							Latihan
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
