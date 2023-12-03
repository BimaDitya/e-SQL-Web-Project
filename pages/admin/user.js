import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import Pagination from "@/components/Pagination";
import SideMenu from "@/components/Admin/SideMenu";
import DetailUser from "@/components/Modal/DetailUser";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m } from "framer-motion";
import DetailScore from "@/components/Modal/DetailScore";
import DetailProgress from "@/components/Modal/DetailProgress";

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  const token = context.req.cookies.token;
  if (!getCookies)
    return {
      redirect: {
        source: "/admin/user",
        destination: "/login",
        permanent: true,
      },
    };
  const account = await axios.get(
    process.env.BASE_URL + "/api/user/view-account",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const user = await axios.get(process.env.BASE_URL + "/api/admin/view-user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const accounts = account.data?.data;
  const users = user?.data?.data;
  if (accounts.Role !== "ADMIN")
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  return { props: { users, token, accounts } };
}
export default function User({ users, token, accounts }) {
  const [user, setUser] = useState();
  const [score, setScore] = useState();
  const [progress, setProgress] = useState();
  const [showScore, setShowScore] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const contentPerPage = 5;

  // Tampilkan Pengguna
  const lastUser = currentPage * contentPerPage;
  const firstUser = lastUser - contentPerPage;
  const records = users.slice(firstUser, lastUser);

  const totalPages = Math.ceil(users.length / contentPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  // Berpindah Pengguna
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
        <title>Admin - Pengguna</title>
        <link rel="icon" href="../icons/favicon.ico"></link>
      </Head>
      <LazyMotion features={domAnimation}>
        {/* Detail User Modal */}
        {showDetail ? (
          <DetailUser token={token} setShowDetail={setShowDetail} user={user} />
        ) : null}
        {/* Detail Skor Modal */}
        {showScore ? (
          <DetailScore
            token={token}
            score={score}
            setShowScore={setShowScore}
          />
        ) : null}
        {/* Detail Progress Modal */}
        {showProgress ? (
          <DetailProgress
            token={token}
            progress={progress}
            setShowProgress={setShowProgress}
          />
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
              className="z-30 h-max w-[25%] rounded-md border-2 border-gray-300 bg-transparent shadow backdrop-blur-sm"
            >
              <SideMenu accounts={accounts} />
            </m.div>
            {/* Kolom Kanan */}
            <m.div
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 50,
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="z-30 h-max w-[75%] space-y-2 rounded-md border-2 border-gray-300 bg-transparent p-2.5 shadow backdrop-blur-sm"
            >
              <div className="h-max w-full">
                {/* Baris Atas */}
                <div className="flex w-full flex-row items-center justify-between rounded">
                  <p className="pb-2 font-head text-xl font-bold text-secondary-400">
                    Daftar Pengguna
                  </p>
                </div>
                {/* Baris Bawah */}
                <div className="py-0">
                  <div className="overflow-auto">
                    <table className="w-full table-auto border-2 border-secondary-100">
                      <thead className="bg-secondary-100 text-left font-head text-sm uppercase text-white">
                        <tr>
                          <th scope="col" className="w-max py-2 pl-2.5">
                            Email
                          </th>
                          <th
                            scope="col"
                            className="w-max px-2 py-2 text-center"
                          >
                            Progres
                          </th>
                          <th
                            scope="col"
                            className="w-max px-2 py-2 text-center"
                          >
                            Skor
                          </th>
                          <th
                            scope="col"
                            className="w-max px-2 py-2 text-center"
                          >
                            Peng. Terbaru
                          </th>
                          <th scope="col" className="w-max px-2 py-2">
                            Role
                          </th>
                          <th
                            scope="col"
                            className="w-max px-2 py-2 text-center"
                          >
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-50 font-body text-sm text-gray-500">
                        {Object.values(records).map((Rows, index) => {
                          const totalScore = (Rows?.Score).reduce(
                            (accumulator, scoreElement) =>
                              accumulator + scoreElement.Score,
                            0,
                          );
                          return (
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
                              <td className="w-max py-2 pl-2.5 text-sm">
                                {Rows.Email.toUpperCase()}
                              </td>
                              <td className="w-max px-2 py-2 text-center">
                                <button
                                  disabled={
                                    Rows.Role === "ADMIN" ||
                                    Rows._count.Progress === 0
                                  }
                                  className="button-primary w-max disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
                                  onClick={() => {
                                    setShowProgress(true);
                                    setProgress(Rows);
                                  }}
                                >
                                  {`${Rows._count.Progress} Materi`}
                                </button>
                              </td>
                              <td className="w-max px-2 py-2 text-center">
                                <button
                                  disabled={
                                    Rows.Role === "ADMIN" || totalScore === 0
                                  }
                                  className="button-primary w-16 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
                                  onClick={() => {
                                    setShowScore(true);
                                    setScore(Rows);
                                  }}
                                >
                                  {totalScore}
                                </button>
                              </td>
                              <td className="w-max px-2 py-2 text-center">
                                {!Rows?.Score[Rows?.Score.length - 1]
                                  ?.SubmittedAt
                                  ? `-`
                                  : new Date(
                                      Rows?.Score[
                                        Rows.Score.length - 1
                                      ]?.SubmittedAt,
                                    ).toLocaleString()}
                              </td>
                              <td className="w-max px-2 py-2 text-center">
                                {Rows.Role}
                              </td>
                              <td className="w-max space-x-2 px-2 py-2 text-center">
                                <button
                                  disabled={Rows.Role === "ADMIN"}
                                  className="button-primary disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
                                  onClick={() => {
                                    setShowDetail(true);
                                    setUser(Rows);
                                  }}
                                >
                                  Detail
                                </button>
                              </td>
                            </m.tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  previous={previous}
                  numbers={numbers}
                  next={next}
                />
              </div>
            </m.div>
          </div>
        </div>
      </LazyMotion>
    </>
  );
}

User.getLayout = function getLayout(user) {
  return <MainLayout>{user}</MainLayout>;
};
