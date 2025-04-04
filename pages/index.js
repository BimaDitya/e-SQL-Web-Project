import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import Public from "@/data/public.json";
import Typewriter from "typewriter-effect";
import { LazyMotion, domAnimation, m } from "framer-motion";
import DetailUserGuide from "@/components/Modal/DetailUserGuide";
const MainLayout = dynamic(() => import("@/components/Layout/MainLayout"));

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
        <div className="mx-auto flex max-w-5xl flex-row">
          {/* Left Columns */}
          <div className="flex h-adaptive w-1/2 items-center justify-center">
            <m.div
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="z-30 space-y-2.5 rounded-md border-2 border-gray-300 bg-white px-4 py-3.5 shadow dark:border-gray-400 dark:bg-gray-600"
            >
              <div className="w-full text-left font-head text-xl font-bold">
                <div className="inline-flex w-full text-secondary-400 dark:text-sky-200">
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
                  <div className="button-secondary flex w-max flex-row space-x-2 py-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
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
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="z-30"
            >
              <div className="relative flex transition duration-300 ease-in-out hover:scale-110">
                <div className="z-10">
                  <Image
                    src="illustrations/studying.svg"
                    alt="Studying"
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
      </LazyMotion>
    </>
  );
}

Home.getLayout = function getLayout(home) {
  return <MainLayout>{home}</MainLayout>;
};
