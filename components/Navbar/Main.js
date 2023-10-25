import Link from "next/link";
import Image from "next/image";
import Dropdown from "./Dropdown";
import { useRouter } from "next/router";
import styles from "./Navbar.module.css";

export default function Navbar({ isLoading, cookies, data }) {
  const router = useRouter();
  const roles = data?.Role;
  if (isLoading)
    return (
      <div className="sticky left-0 right-0 top-0 z-50 -mb-6 h-[80px]">
        <nav className="flex h-full items-center justify-center bg-white/50 shadow-md backdrop-blur">
          <p className="font-head text-xl font-semibold text-secondary-200">
            Sedang Memuat Navbar ⏳
          </p>
        </nav>
      </div>
    );
  return (
    <>
      <div className="sticky left-0 right-0 top-0 z-50 h-14">
        <nav className="bg-white/50 px-16 py-4 shadow-md backdrop-blur-sm">
          <div className={`flex items-center justify-between ${styles.font}`}>
            <div>
              <Image
                className="h-12 w-full"
                src="/web-logo.svg"
                alt="Website Logo"
                sizes="100vw"
                width="0"
                height="0"
                quality={25}
              />
            </div>
            <ul className="flex flex-row justify-center">
              <li className="transition duration-300 ease-in-out">
                <Link
                  href="/"
                  className={
                    router.pathname == "/"
                      ? "menu-active-state"
                      : "menu-default-state"
                  }
                >
                  Beranda
                </Link>
              </li>
              {cookies && (
                <li className="transition duration-300 ease-in-out">
                  <Link
                    href="/material"
                    className={
                      router.pathname == "/material"
                        ? "menu-active-state"
                        : "menu-default-state"
                    }
                  >
                    Materi
                  </Link>
                </li>
              )}
              {roles === "ADMIN" && (
                <li className="transition duration-300 ease-in-out">
                  <Link
                    href="/admin/user"
                    className={
                      router.pathname == "/admin/exercise"
                        ? "menu-active-state"
                        : "menu-default-state" &&
                          router.pathname == "/admin/material"
                        ? "menu-active-state"
                        : "menu-default-state" &&
                          router.pathname == "/admin/content"
                        ? "menu-active-state"
                        : "menu-default-state" &&
                          router.pathname == "/admin/user"
                        ? "menu-active-state"
                        : "menu-default-state"
                    }
                  >
                    Admin
                  </Link>
                </li>
              )}
              <li className="transition duration-300 ease-in-out">
                <Link
                  href="/about"
                  className={
                    router.pathname == "/about"
                      ? "menu-active-state"
                      : "menu-default-state"
                  }
                >
                  Tentang
                </Link>
              </li>
            </ul>
            <div className="w-auto font-head">
              {cookies && <Dropdown data={data} cookies={cookies} />}
              {!cookies && (
                <Link
                  href="/login"
                  className={
                    router.pathname == "/login"
                      ? "login-active-state"
                      : "login-default-state"
                  }
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
