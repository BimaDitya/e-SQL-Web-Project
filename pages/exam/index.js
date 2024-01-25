import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { LazyMotion, domAnimation, m } from "framer-motion";

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;

  if (!getCookies) {
    context.res.writeHead(302, {
      Location: "/",
    });
    context.res.end();
  }
  return {
    props: {},
  };
}

export default function Exams({}) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Tes</title>
        <link rel="icon" href="../icons/favicon.ico"></link>
      </Head>
      <div className="flex h-screen w-full justify-center">
        <div className="flex h-full w-full flex-row items-center">
          <LazyMotion features={domAnimation}>
            <m.div
              transition={{ duration: 1, type: "spring", stiffness: 75 }}
              initial={{ opacity: 0, y: -75 }}
              animate={{ opacity: 1, y: 0 }}
              className="mx-auto flex h-max w-[75%] flex-row items-center justify-center rounded-md border-2 border-gray-300 bg-white shadow"
            >
              <div className="flex h-full w-full flex-col items-center justify-center space-y-2 px-4 py-2.5">
                {/* Judul */}
                <div className="flex h-max w-full flex-row items-center justify-between rounded-sm bg-gray-50 px-4 py-1.5">
                  <button
                    onClick={() => router.push("/")}
                    className="flex w-max flex-row items-center font-head font-semibold text-secondary-400 outline-none transition duration-300 ease-in-out hover:text-secondary-200"
                  >
                    &#8592; Kembali
                  </button>
                  <p className="font-head text-xl font-bold text-primary-400">
                    Petunjuk Pengerjaan Tes
                  </p>
                  <button className="flex w-max cursor-default flex-row items-center text-transparent outline-none">
                    &#8592; Kembali
                  </button>
                </div>
                {/* Konten */}
                <div className="flex h-full w-full flex-row items-start space-x-2">
                  <div className="flex h-max w-full flex-row items-center justify-between rounded-sm bg-gray-50 px-4 py-2.5">
                    <ul className="list-inside list-disc space-y-2 px-2 font-body tracking-tight text-gray-600">
                      <li>
                        Tes terdiri dari dari dua jenis, yaitu: <b>Pretest</b>
                        &nbsp;dan&nbsp;<b>Posttest</b>.
                      </li>
                      <li>
                        Tes berjenis praktikum penggunaan perintah dari bahasa
                        kueri yang teridiri dari delapan butir soal.
                      </li>
                      <li>
                        Waktu untuk mengerjakan tes adalah 30 menit dan otomatis
                        berjalan saat mulai mengerjakan tes.
                      </li>
                      <li>
                        Tombol &ldquo;<b>Pretest</b>&ldquo; untuk mengerjakan
                        Tes Awal dan tombol &ldquo;
                        <b>Posttest</b>&ldquo; untuk mengerjakan Tes Akhir.
                      </li>
                      <li>
                        Anda dapat memeriksa jawaban terlebih dahulu dengan
                        menekan tombol &ldquo;<b>Periksa</b>&ldquo;.
                      </li>
                      <li>
                        Anda dapat mengumpulkan jawaban tes dengan menekan
                        tombol &ldquo;<b>Submit</b>&ldquo;.
                      </li>
                      <li>
                        Anda dapat berpindah soal tes dengan menekan tombol
                        &ldquo;<b>Soal Sebelumnya</b>&ldquo; dan &ldquo;
                        <b>Soal Selanjutnya</b>&ldquo;.
                      </li>
                      <li>Mulai mengerjakan tes: </li>
                      <div className="flex flex-row space-x-2.5">
                        <div className="button-primary flex w-max flex-row space-x-2 py-3 ">
                          <button
                            onClick={() =>
                              router.push("/exam/pretest/create-statement")
                            }
                          >
                            Kerjakan Pretest
                          </button>
                        </div>
                        <div className="button-primary flex w-max flex-row space-x-2 py-3 ">
                          <button
                            onClick={() =>
                              router.push("/exam/posttest/create-statement")
                            }
                          >
                            Kerjakan Posttest
                          </button>
                        </div>
                      </div>
                    </ul>
                  </div>
                </div>
              </div>
            </m.div>
          </LazyMotion>
        </div>
      </div>
    </>
  );
}
