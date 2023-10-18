import useSWR from "swr";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { Tooltip } from "@material-tailwind/react";
import ProgressBar from "@ramonak/react-progress-bar";
import { LazyMotion, domAnimation, m } from "framer-motion";
import Loading from "../Loading";

// Card Data Definition Language
export default function CardJoin({ material, cookies, progressDDL, progressDML, progressDCL }) {
  const fetcher = async () => {
    const response = await axios.get(`/api/user/progress/multitable-join`, {
      headers: {
        Authorization: `Bearer ${cookies}`,
      },
    });
    return response?.data?.viewProgress[0];
  };
  const { data, isLoading } = useSWR(
    `/api/user/progress/multitable-join`,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    },
  );

  const currentProgress = data?._count?.Progress;
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
                  barContainerClassName={!currentProgress ? `progressbar-container-empty` : `progressbar-container`}
                />
              )}
              {progressDDL !== 10 || progressDML !== 7 || progressDCL !== 2 ? (
                <Tooltip
                  content="Selesaikan Materi Sebelumnya Terlebih Dahulu"
                  placement="top-start"
                  className="rounded bg-gray-100 px-2 py-1.5 font-head text-base text-secondary-400 shadow-md"
                >
                  <button
                    disabled={progressDDL !== 10 || progressDML !== 7 || progressDCL !== 2}
                    key={material?.Id}
                    className="button-primary w-max disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200"
                  >
                    Lihat Materi
                  </button>
                </Tooltip>
              ) : (
                <button key={material?.Id} className="button-primary w-max">
                  <Link href={`material/${material?.Slug}`}>Lihat Materi</Link>
                </button>
              )}
            </div>
          </div>
        </m.div>
      </LazyMotion>
    </>
  );
}
