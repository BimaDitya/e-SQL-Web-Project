import axios from "axios";
import Head from "next/head";
import Pagination from "@/components/Pagination";
import SideMenu from "@/components/Admin/SideMenu";
import { useState } from "react";
import MainLayout from "@/components/Layout/MainLayout";
import AddExercise from "@/components/Modal/AddExercise";
import EditExercise from "@/components/Modal/EditExercise";
import { LazyMotion, domAnimation, m } from "framer-motion";
import DeleteExercise from "@/components/Modal/DeleteExercise";

export async function getServerSideProps(context) {
	const getCookies = context.req.headers.cookie;
	const token = context.req.cookies.token;
	if (!getCookies) {
		if (!getCookies)
			return {
				redirect: {
					source: "/admin/exercise",
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
	const exercise = await axios.get(
		process.env.BASE_URL + "/api/admin/view-exercise"
	);
	const material = await axios.get(
		process.env.BASE_URL + "/api/admin/view-material"
	);
	const exercises = exercise?.data?.viewExercise;
	const materials = material.data?.viewMaterial;
	const accounts = account.data?.data;
	if (accounts.Role !== "ADMIN")
		return {
			redirect: {
				permanent: false,
				destination: "/",
			},
		};
	return {
		props: { accounts, materials, exercises },
	};
}
export default function Content({ accounts, materials, exercises }) {
	const [exercise, setExercise] = useState();
	const [showAdd, setShowAdd] = useState(false);
	const [showEdit, setShowEdit] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [showDelete, setShowDelete] = useState(false);
	const contentPerPage = 4;

	// Tampilkan Latihan
	const lastExercise = currentPage * contentPerPage;
	const firsExercise = lastExercise - contentPerPage;
	const records = exercises.slice(firsExercise, lastExercise);

	const totalPages = Math.ceil(exercises.length / contentPerPage);
	const numbers = [...Array(totalPages + 1).keys()].slice(1);

	// Berpindah Latihan
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
				<title>Admin - Latihan</title>
				<link rel="icon" href="../icons/favicon.ico"></link>
			</Head>
			<LazyMotion features={domAnimation}>
				{/* Add Exercise Modal */}
				{showAdd ? (
					<AddExercise setShowAdd={setShowAdd} materials={materials} />
				) : null}
				{/* Edit Exercise Modal */}
				{showEdit ? (
					<EditExercise
						setShowEdit={setShowEdit}
						materials={materials}
						exercise={exercise}
					/>
				) : null}
				{/* Delete Exercise Modal */}
				{showDelete ? (
					<DeleteExercise setShowDelete={setShowDelete} exercise={exercise} />
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
						className="z-30 w-[25%] h-max rounded-md backdrop-blur-sm
						bg-transparent border-2 border-gray-200"
					>
						<SideMenu accounts={accounts} />
					</m.div>
					{/* Kolom Kanan */}
					<m.div
						transition={{
							duration: 1,
							type: "spring",
							stiffness: 50,
						}}
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						className="z-30 w-[75%] px-4 py-2.5 h-max rounded-md backdrop-blur-sm bg-transparent border-2 border-gray-200"
					>
						{/* Baris Atas */}
						<div className="w-full flex flex-row justify-between items-center rounded">
							<p className="font-head font-bold text-xl text-secondary-400">
								Daftar Latihan
							</p>
							<button
								className="flex pl-2 pr-4 flex-row button_default"
								onClick={() => setShowAdd(true)}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={1.75}
									stroke="currentColor"
									className="w-6 h-6"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 6v12m6-6H6"
									/>
								</svg>
								Latihan
							</button>
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
												Judul Soal
											</th>
											<th scope="col" className="px-2 py-2 w-max">
												Sub-Materi
											</th>
											<th scope="col" className="px-2 py-2 w-max">
												Skor
											</th>
											<th scope="col" className="px-2 py-2 w-max text-center">
												Aksi
											</th>
										</tr>
									</thead>
									<tbody className="font-body bg-gray-50 text-gray-500">
										{Object.values(records).map((Rows, index) => (
											<m.tr
												key={Rows.Id}
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
													{Rows?.Id}
												</td>
												<td className="px-2 py-2 w-max">{Rows?.Title}</td>
												<td className="px-2 py-2 max-w-xs text-justify">
													{Rows?.Material.Title}
												</td>
												<td className="px-2 py-2 max-w-xs text-justify">
													{Rows?.Score}
												</td>
												<td className="px-2 py-2 space-x-2 w-max text-center">
													<button
														className="button_default"
														onClick={() => {
															setShowEdit(true);
															setExercise(Rows);
														}}
													>
														Edit
													</button>
													<button
														className="button_danger"
														onClick={() => {
															setShowDelete(true);
															setExercise(Rows);
														}}
													>
														Hapus
													</button>
												</td>
											</m.tr>
										))}
									</tbody>
								</table>
								<Pagination
									currentPage={currentPage}
									totalPages={totalPages}
									previous={previous}
									numbers={numbers}
									next={next}
								/>
							</div>
						</div>
					</m.div>
				</div>
			</LazyMotion>
		</>
	);
}

Content.getLayout = function getLayout(content) {
	return <MainLayout>{content}</MainLayout>;
};
