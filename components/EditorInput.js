import axios from "axios";
import Swal from "sweetalert2";
import initSqlJs from "sql.js";
import TableSQL from "./TableOutput";
import CodeEditor from "./CodeEditor";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import withReactContent from "sweetalert2-react-content";

export default function SQLEditor({
  roles,
  token,
  score,
  answer,
  exercise,
  getScore,
  submittedAt,
  currentStatus,
}) {
  const [code, setCode] = useState("");
  const [trial, setTrial] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("");
  const [results, setResults] = useState([]);
  const [noError, setNoError] = useState(null);
  const [database, setDatabase] = useState(null);

  const alertWithSwal = withReactContent(Swal);
  const router = useRouter();

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

  currentStatus(status);

  async function reset() {
    router.reload();
  }

  async function submit() {
    axios
      .post(
        "/api/user/add-score",
        { score },
        {
          params: {
            exercise: exercise,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(() => {
        setTimeout(() => {
          reset();
        }, 3000);
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
      })
      .catch(() => {
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

  async function execute() {
    axios
      .post(
        "/api/playground",
        { code, answer, trial },
        {
          params: {
            exercise: exercise,
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(({ data }) => {
        setStatus(data.condition);
        alertWithSwal.fire({
          toast: false,
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
          position: "center",
          title: (
            <p
              className={`text-center font-head text-lg font-semibold tracking-wide ${
                data.condition === "TRUE" ? "text-green-600" : "text-red-600"
              }`}
            >
              {data.message}
            </p>
          ),
          html: (
            <p
              className={`text-center font-head text-lg font-semibold tracking-wide ${
                data.condition === "TRUE" ? "text-green-400" : "text-red-400"
              }`}
            >
              {data.description}
            </p>
          ),
        });
        if (data.condition === "FALSE") {
          setTimeout(() => {
            router.reload();
          }, 2500);
        }
      })
      .catch((error) => error);
    try {
      const result = database.exec(code);
      setResults(result);
      setNoError("Executed".toUpperCase());
      setError(null);
    } catch (error) {
      setError(error.message.toUpperCase());
      setTrial(trial + 1);
      setResults([]);
    }
  }
  const submitDateTime = new Date(submittedAt).toLocaleString();
  return (
    <div className="flex h-full flex-col space-y-2.5">
      {/* Editor Section */}
      <div className="h-full w-full">
        <div className="z-50 h-full w-full space-y-0.5">
          <p className="font-head text-lg font-semibold text-secondary-400">
            Input
          </p>
          <div className="py-1.5">
            <CodeEditor setCode={setCode} />
          </div>
          {/* Baris Tombol */}
          {getScore !== null ? (
            <>
              <p className="font-head text-lg text-green-500">
                Anda Telah Selesai Mengerjakan Soal Latihan Ini 👍🏻
              </p>
              <p className="font-head text-sm text-gray-500">
                Pada: {!submittedAt ? `-` : submitDateTime}
              </p>
            </>
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
                    roles === "ADMIN" ? "hidden" : "inline"
                  } ${
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
        </div>
      </div>
      {/* Output Section */}
      <div className="h-full w-full space-y-0.5">
        <p className="font-head text-lg font-semibold text-secondary-400">
          Output
        </p>
        <div className="h-full w-full space-y-0.5">
          <div className="flex flex-row space-x-2">
            <p className="font-body text-sm text-gray-400">Status: </p>
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
            <TableSQL key={values} columns={columns} values={values} />
          ))}
        </div>
      </div>
    </div>
  );
}
