import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LazyMotion, domAnimation, m } from "framer-motion";
const LoginForm = dynamic(() => import("@/components/Form/LoginForm"));
const MainLayout = dynamic(() => import("@/components/Layout/MainLayout"));

export async function getServerSideProps(context) {
  const { req } = context;

  if (req.headers.cookie) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}
export default function Login() {
  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <div className="flex flex-row items-center justify-center h-adaptive ">
        <LazyMotion features={domAnimation}>
          <m.div
            transition={{
              delay: 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
            }}
            initial={{ opacity: 0, y: -75 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-row justify-between w-3/5 px-6 py-2 bg-white border-2 border-gray-300 rounded-md shadow backdrop-blur-sm"
          >
            <div className="flex flex-col justify-center w-3/5 p-4">
              {/* Login Form */}
              <LoginForm />
              <div className="pt-4 text-sm font-medium font-body text-secondary-400">
                Belum Memiliki Akun?&nbsp;
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
                width={256}
                height={256}
                quality={25}
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
