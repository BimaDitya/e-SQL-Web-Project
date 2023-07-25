import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/Layout/MainLayout";
import { RegistrationForm } from "@/components/Form/RegistrationForm";
import { LazyMotion, domAnimation, m } from "framer-motion";
export async function getServerSideProps(context) {
	const getCookies = context.req.headers.cookie;
	if (getCookies)
		return {
			redirect: {
				source: "/registration",
				destination: "/",
				permanent: true,
			},
		};
	return { props: {} };
}
export default function Registration() {
	return (
		<>
			<Head>
				<title>Registrasi</title>
				<link rel="icon" href="icons/favicon.ico"></link>
			</Head>
			<div className="h-adaptive bg-white/50 flex flex-row justify-center items-center">
				<LazyMotion features={domAnimation}>
					<m.div
						transition={{ duration: 1, type: "spring", stiffness: 75 }}
						initial={{ opacity: 0, y: -75 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex w-[70%] flex-row justify-between bg-transparent backdrop-blur-sm border-2 border-gray-100 rounded-md px-6 py-2 shadow-xl"
					>
						<div className="w-3/5 p-4 flex flex-col justify-center">
							<p className="text-2xl mb-4 font-head font-bold text-primary-400">
								Formulir Registrasi
							</p>
							{/* Register Form*/}
							<RegistrationForm />
							<div className="font-body text-sm font-medium text-secondary-400 pt-4">
								Sudah Memiliki Akun?{" "}
								<Link
									href="/login"
									className="text-primary-400 font-bold hover:text-primary-200"
								>
									Login
								</Link>
							</div>
						</div>
						<div className="flex flex-row justify-center">
							<Image
								src="illustrations/registration.svg"
								alt="Registration Illustration"
								width={320}
								height={320}
								quality={75}
								priority
							/>
						</div>
					</m.div>
				</LazyMotion>
			</div>
		</>
	);
}
Registration.getLayout = function getLayout(registration) {
	return <MainLayout>{registration}</MainLayout>;
};