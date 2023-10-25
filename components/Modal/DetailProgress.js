import { LazyMotion, domAnimation, m } from "framer-motion";

export default function DetailProgress({ setShowProgress, progress }) {
  const progressDetail = progress.Progress;
  return (
    <LazyMotion features={domAnimation}>
      <div className="flex h-auto w-full items-center justify-center">
        <m.div
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500/25 backdrop-blur-sm"
        >
          <div className="h-[75%] w-[75%] space-y-2 rounded-lg bg-white px-8 py-4 shadow">
            <div className="flex flex-row items-center justify-between">
              <p className="font-head text-xl font-semibold text-secondary-400">
                Detail Progres
              </p>
              <button
                onClick={() => setShowProgress(false)}
                className="rounded-lg bg-gray-200 p-2 font-head text-gray-400 duration-300 ease-in-out hover:cursor-pointer hover:bg-red-400 hover:text-white hover:shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="h-[85%] overflow-scroll">
              <table className="w-full table-auto border-2 border-secondary-100">
                <thead className="bg-secondary-100 text-left font-head uppercase text-white">
                  <tr>
                    <th scope="col" className="w-max px-2 py-2 text-center">
                      #
                    </th>
                    <th scope="col" className="w-max py-2">
                      Judul Materi
                    </th>
                    <th scope="col" className="w-max py-2 text-center">
                      Waktu Mulai
                    </th>
                    <th scope="col" className="w-max py-2 text-center">
                      Waktu Selesai
                    </th>
                    <th scope="col" className="w-max py-2 text-center">
                      Durasi Belajar
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50 font-body text-gray-500">
                  {Object.values(progressDetail).map((Rows, index) => {
                    const startStudy = new Date(
                      Rows?.Start_Time,
                    ).toLocaleString();
                    const endStudy = new Date(Rows?.End_Time).toLocaleString();

                    const duration = new Date(endStudy) - new Date(startStudy);

                    let seconds = Math.floor(duration / 1000) % 60;
                    let minutes = Math.floor(duration / 1000 / 60) % 60;

                    return (
                      <m.tr
                        key={index}
                        transition={{
                          duration: 1,
                          type: "spring",
                          stiffness: 50,
                          delay: index * 0.25,
                        }}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border-b-2 border-secondary-100"
                      >
                        <td className="w-max px-2 py-2 text-center">
                          {index + 1}
                        </td>
                        <td className="w-max py-2">
                          {(Rows?.Slug).trim()
                            .split(/\s+/)
                            .slice(0, -2)
                            .join(" ")}
                        </td>
                        <td className="w-max py-2 text-center">{startStudy}</td>
                        <td className="w-max py-2 text-center">{endStudy}</td>
                        <td className="w-max py-2 text-center">
                          {`${minutes} Menit ${seconds} Detik`}
                        </td>
                      </m.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
