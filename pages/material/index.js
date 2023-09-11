import axios from "axios";
import Head from "next/head";
import CardAF from "@/components/Card/CardAF";
import CardDDL from "@/components/Card/CardDDL";
import CardDML from "@/components/Card/CardDML";
import CardDCL from "@/components/Card/CardDCL";
import CardJoin from "@/components/Card/CardJoin";
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
        <div className="flex h-adaptive w-full items-start justify-center pt-10">
          <div className="h-[97.5%] w-full rounded-md border-2 border-gray-200 bg-white/10 p-4 backdrop-blur-sm">
            <div className="h-full space-y-2.5 overflow-scroll">
              {!materials && !status && (
                <p className="text-center font-head text-2xl font-bold text-secondary-400">
                  Materi Belum Tersedia
                </p>
              )}
              <p className="text-center font-head text-xl font-bold text-secondary-400">
                Daftar Materi
              </p>
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
              {materials?.viewMaterial[2]?.Content?.length !== 0 && (
                <CardDCL
                  material={materials?.viewMaterial[2]}
                  status={status?.viewStatus[2]}
                />
              )}
              {materials?.viewMaterial[3]?.Content?.length !== 0 && (
                <CardJoin
                  material={materials?.viewMaterial[3]}
                  status={status?.viewStatus[3]}
                />
              )}
              {materials?.viewMaterial[4]?.Content?.length !== 0 && (
                <CardAF
                  material={materials?.viewMaterial[4]}
                  status={status?.viewStatus[4]}
                />
              )}
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
