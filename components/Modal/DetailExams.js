import { useState } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Pagination from "../Pagination";
const CodeInput = dynamic(import("@/components/CodeEditor"), {
  ssr: false,
});

export default function DetailExams({ setShowExams, exams }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [tabs, setTabs] = useState(1);
  function switchTab(index) {
    setTabs(index);
  }
  const pretestDuration = exams?.Durations.filter(
    (item) => item.Test === "Pretest",
  );
  const posttestDuration = exams?.Durations.filter(
    (item) => item.Test === "Posttest",
  );

  const pretestExams = exams?.Result.filter((item) => item.Test === "Pretest");
  const postestExams = exams?.Result.filter((item) => item.Test === "Posttest");

  const start = (currentPage - 1) * 1;
  const end = start + 1;
  const pretestPagination = pretestExams.slice(start, end);
  const posttestPagination = postestExams.slice(start, end);

  const prevPretest = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const nextPretest = () => {
    setCurrentPage((prev) =>
      Math.min(Math.ceil(pretestExams.length / 1), prev + 1),
    );
  };

  const prevPosttest = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const nextPosttest = () => {
    setCurrentPage((prev) =>
      Math.min(Math.ceil(postestExams.length / 1), prev + 1),
    );
  };

  function pretestFormat(slug) {
    const formattedString = slug
      .replace(/^pretest-/, "")
      .replace(/-/g, " ")
      .replace(/\d/g, "");

    const capitalizedString = formattedString.replace(/\b\w/g, (match) =>
      match.toUpperCase(),
    );
    return capitalizedString;
  }
  function posttestFormat(slug) {
    const formattedString = slug
      .replace(/^posttest-/, "")
      .replace(/-/g, " ")
      .replace(/\d/g, "");

    const capitalizedString = formattedString.replace(/\b\w/g, (match) =>
      match.toUpperCase(),
    );
    return capitalizedString;
  }
  const workTime = (times) => {
    let [minute, second] = times.split(":").map(Number);
    let usedTime = minute * 60 + second * 1;
    const initialTime = 1800;
    const resultTime = initialTime - usedTime;
    const workMinute = Math.floor(resultTime / 60);
    const workSecond = resultTime % 60;
    return `${workMinute}:${workSecond < 10 ? "0" : ""}${workSecond}`;
  };
  const pretestScore = pretestExams.length;
  const posttestScore = postestExams.length;
  return (
    <LazyMotion features={domAnimation}>
      <div className="flex h-auto w-full items-center justify-center">
        <m.div
          transition={{
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500/50"
        >
          <div className="h-[80%] w-[80%] space-y-2 rounded-lg bg-white px-8 py-4 shadow">
            <div className="flex flex-row items-center justify-between">
              <p className="font-head text-xl font-semibold text-secondary-400">
                Detail Hasil Tes
              </p>
              <button
                onClick={() => setShowExams(false)}
                className="rounded-lg bg-gray-200 p-2 font-head text-gray-400 duration-300 ease-in-out hover:cursor-pointer hover:bg-red-400 hover:text-white hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-[90%] space-y-1.5 overflow-scroll">
              <div className="flex w-full justify-between rounded border border-gray-200 bg-gray-100 px-2.5 text-center font-head text-gray-400">
                <ul className="flex w-full flex-row items-center">
                  <li className="w-full transition duration-300 ease-in-out">
                    <button
                      onClick={() => switchTab(1)}
                      className={`menu-${
                        tabs === 1 ? "active" : "default"
                      }-state`}
                    >
                      Pretest
                    </button>
                  </li>
                  <li className="w-full transition duration-300 ease-in-out">
                    <button
                      onClick={() => switchTab(2)}
                      className={`menu-${
                        tabs === 2 ? "active" : "default"
                      }-state`}
                    >
                      Posttest
                    </button>
                  </li>
                </ul>
              </div>

              {/* Tab Pretest */}
              <div
                className={`space-y-1.5 ${
                  tabs !== 1 && "hidden"
                } flex h-max flex-col justify-between transition duration-300 ease-in-out`}
              >
                <div className="flex w-full flex-col justify-between rounded border border-gray-200 bg-gray-100 px-2.5 py-1.5 font-head">
                  <div className="flex flex-col items-start font-head text-secondary-400">
                    <div className="flex w-full flex-row space-x-8">
                      <div className="flex w-max flex-row text-gray-600">
                        <span>Selesai:&nbsp;</span>
                        <span className="text-secondary-400">
                          {pretestDuration[0]
                            ? new Date(
                                pretestDuration[0]?.End_Time,
                              ).toLocaleString("in-IN", {
                                timeZone: "Asia/Jakarta",
                              })
                            : "Pengguna Belum Mulai Mengerjakan"}
                        </span>
                      </div>
                      <div className="flex w-max flex-row text-gray-600">
                        <span>Durasi:&nbsp;</span>
                        <span className="text-secondary-400">
                          {pretestDuration[0]
                            ? workTime(pretestDuration[0]?.Duration)
                            : "00:00"}
                        </span>
                      </div>
                      <div className="flex w-max flex-row text-gray-600">
                        <span>Nilai:&nbsp;</span>
                        <span className="text-secondary-400">
                          {pretestScore ? pretestScore * 12.5 : "0"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {Object.values(pretestPagination).map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col justify-between rounded border border-gray-200 bg-gray-100 px-2.5 py-2 font-head"
                  >
                    <div className="flex w-full flex-row items-center justify-between text-secondary-400">
                      <span className="text-lg font-bold text-primary-400">
                        {pretestFormat(item?.Slug).toUpperCase()}
                      </span>
                      <div className="flex flex-row text-gray-600">
                        Keterangan:&nbsp;
                        {item?.Complete === "TRUE" ? (
                          <p className="text-green-500">Tuntas</p>
                        ) : (
                          <p className="text-red-500">Belum Tuntas</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="font-head font-semibold text-secondary-400">
                        Jawaban:&nbsp;
                      </span>
                      <CodeInput answers={item?.Answer} />
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={pretestExams.length}
                      previous={prevPretest}
                      next={nextPretest}
                    />
                  </div>
                ))}
              </div>

              {/* Tab Posttest */}
              <div
                className={`space-y-1.5 ${
                  tabs !== 2 && "hidden"
                } flex h-max flex-col justify-between transition duration-300 ease-in-out`}
              >
                <div className="flex w-full flex-col justify-between rounded border border-gray-200 bg-gray-100 px-2.5 py-1.5 font-head">
                  <div className="flex flex-col items-start font-head text-secondary-400">
                    <div className="flex w-full flex-row space-x-8">
                      <div className="flex w-max flex-row text-gray-600">
                        <span>Selesai:&nbsp;</span>
                        <span className="text-secondary-400">
                          {posttestDuration[0]
                            ? new Date(
                                posttestDuration[0]?.End_Time,
                              ).toLocaleString("in-IN", {
                                timeZone: "Asia/Jakarta",
                              })
                            : "Pengguna Belum Mulai Mengerjakan"}
                        </span>
                      </div>
                      <div className="flex w-max flex-row text-gray-600">
                        <span>Durasi:&nbsp;</span>
                        <span className="text-secondary-400">
                          {posttestDuration[0]
                            ? workTime(posttestDuration[0]?.Duration)
                            : "00:00"}
                        </span>
                      </div>
                      <div className="flex w-max flex-row text-gray-600">
                        <span>Nilai:&nbsp;</span>
                        <span className="text-secondary-400">
                          {posttestScore ? posttestScore * 12.5 : "0"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {Object.values(posttestPagination).map((item, index) => (
                  <div
                    key={index}
                    className="flex w-full flex-col justify-between rounded border border-gray-200 bg-gray-100 px-2.5 py-2 font-head"
                  >
                    <div className="flex w-full flex-row items-center justify-between text-secondary-400">
                      <span className="text-lg font-bold text-primary-400">
                        {posttestFormat(item?.Slug).toUpperCase()}
                      </span>
                      <div className="flex flex-row text-gray-600">
                        Keterangan:&nbsp;
                        {item?.Complete === "TRUE" ? (
                          <p className="text-green-500">Tuntas</p>
                        ) : (
                          <p className="text-red-500">Belum Tuntas</p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <span className="font-head font-semibold text-secondary-400">
                        Jawaban:&nbsp;
                      </span>
                      <CodeInput answers={item?.Answer} />
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={postestExams.length}
                      previous={prevPosttest}
                      next={nextPosttest}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
