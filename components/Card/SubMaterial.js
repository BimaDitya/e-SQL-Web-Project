import Link from "next/link";
import { LazyMotion, domAnimation, m } from "framer-motion";

export default function SubMaterialCard({ material, content, index }) {
  return (
    <>
      <LazyMotion features={domAnimation}>
        <div>
          <m.div
            key={content.Id}
            transition={{
              duration: 1,
              type: "spring",
              stiffness: 50,
              delay: index * 0.15,
            }}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex w-full flex-col rounded border border-gray-200 bg-white px-4 py-2.5"
          >
            <div className="flex flex-row items-center justify-between">
              <h6 className="font-head text-lg font-medium text-secondary-400">
                {content.Title}
              </h6>
              <div className="button-primary">
                <Link href={`${material.Slug}` + `/content/${content.Slug}`}>
                  Buka
                </Link>
              </div>
            </div>
          </m.div>
        </div>
      </LazyMotion>
    </>
  );
}
