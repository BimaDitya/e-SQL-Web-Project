import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useRouter } from "next/router";
export default function DeleteExercise({ exercise, setShowDelete }) {
	const router = useRouter();
	const { handleSubmit } = useForm();
	const alertWithSwal = withReactContent(Swal);

	async function DeleteExercise() {
		await axios
			.delete("/api/admin/delete-exercise", {
				headers: {
					"Content-Type": "application/json",
				},
				params: {
					slug: exercise.Slug,
				},
			})
			.then((response) => {
				setShowDelete(false);
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
							Latihan Soal
							<span className="font-semiboldbold text-green-500">
								{` ${response.data.deleteExercise.Title} `}
							</span>
							Dihapus
						</div>
					),
				});
				router.replace(router.asPath);
			});
	}
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
					<div className="mx-48 px-8 py-4 w-[32rem] h-max bg-white rounded-lg shadow">
						<form
							noValidate
							className="space-y-4"
							onSubmit={handleSubmit(DeleteExercise)}
						>
							<div className="flex flex-row justify-between">
								<p className="font-head text-xl font-semibold text-secondary-400">
									Hapus Latihan
								</p>
							</div>
							<div className="w-full h-max flex flex-col space-y-4">
								<p className="font-body text-gray-400">
									Latihan Soal
									<span className="font-semibold text-secondary-400">
										{` ${exercise.Title} `}
									</span>
									Akan Dihapus?
								</p>
								<div className="flex flex-row w-full space-x-4">
									<button type="submit" className="button_danger">
										Hapus
									</button>
									<button
										onClick={() => setShowDelete(false)}
										className="button_secondary"
									>
										Batal
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
