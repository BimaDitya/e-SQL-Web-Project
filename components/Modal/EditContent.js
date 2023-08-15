import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function EditContent({ setShowEdit, materials, content }) {
  const router = useRouter();
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const alertWithSwal = withReactContent(Swal);

  async function EditContent(data) {
    await axios
      .patch("/api/admin/update-content", data, {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          params: content.Slug,
        },
      })
      .then((response) => {
        setShowEdit(false);
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
                {response.data.updateContent.Title}
              </span>{" "}
              Diperbarui
            </div>
          ),
        });
        router.replace(router.asPath);
      })
      .catch((error) => {
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
              {error.response.data.message}
            </p>
          ),
        });
      });
  }
  useEffect(() => {
    setValue("slug", content?.Slug);
    setValue("title", content?.Title);
    setValue("content", content?.Content);
    setValue("material", content?.FK_Material);
  }, [
    content?.Title,
    content?.FK_Material,
    content?.Slug,
    content?.Content,
    setValue,
  ]);
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
              onSubmit={handleSubmit(EditContent)}
            >
              <div className="flex flex-row justify-between">
                <p className="font-head text-xl font-semibold text-secondary-400">
                  Ubah Konten
                </p>
                <button
                  onClick={() => setShowEdit(false)}
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
                <div className="flex w-full flex-row space-x-4">
                  {/* Judul Kontent */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Judul Konten
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
                        Judul Materi Tidak Valid
                      </p>
                    )}
                  </div>
                  {/* Slug Konten */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Slug Konten
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
                        Format Slug Tidak Valid
                      </p>
                    )}
                  </div>
                  {/* Bagian Materi */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Bagian Materi
                    </label>
                    <select
                      className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
                      name="material"
                      id="material"
                      {...register("material", {
                        required: true,
                      })}
                    >
                      {materials.map((Material) => (
                        <option
                          className="h-max"
                          key={Material.Id}
                          value={Material.Id}
                        >
                          {Material.Title}
                        </option>
                      ))}
                    </select>
                    {errors.material && errors.material.type === "required" && (
                      <p className="font-head text-sm text-red-400">
                        Masukkan Bagian Materi
                      </p>
                    )}
                  </div>
                </div>
                {/* Isi Kontent */}
                <div className="flex w-full flex-col">
                  <label className="font-head text-secondary-400">
                    Isi Konten
                  </label>
                  <textarea
                    label="Content"
                    name="content"
                    className="mt-2 h-64 resize-none rounded bg-gray-100 p-2 text-justify font-body text-gray-600 outline-none ring-2 ring-gray-200 transition ease-in-out focus:ring-primary-100"
                    type="text"
                    placeholder="Masukkan Konten..."
                    {...register("content", {
                      required: true,
                    })}
                  />
                  {errors.desc && errors.desc.type === "required" && (
                    <p className="font-head text-sm text-red-400">
                      Masukkan Konten
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-row space-x-4">
                  <button
                    disabled={!isValid || !isDirty}
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