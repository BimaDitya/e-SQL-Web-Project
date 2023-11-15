import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import withReactContent from "sweetalert2-react-content";
export default function ProfileForm({ accounts, token }) {
  const profiles = accounts.Profile;
  const router = useRouter();
  const {
    reset,
    setValue,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();
  const alertWithSwal = withReactContent(Swal);

  async function UpdateProfile(data) {
    await axios
      .patch("/api/user/update-profile", data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        alertWithSwal.fire({
          toast: false,
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
              Berhasil Memperbarui Profile Pengguna
            </div>
          ),
        });
        router.push("/");
      })
      .catch(() => {
        alertWithSwal.fire({
          toast: false,
          timer: 3000,
          timerProgressBar: true,
          showConfirmButton: false,
          width: "40%",
          imageUrl: "/icons/error.png",
          imageWidth: "20%",
          title: (
            <p className="text-center font-head text-lg font-semibold tracking-wide text-red-600">
              Perintah Gagal
            </p>
          ),
          html: (
            <p className="text-center font-body font-medium tracking-wide text-red-400">
              Gagal Memperbarui Profile Pengguna
            </p>
          ),
        });
      });
  }
  // Menampilkan Data Ke Input Field
  useEffect(() => {
    setValue("firstName", profiles?.FirstName);
    setValue("lastName", profiles?.LastName);
    setValue("school", profiles?.School);
    setValue("email", accounts?.Email);
  }, [
    profiles?.FirstName,
    profiles?.LastName,
    profiles?.School,
    accounts?.Email,
    setValue,
  ]);
  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={handleSubmit(UpdateProfile)}
    >
      {/* Alamat Email */}
      <div className="flex flex-col">
        <label className="font-head text-gray-400">Alamat Email (Aktif)</label>
        <input
          name="email"
          className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-gray-300 outline-none transition ease-in-out"
          type="email"
          placeholder="Email"
          {...register("email", {
            disabled: true,
            required: true,
            pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
          })}
        />
      </div>
      <div className="flex flex-row justify-between space-x-4">
        {/* Nama Depan */}
        <div className="flex w-full flex-col">
          <label className="font-head text-secondary-400">Nama Depan</label>
          <input
            name="firstName"
            className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
            type="text"
            placeholder="Nama Depan"
            {...register("firstName", {
              required: true,
              minLength: 3,
              pattern: {
                value: /^[a-zA-Z '.]{3,32}$/i,
              },
            })}
          />
          {errors.firstName && errors.firstName.type === "required" && (
            <p className="font-head text-sm text-red-400">
              Masukkan Nama Depan
            </p>
          )}
          {errors.firstName && errors.firstName.type === "minLength" && (
            <p className="font-head text-sm text-red-400">
              Nama Depan Minimal Terdiri Dari 3 karakter
            </p>
          )}
          {errors.firstName && errors.firstName.type === "pattern" && (
            <p className="font-head text-sm text-red-400">
              Nama Depan Tidak Diizinkan Mengandung Karakter Spesial
            </p>
          )}
        </div>
        {/* Nama Belakang */}
        <div className="flex w-full flex-col">
          <label className="font-head text-secondary-400">Nama Belakang</label>
          <input
            name="lastName"
            className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
            type="text"
            placeholder="Nama Belakang"
            {...register("lastName", {
              required: true,
              minLength: 3,
              pattern: {
                value: /^[a-zA-Z '.]{3,32}$/i,
              },
            })}
          />
          {errors.lastName && errors.lastName.type === "minLength" && (
            <p className="font-head text-sm text-red-400">
              Nama Belakang Minimal Terdiri Dari 3 karakter
            </p>
          )}
          {errors.lastName && errors.lastName.type === "pattern" && (
            <p className="font-head text-sm text-red-400">
              Nama Belakang Tidak Diizinkan Mengandung Karakter Spesial
            </p>
          )}
        </div>
      </div>
      {/* Asal Sekolah */}
      <div className="flex w-full flex-col">
        <label className="font-head text-secondary-400">Asal Sekolah</label>
        <input
          name="school"
          className="h-8 border-b-2 border-gray-200 bg-transparent font-body text-primary-400 outline-none transition ease-in-out hover:border-primary-400 focus:border-b-2 focus:border-primary-400"
          type="text"
          placeholder="Asal Sekolah"
          {...register("school", {
            required: true,
            minLength: 10,
            pattern: {
              value: /^[a-zA-Z0-9 '.]{3,32}$/i,
            },
          })}
        />
        {errors.school && errors.school.type === "minLength" && (
          <p className="font-head text-sm text-red-400">
            Nama Sekolah Minimal Terdiri Dari 10 karakter
          </p>
        )}
        {errors.school && errors.school.type === "pattern" && (
          <p className="font-head text-sm text-red-400">
            Nama Belakang Tidak Diizinkan Mengandung Karakter Spesial
          </p>
        )}
      </div>
      <div className="flex space-x-2 pt-2">
        <button
          disabled={!isDirty || !isValid}
          type="submit"
          className="button-primary disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200"
        >
          Simpan
        </button>
        <button
          onClick={() =>
            reset({
              firstName: profiles?.FirstName,
              lastName: profiles?.LastName,
              school: profiles?.School,
            })
          }
          type="button"
          className="button-danger"
        >
          Reset
        </button>
      </div>
    </form>
  );
}
