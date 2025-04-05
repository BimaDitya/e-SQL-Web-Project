import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-background-light-surface dark:bg-background-dark-surface transition-colors duration-300 ease-in-out">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
