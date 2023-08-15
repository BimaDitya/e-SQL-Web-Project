import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function AddExercise({ setShowAdd, materials }) {
  const router = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();
  const alertWithSwal = withReactContent(Swal);
  async function AddExercise(data) {
    await axios
      .post("/api/admin/add-exercise", data, {
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
              {response.data.message}
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
            className="mx-24 h-max w-full rounded-lg bg-white px-8 py-4 shadow"
          >
            <form
              noValidate
              className="space-y-4"
              onSubmit={handleSubmit(AddExercise)}
            >
              <div className="flex flex-row justify-between">
                <p className="font-head text-xl font-semibold text-secondary-400">
                  Tambahkan Latihan
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
              <div className="flex h-max w-full flex-col space-y-2">
                {/* Baris Pertama */}
                <div className="flex h-max w-full flex-row space-x-4">
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
                  {/* Bagian Judul Soal */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Judul Soal
                    </label>
                    <input
                      label="Title"
                      name="title"
                      className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
                      type="text"
                      placeholder="Masukkan Judul Soal"
                      {...register("title", {
                        required: true,
                        pattern: /^[A-Za-z0-9 ()*-]{3,64}$/gi,
                      })}
                    />
                    {errors.title && errors.title.type === "required" && (
                      <p className="font-head text-sm text-red-400">
                        Masukkan Judul Soal
                      </p>
                    )}
                    {errors.title && errors.title.type === "pattern" && (
                      <p className="font-head text-sm text-red-400">
                        Judul Invalid, Maks. 64 Karakter
                      </p>
                    )}
                  </div>
                  {/* Bagian Slug */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Slug Soal
                    </label>
                    <input
                      label="Slug"
                      name="slug"
                      className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
                      type="text"
                      placeholder="Masukkan Slug Soal"
                      {...register("slug", {
                        required: true,
                        pattern: /^[A-Za-z0-9-]{3,32}$/gi,
                      })}
                    />
                    {errors.slug && errors.slug.type === "required" && (
                      <p className="font-head text-sm text-red-400">
                        Masukkan Slug Soal
                      </p>
                    )}
                    {errors.slug && errors.slug.type === "pattern" && (
                      <p className="font-head text-sm text-red-400">
                        Slug Soal Invalid, Maks. 32 Karakter
                      </p>
                    )}
                  </div>
                  {/* Bagian Skor */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Skor Soal
                    </label>
                    <input
                      label="Score"
                      name="score"
                      className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
                      type="number"
                      placeholder="Masukkan Skor Soal"
                      {...register("score", {
                        required: true,
                        pattern: /^(?:[1-9][0-9]?|100)$/gi,
                      })}
                    />
                    {errors.score && errors.score.type === "required" && (
                      <p className="font-head text-sm text-red-400">
                        Masukkan Skor Latian Soal
                      </p>
                    )}
                    {errors.score && errors.score.type === "pattern" && (
                      <p className="font-head text-sm text-red-400">
                        Skor Soal Invalid, Angka 1-100
                      </p>
                    )}
                  </div>
                </div>
                {/* Soal Materi */}
                <div className="flex w-full flex-col space-y-2">
                  <label className="font-head text-secondary-400">
                    Soal Materi
                  </label>
                  <textarea
                    label="Question"
                    name="question"
                    className="h-24 resize-none rounded bg-gray-100 p-2 text-justify font-body text-gray-600 outline-none ring-2 ring-gray-200 transition ease-in-out focus:ring-primary-100"
                    type="text"
                    placeholder="Masukkan Soal..."
                    {...register("question", {
                      required: true,
                    })}
                  />
                  {errors.question && errors.question.type === "required" && (
                    <p className="font-head text-sm text-red-400">
                      Masukkan Soal
                    </p>
                  )}
                </div>
                {/* Jawaban Soal */}
                <div className="flex w-full flex-col space-y-2">
                  <label className="font-head text-secondary-400">
                    Jawaban Materi
                  </label>
                  <textarea
                    label="Answer"
                    name="answer"
                    className="h-24 resize-none rounded bg-gray-100 p-2 text-justify font-body text-gray-600 outline-none ring-2 ring-gray-200 transition ease-in-out focus:ring-primary-100"
                    type="text"
                    placeholder="Masukkan Jawaban..."
                    {...register("answer", {
                      required: true,
                    })}
                  />
                  {errors.answer && errors.answer.type === "required" && (
                    <p className="font-head text-sm text-red-400">
                      Masukkan Jawaban
                    </p>
                  )}
                </div>
                <div className="flex w-full flex-row pt-2">
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