import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import remarkGfm from "remark-gfm";
import { compile, run } from "@mdx-js/mdx";
import * as runtime from "react/jsx-runtime";
import rehypePrism from "rehype-prism-plus";
import { useState, useEffect, Fragment } from "react";
import remarkCodeTitles from "remark-flexible-code-titles";
import { LazyMotion, domAnimation, m } from "framer-motion";
import NavbarPlayground from "@/components/Navbar/Playground";
const CodeEditor = dynamic(import("@/components/EditorInput"), { ssr: false });

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
  const score = viewScore?.data?.submitScore;
  const sumScore = viewScore?.data?.sumScore;
  const account = viewAccount.data?.data;

  const compileMarkdown = String(
    await compile(exercise?.Exercise[0]?.Question, {
      remarkPlugins: [remarkGfm, remarkCodeTitles],
      rehypePlugins: [rehypePrism],
      outputFormat: "function-body",
      development: false,
    }),
  );
  return {
    props: {
      score,
      token,
      account,
      exercise,
      sumScore,
      queryExercise,
      queryMaterial,
      sources: compileMarkdown,
    },
  };
}
export default function Playground({
  queryMaterial,
  sumScore,
  exercise,
  sources,
  account,
  token,
  score,
}) {
  const answer = exercise?.Exercise[0]?.Answer;
  const [mdxModule, setMdxModule] = useState();
  const [currentStatus, setCurrentStatus] = useState("");

  function checkCurrentStatus(condition) {
    setCurrentStatus(condition);
  }

  const MDXContent = mdxModule ? mdxModule.default : Fragment;
  useEffect(() => {
    (async () => {
      setMdxModule(await run(sources, runtime));
    })();
  }, [sources]);
  const submitted = score[0]?.Exercise;
  const accountRole = account?.Role;
  return (
    <div className="max-width max-height">
      <Head>
        <title>Playground</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <NavbarPlayground
        exercise={exercise}
        sumScore={sumScore}
        material={queryMaterial}
      />
      <LazyMotion features={domAnimation}>
        <div className="h- flex flex-row px-8 py-12">
          {/* Kiri/Soal Latihan*/}
          <div className="flex w-full items-start justify-center">
            <m.div
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
              }}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-full w-[45%] rounded-md border-2 border-gray-200 bg-white/10 px-6 py-4 backdrop-blur-sm"
            >
              <div
                className={`space-y-2 ${
                  currentStatus === "TRUE" ||
                  submitted === exercise?.Exercise[0]?.Title
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
                    Skor Soal:
                    <span className="text-secondary-400">{` ${exercise?.Exercise[0]?.Score} `}</span>
                  </p>
                </div>
                <div className="prose prose-code:inline-code prose-ul:unordered-list h-max w-full max-w-none text-justify font-body text-gray-500 prose-strong:font-bold">
                  <MDXContent />
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
              className="ml-2 h-full w-[55%] rounded-md border-2 border-gray-200 bg-white/10 p-4 backdrop-blur-sm"
            >
              <CodeEditor
                token={token}
                answer={answer}
                roles={accountRole}
                submitted={submitted}
                currentStatus={checkCurrentStatus}
                score={exercise?.Exercise[0]?.Score}
                exercise={exercise?.Exercise[0]?.Title}
              />
            </m.div>
          </div>
        </div>
      </LazyMotion>
    </div>
  );
}
