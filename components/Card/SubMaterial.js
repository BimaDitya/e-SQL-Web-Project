import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function SubMaterialCard({ material, content, index }) {
	return (
		<>
			<LazyMotion features={domAnimation}>
				<div>
					<m.div
						key={content.Id}
						transition={{
							duration: 1,
							type: "spring",
							stiffness: 50,
							delay: index * 0.15,
						}}
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: 1, x: 0 }}
						className="w-full flex flex-col px-4 py-2.5 bg-white border border-gray-200 rounded"
					>
						<div className="flex flex-row justify-between items-center">
							<h6 className="font-head font-medium text-lg text-secondary-400">
								{content.Id}. {content.Title}
							</h6>
							<div className="button_default">
								<Link href={`${material.Slug}` + `/content/${content.Slug}`}>
									Buka
								</Link>
							</div>
						</div>
					</m.div>
				</div>
			</LazyMotion>
		</>
	);
}
