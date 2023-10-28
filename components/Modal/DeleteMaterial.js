import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useRouter } from "next/router";
import Styles from "../Component.module.css";

export default function DeleteMaterial({ material, setShowDelete }) {
  const router = useRouter();
  const { handleSubmit } = useForm();

  const alertWithSwal = withReactContent(Swal);
  async function DeleteMaterial() {
    await axios
      .delete("/api/admin/delete-material", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          params: material.Id,
        },
      })
      .then((response) => {
        setShowDelete(false);
        alertWithSwal.fire({
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          width: "50%",
          imageUrl: "/icons/success.png",
          imageWidth: "20%",
          showClass: {
            popup: "animate__animated animate__bounceIn",
          },
          hideClass: {
            popup: "animate__animated animate__bounceOut",
          },
          title: (
            <p
              className={`${Styles.FontHead} text-center text-lg font-semibold tracking-wide text-green-600`}
            >
              Perintah Berhasil
            </p>
          ),
          html: (
            <div
              className={`${Styles.FontBody} text-center font-medium tracking-wide text-green-400`}
            >
              Materi
              <span className="font-semiboldbold text-green-500">
                {` ${response.data.deleteMaterial.Title} `}
              </span>
              Telah Dihapus
            </div>
          ),
        });
        router.replace(router.asPath);
      });
  }
  return (
    <LazyMotion features={domAnimation}>
      <div className="flex h-auto w-full items-center justify-center">
        <m.div
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500/50 backdrop-blur-sm"
        >
          <div className="mx-48 h-max w-[50%] rounded-lg bg-white px-8 py-4 shadow">
            <form
              noValidate
              className="space-y-4"
              onSubmit={handleSubmit(DeleteMaterial)}
            >
              <div className="flex flex-row justify-between">
                <p className="font-head text-xl font-semibold text-secondary-400">
                  Hapus Materi
                </p>
              </div>
              <div className="flex h-max w-full flex-col space-y-4">
                <p className="font-body text-gray-400">
                  Materi
                  <span className="font-semibold text-red-500">
                    {` ${material.Title} `}
                  </span>
                  Akan Dihapus?
                </p>
                <div className="flex w-full flex-row space-x-4">
                  <button type="submit" className="button-danger">
                    Hapus
                  </button>
                  <button
                    onClick={() => setShowDelete(false)}
                    className="button-default"
                  >
                    Batal
                  </button>
                </div>
              </div>
            </form>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
