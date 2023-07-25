import axios from "axios";
import Swal from "sweetalert2";
import initSqlJs from "sql.js";
import "codemirror/mode/sql/sql";
import { hint } from "codemirror";
import TableSQL from "./TableOutput";
import "codemirror/lib/codemirror.css";
import { useRouter } from "next/router";
import "codemirror/theme/material.css";
import "codemirror/addon/hint/sql-hint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import CodeMirror from "@uiw/react-codemirror";
import React, { useState, useEffect } from "react";
import withReactContent from "sweetalert2-react-content";

export default function SQLEditor({
	roles,
	token,
	score,
	answer,
	exercise,
	submitted,
	currentStatus,
}) {
	const [code, setCode] = useState("");
	const [error, setError] = useState(null);
	const [status, setStatus] = useState("");
	const [results, setResults] = useState([]);
	const [noError, setNoError] = useState(null);
	const [database, setDatabase] = useState(null);

	const alertWithSwal = withReactContent(Swal);

	const router = useRouter();

	useEffect(() => {
		// initSqlJs({
		// 	locateFile: (file) => `https://sql.js.org/dist/${file}`,
		// })
		// 	.then((SQL) => setDatabase(new SQL.Database()))
		// 	.catch((error) => setError(error));
		const initSql = async () => {
			try {
				const SQL = await initSqlJs({
					locateFile: (file) => `https://sql.js.org/dist/${file}`,
				});
				const sqlFile = await fetch('/data/preload.sqlite');
				const sqlBuff = await sqlFile.arrayBuffer();
				setDatabase(new SQL.Database(new Uint8Array(sqlBuff)));
			} catch (error) {
				setError(error)
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
			.post("/api/user/add-score", score, {
				params: {
					exercise: exercise,
				},
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			})
			.then(() => {
				setTimeout(() => {
					reset();
				}, 3000);
				alertWithSwal.fire({
					toast: true,
					timer: 3000,
					timerProgressBar: true,
					showConfirmButton: false,
					width: "40%",
					imageUrl: "/icons/success.png",
					imageWidth: "20%",
					title: (
						<p className="font-head font-semibold text-green-600 text-lg text-center tracking-wide">
							Operasi Berhasil
						</p>
					),
					html: (
						<p className="font-body text-center text-green-400 font-medium tracking-wide">
							Jawaban Soal Berhasil Terkirim
						</p>
					),
				});
			})
			.catch(() => {
				alertWithSwal.fire({
					toast: true,
					timer: 3000,
					timerProgressBar: true,
					showConfirmButton: false,
					width: "40%",
					imageUrl: "/icons/error.png",
					imageWidth: "20%",
					title: (
						<p className="font-head font-semibold text-red-600 text-lg text-center tracking-wide">
							Operasi Gagal
						</p>
					),
					html: (
						<p className="font-body text-center text-red-400 font-medium tracking-wide">
							Jawaban Soal Gagal Terkirim
						</p>
					),
				});
			});
	}

	async function execute() {
		axios
			.post("/api/playground", { code, answer })
			.then(({ data }) => {
				setStatus(data.condition);
				alertWithSwal.fire({
					toast: true,
					timer: 2500,
					timerProgressBar: true,
					showConfirmButton: false,
					position: "top",
					title: (
						<p
							className={`font-head font-semibold text-lg text-center tracking-wide ${
								data.condition === "TRUE" ? "text-green-600" : "text-red-600"
							}`}
						>
							{data.message}
						</p>
					),
					html: (
						<p
							className={`font-head font-semibold text-lg text-center tracking-wide ${
								data.condition === "TRUE" ? "text-green-400" : "text-red-400"
							}`}
						>
							{data.description}
						</p>
					),
				});
			})
			.catch((error) => error);
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
	return (
		<>
			{/* Editor Section */}
			<div className="w-full h-max">
				<div className="z-50 w-full">
					<div className="w-auto h-40">
						<CodeMirror
							value=""
							height="100%"
							onChange={(editor) => {
								setCode(editor.getValue());
							}}
							options={{
								hintOptions: { completeSingle: false, hint: hint.sql },
								showHint: true,
								autofocus: true,
								autocapitalize: true,
								lineWrapping: true,
								theme: "material",
								mode: "text/x-mysql",
								extraKeys: { "Ctrl-Space": "autocomplete" },
							}}
						/>
					</div>
					<p className="py-2 text-sm font-body text-gray-400">
						&apos; Ctrl + Space &apos; Untuk Menampilkan <i>Autocomplete</i>
					</p>
					{/* Baris Tombol */}
					{submitted === exercise || roles === "ADMIN" ? (
						<p className="font-head text-green-600 text-lg">
							Anda Sudah Mengerjakan Soal Latihan Ini 😄
						</p>
					) : (
						<div className="flex flex-row justify-between">
							{/* Kiri */}
							<div className="flex flex-row justify-start space-x-4">
								<button
									onClick={execute}
									disabled={!code}
									className="flex flex-row w-fit font-head px-6 py-2 bg-green-400 text-white rounded transition ease-in-out hover:bg-emerald-200 hover:shadow-md duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
								>
									<p>Periksa</p>
								</button>

								<button
									onClick={submit}
									disabled={!code || status !== "TRUE"}
									className={`button_default ${
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
								className="flex flex-row w-fit font-head px-6 py-2 bg-red-400 text-white rounded transition ease-in-out hover:bg-red-200 hover:shadow-md duration-300 disabled:bg-gray-200 disabled:text-gray-400 disabled:hover:cursor-not-allowed"
							>
								<p>Reset</p>
							</button>
						</div>
					)}
				</div>
			</div>
			{/* Output Section */}
			<div className="w-full h-max py-2">
				<p className="text-lg font-head font-semibold text-secondary-400">
					Output
				</p>
				<div className="w-full">
					<div className="flex flex-row space-x-2">
						<p className="font-body text-sm text-gray-500">Status: </p>
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
		</>
	);
}
