import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function DetailUser({ user, setShowEdit }) {
	const {
		setValue,
		register,
	} = useForm();

	// Menampilkan Data Ke Input Field
	useEffect(() => {
		setValue("role", user?.Role);
		setValue("email", user?.Email);
		setValue("firstName", user?.Profile?.FirstName);
		setValue("lastName", user?.Profile?.LastName);
		setValue("school", user?.Profile?.School);
	}, [
		user?.Role,
		user?.Email,
		user?.Profile.FirstName,
		user?.Profile.LastName,
		user?.Profile?.School,
		setValue,
	]);
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
						<form noValidate className="space-y-4">
							<div className="flex flex-row justify-between">
								<p className="font-head text-xl font-semibold text-secondary-400">
									Detail Pengguna
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
							<div className="w-full flex flex-col space-y-2">
								{/* Baris Pertama */}
								<div className="w-full flex flex-row space-x-4">
									{/* Email Pengguna */}
									<div className="w-full flex flex-col">
										<label className="font-head text-secondary-400">
											Email
										</label>
										<input
											label="Email"
											name="email"
											className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400 disabled:cursor-not-allowed"
											type="email"
											{...register("email", {
												disabled: true,
											})}
										/>
									</div>
									{/* Role Pengguna */}
									<div className="w-full flex flex-col">
										<label className="font-head text-secondary-400">Role</label>
										<input
											label="Role"
											name="role"
											className="appearance-none h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400 disabled:cursor-not-allowed"
											type="text"
											{...register("role", {
												disabled: true,
											})}
										/>
									</div>
								</div>
								{/* Baris Kedua */}
								<div className="w-full flex flex-row space-x-4">
									{/* Nama Depan */}
									<div className="w-full flex flex-col">
										<label className="font-head text-secondary-400">
											Nama Depan
										</label>
										<input
											label="FirstName"
											name="firstName"
											className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400 disabled:cursor-not-allowed"
											type="text"
											{...register("firstName", {
												disabled: true,
											})}
										/>
									</div>
									{/* Nama Belakang */}
									<div className="w-full flex flex-col">
										<label className="font-head text-secondary-400">
											Nama Belakang
										</label>
										<input
											label="LastName"
											name="lastName"
											className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400 disabled:cursor-not-allowed"
											type="text"
											{...register("lastName", {
												disabled: true,
											})}
										/>
									</div>
								</div>
								{/* Baris Ketiga */}
								<div className="w-full flex flex-row space-x-4 pb-6">
									{/* Asal Sekolah */}
									<div className="w-full flex flex-col">
										<label className="font-head text-secondary-400">
											Asal Sekolah
										</label>
										<input
											label="School"
											name="school"
											className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
											type="text"
											{...register("school", {
												disabled: true,
											})}
										/>
									</div>
								</div>
							</div>
						</form>
					</div>
				</m.div>
			</div>
		</LazyMotion>
	);
}
