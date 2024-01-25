import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import Markdown from "react-markdown";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import rehypePrism from "rehype-prism-plus";
import remarkCodeTitles from "remark-flexible-code-titles";
import { LazyMotion, domAnimation, m } from "framer-motion";
const NavbarContent = dynamic(() => import("@/components/Navbar/Content"));

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
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      contents: viewContent,
    },
  };
}

export default function ContentMaterial({
  token,
  source,
  accounts,
  contents,
  viewStatus,
  queryContent,
  viewMaterial,
}) {
  const router = useRouter();
  const materialId = viewMaterial?.viewMaterial[0]?.Id;
  const materialSlug = viewMaterial?.viewMaterial[0]?.Slug;

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
  return (
    <div className="max-width max-height">
      <Head>
        <title>{`Konten - ${contents?.viewContent[0]?.Title}`}</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <NavbarContent
        accounts={accounts}
        status={viewStatus}
        studyTime={studyTime}
        materials={materialSlug}
        UpdateStatus={UpdateStatus}
      />
      <LazyMotion features={domAnimation}>
        <div className="mx-auto flex max-w-5xl flex-row">
          <div className="flex h-adaptive w-full items-center justify-center">
            <m.div
              transition={{
                delay: 0.2,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              className="h-[95%] rounded border-2 border-gray-300 bg-white p-2.5 shadow"
            >
              <div className="z-30 h-full w-full overflow-y-scroll rounded-md bg-gray-50 px-4 py-2.5">
                <div className="flex flex-col space-y-2 text-justify font-body">
                  <p className="text-center font-head text-2xl font-semibold text-secondary-400">
                    {contents?.viewContent[0]?.Title}
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
}
