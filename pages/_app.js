import "@/styles/globals.css";
import localFont from "next/font/local";
import NextNProgress from "nextjs-progressbar";
import { useEffect, useState } from "react";
import { CookiesProvider } from "react-cookie";

const Assistant = localFont({
  src: "../public/fonts/Assistant.woff2",
  display: "swap",
});
const YsabeauInfant = localFont({
  src: "../public/fonts/YsabeauInfant.woff2",
  display: "swap",
});
const SourceCodePro = localFont({
  src: "../public/fonts/SourceCodePro.woff2",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);

  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("dark");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const darkMode = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setIsDark(!isDark);
  };
  // Layout Umum
  return getLayout(
    <>
      <style jsx global>
        {`
          :root {
            --assistant-font: ${Assistant.style.fontFamily};
            --source-code-pro: ${SourceCodePro.style.fontFamily};
            --ysabeau-infant-font: ${YsabeauInfant.style.fontFamily};
          }
        `}
      </style>
      <CookiesProvider>
        <main>
          <NextNProgress
            color="linear-gradient(to right, #ffc980, #ffb34d, #80b3c6, #4d95af)"
            height={4}
          />
          <Component {...pageProps} />
          <button
            onClick={darkMode}
            className="fixed bottom-2 right-2 rounded-md border border-primary-400 bg-primary-50/50 p-2 text-primary-400 transition duration-300 ease-in-out hover:bg-primary-400 hover:text-white hover:shadow-lg dark:border-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-200 dark:hover:text-gray-800 group"
          >
            {!isDark ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 group-hover:fill-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 group-hover:fill-gray-800"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                />
              </svg>
            )}
          </button>
        </main>
      </CookiesProvider>
    </>
  );
}
