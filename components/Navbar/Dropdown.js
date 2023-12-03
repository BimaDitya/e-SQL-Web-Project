import "animate.css";
import axios from "axios";
import Link from "next/link";
import Swal from "sweetalert2";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Styles from "../Component.module.css";
import withReactContent from "sweetalert2-react-content";
import { motion, AnimatePresence } from "framer-motion";

export default function Dropdown({ data, cookies }) {
  const alertWithSwal = withReactContent(Swal);
  const [toggle, setToggle] = useState(false);
  const router = useRouter();
  const dropdown = useRef(null);
  async function Logout() {
    await axios
      .post("/api/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(() => {
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
              className={`text-center ${Styles.FontHead} text-lg font-semibold tracking-wide text-green-600`}
            >
              Logout Berhasil!
            </p>
          ),
          html: (
            <div
              className={`${Styles.FontBody} text-center font-medium tracking-wide text-green-400`}
            >
              Sampai Jumpa,
              <p className="font-semibold text-green-500">
                {` ${(data?.Email).toUpperCase()} `}
              </p>
            </div>
          ),
        });
        setTimeout(() => {
          router.reload(() => "/");
        }, 3500);
      });
  }
  useEffect(() => {
    if (!toggle) return;
    function outsideClick(event) {
      if (dropdown.current && !dropdown.current?.contains(event.target)) {
        setToggle(false);
      }
    }
    window.addEventListener("mousedown", outsideClick);
    return () => window.removeEventListener("mousedown", outsideClick);
  }, [toggle]);
  const profiles = data?.Profile;
  return (
    <div>
      <div>
        {cookies && (
          <div>
            {!profiles && (
              <div
                onClick={() => setToggle((toggle) => !toggle)}
                className={
                  toggle ? "dropdown-active-null" : "dropdown-default-null"
                }
              >
                Kosong
              </div>
            )}
            {profiles && (
              <div
                onClick={() => setToggle((toggle) => !toggle)}
                className={toggle ? "dropdown-actives" : "dropdown-default"}
              >
                {profiles.FirstName}
              </div>
            )}
            <AnimatePresence>
              {toggle && (
                <div className="relative flex flex-row justify-center">
                  <motion.div
                    ref={dropdown}
                    transition={{
                      duration: 0.5,
                    }}
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -25 }}
                    className="absolute z-10 my-4 w-max rounded-sm border-2 border-gray-400 border-opacity-25 bg-white shadow focus:outline-none"
                  >
                    <div className="space-y-2 px-6 py-2.5 text-gray-400">
                      <div className="transition duration-300 ease-in-out hover:cursor-pointer hover:text-secondary-400">
                        <Link
                          href={`/profile/${data.CreatedAt}`}
                          className="flex w-full flex-row items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="mr-2.5 h-5 w-5"
                          >
                            <path
                              strokeLinecap="square"
                              strokeLinejoin="inherit"
                              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                          </svg>
                          Atur Profile
                        </Link>
                      </div>
                      <div
                        onClick={Logout}
                        className="flex flex-row items-center transition duration-300 ease-in-out hover:cursor-pointer hover:text-red-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="mr-2.5 h-5 w-5"
                        >
                          <path
                            strokeLinecap="square"
                            strokeLinejoin="inherit"
                            d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                          />
                        </svg>
                        Logout
                      </div>
                    </div>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
