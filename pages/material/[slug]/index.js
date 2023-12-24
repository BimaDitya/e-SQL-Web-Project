import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Card from "@/components/Card/SubMaterial";
import Pagination from "@/components/Pagination";
import ExerciseCard from "@/components/Card/Exercise";
import NavbarMaterial from "@/components/Navbar/Material";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  const queryMaterial = context.query.slug;
  const token = context.req.cookies.token;
  if (!getCookies) {
    context.res.writeHead(302, {
      Location: "/login",
    });
    context.res.end();
  }
  const viewMaterial = await axios
    .get(process.env.BASE_URL + "/api/user/view-material", {
      params: {
        queryMaterial: queryMaterial,
      },
    })
    .then((response) => response.data);
  const viewMaterialId = viewMaterial?.viewMaterial?.Id;
  const viewProgress = await axios
    .get(process.env.BASE_URL + "/api/user/view-progress-material", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        viewMaterialId: viewMaterialId,
      },
    })
    .then((response) => response.data);
  const viewContent = viewMaterial?.viewMaterial?.Content;
  const viewExercise = viewMaterial?.viewMaterial?.Exercise;

  // Progres Semua Materi
  const progressDDL = await axios
    .get(process.env.BASE_URL + "/api/user/progress/data-definition-language", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data?.viewProgress[0]?._count?.Progress);
  const progressDML = await axios
    .get(
      process.env.BASE_URL + "/api/user/progress/data-manipulation-language",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .then((response) => response.data?.viewProgress[0]?._count?.Progress);
  const progressDCL = await axios
    .get(process.env.BASE_URL + "/api/user/progress/data-control-language", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data?.viewProgress[0]?._count?.Progress);
  const progressJoin = await axios
    .get(process.env.BASE_URL + "/api/user/progress/multitable-join", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data?.viewProgress[0]?._count?.Progress);
  const progressAF = await axios
    .get(process.env.BASE_URL + "/api/user/progress/aggregate-function", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data?.viewProgress[0]?._count?.Progress);
  return {
    props: {
      materials: viewMaterial,
      exercises: viewExercise,
      progress: viewProgress,
      contents: viewContent,
      queryMaterial,
      progressDDL,
      progressDML,
      progressDCL,
      progressJoin,
      progressAF,
    },
  };
}

export default function SubMaterial({
  queryMaterial,
  materials,
  exercises,
  progress,
  contents,
  progressDDL,
  progressDML,
  progressDCL,
  progressJoin,
}) {
  // Tab
  const [tabs, setTabs] = useState(1);
  function switchTab(index) {
    setTabs(index);
  }

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [currentExercise, setCurrentExercise] = useState(1);
  const contentPerPage = 5;
  const exercisePerPage = 5;

  // Tampilkan Konten
  const lastContent = currentPage * contentPerPage;
  const firstContent = lastContent - contentPerPage;
  const records = contents.slice(firstContent, lastContent);

  const totalPages = Math.ceil(contents.length / contentPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  // Tampilkan Latihan
  const lastExercise = currentExercise * exercisePerPage;
  const firstExercise = lastExercise - exercisePerPage;
  const exercise = exercises.slice(firstExercise, lastExercise);

  const totalPagesExercise = Math.ceil(exercises.length / exercisePerPage);
  const numbersExercise = [...Array(totalPages + 1).keys()].slice(1);

  // Berpindah Konten
  function previous() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function next() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  // Berpindah Latihan
  function previousExercise() {
    if (currentExercise !== 1) {
      setCurrentExercise(currentExercise - 1);
    }
  }
  function nextExercise() {
    if (currentExercise !== totalPagesExercise) {
      setCurrentExercise(currentExercise + 1);
    }
  }
  const material = materials.viewMaterial;
  const router = useRouter();

  const allowedViews = (
    <div className="max-width h-adaptive">
      <Head>
        <title>Materi</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <NavbarMaterial material={material} progress={progress} />
      <LazyMotion features={domAnimation}>
        <div className="mx-auto flex h-full max-w-5xl flex-row items-center space-x-2">
          <div className="flex h-[85%] flex-row space-x-2.5">
            {/* Kolom Kiri */}
            <m.div
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="z-30 h-full w-3/5 space-y-1.5 rounded-md border-2 border-gray-300 bg-transparent px-2 py-2.5 shadow backdrop-blur-sm"
            >
              <div className="flex w-full justify-between rounded border border-gray-200 bg-white px-2.5 py-0.5 text-center font-head text-gray-400">
                <ul className="flex w-full flex-row items-center">
                  <li className="w-full transition duration-300 ease-in-out">
                    <button
                      onClick={() => switchTab(1)}
                      className={`menu-${
                        tabs === 1 ? "active" : "default"
                      }-state`}
                    >
                      Materi
                    </button>
                  </li>
                  <li className="w-full transition duration-300 ease-in-out">
                    <button
                      onClick={() => switchTab(2)}
                      className={`menu-${
                        tabs === 2 ? "active" : "default"
                      }-state`}
                    >
                      Latihan
                    </button>
                  </li>
                </ul>
              </div>

              {/* Tab Materi */}
              <div
                className={`space-y-1.5 ${
                  tabs !== 1 && "hidden"
                } flex h-max flex-col justify-between transition duration-300 ease-in-out`}
              >
                {Object.values(records).map((record, index) => (
                  <Card
                    index={index}
                    key={index}
                    content={record}
                    material={material}
                  />
                ))}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  previous={previous}
                  numbers={numbers}
                  next={next}
                />
              </div>

              {/* Tab Latihan */}
              <div
                className={`space-y-1.5 ${
                  tabs !== 2 && "hidden"
                } flex h-max flex-col justify-between transition duration-300 ease-in-out`}
              >
                {Object.values(exercise).map((exercise, index) => (
                  <>
                    <ExerciseCard
                      index={index}
                      key={index}
                      exercise={exercise}
                      material={material}
                    />
                  </>
                ))}
                <Pagination
                  currentPage={currentExercise}
                  totalPages={totalPagesExercise}
                  previous={previousExercise}
                  numbers={numbersExercise}
                  next={nextExercise}
                />
              </div>
            </m.div>
            {/* Kolom Kanan */}
            <div className="z-30 w-2/5 space-y-2">
              <m.div
                transition={{
                  duration: 0.5,
                  type: "spring",
                  stiffness: 50,
                }}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                className="h-max space-y-2 rounded-md border-2 border-gray-300 bg-transparent px-4 py-4 shadow backdrop-blur-sm"
              >
                <p className="font-head text-xl font-semibold text-secondary-400">
                  Tentang Materi
                </p>
                <p className="text-clip text-justify font-body text-gray-400">
                  {material.Desc}
                </p>
                <div className="flex flex-row space-x-2 rounded bg-gray-200 px-4 py-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="rgb(255 190 103)"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="rgb(255 158 26)"
                    className="h-6 w-6 border-primary-100"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
                    />
                  </svg>
                  <p className="font-head font-medium text-secondary-400">
                    Total Materi: {material._count.Content}
                  </p>
                </div>
              </m.div>
            </div>
          </div>
        </div>
      </LazyMotion>
    </div>
  );
  const disallowedViews = (
    <>
      <Head>
        <title>Materi</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <NavbarMaterial material={material} progress={progress} />
      <LazyMotion features={domAnimation}>
        <div className="max-width flex h-adaptive flex-col justify-center">
          <m.div
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 50,
            }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto flex h-3/4 w-3/4 flex-col items-center justify-center rounded-md border-2 border-gray-300 bg-transparent shadow backdrop-blur-sm"
          >
            <div className="flex flex-col items-center justify-center pb-12">
              <Image
                className="transition duration-300 ease-in-out hover:scale-110"
                src="/illustrations/notebook.svg"
                width={300}
                height={300}
                quality={50}
                priority={false}
                alt="Restricted Content"
              />
              <p className="font-head text-2xl font-bold tracking-wider text-secondary-400">
                Anda Belum Menyelesaikan Materi Sebelumnya
              </p>
            </div>
          </m.div>
        </div>
      </LazyMotion>
    </>
  );

  if (queryMaterial === "data-definition-language") {
    return allowedViews;
  } else if (queryMaterial === "data-manipulation-language") {
    const isComplete = progressDDL === 10;
    if (isComplete) {
      return allowedViews;
    } else {
      return disallowedViews;
    }
  } else if (queryMaterial === "data-control-language") {
    const isComplete = progressDML === 7;
    if (isComplete) {
      return allowedViews;
    } else {
      return disallowedViews;
    }
  } else if (queryMaterial === "multitable") {
    const isComplete = progressDCL === 2;
    if (isComplete) {
      return allowedViews;
    } else {
      return disallowedViews;
    }
  } else if (queryMaterial === "aggregate-function") {
    const isComplete = progressJoin === 3;
    if (isComplete) {
      return allowedViews;
    } else {
      return disallowedViews;
    }
  }
}
