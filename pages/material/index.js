import axios from "axios";
import Head from "next/head";
import dynamic from "next/dynamic";
import CardMaterial from "@/components/Card/Material";
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
    .get(process.env.BASE_URL + "/api/user/view-material", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  const viewProgress = await axios
    .get(process.env.BASE_URL + "/api/user/view-progress", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);
  return {
    props: {
      materials: viewMaterial,
      progress: viewProgress,
      cookies: token,
    },
  };
}

export default function Material({ materials, progress, cookies }) {
  const material = materials.viewMaterial.length > 0;
  console.log(material);
  return (
    <>
      <Head>
        <title>Materi</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <div className="mx-auto flex max-w-5xl flex-row">
        <div className="flex h-adaptive w-full items-center justify-center">
          <div className="h-[90%] w-full rounded-md border-2 border-gray-200 bg-white p-4 shadow transition-colors duration-300 ease-in-out dark:border-gray-400 dark:bg-gray-600">
            <div className="h-full space-y-2.5 overflow-scroll">
              {!material ? (
                <div className="flex h-full items-center justify-center">
                  <p className="text-center font-head text-2xl font-bold text-secondary-400 dark:text-sky-200">
                    Materi Belum Tersedia
                  </p>
                </div>
              ) : (
                <p className="text-center font-head text-xl font-bold text-secondary-400 dark:text-sky-200">
                  Daftar Materi
                </p>
              )}

              {materials?.viewMaterial.map((material, index) => (
                <CardMaterial key={index} index={index} material={material} />
              ))}
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
