import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
export function RegistrationForm() {
	const router = useRouter();
	const {
		watch,
		reset,
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm();

	const alertWithSwal = withReactContent(Swal);

	async function SubmitRegisteration(data) {
		await axios
			.post("/api/registration", data, {
				headers: {
					"Content-Type": "application/json",
				},
			})
			.then(async () => {
				reset();
				await alertWithSwal.fire({
					toast: true,
					timer: 3000,
					timerProgressBar: true,
					showConfirmButton: false,
					width: "40%",
					imageUrl: "/icons/success.png",
					imageWidth: "20%",
					title: (
						<p className="font-head font-semibold text-green-600 text-lg text-center tracking-wide">
							Registrasi Berhasil!
						</p>
					),
					html: (
						<p className="font-body text-center text-green-400 font-medium tracking-wide">
							Registrasi Dengan{" "}
							<p className="font-semibold font-body">
								{data.email.toUpperCase()}
							</p>{" "}
							Berhasil
						</p>
					),
				});
				router.push("/login");
			})
			.catch(async () => {
				await alertWithSwal.fire({
					toast: true,
					timer: 3000,
					timerProgressBar: true,
					showConfirmButton: false,
					width: "40%",
					imageUrl: "/icons/error.png",
					imageWidth: "20%",
					title: (
						<p className="font-head font-semibold text-red-600 text-lg text-center tracking-wide">
							Kesalahan Dalam Registrasi
						</p>
					),
					html: (
						<p className="font-body text-center text-red-400 font-medium tracking-wide">
							Alamat Email{" "}
							<p className="font-semibold font-body">
								{data.email.toUpperCase()}
							</p>{" "}
							Telah Terdaftar
						</p>
					),
				});
			});
	}
	return (
		<form
			noValidate
			className="space-y-4"
			onSubmit={handleSubmit(SubmitRegisteration)}
		>
			{/* Alamat Email */}
			<div className="flex flex-col">
				<label className="font-head text-secondary-400">Alamat Email</label>
				<input
					name="email"
					className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
					type="email"
					placeholder="Email"
					{...register("email", {
						required: true,
						pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
					})}
				/>
				{errors.email && errors.email.type === "required" && (
					<p className="text-red-400 text-sm font-head">
						Silahkan Masukkan Alamat Email
					</p>
				)}
				{errors.email && errors.email.type === "pattern" && (
					<p className="text-red-400 text-sm font-head">Email Tidak Valid</p>
				)}
			</div>
			<div className="flex flex-row justify-between space-x-4">
				{/* Kata Sandi */}
				<div className="flex flex-col w-full">
					<label className="font-head text-secondary-400">Kata Sandi</label>
					<input
						name="password"
						className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
						type="password"
						placeholder="Kata Sandi"
						{...register("password", {
							required: true,
							minLength: 8,
							pattern: {
								value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
							},
						})}
					/>
					{errors.password && errors.password.type === "required" && (
						<p className="text-red-400 text-sm font-head">
							Masukkan Kata Sandi
						</p>
					)}
					{errors.password && errors.password.type === "minLength" && (
						<p className="text-red-400 text-sm font-head">
							Kata Sandi Minimal Harus Terdiri Dari 8 karakter
						</p>
					)}
					{errors.password && errors.password.type === "pattern" && (
						<p className="text-red-400 text-sm font-head">
							Kata Sandi Harus Mengandung Huruf Kapital, Huruf Kecil, Dan Angka
						</p>
					)}
				</div>
				{/* Konfirmasi Kata Sandi */}
				<div className="flex flex-col w-full">
					<label className="font-head text-secondary-400">
						Konfirmasi Kata Sandi
					</label>
					<input
						name="passwordConfirmation"
						className="h-8 font-body text-primary-400 outline-none bg-transparent transition ease-in-out border-b-2 border-gray-200 hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
						type="password"
						placeholder="Konfirmasi Kata Sandi"
						{...register("passwordConfirmation", {
							required: true,
							validate: (value) => value === watch("password"),
						})}
					/>
					{errors.passwordConfirmation &&
						errors.passwordConfirmation.type === "required" && (
							<p className="text-red-400 text-sm font-head">
								Masukkan Ulang Kata Sandi
							</p>
						)}
					{errors.passwordConfirmation &&
						errors.passwordConfirmation.type === "validate" && (
							<p className="text-red-400 text-sm font-head">
								Kata Sandi Tidak Cocok!
							</p>
						)}
				</div>
			</div>
			<div className="pt-2">
				<button
					disabled={!isValid}
					type="submit"
					className="button_default w-full disabled:bg-gray-400 disabled:text-gray-200 disabled:cursor-not-allowed"
				>
					Registrasi
				</button>
			</div>
		</form>
	);
}
