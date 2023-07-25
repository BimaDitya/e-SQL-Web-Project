import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Public from "@/data/public.json";
import Typewriter from "typewriter-effect";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Home() {
	return (
		<>
			<Head>
				<title>Beranda</title>
				<link rel="icon" href="icons/favicon.ico"></link>
			</Head>
			<LazyMotion features={domAnimation}>
				<div className="columns-2 bg-white/50">
					{/* Left Columns */}
					<div className="ml-20 p-0 h-adaptive flex items-center justify-center">
						<m.div
							transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
							initial={{ opacity: 0, x: -100 }}
							animate={{ opacity: 1, x: 0 }}
							className="z-30 bg-transparent px-10 py-8 backdrop-blur-sm rounded-md border-2 border-gray-200 shadow-lg"
						>
							<div className="font-head font-bold text-secondary-400 py-2 text-2xl">
								Upgrade Skill & Pengetahuan
								<span className="text-primary-400 text-2xl"> SQL</span> Kamu,
								<span className="text-primary-400 text-2xl">
									<Typewriter
										options={{
											strings: ["Dimanapun!", "Kapanpun!", "Gratis!"],
											deleteSpeed: "natural",
											autoStart: true,
											loop: true,
										}}
									/>
								</span>
							</div>
								<p
									className="font-body text-justify text-gray-500 pr-2"
								>
									{Public[0].index_desc}
								</p>
							<div className="button_default w-max mt-2 py-3">
								<Link href="/material">Belajar Sekarang</Link>
							</div>
						</m.div>
					</div>

					{/* Right Columns */}
					<div className="mr-16 p-0 h-adaptive flex items-center justify-center">
						<m.div
							transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
							initial={{ opacity: 0, x: 100 }}
							animate={{ opacity: 1, x: 0 }}
							className="z-30"
						>
							<div className="relative flex transition ease-in-out hover:scale-110 duration-300">
								<div className="z-10">
									<Image
										src="illustrations/studying.svg"
										alt="Homepage Illustration"
										width={400}
										height={400}
										quality={75}
										priority
									/>
								</div>
							</div>
						</m.div>
					</div>
				</div>
			</LazyMotion>
		</>
	);
}

Home.getLayout = function getLayout(home) {
	return <MainLayout>{home}</MainLayout>;
};
