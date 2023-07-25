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
      <div className="flex flex-col justify-center items-center h-adaptive bg-transparent backdrop-blur-sm rounded mt-8 mx-16 border-2 border-gray-200 shadow-lg">
        <div className="flex flex-col justify-center items-center">
          <Image
            className="transition ease-in-out hover:scale-110 duration-300"
            src="/illustrations/404.svg"
            width={360}
            height={360}
            alt="Page Not Found"
          />
          <p className="text-2xl font-bold font-head tracking-wider text-red-400 pb-8">
            Halaman Tidak Ditemukan
          </p>
        </div>
        <Link
          href="/"
          className="transition ease-in-out font-body text-lg font-semibold text-secondary-200 hover:text-primary-400 duration-300"
        >
          Kembali Ke Beranda
        </Link>
      </div>
    </>
  );
}
