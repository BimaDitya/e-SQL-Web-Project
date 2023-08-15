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
            <div className="flex h-[85vh] items-center justify-center">
              <div className="mx-8 flex h-max flex-col items-center space-y-4 rounded border-2 border-gray-200 bg-transparent p-10 shadow backdrop-blur-sm">
                <Image
                  className="transition duration-300 ease-in-out hover:scale-110"
                  src="/illustrations/website.svg"
                  width={200}
                  height={200}
                  alt="Desktop Access Only"
                />
                <p className="text-center font-head text-xl font-bold tracking-wider text-secondary-400">
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
