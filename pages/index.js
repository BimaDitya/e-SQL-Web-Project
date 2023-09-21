import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import Public from "@/data/public.json";
import Typewriter from "typewriter-effect";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m } from "framer-motion";
import DetailUserGuide from "@/components/Modal/DetailUserGuide";

export default function Home() {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <>
      <Head>
        <title>Beranda</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <LazyMotion features={domAnimation}>
        {showDetail ? <DetailUserGuide setShowDetail={setShowDetail} /> : null}
        <div className="columns-2 bg-white/50">
          {/* Left Columns */}
          <div className="ml-20 flex h-adaptive items-center justify-center p-0">
            <m.div
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="z-30 rounded-md border-2 border-gray-200 bg-transparent px-10 py-8 shadow-lg backdrop-blur-sm"
            >
              <div className="py-2 font-head text-2xl font-bold text-secondary-400">
                Upgrade Skill & Pengetahuan
                <span className="text-2xl text-primary-400"> SQL</span> Kamu,
                <span className="text-2xl text-primary-400">
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
              <p className="pr-2 text-justify font-body text-gray-500">
                {Public[0].index_desc}
              </p>
              <div className="flex flex-row space-x-4">
                <div className="button-primary mt-2 flex w-max flex-row space-x-2 py-3 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="square"
                      strokeLinejoin="round"
                      d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                    />
                  </svg>

                  <Link href="/material">Belajar Sekarang</Link>
                </div>
                <div className="button-secondary mt-2 flex w-max flex-row space-x-2 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="square"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                  <button
                    onClick={() => {
                      setShowDetail(true);
                    }}
                  >
                    Baca Panduan
                  </button>
                </div>
              </div>
            </m.div>
          </div>

          {/* Right Columns */}
          <div className="mr-16 flex h-adaptive items-center justify-center p-0">
            <m.div
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="z-30"
            >
              <div className="relative flex transition duration-300 ease-in-out hover:scale-110">
                <div className="z-10">
                  <Image
                    src="illustrations/studying.svg"
                    alt="Homepage Illustration"
                    width={400}
                    height={400}
                    quality={50}
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
