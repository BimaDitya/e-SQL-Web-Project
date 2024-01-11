import "animate.css";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";

export default function LoginForm() {
  const router = useRouter();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm();

  const alertWithSwal = withReactContent(Swal);

  async function LoginHandle(data) {
    await axios
      .post("/api/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        reset();
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
              className={`text-center font-head text-lg font-semibold tracking-wide text-green-600`}
            >
              Login Berhasil!
            </p>
          ),
          html: (
            <p
              className={`text-center font-body font-medium tracking-wide text-green-400`}
            >
              Selamat Datang,
              <span
                className={`font-body font-semibold text-green-500`}
              >{` ${response?.data?.email.toUpperCase()} `}</span>
            </p>
          ),
        });
        setTimeout(() => {
          router.reload(() => "/");
        }, 3000);
      })
      .catch((error) => {
        alertWithSwal.fire({
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
              Login Gagal!
            </p>
          ),
          html: (
            <p
              className={`text-center font-body font-medium tracking-wide text-red-400`}
            >
              {error.response.data}
            </p>
          ),
        });
      });
  }
  return (
    <form noValidate className="space-y-4" onSubmit={handleSubmit(LoginHandle)}>
      {/* Alamat Email */}
      <div className="flex flex-col">
        <label className="font-head text-secondary-400">Alamat Email</label>
        <input
          label="Email"
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
            Masukkan Alamat Email
          </p>
        )}
        {errors.email && errors.email.type === "pattern" && (
          <p className="font-head text-sm text-red-400">Email Tidak Valid</p>
        )}
      </div>
      {/* Kata Sandi */}
      <div className="flex flex-col">
        <label className="font-head text-secondary-400">Kata Sandi</label>
        <input
          label="Password"
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
          <p className="font-head text-sm text-red-400">Masukkan Kata Sandi</p>
        )}
        {errors.password && errors.password.type === "minLength" && (
          <p className="font-head text-sm text-red-400">
            Kata Sandi Minimal Harus Terdiri Dari 6 karakter
          </p>
        )}
      </div>
      <div className="pt-2">
        <button
          disabled={!isValid}
          type="submit"
          className="button-primary w-full disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200"
        >
          Masuk
        </button>
      </div>
    </form>
  );
}
