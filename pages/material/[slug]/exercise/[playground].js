import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";
import rehypePrism from "rehype-prism-plus";
import remarkCodeTitles from "remark-flexible-code-titles";
import { LazyMotion, domAnimation, m } from "framer-motion";
const NavbarPlayground = dynamic(
  () => import("@/components/Navbar/Playground"),
);
const EditorInput = dynamic(() => import("@/components/EditorInput"), {
  ssr: false,
});

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  const queryExercise = context.query.playground;
  const queryMaterial = context.query.slug;
  const token = context.req.cookies.token;
  if (!getCookies) {
    context.res.writeHead(302, {
      Location: "/",
    });
    context.res.end();
  }
  const viewAccount = await axios.get(
    process.env.BASE_URL + "/api/user/view-account",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const viewExercise = await axios.get(
    process.env.BASE_URL + "/api/user/view-exercise",
    {
      params: {
        queryMaterial,
        queryExercise,
      },
    },
  );
  const exercise = viewExercise.data.viewExercise;
  const viewScore = await axios.get(
    process.env.BASE_URL + "/api/user/view-score",
    {
      params: {
        exercise: exercise?.Exercise[0]?.Title,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const sumScore = viewScore?.data?.sumScore;
  const account = viewAccount.data?.data;
  const submittedAt = viewScore?.data;
  const score = viewScore?.data?.submitScore[0]?.Score || null;
  const source = exercise?.Exercise[0]?.Question;
  return {
    props: {
      score,
      token,
      source,
      account,
      exercise,
      sumScore,
      submittedAt,
      queryExercise,
      queryMaterial,
    },
  };
}
export default function Playground({
  queryMaterial,
  submittedAt,
  sumScore,
  exercise,
  account,
  source,
  token,
  score,
}) {
  const answer = exercise?.Exercise[0]?.Answer;
  const [currentStatus, setCurrentStatus] = useState("");

  function checkCurrentStatus(condition) {
    setCurrentStatus(condition);
  }
  const accountRole = account?.Role;
  return (
    <div className="max-width max-height">
      <Head>
        <title>{`Latihan - ${exercise?.Exercise[0]?.Title}`}</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <NavbarPlayground
        roles={accountRole}
        exercise={exercise}
        sumScore={sumScore}
        material={queryMaterial}
      />
      <LazyMotion features={domAnimation}>
        <div className="mx-auto flex h-adaptive max-w-5xl flex-row items-center">
          <div className="flex h-[90%] w-full items-start justify-center space-x-2">
            {/* Kiri/Soal Latihan*/}
            <m.div
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full w-[45%] rounded-md border-2 border-gray-300 bg-white p-2.5 shadow"
            >
              <div className="h-full overflow-scroll rounded bg-gray-50 px-1.5">
                <div
                  className={`space-y-2 ${
                    currentStatus === "TRUE" || score !== null
                      ? "opacity-50 transition duration-500 ease-in-out"
                      : null
                  }`}
                >
                  <div className="flex flex-row items-center justify-between">
                    <p className="font-head text-lg font-semibold text-gray-500">
                      Soal Latihan:
                      <span className="text-secondary-400">{` ${exercise?.Exercise[0]?.Title} `}</span>
                    </p>
                    <p className="font-head text-lg font-semibold text-gray-500">
                      Skor:
                      <span className="text-secondary-400">{` ${exercise?.Exercise[0]?.Score} `}</span>
                    </p>
                  </div>
                  <div className="prose prose-strong:text-bold max-w-none text-justify font-body text-gray-600">
                    <Markdown
                      rehypePlugins={[rehypePrism]}
                      remarkPlugins={[remarkCodeTitles]}
                    >
                      {source}
                    </Markdown>
                  </div>
                </div>
              </div>
            </m.div>
            {/* Kanan/Editor */}
            <m.div
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full w-[55%] rounded-md border-2 border-gray-300 bg-white px-2.5 py-2 shadow"
            >
              <div className="h-full w-full overflow-scroll">
                <EditorInput
                  token={token}
                  answer={answer}
                  getScore={score}
                  roles={accountRole}
                  currentStatus={checkCurrentStatus}
                  score={exercise?.Exercise[0]?.Score}
                  exercise={exercise?.Exercise[0]?.Title}
                  submittedAt={submittedAt?.submitScore[0]?.SubmittedAt}
                />
              </div>
            </m.div>
          </div>
        </div>
      </LazyMotion>
    </div>
  );
}
