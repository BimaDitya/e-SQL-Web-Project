import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Public from "@/data/public.json";
import Typewriter from "typewriter-effect";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>Beranda</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <LazyMotion features={domAnimation}>
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
              <div className="button_default mt-2 w-max py-3">
                <Link href="/material">Belajar Sekarang</Link>
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
                    quality={75}
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
