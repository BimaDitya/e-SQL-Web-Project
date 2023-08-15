import { useRouter } from "next/router";

export default function NavbarContent({
  status,
  contents,
  accounts,
  materials,
  UpdateStatus,
}) {
  const router = useRouter();
  const roles = accounts?.Role;
  const complete = status[0]?.Progress[0]?.Complete;
  return (
    <div className="sticky left-0 right-0 top-0 z-50 h-14">
      <nav className="bg-white/50 px-16 py-4 shadow-md backdrop-blur-sm">
        <div className="flex items-center justify-between font-head">
          <button
            onClick={() => router.push(`/material/${materials}`)}
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
            {contents?.viewContent[0]?.Title}
          </button>
          <div className="flex flex-row space-x-4">
            <button
              disabled={complete === "TRUE" || roles === "ADMIN"}
              onClick={UpdateStatus}
              type="submit"
              className="button-primary disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200"
            >
              Selesai
            </button>
            {roles === "ADMIN" && (
              <button
                type="submit"
                onClick={() => {
                  router.push(router.asPath);
                }}
                className="button-primary"
              >
                Refresh
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}