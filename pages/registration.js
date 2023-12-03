import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import MainLayout from "@/components/Layout/MainLayout";
import { RegistrationForm } from "@/components/Form/RegistrationForm";
import { LazyMotion, domAnimation, m } from "framer-motion";
export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  if (getCookies)
    return {
      redirect: {
        source: "/registration",
        destination: "/",
        permanent: true,
      },
    };
  return { props: {} };
}
export default function Registration() {
  return (
    <>
      <Head>
        <title>Registrasi</title>
        <link rel="icon" href="icons/favicon.ico"></link>
      </Head>
      <div className="flex h-adaptive flex-row items-center justify-center bg-white/50">
        <LazyMotion features={domAnimation}>
          <m.div
            transition={{ duration: 1, type: "spring", stiffness: 75 }}
            initial={{ opacity: 0, y: -75 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex w-[70%] flex-row justify-between rounded-md border-2 border-gray-300 bg-transparent px-6 py-2 shadow backdrop-blur-sm"
          >
            <div className="flex w-3/5 flex-col justify-center p-4">
              {/* Register Form*/}
              <RegistrationForm />
              <div className="pt-4 font-body text-sm font-medium text-secondary-400">
                Sudah Memiliki Akun?{" "}
                <Link
                  href="/login"
                  className="font-bold text-primary-400 hover:text-primary-200"
                >
                  Login
                </Link>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <Image
                src="illustrations/registration.svg"
                alt="Registration Illustration"
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
Registration.getLayout = function getLayout(registration) {
  return <MainLayout>{registration}</MainLayout>;
};
