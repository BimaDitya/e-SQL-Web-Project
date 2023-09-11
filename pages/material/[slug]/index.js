import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Card from "@/components/Card/SubMaterial";
import Pagination from "@/components/Pagination";
import ExerciseCard from "@/components/Card/Exercise";
import NavbarMaterial from "@/components/Navbar/Material";
import { LazyMotion, domAnimation, m } from "framer-motion";

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
  const viewStatus = await axios
    .get(process.env.BASE_URL + "/api/user/view-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        queryMaterial: queryMaterial,
      },
    })
    .then((response) => response.data);
  const viewContent = viewMaterial?.viewMaterial?.Content;
  const viewExercise = viewMaterial?.viewMaterial?.Exercise;
  return {
    props: {
      materials: viewMaterial,
      exercises: viewExercise,
      contents: viewContent,
      status: viewStatus,
    },
  };
}

export default function SubMaterial({
  materials,
  exercises,
  contents,
  status,
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
  return (
    <div className="max-width max-height">
      <Head>
        <title>Materi</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <NavbarMaterial material={material} status={status} />
      <LazyMotion features={domAnimation}>
        <div className="flex flex-row space-x-2 px-12 pb-6 pt-14">
          {/* Kolom Kiri */}
          <m.div
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 50,
            }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-30 h-max w-3/5 rounded-md border-2 border-gray-200 bg-transparent p-2.5 backdrop-blur-sm"
          >
            <div className="flex justify-between pb-1.5 text-center font-head text-gray-400">
              <ul className="flex flex-wrap items-center">
                <li className="transition duration-300 ease-in-out">
                  <button
                    onClick={() => switchTab(1)}
                    className={`menu-${
                      tabs === 1 ? "active" : "default"
                    }-state`}
                  >
                    Materi
                  </button>
                </li>
                <li className="transition duration-300 ease-in-out">
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
              <button
                type="submit"
                onClick={() => {
                  router.push(router.asPath);
                }}
                className="button-primary mx-5 px-3 py-2"
              >
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
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>

            {/* Tab Materi */}
            <div
              className={`space-y-2.5 ${
                tabs !== 1 && "hidden"
              } transition duration-300 ease-in-out`}
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
              className={`space-y-2.5 ${
                tabs !== 2 && "hidden"
              } transition duration-300 ease-in-out`}
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
            {/* Baris Atas */}
            <m.div
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 50,
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-max space-y-2 rounded-md border-2 border-gray-200 bg-transparent px-4 py-2.5 backdrop-blur-sm"
            >
              <p className="font-head text-xl font-semibold text-secondary-400">
                Tentang Materi
              </p>
              <p className="text-clip text-justify font-body text-gray-500">
                {material.Desc}
              </p>
              <div className="flex flex-row space-x-2 rounded bg-gray-100 px-4 py-2">
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
      </LazyMotion>
    </div>
  );
}
