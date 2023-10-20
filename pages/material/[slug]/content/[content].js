import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { compile, run } from "@mdx-js/mdx";
import rehypePrism from "rehype-prism-plus";
import * as runtime from "react/jsx-runtime";
import { useState, useEffect, Fragment } from "react";
import NavbarContent from "@/components/Navbar/Content";
import remarkCodeTitles from "remark-flexible-code-titles";
import { LazyMotion, domAnimation, m } from "framer-motion";
// Server-Side
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
        queryMaterial: queryMaterial,
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
  const progressAF = await axios
    .get(process.env.BASE_URL + "/api/user/progress/aggregate-function", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data?.viewProgress[0]?._count?.Progress);
  const accounts = viewAccount?.data?.data;
  const compileMarkdown = String(
    await compile(viewContent?.viewContent[0]?.Content, {
      outputFormat: "function-body",
      rehypePlugins: [rehypePrism],
      remarkPlugins: [remarkCodeTitles],
      development: false,
    }),
  );
  return {
    props: {
      token,
      accounts,
      viewStatus,
      viewMaterial,
      queryContent,
      progressDDL,
      progressDML,
      progressDCL,
      progressJoin,
      progressAF,
      contents: viewContent,
      sources: compileMarkdown,
      slugMaterial: queryMaterial,
    },
  };
}
// Client-Side
export default function ContentMaterial({
  token,
  sources,
  accounts,
  contents,
  viewStatus,
  progressDDL,
  progressDML,
  progressDCL,
  progressJoin,
  progressAF,
  queryContent,
  viewMaterial,
  slugMaterial,
}) {
  const router = useRouter();
  const [mdxModule, setMdxModule] = useState();
  const materialId = viewMaterial?.viewMaterial?.Id;
  const materialSlug = viewMaterial?.viewMaterial?.Slug;
  const MDXContent = mdxModule ? mdxModule.default : Fragment;
  async function UpdateStatus() {
    await axios
      .patch(
        "/api/user/update-status",
        {},
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
  useEffect(() => {
    (async () => {
      setMdxModule(await run(sources, runtime));
    })();
  }, [sources]);
  // DDL
  const allowedViews = (
    <div className="max-width max-height">
      <Head>
        <title>Materi</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <NavbarContent
        accounts={accounts}
        contents={contents}
        UpdateStatus={UpdateStatus}
        status={viewStatus}
        materials={viewMaterial?.viewMaterial?.Slug}
      />
      <LazyMotion features={domAnimation}>
        <div className="flex flex-row px-8">
          <div className="flex h-full w-full items-start justify-center">
            <m.div
              transition={{
                duration: 1,
                type: "spring",
                stiffness: 50,
              }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              className="z-30 m-10 w-full rounded-md border-2 border-gray-200 bg-transparent p-4 backdrop-blur-sm"
            >
              <div className="flex flex-col text-justify font-body">
                <p className="px-12 pb-4 text-center font-head text-2xl font-semibold text-secondary-400">
                  {contents.viewContent[0]?.Title}
                </p>
                <div className="prose prose-strong:text-bold max-w-none px-8 text-gray-600">
                  <MDXContent />
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
        <m.div
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 50,
          }}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-16 mt-8 flex h-adaptive flex-col items-center justify-center rounded border-2 border-gray-200 bg-transparent shadow-lg backdrop-blur-sm"
        >
          <div className="flex flex-col items-center justify-center">
            <Image
              className="transition duration-300 ease-in-out hover:scale-110"
              src="/illustrations/notebook.svg"
              width={360}
              height={360}
              quality={50}
              alt="Page Not Found"
            />
            <p className="pb-8 font-head text-2xl font-bold tracking-wider text-secondary-400">
              Anda Belum Menyelesaikan Materi Sebelumnya
            </p>
          </div>
          <button
            className="button-primary w-max"
            onClick={() => router.push("/material")}
          >
            Halaman Materi
          </button>
        </m.div>
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
