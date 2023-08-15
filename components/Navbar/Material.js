import ProgressBar from "@ramonak/react-progress-bar";
import { useRouter } from "next/router";
import Link from "next/link";

export default function NavbarMaterial({ material, status }) {
  const router = useRouter();
  const totalContent = material?._count?.Content;
  const currentProgress = status?.viewStatus[0]?._count?.Progress;
  return (
    <div className="sticky left-0 right-0 top-0 z-50 h-14">
      <nav className="bg-white/50 px-16 py-4 shadow-md backdrop-blur-sm">
        <div className="flex items-center justify-between font-head">
          <button
            onClick={() => router.push("/material")}
            className="flex flex-row items-center py-2.5 font-head text-xl font-semibold text-secondary-400 transition duration-300 ease-in-out hover:text-secondary-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="mr-2 h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="bevel"
                d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75"
              />
            </svg>{" "}
            {material?.Title}
          </button>
          <div className="flex w-2/5 flex-col justify-between px-6">
            <div className="font-head text-secondary-400">
              <p>
                Progress: {currentProgress ? currentProgress : 0} /{" "}
                {totalContent} Materi
              </p>
            </div>
            <ProgressBar
              completed={`${currentProgress}`}
              maxCompleted={totalContent}
              animateOnRender
              className="py-2"
              bgColor="rgb(255 158 26)"
              labelClassName="progressbar-label"
              barContainerClassName="progressbar-container"
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
