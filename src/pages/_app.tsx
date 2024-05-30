import "@/styles/globals.css";

import { LoaderProvider } from "@/context/LoaderContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoaderProvider>
        <Component {...pageProps} />
      </LoaderProvider>
    </>
  );
}
