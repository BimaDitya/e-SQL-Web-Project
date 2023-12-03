import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import LoginForm from "@/components/Form/LoginForm";
import MainLayout from "@/components/Layout/MainLayout";
import { LazyMotion, domAnimation, m } from "framer-motion";

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  if (getCookies)
    return {
      redirect: {
        source: "/login",
        destination: "/",
        permanent: true,
      },
    };

  return { props: {} };
}
export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <div className="flex h-adaptive flex-row items-center justify-center bg-white/50">
        <LazyMotion features={domAnimation}>
          <m.div
            transition={{ duration: 1, type: "spring", stiffness: 75 }}
            initial={{ opacity: 0, y: -75 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-3/5 flex-row justify-between rounded-md border-2 border-gray-300 bg-transparent px-6 py-2 shadow backdrop-blur-sm"
          >
            <div className="flex w-3/5 flex-col justify-center p-4">
              <p className="mb-4 font-head text-2xl font-bold text-primary-400"></p>
              {/* Login Form */}
              <LoginForm />
              <div className="pt-4 font-body text-sm font-medium text-secondary-400">
                Belum Memiliki Akun?{" "}
                <Link
                  href="/registration"
                  className="font-bold text-primary-400 hover:text-primary-200"
                >
                  Registrasi
                </Link>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <Image
                src="illustrations/login.svg"
                alt="Login Illustration"
                width={300}
                height={300}
                quality={50}
                priority
              />
            </div>
          </m.div>
        </LazyMotion>
      </div>
    </>
  );
}
Login.getLayout = function getLayout(login) {
  return <MainLayout>{login}</MainLayout>;
};
