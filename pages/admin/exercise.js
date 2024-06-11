import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
const Pagination = dynamic(() => import("@/components/Pagination"));
const SideMenu = dynamic(() => import("@/components/Admin/SideMenu"));
const MainLayout = dynamic(() => import("@/components/Layout/MainLayout"));
const AddExercise = dynamic(() => import("@/components/Modal/AddExercise"));
const EditExercise = dynamic(() => import("@/components/Modal/EditExercise"));
const DeleteExercise = dynamic(
  () => import("@/components/Modal/DeleteExercise"),
);
import { LazyMotion, domAnimation, m } from "framer-motion";

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  const token = context.req.cookies.token;
  if (!getCookies) {
    if (!getCookies)
      return {
        redirect: {
          source: "/admin/exercise",
          destination: "/login",
          permanent: true,
        },
      };
  }
  const account = await axios.get(
    process.env.BASE_URL + "/api/user/view-account",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const exercise = await axios.get(
    process.env.BASE_URL + "/api/admin/view-exercise",
  );
  const material = await axios.get(
    process.env.BASE_URL + "/api/admin/view-material",
  );
  const exercises = exercise?.data?.viewExercise;
  const materials = material.data?.viewMaterial;
  const accounts = account.data?.data;
  if (accounts.Role !== "ADMIN")
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  return {
    props: { accounts, materials, exercises },
  };
}
export default function Content({ accounts, materials, exercises }) {
  const [exercise, setExercise] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const contentPerPage = 5;

  // Tampilkan Latihan
  const lastExercise = currentPage * contentPerPage;
  const firsExercise = lastExercise - contentPerPage;
  const records = exercises.slice(firsExercise, lastExercise);

  const totalPages = Math.ceil(exercises.length / contentPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  // Berpindah Latihan
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
  return (
    <>
      <Head>
        <title>Admin - Latihan</title>
        <link rel="icon" href="../icons/favicon.ico"></link>
      </Head>
      <LazyMotion features={domAnimation}>
        {/* Add Exercise Modal */}
        {showAdd ? (
          <AddExercise setShowAdd={setShowAdd} materials={materials} />
        ) : null}
        {/* Edit Exercise Modal */}
        {showEdit ? (
          <EditExercise
            setShowEdit={setShowEdit}
            materials={materials}
            exercise={exercise}
          />
        ) : null}
        {/* Delete Exercise Modal */}
        {showDelete ? (
          <DeleteExercise setShowDelete={setShowDelete} exercise={exercise} />
        ) : null}
        <div className="mx-auto flex h-adaptive max-w-5xl flex-row items-center">
          <div className="flex w-full flex-row space-x-2">
            {/* Kolom Kiri */}
            <m.div
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 50,
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="z-30 h-max w-[25%] rounded-md border-2
						border-gray-300 bg-white shadow backdrop-blur-sm"
            >
              <SideMenu accounts={accounts} />
            </m.div>
            {/* Kolom Kanan */}
            <m.div
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="z-30 h-max w-[75%] space-y-2 rounded-md border-2 border-gray-300 bg-white p-2.5 shadow backdrop-blur-sm"
            >
              {/* Baris Atas */}
              <div className="flex w-full flex-row items-center justify-between rounded">
                <p className="font-head text-xl font-bold text-secondary-400">
                  Daftar Latihan
                </p>
                <button
                  className="button-primary flex flex-row pl-2 pr-4"
                  onClick={() => setShowAdd(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                  Latihan
                </button>
              </div>
              {/* Baris Bawah */}
              <div className="py-0">
                <div className="overflow-auto">
                  <table className="w-full table-auto border-2 border-secondary-100">
                    <thead className="bg-secondary-100 text-left font-head uppercase text-white">
                      <tr>
                        <th scope="col" className="w-max px-2 py-2 text-center">
                          #
                        </th>
                        <th scope="col" className="w-max px-2 py-2">
                          Judul Soal
                        </th>
                        <th scope="col" className="w-max px-2 py-2">
                          Sub-Materi
                        </th>
                        <th scope="col" className="w-max px-2 py-2 text-center">
                          Skor
                        </th>
                        <th scope="col" className="w-max px-2 py-2 text-center">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-50 font-body text-gray-500">
                      {Object.values(records).map((Rows, index) => (
                        <m.tr
                          key={Rows.Id}
                          transition={{
                            duration: 1,
                            type: "spring",
                            stiffness: 50,
                            delay: index * 0.25,
                          }}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="border-b-2 border-secondary-100"
                        >
                          <td className="w-max px-0.5 py-1.5 text-center">
                            {Rows?.Id}
                          </td>
                          <td className="w-max px-0.5 py-1.5">{Rows?.Title}</td>
                          <td className="max-w-xs px-0.5 py-1.5 text-justify">
                            {Rows?.Material.Title}
                          </td>
                          <td className="max-w-xs px-0.5 py-1.5 text-center">
                            {Rows?.Score}
                          </td>
                          <td className="w-max space-x-2 px-0.5 py-1.5 text-center">
                            <button
                              className="button-primary"
                              onClick={() => {
                                setShowEdit(true);
                                setExercise(Rows);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="button-danger"
                              onClick={() => {
                                setShowDelete(true);
                                setExercise(Rows);
                              }}
                            >
                              Hapus
                            </button>
                          </td>
                        </m.tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    previous={previous}
                    numbers={numbers}
                    next={next}
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

Content.getLayout = function getLayout(content) {
  return <MainLayout>{content}</MainLayout>;
};
