import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import Public from "@/data/public.json";
import Typewriter from "typewriter-effect";
const MainLayout = dynamic(() => import("@/components/Layout/MainLayout"));
const DetailUserGuide = dynamic(
  () => import("@/components/Modal/DetailUserGuide"),
);
import { LazyMotion, domAnimation, m } from "framer-motion";

export async function getServerSideProps(context) {
  const cookies = context?.req?.headers?.cookie || null;
  return {
    props: {
      cookies,
    },
  };
}

export default function Home({ cookies }) {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <>
      <Head>
        <title>Beranda</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <LazyMotion features={domAnimation}>
        {showDetail ? <DetailUserGuide setShowDetail={setShowDetail} /> : null}
        <div className="bg-white/50">
          <div className="mx-auto flex max-w-5xl flex-row">
            {/* Left Columns */}
            <div className="flex h-adaptive w-1/2 items-center justify-center">
              <m.div
                transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                className="z-30 space-y-2.5 rounded-md border-2 border-gray-300 bg-transparent px-4 py-6 shadow backdrop-blur-sm"
              >
                <div className="w-full text-left font-head text-xl font-bold">
                  <div className="inline-flex w-full text-secondary-400">
                    <p>Upgrade Skill & Pengetahuan SQL Kamu,&nbsp;</p>
                    <span className="text-xl text-primary-400">
                      <Typewriter
                        options={{
                          strings: ["Dimanapun!", "Kapanpun!"],
                          deleteSpeed: "natural",
                          autoStart: true,
                          loop: true,
                        }}
                      />
                    </span>
                  </div>
                </div>
                <p className="text-justify font-body text-gray-400">
                  {Public[0].index_desc}
                </p>
                <div className="flex flex-row space-x-4">
                  <div className="button-primary flex w-max flex-row space-x-2 py-3">
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
                  {cookies && (
                    <div className="button-secondary flex w-max flex-row space-x-2 py-3 ">
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
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                        />
                      </svg>
                      <Link href="/exam">Kerjakan Tes</Link>
                    </div>
                  )}
                </div>
              </m.div>
            </div>

            {/* Right Columns */}
            <div className="flex h-adaptive w-1/2 items-center justify-center">
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
                      width={360}
                      height={360}
                      quality={50}
                      priority
                    />
                  </div>
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </LazyMotion>
    </>
  );
}

Home.getLayout = function getLayout(home) {
  return <MainLayout>{home}</MainLayout>;
};
