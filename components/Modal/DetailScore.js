import { LazyMotion, domAnimation, m } from "framer-motion";

export default function DetailScore({ score, setShowScore }) {
  const scores = [score];
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
                Detail Score
              </p>
              <button
                onClick={() => setShowScore(false)}
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
                    <th
                      scope="col"
                      className="w-max py-2 pl-2 pr-8 text-center"
                    >
                      #
                    </th>
                    <th scope="col" className="w-max px-2 py-2">
                      Judul Latihan
                    </th>
                    <th scope="col" className="w-max px-2 py-2 text-center">
                      Score Latihan
                    </th>
                    <th scope="col" className="w-max px-2 py-2 text-center">
                      Jam Submit
                    </th>
                    <th scope="col" className="w-max px-2 py-2 text-center">
                      Tanggal Submit
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-50 font-body text-gray-500">
                  {Object.values(scores).map((Rows) =>
                    Object.values(Rows.Score).map((Row, index) => (
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
                        <td className="w-max py-2 pl-2 pr-8 text-center">
                          {index + 1}
                        </td>
                        <td className="w-max px-2 py-2 font-semibold">
                          {Row?.Exercise}
                        </td>
                        <td className="w-max px-2 py-2 text-center">
                          {Row?.Score}
                        </td>
                        <td className="w-max px-2 py-2 text-center">
                          {new Date(Row?.SubmittedAt).toLocaleTimeString()}
                        </td>
                        <td className="w-max px-2 py-2 text-center">
                          {new Date(Row?.SubmittedAt).toLocaleDateString()}
                        </td>
                      </m.tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
