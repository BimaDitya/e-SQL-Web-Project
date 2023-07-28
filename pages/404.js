import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Halaman Tidak Ditemukan</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <div className="mx-16 mt-8 flex h-adaptive flex-col items-center justify-center rounded border-2 border-gray-200 bg-transparent shadow-lg backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center">
          <Image
            className="transition duration-300 ease-in-out hover:scale-110"
            src="/illustrations/404.svg"
            width={360}
            height={360}
            alt="Page Not Found"
          />
          <p className="pb-8 font-head text-2xl font-bold tracking-wider text-red-400">
            Halaman Tidak Ditemukan
          </p>
        </div>
        <Link
          href="/"
          className="font-body text-lg font-semibold text-secondary-200 transition duration-300 ease-in-out hover:text-primary-400"
        >
          Kembali Ke Beranda
        </Link>
      </div>
    </>
  );
}
