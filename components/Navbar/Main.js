import Link from "next/link";
import Image from "next/image";
import Loading from "../Loading";
import Dropdown from "./Dropdown";
import { useRouter } from "next/router";
import Styles from "../Component.module.css";

export default function Navbar({ isLoading, cookies, data }) {
  const router = useRouter();
  const roles = data?.Role;
  if (isLoading)
    return (
      <div className="sticky left-0 right-0 top-0 z-50 h-16">
        <nav className="flex h-full items-center justify-center bg-white/50 shadow backdrop-blur">
          <div className={`text-secondary-200 ${Styles.FontHead}`}>
            <Loading />
          </div>
        </nav>
      </div>
    );
  return (
    <>
      <div className="sticky left-0 right-0 top-0 z-50 h-16 bg-transparent shadow backdrop-blur-sm">
        <nav className="mx-auto flex h-full max-w-5xl flex-row items-center">
          <div
            className={`flex w-full items-center justify-between ${Styles.FontHead}`}
          >
            <div>
              <Image
                className="h-12 w-full"
                src="/web-logo.svg"
                alt="Website Logo"
                sizes="100vw"
                quality={50}
                height="0"
                width="0"
                priority
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
                <>
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
                </>
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
