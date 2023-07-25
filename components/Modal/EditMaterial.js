import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";
export default function EditMaterial({ material, setShowEdit }) {
	const router = useRouter();
	const {
		reset,
		setValue,
		register,
		handleSubmit,
		formState: { errors, isDirty, isValid },
	} = useForm();

	const alertWithSwal = withReactContent(Swal);

	async function UpdateMaterial(data) {
		await axios
			.patch("/api/admin/update-material", data, {
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					params: material.Slug,
				},
			})
			.then((response) => {
				setShowEdit(false);
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
								{response.data.updateMaterial.Title}
							</span>{" "}
							Diperbarui
						</div>
					),
				});
				router.replace(router.asPath);
			})
			.catch(() => {
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
							Gagal Memperbarui Materi
						</p>
					),
				});
			});
	}
	// Menampilkan Data Ke Input Field
	useEffect(() => {
		setValue("title", material?.Title);
		setValue("slug", material?.Slug);
		setValue("desc", material?.Desc);
	}, [material?.Title, material?.Slug, material?.Desc, setValue]);
	return (
		<LazyMotion features={domAnimation}>
			<div className="w-full h-auto flex justify-center items-center">
				<m.div
					transition={{
						duration: 0.5,
						type: "spring",
						stiffness: 50,
					}}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="fixed flex justify-center items-center top-0 left-0 right-0 z-50 h-full w-full bg-gray-500/25 backdrop-blur-sm"
				>
					<div className="mx-48 px-8 py-4 w-full h-max bg-white rounded-lg shadow">
						<form
							noValidate
							className="space-y-4"
							onSubmit={handleSubmit(UpdateMaterial)}
						>
							<div className="flex flex-row justify-between">
								<p className="font-head text-xl font-semibold text-secondary-400">
									Ubah Materi
								</p>
								<button
									onClick={() => setShowEdit(false)}
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
								<div className="w-full flex flex-row space-x-16">
									{/* Judul Materi */}
									<div className="w-full flex flex-col">
										<label className="font-head text-secondary-400">
											Judul Materi
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
												Masukkan Judul Materi
											</p>
										)}
										{errors.title && errors.title.type === "pattern" && (
											<p className="text-red-400 text-sm font-head">
												Judul Materi Invalid, Maks. 64 Karakter
											</p>
										)}
									</div>
									{/* Slug Materi */}
									<div className="w-full flex flex-col">
										<label className="font-head text-secondary-400">
											Slug Materi
										</label>
										<input
											label="Slug"
											name="slug"
											className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
											type="text"
											placeholder="Masukkan Slug Materi"
											{...register("slug", {
												required: true,
												pattern: /^[a-z-]{3,64}$/g,
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
								</div>
								{/* Deskripsi Materi */}
								<div className="w-full flex flex-col">
									<label className="font-head text-secondary-400">
										Deskripsi Materi
									</label>
									<textarea
										label="Desc"
										name="desc"
										className="h-36 p-2 mt-2 resize-none rounded font-body text-justify text-gray-600 bg-gray-100 transition ease-in-out ring-2 ring-gray-200 focus:ring-primary-100 outline-none"
										type="text"
										placeholder="Masukkan Deskripsi..."
										{...register("desc", {
											required: true,
											pattern: /^[a-zA-Z0-9 '.,()*-]{3,}$/gi,
										})}
									/>
									{errors.desc && errors.desc.type === "required" && (
										<p className="text-red-400 text-sm font-head">
											Masukkan Deskripsi Materi
										</p>
									)}
								</div>
								<div className="flex flex-row w-full space-x-4">
									<button
										disabled={!isValid || !isDirty}
										type="submit"
										className="button_default disabled:bg-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
									>
										Simpan
									</button>
								</div>
							</div>
						</form>
					</div>
				</m.div>
			</div>
		</LazyMotion>
	);
}
