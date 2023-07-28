import axios from "axios";
import Head from "next/head";
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
      queryMaterial,
      contents: viewContent,
      sources: compileMarkdown,
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
  queryContent,
  viewMaterial,
}) {
  const router = useRouter();
  const [mdxModule, setMdxModule] = useState();
  const materialId = viewMaterial?.viewMaterial?.Id;
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
      .then(() => router.replace(router.asPath));
  }
  useEffect(() => {
    (async () => {
      setMdxModule(await run(sources, runtime));
    })();
  }, [sources]);
  return (
    <div className="max-width max-height">
      <Head>
        <title>Materi</title>
        <link rel="icon" href="/icons/favicon.ico"></link>
      </Head>
      <NavbarContent
        accounts={accounts}
        contents={contents}
        UpdateStatus={UpdateStatus}
        status={viewStatus?.viewStatus}
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
}
