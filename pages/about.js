import Head from "next/head";
import Image from "next/image";
import Public from "@/data/public.json";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import BasicCompetencies from "@/components/About/BasicCompetencies";
import AchievementIndicator from "@/components/About/AchievementIndicator";
import LearningObjective from "@/components/About/LearningObjective";

export default function Abouts() {
  // Tab
  const [tabs, setTabs] = useState(1);
  function switchTab(index) {
    setTabs(index);
  }
  return (
    <>
      <Head>
        <title>Tentang</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <LazyMotion features={domAnimation}>
        <div className="flex-row bg-white/50">
          {/* Baris Pertama */}
          <div className="flex h-adaptive items-center">
            {/* Kiri */}
            <m.div
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="z-30 ml-24 w-3/4 justify-start rounded-md border-2 border-gray-200 bg-transparent px-12 py-8 shadow-lg backdrop-blur-sm"
            >
              <p className="font-body text-gray-500">Tentang Pengembang</p>
              <p className="pb-2 font-head text-4xl font-bold text-secondary-400">
                Halo, Saya <span className="text-primary-400">Bima! 👋🏻</span>
              </p>
              <p className="text-justify font-body text-gray-500">
                {Public[1].about_desc}
              </p>
            </m.div>
            {/* Kanan */}
            <m.div
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mr-40 flex w-1/4 justify-end"
            >
              <div className="relative flex transition duration-300 ease-in-out hover:scale-110">
                <div className="z-10">
                  <Image
                    className="rounded-full"
                    src="/photos.png"
                    alt="My Photos"
                    width={210}
                    height={210}
                    quality={75}
                    priority
                  />
                </div>
              </div>
            </m.div>
          </div>

          {/* Baris Kedua */}
          <div className="flex h-adaptive w-full items-start pb-6 pt-10">
            {/* Kiri */}
            <m.div
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="z-30 ml-24 mr-2 w-1/4 rounded-md border-2 border-gray-200 bg-transparent px-4 py-4 shadow-lg backdrop-blur-sm"
            >
              <ul className="flex-row flex-wrap space-y-2">
                <li className="transition duration-300 ease-in-out">
                  <button
                    onClick={() => switchTab(1)}
                    className={`${
                      tabs === 1 ? "button-primary" : "button-default"
                    } w-full text-left text-lg`}
                  >
                    Kompetensi Dasar
                  </button>
                </li>
                <li className="transition duration-300 ease-in-out">
                  <button
                    onClick={() => switchTab(2)}
                    className={`${
                      tabs === 2 ? "button-primary" : "button-default"
                    } w-full text-left text-lg`}
                  >
                    Indikator Pencapaian
                  </button>
                </li>
                <li className="transition duration-300 ease-in-out">
                  <button
                    onClick={() => switchTab(3)}
                    className={`${
                      tabs === 3 ? "button-primary" : "button-default"
                    } w-full text-left text-lg`}
                  >
                    Tujuan Pembelajaran
                  </button>
                </li>
              </ul>
            </m.div>
            {/* Kanan */}
            {/* Tab Kompetensi Dasar */}
            <m.div
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`${
                tabs !== 1 && "hidden"
              } z-30 ml-2 mr-32 w-3/4 rounded-md border-2 border-gray-200 bg-transparent px-8 py-3.5 shadow-lg backdrop-blur-sm`}
            >
              <BasicCompetencies />
            </m.div>

            {/* Tab Indikator Pencapaian */}
            <m.div
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`${
                tabs !== 2 && "hidden"
              } z-30 ml-2 mr-32 w-3/4 rounded-md border-2 border-gray-200 bg-transparent px-8 py-3.5 shadow-lg backdrop-blur-sm`}
            >
              <AchievementIndicator />
            </m.div>

            {/* Tab Tujuan Pembelajaran */}
            <m.div
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`${
                tabs !== 3 && "hidden"
              } z-30 ml-2 mr-32 h-full w-3/4 rounded-md border-2 border-gray-200 bg-transparent px-8 py-3.5 shadow-lg backdrop-blur-sm`}
            >
              <LearningObjective />
            </m.div>
          </div>
        </div>
      </LazyMotion>
    </>
  );
}
Abouts.getLayout = function getLayout(about) {
  return <MainLayout>{about}</MainLayout>;
};