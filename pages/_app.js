import "@/styles/globals.css";
import NextNProgress from "nextjs-progressbar";
import { CookiesProvider } from "react-cookie";

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? ((page) => page);
  // Layout Umum
  return getLayout(
    <>
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
