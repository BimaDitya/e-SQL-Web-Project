import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { LazyMotion, domAnimation, m } from "framer-motion";
const ProfileForm = dynamic(() => import("@/components/Form/ProfileForm"));

export async function getServerSideProps(context) {
  const getCookies = context.req.headers.cookie;
  const token = context.req.cookies.token;
  const account = await axios.get(
    process.env.BASE_URL + "/api/user/view-account",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  const accounts = account.data.data;
  if (!getCookies)
    return {
      redirect: {
        source: "/profile/:profile*",
        destination: "/login",
        permanent: true,
      },
    };
  return { props: { accounts, token } };
}
export default function ProfileSetting({ accounts, token }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Profile</title>
        <link rel="icon" href="../icons/favicon.ico"></link>
      </Head>
      <div className="mx-auto flex h-screen w-full max-w-5xl flex-row items-center justify-center bg-white/50">
        <LazyMotion features={domAnimation}>
          <m.div
            transition={{ duration: 1, type: "spring", stiffness: 75 }}
            initial={{ opacity: 0, y: -75 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex h-max w-[80%] flex-row items-center justify-center rounded-md border-2 border-gray-300 bg-transparent shadow backdrop-blur-sm"
          >
            <div className="flex h-full w-full flex-col items-center justify-center px-6 py-3">
              {/* Judul */}
              <div className="flex h-full w-full flex-row items-baseline justify-between">
                <button
                  onClick={() => router.push("/")}
                  className="flex w-max flex-row items-center font-head font-semibold text-secondary-400 transition duration-300 ease-in-out hover:text-secondary-200"
                >
                  &#8592; Kembali
                </button>
                <p className="mb-4 font-head text-xl font-bold text-primary-400">
                  Pengaturan Profile
                </p>
                <button className="flex w-max cursor-default flex-row items-center font-head text-transparent">
                  &#8592; Kembali
                </button>
              </div>

              {/* Profile Form*/}
              <div className="flex w-full flex-row items-center">
                <div className="w-[60%]">
                  <ProfileForm accounts={accounts} token={token} />
                </div>
                <div className="w-[40%]">
                  <Image
                    className="h-full w-full"
                    src="../illustrations/profile.svg"
                    alt="Profile Illustration"
                    width={300}
                    height={300}
                    quality={50}
                  />
                </div>
              </div>
            </div>
          </m.div>
        </LazyMotion>
      </div>
    </>
  );
}
