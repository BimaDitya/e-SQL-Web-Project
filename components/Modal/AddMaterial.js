import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";
export default function AddMaterial({ setShowAdd }) {
  const router = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const alertWithSwal = withReactContent(Swal);
  async function AddMaterial(data) {
    await axios
      .post("/api/admin/add-material", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setShowAdd(false);
        reset();
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
              <span className="font-semibold text-green-500">
                {response.data.addMaterial.Title}
              </span>{" "}
              Ditambahkan
            </div>
          ),
        });
        router.replace(router.asPath);
      })
      .catch(() => {
        alertWithSwal.fire({
          toast: true,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          width: "40%",
          imageUrl: "/icons/error.png",
          imageWidth: "20%",
          title: (
            <p className="text-center font-head text-lg font-semibold tracking-wide text-red-600">
              Terjadi Kesalahan
            </p>
          ),
          html: (
            <p className="text-center font-body font-medium tracking-wide text-red-400">
              Gagal Menambahkan Materi
            </p>
          ),
        });
      });
  }
  return (
    <div className="flex h-auto w-full items-center justify-center">
      <div className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500/25 backdrop-blur-sm">
        <LazyMotion features={domAnimation}>
          <m.div
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 50,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mx-48 h-max w-full rounded-lg bg-white px-8 py-4 shadow"
          >
            <form
              noValidate
              className="space-y-4"
              onSubmit={handleSubmit(AddMaterial)}
            >
              <div className="flex flex-row justify-between">
                <p className="font-head text-xl font-semibold text-secondary-400">
                  Tambahkan Materi
                </p>
                <button
                  onClick={() => setShowAdd(false)}
                  className="rounded-lg bg-gray-200 p-2 font-head text-gray-400 duration-300 ease-in-out hover:cursor-pointer hover:bg-red-400 hover:text-white hover:shadow-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex h-max w-full flex-col space-y-4">
                {/* Baris Judul & Slug */}
                <div className="flex w-full flex-row space-x-16">
                  {/* Judul Materi */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Judul Materi
                    </label>
                    <input
                      label="Title"
                      name="title"
                      className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
                      type="text"
                      placeholder="Masukkan Judul Materi"
                      {...register("title", {
                        required: true,
                        pattern: /^[a-zA-Z ()*-]{3,64}$/gi,
                      })}
                    />
                    {errors.title && errors.title.type === "required" && (
                      <p className="font-head text-sm text-red-400">
                        Masukkan Judul Materi
                      </p>
                    )}
                    {errors.title && errors.title.type === "pattern" && (
                      <p className="font-head text-sm text-red-400">
                        Judul Materi Invalid, Maks. 64 Karakter
                      </p>
                    )}
                  </div>
                  {/* Slug Materi */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Slug Materi
                    </label>
                    <input
                      label="Slug"
                      name="slug"
                      className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
                      type="text"
                      placeholder="Masukkan Slug Materi"
                      {...register("slug", {
                        required: true,
                        pattern: /^[a-z-]{3,64}$/g,
                      })}
                    />
                    {errors.slug && errors.slug.type === "required" && (
                      <p className="font-head text-sm text-red-400">
                        Masukkan Slug
                      </p>
                    )}
                    {errors.slug && errors.slug.type === "pattern" && (
                      <p className="font-head text-sm text-red-400">
                        Format Slug Invalid, Maks. 64 Karakter
                      </p>
                    )}
                  </div>
                </div>
                {/* Deskripsi Materi */}
                <div className="flex w-full flex-col">
                  <label className="font-head text-secondary-400">
                    Deskripsi Materi
                  </label>
                  <textarea
                    label="Desc"
                    name="desc"
                    className="mt-2 h-36 resize-none rounded bg-gray-100 p-2 text-justify font-body text-gray-600 outline-none ring-2 ring-gray-200 transition ease-in-out focus:ring-primary-100"
                    type="text"
                    placeholder="Masukkan Deskripsi..."
                    {...register("desc", {
                      required: true,
                      pattern: /^[a-zA-Z0-9 '.,()*-]{3,}$/gi,
                    })}
                  />
                  {errors.desc && errors.desc.type === "required" && (
                    <p className="font-head text-sm text-red-400">
                      Masukkan Deskripsi Materi
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-row space-x-4">
                  <button
                    disabled={!isValid}
                    type="submit"
                    className="button-primary disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-400"
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </m.div>
        </LazyMotion>
      </div>
    </div>
  );
}
