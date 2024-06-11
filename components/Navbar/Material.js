import { useRouter } from "next/router";
import ProgressBar from "@ramonak/react-progress-bar";

export default function NavbarMaterial({ material, progress }) {
  const router = useRouter();
  const totalContent = material[0]?._count?.Content;
  const currentProgress = progress[0]?._count?.Progress;
  return (
    <div className="sticky left-0 right-0 top-0 z-50 h-16 bg-white shadow">
      <nav className="mx-auto flex h-full max-w-5xl flex-row items-center justify-between">
        <div className="flex w-full items-center justify-between font-head">
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
            Daftar Materi Utama
          </button>
          <div className="flex w-4/12 flex-col justify-between space-y-0.5">
            <div className="font-head font-medium text-secondary-400">
              <p>
                {`Progress: ${
                  currentProgress ? currentProgress : 0
                }/${totalContent} Materi`}
              </p>
            </div>
            <ProgressBar
              completed={`${currentProgress}`}
              maxCompleted={totalContent}
              animateOnRender
              bgColor="rgb(255 158 26)"
              labelClassName="progressbar-label"
              barContainerClassName={
                !currentProgress
                  ? `progressbar-container-empty`
                  : `progressbar-container`
              }
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
