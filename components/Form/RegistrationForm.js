import "animate.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
import Styles from "../Component.module.css";

export function RegistrationForm() {
  const router = useRouter();
  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

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
              className={`${Styles.FontHead} text-center text-lg font-semibold tracking-wide text-green-600`}
            >
              Registrasi Berhasil!
            </p>
          ),
          html: (
            <p
              className={`${Styles.FontBody} text-center font-medium tracking-wide text-green-400`}
            >
              Registrasi Dengan
              <span
                className={`${Styles.FontBody} font-semibold text-green-500`}
              >
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
              className={`${Styles.FontHead} text-center text-lg font-semibold tracking-wide text-red-600`}
            >
              Registrasi Gagal!
            </p>
          ),
          html: (
            <p
              className={`${Styles.FontBody} text-center font-medium tracking-wide text-red-400`}
            >
              Alamat Email
              <span className={`${Styles.FontBody} font-semibold text-red-500`}>
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
      {/* Alamat Email */}
      <div className="flex flex-col">
        <label className="font-head text-secondary-400">Alamat Email</label>
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
      <div className="flex flex-row justify-between space-x-4">
        {/* Kata Sandi */}
        <div className="flex w-full flex-col">
          <label className="font-head text-secondary-400">Kata Sandi</label>
          <input
            name="password"
            className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
            type="password"
            placeholder="Kata Sandi"
            {...register("password", {
              required: true,
              minLength: 8,
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/,
              },
            })}
          />
          {errors.password && errors.password.type === "required" && (
            <p className="font-head text-sm text-red-400">
              Masukkan Kata Sandi
            </p>
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
        <div className="flex w-full flex-col">
          <label className="font-head text-secondary-400">
            Konfirmasi Kata Sandi
          </label>
          <input
            name="passwordConfirmation"
            className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
            type="password"
            placeholder="Konfirmasi Kata Sandi"
            {...register("passwordConfirmation", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
          />
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
