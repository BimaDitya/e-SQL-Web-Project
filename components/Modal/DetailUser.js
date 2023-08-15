import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function DetailUser({ user, setshowDetail }) {
  const { setValue, register } = useForm();

  // Menampilkan Data Ke Input Field
  useEffect(() => {
    setValue("role", user?.Role);
    setValue("email", user?.Email);
    setValue("firstName", user?.Profile?.FirstName);
    setValue("lastName", user?.Profile?.LastName);
    setValue("school", user?.Profile?.School);
  }, [
    user?.Role,
    user?.Email,
    user?.Profile?.FirstName,
    user?.Profile?.LastName,
    user?.Profile?.School,
    setValue,
  ]);
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
          <div className="mx-48 h-max w-full rounded-lg bg-white px-8 py-4 shadow">
            <form noValidate className="space-y-4">
              <div className="flex flex-row justify-between">
                <p className="font-head text-xl font-semibold text-secondary-400">
                  Detail Pengguna
                </p>
                <button
                  onClick={() => setshowDetail(false)}
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
              <div className="flex w-full flex-col space-y-2">
                {/* Baris Pertama */}
                <div className="flex w-full flex-row space-x-4">
                  {/* Email Pengguna */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Email
                    </label>
                    <input
                      label="Email"
                      name="email"
                      className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400 disabled:cursor-not-allowed"
                      type="email"
                      {...register("email", {
                        disabled: true,
                      })}
                    />
                  </div>
                  {/* Role Pengguna */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">Role</label>
                    <input
                      label="Role"
                      name="role"
                      className="h-8 appearance-none border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400 disabled:cursor-not-allowed"
                      type="text"
                      {...register("role", {
                        disabled: true,
                      })}
                    />
                  </div>
                </div>
                {/* Baris Kedua */}
                <div className="flex w-full flex-row space-x-4">
                  {/* Nama Depan */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Nama Depan
                    </label>
                    <input
                      label="FirstName"
                      name="firstName"
                      className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400 disabled:cursor-not-allowed"
                      type="text"
                      {...register("firstName", {
                        disabled: true,
                      })}
                    />
                  </div>
                  {/* Nama Belakang */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Nama Belakang
                    </label>
                    <input
                      label="LastName"
                      name="lastName"
                      className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400 disabled:cursor-not-allowed"
                      type="text"
                      {...register("lastName", {
                        disabled: true,
                      })}
                    />
                  </div>
                </div>
                {/* Baris Ketiga */}
                <div className="flex w-full flex-row space-x-4 pb-6">
                  {/* Asal Sekolah */}
                  <div className="flex w-full flex-col">
                    <label className="font-head text-secondary-400">
                      Asal Sekolah
                    </label>
                    <input
                      label="School"
                      name="school"
                      className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
                      type="text"
                      {...register("school", {
                        disabled: true,
                      })}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
