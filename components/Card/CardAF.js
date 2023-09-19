import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import ProgressBar from "@ramonak/react-progress-bar";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Loading from "../Loading";

// Card Data Definition Language
export default function CardAF({ material, cookies }) {
  const viewMaterialId = 5;
  const fetcher = async () => {
    const response = await axios.get(`/api/user/view-progress-af`, {
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    });
    return response?.data?.viewProgress[0];
  };
  const { data, isLoading } = useSWR(`/api/user/view-progress-af`, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  const currentProgress = data?._count?.Progress;
  console.log(currentProgress);
  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.div
          key={material?.id}
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
            delay: material?.id * 0.25,
          }}
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex w-full flex-col rounded-md border border-gray-200 bg-white p-4"
        >
          <div className="flex flex-row items-center">
            <div className="z-50 h-full w-max rounded bg-white px-4 py-6">
              <Image
                className="h-12 w-max"
                src="/web-logo.svg"
                alt="Website Logo"
                sizes="100vw"
                width="0"
                height="0"
                quality={25}
                priority
              />
            </div>
            <div className="flex w-2/5 flex-col justify-between px-6">
              <h6 className="font-head text-xl font-bold text-secondary-400">
                {material?.Title}
              </h6>
              <div className="font-head text-secondary-400">
                <p>
                  Progress: {!currentProgress ? 0 : currentProgress} /{" "}
                  {material?.Content?.length} Materi
                </p>
              </div>
              {isLoading ? (
                <Loading />
              ) : (
                <ProgressBar
                  completed={`${currentProgress}`}
                  maxCompleted={material?.Content.length}
                  animateOnRender
                  className="py-2"
                  bgColor="rgb(255 158 26)"
                  labelClassName="progressbar-label"
                  barContainerClassName="progressbar-container"
                />
              )}
              <div key={material?.Id} className="button-primary w-max">
                <Link href={`material/${material?.Slug}`}>Lihat Materi</Link>
              </div>
            </div>
          </div>
        </m.div>
      </LazyMotion>
    </>
  );
}
