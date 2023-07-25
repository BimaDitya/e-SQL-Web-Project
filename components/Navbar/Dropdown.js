import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Dropdown({ data, cookies }) {
	const [toggle, setToggle] = useState(true);
	const router = useRouter();
	const alertWithSwal = withReactContent(Swal);
	async function Logout() {
		await axios
			.post("/api/logout", {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(() => {
				alertWithSwal.fire({
					toast: true,
					timer: 3000,
					timerProgressBar: true,
					showConfirmButton: false,
					width: "40%",
					imageUrl: "/icons/success.png",
					imageWidth: "20%",
					title: (
						<p className="font-head font-semibold text-green-600 text-lg text-center tracking-wide">
							Logout Berhasil!
						</p>
					),
					html: (
						<div className="font-body text-center text-green-400 font-medium tracking-wide">
							Sampai Jumpa,
							<p className="font-semibold text-green-500">
								{` ${(data?.Email).toUpperCase()} `}
							</p>
						</div>
					),
				});
				setTimeout(() => {
					router.reload(() => "/");
				}, 3000);
			});
	}
	const profiles = data?.Profile;
	return (
		<div>
			<div>
				{cookies && (
					<div>
						{!profiles && (
							<div
								onClick={() => setToggle(!toggle)}
								className={
									toggle ? "dropdown-default-null" : "dropdown-active-null"
								}
							>
								Kosong
							</div>
						)}
						{profiles && (
							<div
								onClick={() => setToggle(!toggle)}
								className={toggle ? "dropdown-default" : "dropdown-actives"}
							>
								{profiles.FirstName}
							</div>
						)}
						{!toggle && (
							<LazyMotion features={domAnimation}>
								<m.div
									transition={{
										duration: 0.25,
										type: "tween",
										ease: "easeInOut",
									}}
									initial={{ opacity: 0, y: -25 }}
									animate={{ opacity: 1, y: 0 }}
									className="absolute z-10 my-2 rounded bg-white shadow-lg border-2 border-secondary-200 border-opacity-25 focus:outline-none"
								>
									<div className="px-4 py-2.5 space-y-2 text-gray-400">
										<div className="hover:text-secondary-400 hover:cursor-pointer transition ease-in-out duration-300">
											<Link href={`/profile/${data.CreatedAt}`}>
												Atur Profile
											</Link>
										</div>
										<div
											onClick={Logout}
											className="hover:text-red-600 hover:cursor-pointer transition ease-in-out duration-300"
										>
											Logout
										</div>
									</div>
								</m.div>
							</LazyMotion>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
