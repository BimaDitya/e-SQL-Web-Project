import Head from "next/head";
import Image from "next/image";
import Public from "@/data/public.json";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Abouts() {
	return (
		<>
			<Head>
				<title>Tentang</title>
				<link rel="icon" href="icons/favicon.ico"></link>
			</Head>
			<LazyMotion features={domAnimation}>
				<div className="columns-2 bg-white/50">
					{/* Left Columns */}
					<div className="ml-20 h-adaptive flex items-center justify-center">
						<m.div
							transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0 }}
							className="z-30 bg-transparent px-12 py-8 backdrop-blur-sm rounded-md border-2 border-gray-200 shadow-lg"
						>
							<p className="font-body text-gray-500">Tentang Pengembang</p>
							<p className="font-head font-bold text-secondary-400 pb-2 text-4xl">
								Halo, Saya <span className="text-primary-400">Bima! 👋🏻</span>
							</p>
								<p className="font-body text-justify text-gray-500">
									{Public[1].about_desc}
								</p>
						</m.div>
					</div>

					{/* Right Columns */}
					<m.div
						transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: 1, x: 0 }}
						className="h-adaptive flex items-center justify-center"
					>
						<div className="relative flex transition ease-in-out hover:scale-110 duration-300">
							<div className="z-10">
								<Image
									className="rounded-full"
									src="/photos.png"
									alt="My Photos"
									width={256}
									height={256}
									quality={75}
									priority
								/>
							</div>
						</div>
					</m.div>
				</div>
			</LazyMotion>
		</>
	);
}
Abouts.getLayout = function getLayout(about) {
	return <MainLayout>{about}</MainLayout>;
};
