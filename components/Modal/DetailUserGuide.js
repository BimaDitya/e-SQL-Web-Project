import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { LazyMotion, domAnimation, m } from "framer-motion";
// Styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

export default function DetailUserGuide({ setShowDetail }) {
  const renderToolbar = (Toolbar) => {
    return (
      <Toolbar>
        {function (slots) {
          var CurrentScale = slots.CurrentScale,
            ZoomIn = slots.ZoomIn,
            ZoomOut = slots.ZoomOut,
            Download = slots.Download,
            NumberOfPages = slots.NumberOfPages,
            CurrentPageLabel = slots.CurrentPageLabel;
          return (
            <div className="flex w-full flex-row justify-between px-4 text-center font-head text-sm text-gray-400">
              <div className="flex w-1/5 flex-row items-center justify-start">
                <div className="px-4">
                  <ZoomIn />
                </div>
                <div className="px-4">
                  <CurrentScale />
                </div>
                <div className="px-4">
                  <ZoomOut />
                </div>
              </div>
              <div className="flex w-1/5 flex-row items-center justify-end">
                <div className="px-4">
                  Page: <CurrentPageLabel />/<NumberOfPages />
                </div>
                <div className="px-4">
                  <Download />
                </div>
              </div>
            </div>
          );
        }}
      </Toolbar>
    );
  };
  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: () => [],
    renderToolbar,
  });
  return (
    <LazyMotion features={domAnimation}>
      <div className="flex items-center justify-center">
        <m.div
          transition={{
            duration: 0.5,
            type: "spring",
            stiffness: 50,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center bg-gray-500/50"
        >
          <div className="mx-40 h-adaptive w-full rounded-lg bg-white px-8 py-4 shadow">
            <div className="flex flex-row items-center justify-between pb-4">
              <p className="font-head text-xl font-semibold text-secondary-400">
                Panduan Pengguna
              </p>
              <button
                onClick={() => setShowDetail(false)}
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
            <div className="h-adaptive w-full pb-28">
              <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js">
                <Viewer
                  defaultScale={SpecialZoomLevel.ActualSize}
                  plugins={[defaultLayoutPluginInstance]}
                  fileUrl="/files/UserGuide.PDF"
                  theme="dark"
                />
              </Worker>
            </div>
          </div>
        </m.div>
      </div>
    </LazyMotion>
  );
}
