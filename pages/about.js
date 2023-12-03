import Head from "next/head";
import Image from "next/image";
import Public from "@/data/public.json";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m } from "framer-motion";
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
              className="z-30 ml-24 w-[65%] justify-start rounded-md border-2 border-gray-300 bg-transparent px-10 py-6 shadow backdrop-blur-sm"
            >
              <p className="pb-2 font-head text-2xl font-bold text-secondary-400">
                Halo 👋🏻, Dengan{" "}
                <span className="text-primary-400">{` Bima `}</span>
                Disini!
              </p>
              <p className="text-justify font-body text-gray-400">
                {Public[1].about_desc}
              </p>
            </m.div>
            {/* Kanan */}
            <m.div
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="mr-40 flex w-[35%] justify-end"
            >
              <div className="relative flex transition duration-300 ease-in-out hover:scale-110">
                <div className="z-10">
                  <Image
                    className="rounded-full"
                    src="/photos.png"
                    alt="My Photos"
                    width={225}
                    height={225}
                    quality={50}
                    priority
                  />
                </div>
              </div>
            </m.div>
          </div>

          {/* Baris Kedua */}
          <div className="relative flex h-adaptive w-full items-center">
            {/* Kiri */}
            <div className="flex h-max flex-row">
              <m.div
                transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="z-30 ml-24 h-max w-1/4 rounded-md border-2 border-gray-300 bg-transparent px-4 py-4 shadow backdrop-blur-sm"
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
                } z-30 ml-2 mr-32 w-3/4 rounded-md border-2 border-gray-300 bg-transparent px-6 py-3.5 shadow backdrop-blur-sm`}
              >
                <BasicCompetencies />
              </m.div>
            </div>
            {/* Tab Indikator Pencapaian */}
            <m.div
              transition={{ duration: 0.5, type: "spring", stiffness: 50 }}
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              className={`${
                tabs !== 2 && "hidden"
              } z-30 ml-2 mr-32 w-3/4 rounded-md border-2 border-gray-300 bg-transparent px-6 py-3.5 shadow backdrop-blur-sm`}
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
              } z-30 ml-2 mr-32 h-full w-3/4 rounded-md border-2 border-gray-300 bg-transparent px-6 py-3.5 shadow backdrop-blur-sm`}
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
