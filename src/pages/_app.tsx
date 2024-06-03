import { AppProvider } from "@/context/AppContext";
import { DebugProvider } from "@/context/DebugContext";
import "@/styles/globals.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppProvider>
      <DebugProvider>
        <Component {...pageProps} />
      </DebugProvider>
    </AppProvider>
  );
}
