import "animate.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Styles from "../Component.module.css";

export default function DeleteExercise({ exercise, setShowDelete }) {
  const router = useRouter();
  const { handleSubmit } = useForm();
  const alertWithSwal = withReactContent(Swal);

  async function DeleteExercise() {
    await axios
      .delete("/api/admin/delete-exercise", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          slug: exercise.Slug,
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
              Latihan Soal
              <span className="font-semiboldbold text-green-500">
                {` ${response.data.deleteExercise.Title} `}
              </span>
              Telah Terhapus
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
            delay: 0.2,
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500/50"
        >
          <div className="h-max w-[80%] rounded-lg bg-white px-8 py-4 shadow">
            <form
              noValidate
              className="space-y-4"
              onSubmit={handleSubmit(DeleteExercise)}
            >
              <div className="flex flex-row justify-between">
                <p className="font-head text-xl font-semibold text-secondary-400">
                  Hapus Latihan
                </p>
              </div>
              <div className="flex h-max w-full flex-col space-y-4">
                <p className="font-body text-gray-400">
                  Apakah Anda Ingin Menghapus
                  <span className="font-semibold text-red-500">
                    {` ${exercise.Title} `}
                  </span>
                  Dari Latihan Soal?
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
