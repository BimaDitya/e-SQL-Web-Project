import axios from "axios";
import Head from "next/head";
import Swal from "sweetalert2";
import initSqlJs from "sql.js";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import rehypePrism from "rehype-prism-plus";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";
import remarkCodeTitles from "remark-flexible-code-titles";
import TableSQL from "@/components/TableOutput";
const CodeInput = dynamic(import("@/components/CodeEditor"), {
  ssr: false,
});
const Countdown = dynamic(import("@/components/Timer"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  const token = context.req.cookies.token;
  const slug = context.query.index;
  const url = context.resolvedUrl;
  const parts = url.split("/exam/");

  if (!getCookies) {
    context.res.writeHead(302, {
      Location: "/",
    });
    context.res.end();
  }
  const viewExams = await axios.get(
    process.env.BASE_URL + "/api/exam/spesific-exam",
    {
      params: {
        slug,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const viewAllExams = await axios.get(
    process.env.BASE_URL + "/api/exam/all-exam",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  const exams = viewAllExams?.data?.viewExams;
  const exam = viewExams?.data?.viewExams;
  const slugs = [];
  for (const item of exams) {
    slugs.push(item.Slug);
  }
  let prefix = "";
  if (parts.length > 1) {
    prefix = parts[1].split("/")[0];
  } else {
    console.log("Prefix Tidak Ditemukan");
  }

  const test = prefix;
  const viewResult = await axios.get(
    process.env.BASE_URL + "/api/exam/view-result",
    {
      params: {
        test,
        slug,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const result = viewResult?.data?.viewResult;
  const durations = await axios.get(
    process.env.BASE_URL + "/api/exam/view-duration",
    {
      params: {
        test,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const duration = durations?.data.viewDurations;
  return {
    props: {
      result,
      duration,
      prefix,
      token,
      slug,
      slugs,
      exam,
      exams,
    },
  };
}

export default function Exams({
  exam,
  slug,
  slugs,
  prefix,
  token,
  duration,
  result,
}) {
  const [startTime, setStartTime] = useState(null);
  const [database, setDatabase] = useState(null);
  const [noError, setNoError] = useState(null);
  const [results, setResults] = useState([]);
  const alertWithSwal = withReactContent(Swal);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [timer, setTimer] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();

  const answer = exam.Answer;
  const currentSlug = slug;

  // Selisih Waktu
  const times = duration?.Duration || "00:00";
  let [minute, second] = times.split(":").map(Number);
  let usedTime = minute * 60 + second * 1;
  const initialTime = 1800;
  const resultTime = initialTime - usedTime;
  const workMinute = Math.floor(resultTime / 60);
  const workSecond = resultTime % 60;
  const workTime = `${workMinute}:${workSecond < 10 ? "0" : ""}${workSecond}`;

  useEffect(() => {
    const initSql = async () => {
      try {
        const SQL = await initSqlJs({
          locateFile: (file) => `https://sql.js.org/dist/${file}`,
        });
        const sqlFile = await fetch("/data/Playground.SQLite");
        const sqlBuff = await sqlFile.arrayBuffer();
        setDatabase(new SQL.Database(new Uint8Array(sqlBuff)));
      } catch (error) {
        setError(error);
      }
    };
    initSql();
  }, []);

  // Fungsi Navigasi Soal Tes
  function navigate(direction) {
    let index;
    switch (direction) {
      case "next":
        index = slugs.indexOf(slug) + 1;
        index = index >= slugs.length ? 0 : index;
        break;
      case "prev":
        index = slugs.indexOf(slug) - 1;
        index = index < 0 ? slugs.length - 1 : index;
        break;
      default:
        index = 0;
        break;
    }
    const newSlug = slugs[index];
    router.push(`/exam/posttest/${newSlug}`);
  }

  const firstExam = slugs[0];
  const lastExam = slugs[slugs.length - 1];

  const clearInput = async () => {
    setCode("");
  };

  const nextClearInput = async () => {
    navigate("next");
    clearInput();
  };

  const prevClearInput = async () => {
    navigate("prev");
    clearInput();
  };

  async function reset() {
    router.reload();
  }

  async function execute() {
    axios
      .post("/api/exam/check-answer", {
        code,
        answer,
      })
      .then(({ data }) => {
        setStatus(data.status);
        alertWithSwal.fire({
          toast: false,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "center",
          title: (
            <p
              className={`text-center font-head text-lg font-semibold tracking-wide ${
                data.status === "TRUE" ? "text-green-600" : "text-red-600"
              }`}
            >
              {data.title}
            </p>
          ),
          html: (
            <p
              className={`text-center font-head text-lg font-semibold tracking-wide ${
                data.status === "TRUE" ? "text-green-400" : "text-red-400"
              }`}
            >
              {data.description}
            </p>
          ),
        });
        if (data.status === "FALSE") {
          setTimeout(() => {
            router.reload();
          }, 2500);
        }
      })
      .catch((error) => console.log(error));
    try {
      const result = database.exec(code);
      setResults(result);
      setNoError("Executed".toUpperCase());
      setError(null);
    } catch (error) {
      setError(error.message.toUpperCase());
      setResults([]);
    }
  }

  async function submit() {
    axios
      .post(
        "/api/exam/submit-exam",
        { test: prefix, slug, status, answer: code },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        alertWithSwal.fire({
          toast: false,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          width: "40%",
          imageUrl: "/icons/success.png",
          imageWidth: "20%",
          title: (
            <p className="text-center font-head text-lg font-semibold tracking-wide text-green-600">
              Operasi Berhasil
            </p>
          ),
          html: (
            <p className="text-center font-body font-medium tracking-wide text-green-400">
              Jawaban Soal Berhasil Terkirim
            </p>
          ),
        });
        setTimeout(() => {
          router.reload();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        alertWithSwal.fire({
          toast: false,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          width: "40%",
          imageUrl: "/icons/error.png",
          imageWidth: "20%",
          title: (
            <p className="text-center font-head text-lg font-semibold tracking-wide text-red-600">
              Operasi Gagal
            </p>
          ),
          html: (
            <p className="text-center font-body font-medium tracking-wide text-red-400">
              Jawaban Soal Gagal Terkirim
            </p>
          ),
        });
      });
  }

  useEffect(() => {
    const getCurrentTime = () => new Date().toISOString();
    setStartTime(getCurrentTime());
  }, []);

  const currentTime = Date.now();

  // Fungsi Untuk Mencatat Waktu
  function finish() {
    axios
      .post(
        "/api/exam/submit-time",
        {
          timer,
          test: prefix,
          start: startTime,
          end: currentTime,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then((response) => {
        alertWithSwal.fire({
          toast: false,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          width: "40%",
          imageUrl: "/icons/success.png",
          imageWidth: "20%",
          title: (
            <p className="text-center font-head text-lg font-semibold tracking-wide text-green-600">
              Operasi Berhasil
            </p>
          ),
          html: (
            <p className="text-center font-body font-medium tracking-wide text-green-400">
              {`Berhasil Mengumpulkan ${response.data?.times?.Test}`}
            </p>
          ),
        });
        setTimeout(() => {
          router.push("/");
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
        alertWithSwal.fire({
          toast: false,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          width: "40%",
          imageUrl: "/icons/error.png",
          imageWidth: "20%",
          title: (
            <p className="text-center font-head text-lg font-semibold tracking-wide text-red-600">
              Operasi Gagal
            </p>
          ),
          html: (
            <p className="text-center font-body font-medium tracking-wide text-red-400">
              Gagal Mengumpulkan Posttest
            </p>
          ),
        });
      });
  }
  const answers = result?.Answer;
  return (
    <>
      <Head>
        <title>Posttest</title>
        <link rel="icon" href="../../icons/favicon.ico"></link>
      </Head>
      <div className="flex h-screen w-full flex-row items-center justify-center">
        <div className="flex h-full w-full flex-row items-center bg-white/50">
          <LazyMotion features={domAnimation}>
            <m.div
              transition={{ duration: 1, type: "spring", stiffness: 75 }}
              initial={{ opacity: 0, y: -75 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto flex h-[90%] w-[85%] flex-row items-center justify-center rounded-md border-2 border-gray-300 bg-transparent shadow backdrop-blur-sm"
            >
              <div className="flex h-full w-full flex-col items-center justify-center px-4 py-2.5">
                {/* Judul */}
                <div className="flex h-max w-full flex-row items-center justify-between rounded-sm bg-gray-100 px-4 py-1.5">
                  <button
                    onClick={() => router.push("/exam/")}
                    className="flex w-max flex-row items-center font-head font-semibold text-secondary-400 transition duration-300 ease-in-out hover:text-secondary-200"
                  >
                    &#8592; Kembali
                  </button>
                  <p className="font-head text-xl font-bold text-primary-400">
                    Tes: {exam.Title}
                  </p>
                  {!duration ? (
                    <div className="flex w-max flex-row items-center font-head font-semibold text-secondary-400">
                      <h2>Waktu Terisa:&nbsp;</h2>

                      <Countdown
                        setTimer={setTimer}
                        start={startTime}
                        token={token}
                        test={prefix}
                      />
                    </div>
                  ) : (
                    <div className="flex w-max flex-row items-center font-head font-semibold text-secondary-400">
                      <h2>Durasi Pengerjaan:&nbsp;</h2>
                      {workTime}
                    </div>
                  )}
                </div>
                {/* Konten */}
                <div className="flex h-full w-full flex-row items-start space-x-2.5">
                  {/* Kolom Kiri */}
                  <div className="h-max w-[45%] space-y-2 py-2">
                    <div
                      className={`h-full rounded border-2 border-gray-200 bg-gray-100 p-1.5 text-justify font-body text-gray-600 transition duration-300 ${
                        result?.Complete === "TRUE" || status === "TRUE"
                          ? "opacity-50"
                          : "opacity-100"
                      }`}
                    >
                      <Markdown
                        rehypePlugins={[rehypePrism]}
                        remarkPlugins={[remarkCodeTitles]}
                      >
                        {exam.Question}
                      </Markdown>
                    </div>
                    <div className="flex h-full flex-col rounded border-2 border-gray-200 bg-gray-100 p-1.5 text-justify font-body text-gray-600">
                      <span className="font-head text-gray-600">
                        Status:&nbsp;
                        <span className="inline-flex text-secondary-400">
                          {result?.Complete === "TRUE" ? (
                            <p className="text-green-500">Tuntas</p>
                          ) : (
                            <p className="text-red-500">Belum Tuntas</p>
                          )}
                        </span>
                      </span>
                      <span className="font-head text-gray-600">
                        Mulai Dikerjan:&nbsp;
                        <span className="inline-flex text-secondary-400">
                          {duration?.Start_Time ? (
                            <p className="text-green-500">
                              {new Date(duration?.Start_Time).toLocaleString(
                                "in-IN",
                                { timeZone: "Asia/Jakarta" },
                              )}
                            </p>
                          ) : (
                            <p className="text-red-500">-</p>
                          )}
                        </span>
                      </span>
                      <span className="font-head text-gray-600">
                        Selesai Dikerjan:&nbsp;
                        <span className="inline-flex text-secondary-400">
                          {duration?.End_Time ? (
                            <p className="text-green-500">
                              {new Date(duration?.End_Time).toLocaleString(
                                "in-IN",
                                { timeZone: "Asia/Jakarta" },
                              )}
                            </p>
                          ) : (
                            <p className="text-red-500">-</p>
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                  {/* Kolom Kanan */}
                  <div className="flex h-full w-[55%] flex-col justify-between">
                    <div className="h-full py-2">
                      <div className="h-full space-y-2.5 overflow-y-scroll rounded border-2 border-gray-200 bg-gray-100 p-1.5">
                        <CodeInput
                          setCode={setCode}
                          answers={answers}
                          value={code}
                        />
                        {result?.Complete === "TRUE" ? (
                          <div className="flex flex-row justify-between">
                            <p className="font-head text-green-500">
                              Anda Telah Selesai Mengerjakan Soal Tes Ini 👍🏻
                            </p>
                          </div>
                        ) : (
                          <div className="flex flex-row justify-between">
                            {/* Kiri */}
                            <div className="flex flex-row justify-start space-x-4">
                              <button
                                onClick={execute}
                                disabled={!code}
                                className="button-success disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
                              >
                                <p>Periksa</p>
                              </button>

                              <button
                                onClick={submit}
                                disabled={!code || status !== "TRUE"}
                                className={`button-primary ${
                                  (!code || status !== "TRUE") &&
                                  "disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
                                }`}
                              >
                                Submit
                              </button>
                            </div>
                            {/* Kanan */}
                            <button
                              onClick={reset}
                              disabled={!code}
                              className="button-danger disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
                            >
                              <p>Reset</p>
                            </button>
                          </div>
                        )}
                        <div className="h-full w-full space-y-0.5">
                          <div className="flex flex-row space-x-2">
                            <p className="font-body text-sm text-gray-400">
                              Status:&nbsp;
                            </p>
                            <pre
                              className={
                                error
                                  ? "font-body text-sm text-red-500"
                                  : "font-body text-sm text-green-500"
                              }
                            >
                              {error || noError}
                            </pre>
                          </div>
                          {results.map(({ columns, values }) => (
                            <TableSQL
                              key={values}
                              columns={columns}
                              values={values}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Navigasi */}
                <div className="flex h-max w-full flex-row items-center justify-between">
                  <button
                    onClick={() => prevClearInput()}
                    disabled={currentSlug === firstExam}
                    className="button-primary disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
                  >
                    &larr; Soal Sebelumnya
                  </button>
                  {currentSlug === lastExam ? (
                    <button
                      disabled={duration}
                      onClick={finish}
                      className="button-secondary disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
                    >
                      Akhiri Tes &rarr;
                    </button>
                  ) : (
                    <button
                      onClick={() => nextClearInput()}
                      className="button-primary disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
                    >
                      Soal Selanjutnya &rarr;
                    </button>
                  )}
                </div>
              </div>
            </m.div>
          </LazyMotion>
        </div>
      </div>
    </>
  );
}
