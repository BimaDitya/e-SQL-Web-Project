import "@/styles/globals.css";
import localFont from "next/font/local";
import NextNProgress from "nextjs-progressbar";
import { CookiesProvider } from "react-cookie";

const Assistant = localFont({
  src: "../public/fonts/Assistant.ttf",
});
const YsabeauInfant = localFont({
  src: "../public/fonts/YsabeauInfant.ttf",
});
const SourceCodePro = localFont({
  src: "../public/fonts/SourceCodePro.ttf",
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
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
        </main>
      </CookiesProvider>
    </>,
  );
}
