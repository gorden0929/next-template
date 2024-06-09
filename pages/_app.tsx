import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";
import nextI18NextConfig from "../next-i18next.config.js";
import { Inter, Noto_Sans_SC, Noto_Sans_TC } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });
const notoSansSC = Noto_Sans_SC({ subsets: ["latin"] });
const notoSansTC = Noto_Sans_TC({ subsets: ["latin"] });

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily}, ${notoSansSC.style.fontFamily},
            ${notoSansTC.style.fontFamily};
        }
      `}</style>
      <ThemeProvider defaultTheme="dark" attribute="class" enableSystem>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
};

export default appWithTranslation(MyApp, nextI18NextConfig);
