import Link from "next/link";
import Image from "next/image";
import Loading from "../Loading";
import ProgressBar from "@ramonak/react-progress-bar";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function Material({ material, index }) {
  const progress = material?.Progress?.length;
  return (
    <>
      <LazyMotion features={domAnimation}>
        <m.div
          key={index}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
            delay: index * 0.2,
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
                {material?.Title || "Judul Materi"}
              </h6>
              <div className="font-head text-secondary-400">
                <p>
                  Progress: {!progress ? 0 : progress} /&nbsp;
                  {material?.Content?.length} Materi
                </p>
              </div>
              {!material ? (
                <Loading />
              ) : (
                <ProgressBar
                  completed={`${progress}`}
                  maxCompleted={material?.Content.length}
                  animateOnRender
                  className="py-2"
                  bgColor="rgb(255 158 26)"
                  labelClassName="progressbar-label"
                  barContainerClassName={
                    !progress
                      ? `progressbar-container-empty`
                      : `progressbar-container`
                  }
                />
              )}
              <button key={material?.Id} className="button-primary w-max">
                <Link href={`material/${material?.Slug}`}>Lihat Materi</Link>
              </button>
            </div>
          </div>
        </m.div>
      </LazyMotion>
    </>
  );
}
