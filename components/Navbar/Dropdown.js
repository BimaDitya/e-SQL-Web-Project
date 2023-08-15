import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/router";
import withReactContent from "sweetalert2-react-content";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Dropdown({ data, cookies }) {
  const [toggle, setToggle] = useState(true);
  const router = useRouter();
  const alertWithSwal = withReactContent(Swal);
  async function Logout() {
    await axios
      .post("/api/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
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
              Logout Berhasil!
            </p>
          ),
          html: (
            <div className="text-center font-body font-medium tracking-wide text-green-400">
              Sampai Jumpa,
              <p className="font-semibold text-green-500">
                {` ${(data?.Email).toUpperCase()} `}
              </p>
            </div>
          ),
        });
        setTimeout(() => {
          router.reload(() => "/");
        }, 3000);
      });
  }
  const profiles = data?.Profile;
  return (
    <div>
      <div>
        {cookies && (
          <div>
            {!profiles && (
              <div
                onClick={() => setToggle(!toggle)}
                className={
                  toggle ? "dropdown-default-null" : "dropdown-active-null"
                }
              >
                Kosong
              </div>
            )}
            {profiles && (
              <div
                onClick={() => setToggle(!toggle)}
                className={toggle ? "dropdown-default" : "dropdown-actives"}
              >
                {profiles.FirstName}
              </div>
            )}
            {!toggle && (
              <LazyMotion features={domAnimation}>
                <m.div
                  transition={{
                    duration: 0.25,
                    type: "tween",
                    ease: "easeInOut",
                  }}
                  initial={{ opacity: 0, y: -25 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute z-10 my-2 rounded border-2 border-secondary-200 border-opacity-25 bg-white shadow-lg focus:outline-none"
                >
                  <div className="space-y-2 px-4 py-2.5 text-gray-400">
                    <div className="transition duration-300 ease-in-out hover:cursor-pointer hover:text-secondary-400">
                      <Link href={`/profile/${data.CreatedAt}`}>
                        Atur Profile
                      </Link>
                    </div>
                    <div
                      onClick={Logout}
                      className="transition duration-300 ease-in-out hover:cursor-pointer hover:text-red-600"
                    >
                      Logout
                    </div>
                  </div>
                </m.div>
              </LazyMotion>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
