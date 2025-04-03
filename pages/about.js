import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import Public from "@/data/public.json";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m } from "framer-motion";
import BasicCompetencies from "@/components/About/BasicCompetencies";
import LearningObjective from "@/components/About/LearningObjective";
import AchievementIndicator from "@/components/About/AchievementIndicator";

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
        <div className="flex-row">
          {/* Baris Pertama */}
          <div className="flex h-adaptive items-center">
            {/* Kiri */}
            <m.div
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="z-30 ml-24 w-[65%] justify-start rounded-md border-2 border-gray-200 bg-white px-6 py-3 shadow transition-colors duration-300 ease-in-out dark:border-gray-400 dark:bg-gray-600"
            >
              <p className="pb-2 font-head text-2xl font-bold text-secondary-400 dark:text-sky-200">
                Halo 👋🏻, Dengan
                <span className="text-primary-400">{` Bima `}</span>
                Disini!
              </p>
              <p className="text-justify font-body text-gray-400">
                {Public[1].about_desc}
              </p>
            </m.div>
            {/* Kanan */}
            <m.div
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mr-40 flex w-[35%] justify-end"
            >
              <div className="relative flex grayscale transition duration-300 ease-in-out hover:cursor-pointer hover:grayscale-0">
                <div className="z-10">
                  <Image
                    className="rounded-full"
                    src="/photos.png"
                    alt="My Photos"
                    priority
                    width={256}
                    height={256}
                    quality={100}
                  />
                </div>
              </div>
            </m.div>
          </div>
        </div>
      </LazyMotion>
    </>
  );
  {
    /* Baris Kedua */
  }
  <div className="invisible relative flex h-adaptive w-full items-center px-20">
    {/* Kiri */}
    <div className="flex h-max w-2/5 flex-row">
      <m.div
        transition={{
          delay: 0.2,
          duration: 0.8,
          type: "spring",
          stiffness: 100,
        }}
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        className="z-30 h-max w-[92.5%] rounded-md border-2 border-gray-200 bg-white px-4 py-4 shadow transition-colors duration-300 ease-in-out dark:border-gray-400 dark:bg-gray-600"
      >
        <ul className="w-full flex-row space-y-2">
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
    </div>
    {/* Kanan */}
    {/* Tab Kompetensi Dasar */}
    <m.div
      transition={{
        delay: 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      }}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      className={`${
        tabs !== 1 && "hidden"
      } z-30 w-full rounded-md border-2 border-gray-200 bg-white px-6 py-3.5 shadow transition-colors duration-300 ease-in-out dark:border-gray-400 dark:bg-gray-600`}
    >
      <BasicCompetencies />
    </m.div>
    {/* Tab Indikator Pencapaian */}
    <m.div
      transition={{
        delay: 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      }}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      className={`${
        tabs !== 2 && "hidden"
      } z-30 w-full rounded-md border-2 border-gray-200 bg-white px-6 py-3.5 shadow transition-colors duration-300 ease-in-out dark:border-gray-400 dark:bg-gray-600`}
    >
      <AchievementIndicator />
    </m.div>

    {/* Tab Tujuan Pembelajaran */}
    <m.div
      transition={{
        delay: 0.2,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
      }}
      initial={{ opacity: 0, x: 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      className={`${
        tabs !== 3 && "hidden"
      } z-30 w-full rounded-md border-2 border-gray-200 bg-white px-6 py-3.5 shadow transition-colors duration-300 ease-in-out dark:border-gray-400 dark:bg-gray-600`}
    >
      <LearningObjective />
    </m.div>
  </div>;
}
Abouts.getLayout = function getLayout(about) {
  return <MainLayout>{about}</MainLayout>;
};
