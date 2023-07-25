import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import LoginForm from "@/components/Form/LoginForm";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m } from "framer-motion";

export async function getServerSideProps(context) {
	const getCookies = context.req.headers.cookie;
	if (getCookies)
		return {
			redirect: {
				source: "/login",
				destination: "/",
				permanent: true,
			},
		};
		
	return { props: {} };
}
export default function Login() {
	return (
		<>
			<Head>
				<title>Login</title>
				<link rel="icon" href="icons/favicon.ico"></link>
			</Head>
			<div className="h-adaptive bg-white/50 flex flex-row justify-center items-center">
				<LazyMotion features={domAnimation}>
					<m.div
						transition={{ duration: 1, type: "spring", stiffness: 75 }}
						initial={{ opacity: 0, y: -75 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex w-3/5 flex-row justify-between bg-transparent backdrop-blur-sm border-2 border-gray-100 rounded-md px-6 py-2 shadow-xl"
					>
						<div className="w-3/5 p-4 flex flex-col justify-center">
							<p className="text-2xl mb-4 font-head font-bold text-primary-400"></p>
							{/* Login Form */}
							<LoginForm />
							<div className="font-body text-sm font-medium text-secondary-400 pt-4">
								Belum Memiliki Akun?{" "}
								<Link
									href="/registration"
									className="text-primary-400 font-bold hover:text-primary-200"
								>
									Registrasi
								</Link>
							</div>
						</div>
						<div className="flex flex-row justify-center">
							<Image
								src="illustrations/login.svg"
								alt="Login Illustration"
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
Login.getLayout = function getLayout(login) {
	return <MainLayout>{login}</MainLayout>;
};