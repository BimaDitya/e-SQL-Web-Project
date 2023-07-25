import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function AddContent({ setShowAdd, materials }) {
	const router = useRouter();
	const {
		reset,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm();
	const alertWithSwal = withReactContent(Swal);
	async function AddContent(data) {
		await axios
			.post("/api/admin/add-content", data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then((response) => {
				setShowAdd(false);
				reset();
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
							Perintah Berhasil
						</p>
					),
					html: (
						<div className="font-body text-center text-green-400 font-medium tracking-wide">
							Materi{" "}
							<span className="font-semibold text-green-500">
								{response.data.addContent.Title}
							</span>{" "}
							Ditambahkan
						</div>
					),
				});
				router.replace(router.asPath);
			})
			.catch((error) => {
				alertWithSwal.fire({
					toast: true,
					timer: 3000,
					timerProgressBar: true,
					showConfirmButton: false,
					width: "40%",
					imageUrl: "/icons/error.png",
					imageWidth: "20%",
					title: (
						<p className="font-head font-semibold text-red-600 text-lg text-center tracking-wide">
							Terjadi Kesalahan
						</p>
					),
					html: (
						<p className="font-body text-center text-red-400 font-medium tracking-wide">
							{error.response.data.message}
						</p>
					),
				});
			});
	}
	return (
		<div className="w-full h-auto flex justify-center items-center">
			<div className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 h-full w-full bg-gray-500/25 backdrop-blur-sm">
				<LazyMotion features={domAnimation}>
					<m.div
						transition={{
							duration: 0.5,
							type: "spring",
							stiffness: 50,
						}}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="mx-48 px-8 py-4 w-full h-max bg-white rounded-lg shadow"
					>
						<form
							noValidate
							className="space-y-4"
							onSubmit={handleSubmit(AddContent)}
						>
							<div className="flex flex-row justify-between">
								<p className="font-head text-xl font-semibold text-secondary-400">
									Tambahkan Konten
								</p>
								<button
									onClick={() => setShowAdd(false)}
									className="rounded-lg p-2 bg-gray-200 text-gray-400 font-head hover:bg-red-400 hover:text-white hover:shadow-md ease-in-out hover:cursor-pointer duration-300"
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={2}
										stroke="currentColor"
										className="w-6 h-6"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M6 18L18 6M6 6l12 12"
										/>
									</svg>
								</button>
							</div>
							<div className="w-full h-max flex flex-col space-y-4">
								{/* Baris Judul & Slug */}
								<div className="w-full flex flex-row space-x-4">
									{/* Judul Konten */}
									<div className="w-full flex flex-col">
										<label className="font-head text-secondary-400">
											Judul Konten
										</label>
										<input
											label="Title"
											name="title"
											className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
											type="text"
											placeholder="Masukkan Judul Materi"
											{...register("title", {
												required: true,
												pattern: /^[a-zA-Z ()*-]{3,64}$/gi,
											})}
										/>
										{errors.title && errors.title.type === "required" && (
											<p className="text-red-400 text-sm font-head">
												Masukkan Judul Konten
											</p>
										)}
										{errors.title && errors.title.type === "pattern" && (
											<p className="text-red-400 text-sm font-head">
												Judul Konten Invalid, Maks. 64 Karakter
											</p>
										)}
									</div>
									{/* Slug Konten */}
									<div className="w-full flex flex-col">
										<label className="font-head text-secondary-400">
											Slug Konten
										</label>
										<input
											label="Slug"
											name="slug"
											className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
											type="text"
											placeholder="Masukkan Slug Materi"
											{...register("slug", {
												required: true,
												pattern: /^[a-z-]{3,32}$/g,
											})}
										/>
										{errors.slug && errors.slug.type === "required" && (
											<p className="text-red-400 text-sm font-head">
												Masukkan Slug
											</p>
										)}
										{errors.slug && errors.slug.type === "pattern" && (
											<p className="text-red-400 text-sm font-head">
												Format Slug Invalid, Maks. 64 Karakter
											</p>
										)}
									</div>
									{/* Bagian Materi */}
									<div className="w-full flex flex-col">
										<label className="font-head text-secondary-400">
											Bagian Materi
										</label>
										<select
											className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
											name="material"
											id="material"
											{...register("material", {
												required: true,
											})}
										>
											{materials.map((Material) => (
												<option
													className="h-max"
													key={Material.Id}
													value={Material.Id}
												>
													{Material.Title}
												</option>
											))}
										</select>
										{errors.material && errors.material.type === "required" && (
											<p className="text-red-400 text-sm font-head">
												Masukkan Bagian Materi
											</p>
										)}
									</div>
								</div>
								{/* Isi Kontent */}
								<div className="w-full flex flex-col">
									<label className="font-head text-secondary-400">
										Isi Konten
									</label>
									<textarea
										label="Content"
										name="content"
										className="h-64 p-2 mt-2 resize-none rounded font-body text-justify text-gray-600 bg-gray-100 transition ease-in-out ring-2 ring-gray-200 focus:ring-primary-100 outline-none"
										type="text"
										placeholder="Masukkan Konten..."
										{...register("content", {
											required: true,
										})}
									/>
									{errors.desc && errors.desc.type === "required" && (
										<p className="text-red-400 text-sm font-head">
											Masukkan Konten
										</p>
									)}
								</div>
								<div className="flex flex-row w-full space-x-4">
									<button
										disabled={!isValid}
										type="submit"
										className="button_default disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
									>
										Simpan
									</button>
								</div>
							</div>
						</form>
					</m.div>
				</LazyMotion>
			</div>
		</div>
	);
}
