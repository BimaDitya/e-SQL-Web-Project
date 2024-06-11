import useSWR from "swr";
import axios from "axios";
import Image from "next/image";
import dynamic from "next/dynamic";
import Device from "../Device/Module";
import { useCookies } from "react-cookie";
import Head from "next/head";
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
            <html lang="en">
              <Head>
                <title>Desktop Access Only</title>
              </Head>
              <div className="flex h-screen items-center justify-center">
                <div className="flex h-max w-1/2 flex-col items-center space-y-4 rounded border-2 border-gray-200 bg-transparent p-10 shadow backdrop-blur-sm">
                  <Image
                    className="transition duration-300 ease-in-out hover:scale-110"
                    src="/illustrations/website.svg"
                    loading="eager"
                    quality={25}
                    width={150}
                    height={150}
                    alt="Desktop Access Only"
                  />
                  <p className="text-center font-head text-xl font-bold tracking-wider text-secondary-400">
                    Saat Ini Web Hanya Dapat Diakases Melalui Akses Melalui
                    PC/Laptop 💻
                  </p>
                </div>
              </div>
            </html>
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
