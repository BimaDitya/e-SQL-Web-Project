import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useCookies } from "react-cookie";
import Device from "../Device/Module";
const Navbar = dynamic(import("@/components/Navbar/Main"), { ssr: false });

export default function MainLayout({ children }) {
	const cookies = useCookies("token")[0]?.token || "";
	const fetcher = async () => {
		const response = await axios.get(`/api/user/view-account`, {
			headers: {
				Authorization: `Bearer ${cookies}`,
			},
		});
		return response?.data?.data;
	};
	const { data, isLoading } = useSWR(`MainNavbar`, fetcher);

	return (
		<Device>
			{({ isMobile }) => {
				if (isMobile)
					return (
						<div className="h-[85vh] flex justify-center items-center">
							<div className="flex p-10 flex-col items-center h-max bg-transparent backdrop-blur-sm rounded mx-8 border-2 border-gray-200 shadow space-y-4">
								<Image
									className="transition ease-in-out hover:scale-110 duration-300"
									src="/illustrations/website.svg"
									width={200}
									height={200}
									alt="Desktop Access Only"
								/>
								<p className="text-xl text-center font-bold font-head tracking-wider text-secondary-400">
									Saat Ini Web Hanya Dapat Diakases Melalui Akses Melalui
									PC/Laptop 💻
								</p>
							</div>
						</div>
					);
				return (
					<div className="max-width max-height">
						<Navbar data={data} cookies={cookies} isLoading={isLoading} />
						<main>{children}</main>
					</div>
				);
			}}
		</Device>
	);
}
