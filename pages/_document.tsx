import { Html, Head, Main, NextScript, DocumentProps } from "next/document";
import nextI18NextConfig from "../next-i18next.config.js";

const Document = ({ __NEXT_DATA__ }: DocumentProps) => {
  const currentLocale =
    __NEXT_DATA__.locale ?? nextI18NextConfig.i18n.defaultLocale;
  return (
    <Html lang={currentLocale}>
      <Head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;
