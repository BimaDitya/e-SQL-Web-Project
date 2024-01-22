import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import CardAF from "@/components/Card/CardAF";
import CardDDL from "@/components/Card/CardDDL";
import CardDML from "@/components/Card/CardDML";
import CardDCL from "@/components/Card/CardDCL";
import CardJoin from "@/components/Card/CardJoin";
const MainLayout = dynamic(() => import("@/components/Layout/MainLayout"));

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  const token = context.req.cookies.token;
  if (!getCookies)
    return {
      redirect: {
        source: "/material",
        destination: "/login",
        permanent: true,
      },
    };
  const viewMaterial = await axios
    .get(process.env.BASE_URL + "/api/admin/view-material")
    .then((response) => response.data);
  const viewProgress = await axios
    .get(process.env.BASE_URL + "/api/user/view-progress", {
      headers: {
        Authorization: `Bearer ${token}`,
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
  return {
    props: {
      materials: viewMaterial,
      progress: viewProgress,
      cookies: token,
      progressDDL,
      progressDML,
      progressDCL,
      progressJoin,
    },
  };
}

export default function Material({
  materials,
  progress,
  cookies,
  progressDDL,
  progressDML,
  progressDCL,
  progressJoin,
}) {
  return (
    <>
      <Head>
        <title>Materi</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <div className="mx-auto flex max-w-5xl flex-row">
        <div className="flex h-adaptive w-full items-center justify-center">
          <div className="h-[90%] w-full rounded-md border-2 border-gray-300 bg-transparent p-4 shadow backdrop-blur-sm">
            <div className="h-full space-y-2.5 overflow-scroll">
              {!materials && !progress && (
                <p className="text-center font-head text-2xl font-bold text-secondary-400">
                  Materi Belum Tersedia
                </p>
              )}
              <p className="text-center font-head text-xl font-bold text-secondary-400">
                Daftar Materi
              </p>
              {materials?.viewMaterial.map((material, index) => {
                if (material.Content?.length !== 0) {
                  const cardProps = {
                    material,
                    cookies,
                    progressDDL,
                    progressDML,
                    progressDCL,
                    progressJoin,
                  };

                  switch (index) {
                    case 0:
                      return <CardDDL {...cardProps} />;
                    case 1:
                      return <CardDML {...cardProps} />;
                    case 2:
                      return <CardDCL {...cardProps} />;
                    case 3:
                      return <CardJoin {...cardProps} />;
                    case 4:
                      return <CardAF {...cardProps} />;
                    default:
                      return null;
                  }
                } else {
                  return null;
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

Material.getLayout = function getLayout(material) {
  return <MainLayout>{material}</MainLayout>;
};
