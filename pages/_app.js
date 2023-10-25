import "@/styles/globals.css";
import localFont from "next/font/local";
import NextNProgress from "nextjs-progressbar";
import { CookiesProvider } from "react-cookie";

const Assistant = localFont({
  src: "../public/fonts/Assistant.ttf",
  variable: "--font-Assistant",
  display: "swap",
});
const Ysabeau = localFont({
  src: "../public/fonts/YsabeauOffice.ttf",
  variable: "--font-Ysabeau",
  display: "swap",
});
const SourceCodePro = localFont({
  src: "../public/fonts/SourceCodePro.ttf",
  variable: "--font-SourceCodePro",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  // Layout Umum
  return getLayout(
    <>
      <CookiesProvider>
        <main
          className={`${Assistant.variable} ${Ysabeau.variable} ${SourceCodePro.variable}`}
        >
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
