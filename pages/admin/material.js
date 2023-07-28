import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import SideMenu from "@/components/Admin/SideMenu";
import MainLayout from "@/components/Layout/MainLayout";
import AddMaterial from "@/components/Modal/AddMaterial";
import EditMaterial from "@/components/Modal/EditMaterial";
import { LazyMotion, domAnimation, m } from "framer-motion";
import DeleteMaterial from "@/components/Modal/DeleteMaterial";
import Pagination from "@/components/Pagination";

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  const token = context.req.cookies.token;
  const resolvedUrl = context.resolvedUrl;
  if (!getCookies) {
    if (!getCookies)
      return {
        redirect: {
          source: "/admin/material",
          destination: "/login",
          permanent: true,
        },
      };
  }
  const account = await axios.get(
    process.env.BASE_URL + "/api/user/view-account",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const material = await axios.get(
    process.env.BASE_URL + "/api/admin/view-material",
  );
  const materials = material.data?.viewMaterial;
  const accounts = account.data?.data;
  if (accounts.Role !== "ADMIN")
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  return { props: { accounts, materials, resolvedUrl } };
}
export default function Material({ accounts, materials }) {
  const [material, setMaterial] = useState();
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const contentPerPage = 4;

  // Tampilkan Materi
  const lastMaterial = currentPage * contentPerPage;
  const firstMaterial = lastMaterial - contentPerPage;
  const records = materials.slice(firstMaterial, lastMaterial);

  const totalPages = Math.ceil(materials.length / contentPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  // Berpindah Materi
  function previous() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function next() {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }
  return (
    <>
      <Head>
        <title>Admin - Materi</title>
        <link rel="icon" href="../icons/favicon.ico"></link>
      </Head>
      <LazyMotion features={domAnimation}>
        {/* Add Material Modal */}
        {showAdd ? <AddMaterial setShowAdd={setShowAdd} /> : null}
        {/* Edit Material Modal */}
        {showEdit ? (
          <EditMaterial setShowEdit={setShowEdit} material={material} />
        ) : null}
        {/* Delete Material Modal */}
        {showDelete ? (
          <DeleteMaterial setShowDelete={setShowDelete} material={material} />
        ) : null}
        <div className="flex flex-row space-x-4 px-8 py-12">
          {/* Kolom Kiri */}
          <m.div
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 50,
            }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-30 h-max w-[25%] rounded-md border-2 border-gray-200 bg-transparent backdrop-blur-sm"
          >
            <SideMenu accounts={accounts} />
          </m.div>
          {/* Kolom Kanan */}
          <m.div
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 50,
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            className="z-30 h-max w-[75%] space-y-2 rounded-md border-2 border-gray-200 bg-transparent px-4 py-2.5 backdrop-blur-sm"
          >
            <div className="h-max w-full">
              {/* Baris Atas */}
              <div className="flex w-full flex-row items-center justify-between rounded">
                <p className="font-head text-xl font-bold text-secondary-400">
                  Daftar Materi
                </p>
                <button
                  className="button_default flex flex-row pl-2 pr-4"
                  onClick={() => setShowAdd(true)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.75}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v12m6-6H6"
                    />
                  </svg>
                  Materi
                </button>
              </div>
              <div className="py-2">
                <div className="overflow-auto">
                  <table className="w-full table-auto border-2 border-secondary-100">
                    <thead className="bg-secondary-100 text-left font-head uppercase text-white">
                      <tr>
                        <th scope="col" className="w-max px-2 py-2 text-center">
                          #
                        </th>
                        <th scope="col" className="w-max px-2 py-2">
                          Judul Materi
                        </th>
                        <th scope="col" className="w-max px-2 py-2 text-center">
                          Total Konten
                        </th>
                        <th scope="col" className="w-max px-2 py-2 text-center">
                          Aksi
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-50 font-body text-gray-500">
                      {Object.values(records).map((Rows, index) => (
                        <m.tr
                          key={index}
                          transition={{
                            duration: 1,
                            type: "spring",
                            stiffness: 50,
                            delay: index * 0.25,
                          }}
                          initial={{ opacity: 0, x: 100 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="border-b-2 border-secondary-100"
                        >
                          <td className="w-max px-2 py-2 text-center">
                            {index + 1}
                          </td>
                          <td className="w-max px-2 py-2">{Rows?.Title}</td>
                          <td className="max-w-xs px-2 py-2 text-center">
                            {Rows?._count?.Content} Konten
                          </td>
                          <td className="w-max space-x-2 px-2 py-2 text-center">
                            <button
                              className="button_default"
                              onClick={() => {
                                setShowEdit(true);
                                setMaterial(Rows);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="button_danger"
                              onClick={() => {
                                setShowDelete(true);
                                setMaterial(Rows);
                              }}
                            >
                              Hapus
                            </button>
                          </td>
                        </m.tr>
                      ))}
                    </tbody>
                  </table>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    previous={previous}
                    numbers={numbers}
                    next={next}
                  />
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </LazyMotion>
    </>
  );
}

Material.getLayout = function getLayout(material) {
  return <MainLayout>{material}</MainLayout>;
};
