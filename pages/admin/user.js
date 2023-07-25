import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import SideMenu from "@/components/Admin/SideMenu";
import DetailUser from "@/components/Modal/DetailUser";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m } from "framer-motion";

export async function getServerSideProps(context) {
	const getCookies = context.req.headers.cookie;
	const token = context.req.cookies.token;
	if (!getCookies) {
		if (!getCookies)
			return {
				redirect: {
					source: "/admin/user",
					destination: "/login",
					permanent: true,
				},
			};
	}
	const account = await axios.get(
		process.env.BASE_URL + "/api/user/view-account",
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	const user = await axios.get(process.env.BASE_URL + "/api/admin/view-user", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	const accounts = account.data?.data;
	const users = user?.data?.data;
	if (accounts.Role !== "ADMIN")
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	return { props: { users, token, accounts } };
}
export default function User({ users, token, accounts }) {
	const [user, setUser] = useState();
	const [showEdit, setShowEdit] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const contentPerPage = 4;

	// Tampilkan Pengguna
	const lastUser = currentPage * contentPerPage;
	const firstUser = lastUser - contentPerPage;
	const records = users.slice(firstUser, lastUser);

	const totalPages = Math.ceil(users.length / contentPerPage);
	const numbers = [...Array(totalPages + 1).keys()].slice(1);

	// Berpindah Pengguna
	function previous() {
		if (currentPage !== 1) {
			setCurrentPage(currentPage - 1);
		}
	}
	function next() {
		if (currentPage !== totalPages) {
			setCurrentPage(currentPage + 1);
		}
	}
	return (
		<>
			<Head>
				<title>Admin - Pengguna</title>
				<link rel="icon" href="../icons/favicon.ico"></link>
			</Head>
			<LazyMotion features={domAnimation}>
				{/* Edit Material Modal */}
				{showEdit ? (
					<DetailUser token={token} setShowEdit={setShowEdit} user={user} />
				) : null}
				<div className="flex flex-row px-8 py-12 space-x-4">
					{/* Kolom Kiri */}
					<m.div
						transition={{
							duration: 0.5,
							type: "spring",
							stiffness: 50,
						}}
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						className="z-30 w-[25%] h-max rounded-md backdrop-blur-sm bg-transparent border-2 border-gray-200"
					>
						<SideMenu accounts={accounts} />
					</m.div>
					{/* Kolom Kanan */}
					<m.div
						transition={{
							duration: 0.5,
							type: "spring",
							stiffness: 50,
						}}
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						className="z-30 w-[75%] px-4 py-2.5 h-max rounded-md backdrop-blur-sm bg-transparent space-y-2 border-2 border-gray-200"
					>
						<div className="w-full h-max">
							{/* Baris Atas */}
							<div className="w-full flex flex-row justify-between items-center rounded">
								<p className="font-head font-bold text-xl text-secondary-400">
									Daftar Pengguna
								</p>
							</div>
							{/* Baris Bawah */}
							<div className="py-2">
								<div className="overflow-auto">
									<table className="table-auto w-full border-2 border-secondary-100">
										<thead className="font-head text-left uppercase bg-secondary-100 text-white">
											<tr>
												<th scope="col" className="px-2 py-2 w-max text-center">
													#
												</th>
												<th scope="col" className="px-2 py-2 w-max">
													Email
												</th>
												<th scope="col" className="px-2 py-2 w-max text-center">
													Progress
												</th>
												<th scope="col" className="px-2 py-2 w-max text-center">
													Skor Kumulatif
												</th>
												<th scope="col" className="px-2 py-2 w-max">
													Role
												</th>
												<th scope="col" className="px-2 py-2 w-max text-center">
													Aksi
												</th>
											</tr>
										</thead>
										<tbody className="font-body bg-gray-50 text-gray-500">
											{Object.values(records).map((Rows, index) => (
												<m.tr
													key={index}
													transition={{
														duration: 1,
														type: "spring",
														stiffness: 50,
														delay: index * 0.25,
													}}
													initial={{ opacity: 0, x: 100 }}
													animate={{ opacity: 1, x: 0 }}
													className="border-b-2 border-secondary-100"
												>
													<td className="px-2 py-2 w-max text-center">
														{index + 1}
													</td>
													<td className="px-2 py-2 w-max">{Rows.Email}</td>
													<td className="px-2 py-2 w-max text-center">{`${Rows._count.Progress} Materi`}</td>
													<td className="px-2 py-2 w-max text-center">
														{(Rows?.Score).reduce(
															(accumulator, scoreElemet) =>
																accumulator + scoreElemet.Score,
															0
														)}
													</td>
													<td className="px-2 py-2 w-max">{Rows.Role}</td>
													<td className="px-2 py-2 space-x-2 w-max text-center">
														<button
															disabled={Rows.Role === "ADMIN"}
															className="button_default disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
															onClick={() => {
																setShowEdit(true);
																setUser(Rows);
															}}
														>
															Detail
														</button>
													</td>
												</m.tr>
											))}
										</tbody>
									</table>
								</div>
							</div>
							<Pagination
								currentPage={currentPage}
								totalPages={totalPages}
								previous={previous}
								numbers={numbers}
								next={next}
							/>
						</div>
					</m.div>
				</div>
			</LazyMotion>
		</>
	);
}

User.getLayout = function getLayout(user) {
	return <MainLayout>{user}</MainLayout>;
};
