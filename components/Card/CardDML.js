import Link from "next/link";
import Image from "next/image";
import ProgressBar from "@ramonak/react-progress-bar";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function MainMaterialCard({ material, status }) {
	const progress = status?._count
	return (
		<>
			<LazyMotion features={domAnimation}>
				<m.div
					key={material?.id}
					transition={{
						duration: 0.5,
						type: "spring",
						stiffness: 50,
						delay: material?.id * 0.25,
					}}
					initial={{ opacity: 0, x: -100 }}
					animate={{ opacity: 1, x: 0 }}
					className="w-full flex flex-col p-4 bg-white border border-gray-200 rounded-md"
				>
					<div className="flex flex-row items-center">
						<div className="z-50 px-4 py-6 rounded bg-white h-full w-max">
							<Image
								className="w-max h-12"
								src="/web-logo.svg"
								alt="Website Logo"
								sizes="100vw"
								width="0"
								height="0"
								quality={25}
								priority
							/>
						</div>
						<div className="flex flex-col w-2/5 justify-between px-6">
							<h6 className="text-xl font-bold font-head text-secondary-400">
								{material?.Title}
							</h6>
							<div className="text-secondary-400 font-head">
								<p>
									Progress: {progress?.Progress} / {material?.Content?.length}{" "}
									Materi
								</p>
							</div>
							<ProgressBar
								completed={`${progress?.Progress}`}
								maxCompleted={material?.Content?.length}
								animateOnRender
								className="py-2"
								bgColor="rgb(255 158 26)"
								labelClassName="progressbar-label"
								barContainerClassName="progressbar-container"
							/>
							<div key={material?.id} className="button_default w-max">
								<Link href={`material/${material?.Slug}`}>Lihat Materi</Link>
							</div>
						</div>
					</div>
				</m.div>
			</LazyMotion>
		</>
	);
}
