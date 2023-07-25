import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import ProfileForm from "@/components/Form/ProfileForm";
import { LazyMotion, domAnimation, m } from "framer-motion";

export async function getServerSideProps(context) {
	const getCookies = context.req.headers.cookie;
	const token = context.req.cookies.token;
	const account = await axios.get(
		process.env.BASE_URL + "/api/user/view-account",
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}
	);
	const accounts = account.data.data;
	if (!getCookies)
		return {
			redirect: {
				source: "/profile/:profile*",
				destination: "/login",
				permanent: true,
			},
		};
	return { props: { accounts, token } };
}
export default function ProfileSetting({ accounts, token }) {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Profile</title>
				<link rel="icon" href="../icons/favicon.ico"></link>
			</Head>
			<div className="h-adaptive bg-white/50 flex flex-row justify-center items-center">
				<LazyMotion features={domAnimation}>
					<m.div
						transition={{ duration: 1, type: "spring", stiffness: 75 }}
						initial={{ opacity: 0, y: -75 }}
						animate={{ opacity: 1, y: 0 }}
						className="flex w-3/4 flex-row justify-between bg-transparent backdrop-blur-sm border-2 border-gray-100 rounded-2xl px-6 py-2 shadow-xl"
					>
						<div className="w-3/5 p-4 flex flex-col justify-center">
							<button
								onClick={() => router.push("/")}
								className="transition ease-in-out hover:text-secondary-200 text-secondary-400 font-head py-2 rounded-md w-max duration-300"
							>
								&#8592; Kembali
							</button>
							<p className="text-2xl mb-4 font-head font-bold text-primary-400">
								Pengaturan Profile
							</p>
							{/* Profile Form*/}
							<ProfileForm accounts={accounts} token={token} />
						</div>
						<div className="flex flex-row justify-center items-center">
							<Image
								className="w-full h-80"
								src="../illustrations/profile.svg"
								alt="Profile Illustration"
								sizes="100vw"
								width="0"
								height="0"
								quality={50}
							/>
						</div>
					</m.div>
				</LazyMotion>
			</div>
		</>
	);
}
