import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { useRouter } from "next/router";
export default function DeleteContent({ content, setShowDelete }) {
  const router = useRouter();
  const { handleSubmit } = useForm();

  const alertWithSwal = withReactContent(Swal);

  async function DeleteContent() {
    await axios
      .delete("/api/admin/delete-content", {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          slug: content.Slug,
        },
      })
      .then((response) => {
        setShowDelete(false);
        alertWithSwal.fire({
          toast: true,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          width: "40%",
          imageUrl: "/icons/success.png",
          imageWidth: "20%",
          title: (
            <p className="text-center font-head text-lg font-semibold tracking-wide text-green-600">
              Perintah Berhasil
            </p>
          ),
          html: (
            <div className="text-center font-body font-medium tracking-wide text-green-400">
              Materi{" "}
              <span className="font-semiboldbold text-green-500">
                {response.data.deleteMaterial.Title}
              </span>{" "}
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
          className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500/25 backdrop-blur-sm"
        >
          <div className="mx-48 h-max w-[32rem] rounded-lg bg-white px-8 py-4 shadow">
            <form
              noValidate
              className="space-y-4"
              onSubmit={handleSubmit(DeleteContent)}
            >
              <div className="flex flex-row justify-between">
                <p className="font-head text-xl font-semibold text-secondary-400">
                  Hapus Konten
                </p>
              </div>
              <div className="flex h-max w-full flex-col space-y-4">
                <p className="font-body text-gray-400">
                  Konten
                  <span className="font-semibold text-secondary-400">
                    {" "}
                    {content.Title}{" "}
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
