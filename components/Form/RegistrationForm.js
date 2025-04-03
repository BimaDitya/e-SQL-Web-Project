import "animate.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

export default function RegistrationForm() {
  const router = useRouter();
  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const [showPassword, setShowPassword] = useState(true);
  const [isPasswordTyping, setIsPasswordTyping] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(true);
  const [isConfirmPasswordTyping, setConfirmIsPasswordTyping] = useState(false);

  const passwordVisibility = () => {
    setShowPassword((visible) => !visible);
  };

  const confirmPasswordVisibility = () => {
    setShowConfirmPassword((visible) => !visible);
  };

  const alertWithSwal = withReactContent(Swal);

  async function SubmitRegisteration(data) {
    await axios
      .post("/api/registration", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(async () => {
        reset();
        await alertWithSwal.fire({
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
              className={`text-center font-head text-lg font-semibold tracking-wide text-green-600`}
            >
              Registrasi Berhasil!
            </p>
          ),
          html: (
            <p
              className={`text-center font-body font-medium tracking-wide text-green-400`}
            >
              Registrasi Dengan
              <span className={`font-body font-semibold text-green-500`}>
                {` ${data.email.toUpperCase()} `}
              </span>
              Berhasil
            </p>
          ),
        });
        router.push("/login");
      })
      .catch(async () => {
        await alertWithSwal.fire({
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          width: "50%",
          imageUrl: "/icons/error.png",
          imageWidth: "20%",
          showClass: {
            popup: "animate__animated animate__bounceIn",
          },
          hideClass: {
            popup: "animate__animated animate__bounceOut",
          },
          title: (
            <p
              className={`text-center font-head text-lg font-semibold tracking-wide text-red-600`}
            >
              Registrasi Gagal!
            </p>
          ),
          html: (
            <p
              className={`text-center font-body font-medium tracking-wide text-red-400`}
            >
              Alamat Email
              <span className={`font-body font-semibold text-red-500`}>
                {` ${data.email.toUpperCase()} `}
              </span>
              Telah Terdaftar
            </p>
          ),
        });
      });
  }
  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={handleSubmit(SubmitRegisteration)}
    >
      <p className="font-head text-xl font-bold text-primary-400">
        Registrasi Akun
      </p>
      {/* Alamat Email */}
      <div className="flex flex-col">
        <label className="font-head text-secondary-400 dark:text-sky-200">
          Alamat Email
        </label>
        <input
          name="email"
          className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
          type="email"
          placeholder="Email"
          {...register("email", {
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          })}
        />
        {errors.email && errors.email.type === "required" && (
          <p className="font-head text-sm text-red-400">
            Silahkan Masukkan Alamat Email
          </p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className="font-head text-sm text-red-400">Email Tidak Valid</p>
        )}
      </div>
      {/* Kata Sandi */}
      <div className="flex flex-col">
        <label className="font-head text-secondary-400 dark:text-sky-200">
          Kata Sandi
        </label>
        <div className="flex w-full flex-row items-center justify-center">
          <input
            name="password"
            className="h-8 w-full border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
            type={showPassword ? "password" : "text"}
            placeholder="Kata Sandi"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
              },
            })}
            onChange={(e) => {
              setIsPasswordTyping(e.target.value.length > 0);
            }}
          />
          {isPasswordTyping && (
            <button
              type="button"
              onClick={passwordVisibility}
              className="p-2 text-gray-600 transition duration-300 hover:text-primary-400 dark:text-sky-200 dark:hover:text-white"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        {errors.password && errors.password.type === "required" && (
          <p className="font-head text-sm text-red-400">Masukkan Kata Sandi</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p className="font-head text-sm text-red-400">
            Kata Sandi Minimal Harus Terdiri Dari 8 karakter
          </p>
        )}
        {errors.password && errors.password.type === "pattern" && (
          <p className="font-head text-sm text-red-400">
            Kata Sandi Harus Mengandung Huruf Kapital, Huruf Kecil, Dan Angka
          </p>
        )}
      </div>
      {/* Konfirmasi Kata Sandi */}
      <div className="flex flex-col">
        <label className="font-head text-secondary-400 dark:text-sky-200">
          Konfirmasi Kata Sandi
        </label>
        <div className="flex w-full flex-row items-center justify-center">
          <input
            name="passwordConfirmation"
            className="h-8 w-full border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
            type={showConfirmPassword ? "password" : "text"}
            placeholder="Konfirmasi Kata Sandi"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            onChange={(e) => {
              setConfirmIsPasswordTyping(e.target.value.length > 0);
            }}
          />
          {isConfirmPasswordTyping && (
            <button
              type="button"
              onClick={passwordVisibility}
              className="p-2 text-gray-600 transition duration-300 hover:text-primary-400 dark:text-sky-200 dark:hover:text-white"
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
            </button>
          )}
        </div>
        {errors.passwordConfirmation &&
          errors.passwordConfirmation.type === "required" && (
            <p className="font-head text-sm text-red-400">
              Masukkan Ulang Kata Sandi
            </p>
          )}
        {errors.passwordConfirmation &&
          errors.passwordConfirmation.type === "validate" && (
            <p className="font-head text-sm text-red-400">
              Kata Sandi Tidak Cocok!
            </p>
          )}
      </div>
      <div className="pt-2">
        <button
          disabled={!isValid}
          type="submit"
          className="button-primary w-full disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200"
        >
          Registrasi
        </button>
      </div>
    </form>
  );
}
