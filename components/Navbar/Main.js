import Link from "next/link";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { useRouter } from "next/router";

export default function Navbar({ isLoading, cookies, data }) {
	const router = useRouter();
	const roles = data?.Role;
	if (isLoading)
		return (
			<div className="sticky -mb-6 h-[80px] top-0 left-0 right-0 z-50">
				<nav className="bg-white/50 h-full backdrop-blur flex justify-center items-center shadow-md">
					<p className="font-head font-semibold text-xl text-secondary-200">
						Sedang Memuat Navbar ⏳
					</p>
				</nav>
			</div>
		);
	return (
		<>
			<div className="sticky h-14 top-0 left-0 right-0 z-50">
				<nav className="bg-white/50 backdrop-blur-sm px-16 py-4 shadow-md">
					<div className="flex items-center justify-between font-head">
						<div>
							<Image
								className="w-full h-12"
								src="/web-logo.svg"
								alt="Website Logo"
								sizes="100vw"
								width="0"
								height="0"
								quality={25}
							/>
						</div>
						<ul className="flex flex-row justify-center">
							<li className="transition ease-in-out duration-300">
								<Link
									href="/"
									className={
										router.pathname == "/"
											? "menu-active-state"
											: "menu-default-state"
									}
								>
									Beranda
								</Link>
							</li>
							{cookies && (
								<li className="transition ease-in-out duration-300">
									<Link
										href="/material"
										className={
											router.pathname == "/material"
												? "menu-active-state"
												: "menu-default-state"
										}
									>
										Materi
									</Link>
								</li>
							)}
							{roles === "ADMIN" && (
								<li className="transition ease-in-out duration-300">
									<Link
										href="/admin/user"
										className={
											router.pathname == "/admin/exercise"
												? "menu-active-state"
												: "menu-default-state" &&
												  router.pathname == "/admin/material"
												? "menu-active-state"
												: "menu-default-state" &&
												  router.pathname == "/admin/content"
												? "menu-active-state"
												: "menu-default-state" &&
												  router.pathname == "/admin/user"
												? "menu-active-state"
												: "menu-default-state"
										}
									>
										Admin
									</Link>
								</li>
							)}
							<li className="transition ease-in-out duration-300">
								<Link
									href="/about"
									className={
										router.pathname == "/about"
											? "menu-active-state"
											: "menu-default-state"
									}
								>
									Tentang
								</Link>
							</li>
						</ul>
						<div className="w-auto font-head">
							{cookies && <Dropdown data={data} cookies={cookies} />}
							{!cookies && (
								<Link
									href="/login"
									className={
										router.pathname == "/login"
											? "login-active-state"
											: "login-default-state"
									}
								>
									Login
								</Link>
							)}
						</div>
					</div>
				</nav>
			</div>
		</>
	);
}
