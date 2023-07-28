import axios from "axios";
import Head from "next/head";
import CardDDL from "@/components/Card/CardDDL";
import CardDML from "@/components/Card/CardDML";
import MainLayout from "@/components/Layout/MainLayout";

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  const queryMaterial = context.query.slug;
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
  const viewStatus = await axios
    .get(process.env.BASE_URL + "/api/user/view-status", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        queryMaterial: queryMaterial,
      },
    })
    .then((response) => response.data);
  return { props: { materials: viewMaterial, status: viewStatus } };
}

export default function Material({ materials, status }) {
  return (
    <>
      <Head>
        <title>Materi</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <div className="flex flex-row px-32">
        <div className="flex h-full w-full items-start justify-center">
          <div className="z-30 m-10 w-full space-y-4 rounded-md border-2 border-gray-200 bg-transparent p-2.5 backdrop-blur-sm">
            {!materials && !status && (
              <p className="text-center font-head text-2xl font-bold text-secondary-400">
                Materi Belum Tersedia
              </p>
            )}
            {materials?.viewMaterial[0].Content?.lenth !== 0 && (
              <CardDDL
                material={materials?.viewMaterial[0]}
                status={status?.viewStatus[0]}
              />
            )}
            {materials?.viewMaterial[1]?.Content?.length !== 0 && (
              <CardDML
                material={materials?.viewMaterial[1]}
                status={status?.viewStatus[1]}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

Material.getLayout = function getLayout(material) {
  return <MainLayout>{material}</MainLayout>;
};
