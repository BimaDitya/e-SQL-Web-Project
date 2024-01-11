import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation, m } from "framer-motion";
const Markdown = dynamic(() => import("react-markdown"));
const rehypePrism = dynamic(() => import("rehype-prism-plus"));
const remarkCodeTitles = dynamic(() => import("remark-flexible-code-titles"));
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
  const source = exercise?.Exercise[0]?.Question;
  return {
    props: {
      score,
      token,
      source,
      account,
      exercise,
      sumScore,
      progressDDL,
      progressDML,
      progressDCL,
      progressJoin,
      progressAF,
      submittedAt,
      queryExercise,
      queryMaterial,
    },
  };
}
export default function Playground({
  queryMaterial,
  submittedAt,
  progressDDL,
  progressDML,
  progressDCL,
  progressJoin,
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
  const allowedViews = (
    <div className="max-width max-height">
      <Head>
        <title>Playground</title>
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
                duration: 1,
                type: "spring",
                stiffness: 50,
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full w-[40%] rounded-md border-2 border-gray-300 bg-transparent p-2.5 shadow backdrop-blur-sm"
            >
              <div className="h-full overflow-scroll rounded bg-gray-100 px-1.5">
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
                duration: 1,
                type: "spring",
                stiffness: 50,
              }}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full w-[60%] rounded-md border-2 border-gray-300 bg-transparent px-2.5 py-2 shadow backdrop-blur-sm"
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

  const disallowedViews = (
    <div className="max-width h-adaptive">
      <Head>
        <title>Playground</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <NavbarPlayground
        roles={accountRole}
        exercise={exercise}
        sumScore={sumScore}
        material={queryMaterial}
      />
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
    </div>
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
