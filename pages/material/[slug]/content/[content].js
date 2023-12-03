import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Markdown from "react-markdown";
import { useRouter } from "next/router";
import rehypePrism from "rehype-prism-plus";
import { useState, useEffect } from "react";
import NavbarContent from "@/components/Navbar/Content";
import remarkCodeTitles from "remark-flexible-code-titles";
import { LazyMotion, domAnimation, m } from "framer-motion";

export async function getServerSideProps(context) {
  const queryContent = context.query.content;
  const queryMaterial = context.query.slug;
  const token = context.req.cookies.token;
  if (!token) {
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
  const viewContent = await axios
    .get(process.env.BASE_URL + "/api/user/view-content", {
      params: {
        params: queryContent,
      },
    })
    .then((response) => response.data);
  const viewMaterial = await axios
    .get(process.env.BASE_URL + "/api/user/view-material", {
      params: {
        queryMaterial: queryMaterial,
      },
    })
    .then((response) => response.data);
  const viewStatus = await axios
    .get(process.env.BASE_URL + "/api/user/view-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        queryContent: queryContent,
      },
    })
    .then((response) => response.data);
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
  const accounts = viewAccount?.data?.data;
  const source = viewContent?.viewContent[0]?.Content;
  return {
    props: {
      token,
      source,
      accounts,
      viewStatus,
      viewMaterial,
      queryContent,
      progressDDL,
      progressDML,
      progressDCL,
      progressJoin,
      contents: viewContent,
      slugMaterial: queryMaterial,
    },
  };
}

export default function ContentMaterial({
  token,
  source,
  accounts,
  contents,
  viewStatus,
  progressDDL,
  progressDML,
  progressDCL,
  progressJoin,
  queryContent,
  viewMaterial,
  slugMaterial,
}) {
  const router = useRouter();
  const [mdxModule, setMdxModule] = useState();
  const materialId = viewMaterial?.viewMaterial?.Id;
  const materialSlug = viewMaterial?.viewMaterial?.Slug;

  const [elapsed, setElapsed] = useState(0);
  const startTime = Date.now();

  const [studyStart, setStudyStart] = useState();

  useEffect(() => {
    const getCurrentTime = () => {
      return new Date().toLocaleString();
    };

    setStudyStart(getCurrentTime());
  }, []);

  useEffect(() => {
    if (startTime && elapsed < 1000) {
      const timer = setInterval(() => {
        setElapsed(Date.now() - startTime);
      }, 10);
      return () => {
        clearInterval(timer);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
      minutes,
    ).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    return formattedTime;
  };

  let studyTime = formatTime(elapsed);
  const studyEnd = Date.now();

  async function UpdateStatus() {
    await axios
      .patch(
        "/api/user/update-status",
        { studyStart, studyEnd },
        {
          params: { queryContent: queryContent, queryMaterial: materialId },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      )
      .then(() => router.push(`/material/${materialSlug}`));
  }

  const allowedViews = (
    <div className="max-width max-height">
      <Head>
        <title>Materi</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <NavbarContent
        accounts={accounts}
        status={viewStatus}
        studyTime={studyTime}
        UpdateStatus={UpdateStatus}
        materials={viewMaterial?.viewMaterial?.Slug}
      />
      <LazyMotion features={domAnimation}>
        <div className="mx-auto flex max-w-5xl flex-row">
          <div className="flex h-adaptive w-full items-center justify-center">
            <m.div
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
              }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-[95%] rounded border-2 border-gray-300 bg-transparent p-2.5 shadow backdrop-blur-sm"
            >
              <div className="z-30 h-full w-full overflow-y-scroll rounded-md bg-gray-100 px-4 py-2.5">
                <div className="flex flex-col space-y-2 text-justify font-body">
                  <p className="text-center font-head text-2xl font-semibold text-secondary-400">
                    {contents.viewContent[0]?.Title}
                  </p>
                  <div className="prose prose-strong:text-bold max-w-none text-gray-600">
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
          </div>
        </div>
      </LazyMotion>
    </div>
  );

  const disallowedViews = (
    <>
      <Head>
        <title>Materi</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <LazyMotion features={domAnimation}>
        <div className="max-width mx-auto flex h-screen flex-row items-center justify-center">
          <m.div
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 50,
            }}
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-3/4 w-3/4 flex-col items-center justify-center rounded border-2 border-gray-300 bg-transparent shadow backdrop-blur-sm"
          >
            <div className="flex flex-col items-center justify-center">
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
            <button
              className="button-primary my-8 w-max"
              onClick={() => router.push("/material")}
            >
              Halaman Materi
            </button>
          </m.div>
        </div>
      </LazyMotion>
    </>
  );

  if (slugMaterial === "data-definition-language") {
    return allowedViews;
  } else if (slugMaterial === "data-manipulation-language") {
    const isComplete = progressDDL === 10;

    if (isComplete) {
      return allowedViews;
    } else {
      return disallowedViews;
    }
  } else if (slugMaterial === "data-control-language") {
    const isComplete = progressDML === 7;

    if (isComplete) {
      return allowedViews;
    } else {
      return disallowedViews;
    }
  } else if (slugMaterial === "multitable") {
    const isComplete = progressDCL === 2;

    if (isComplete) {
      return allowedViews;
    } else {
      return disallowedViews;
    }
  } else if (slugMaterial === "aggregate-function") {
    const isComplete = progressJoin === 3;

    if (isComplete) {
      return allowedViews;
    } else {
      return disallowedViews;
    }
  }
}
