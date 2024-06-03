import { AppProvider } from "@/context/AppContext";
import { DebugProvider } from "@/context/DebugContext";
import { useInitialLoader } from "@/hooks/useInitialLoader";
import "@/styles/globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useInitialLoader();

  return (
    <AppProvider>
      <DebugProvider>
        <GoogleAnalytics gaId="G-5C1GFMMHFF" />
        <Component {...pageProps} />
      </DebugProvider>
    </AppProvider>
  );
}
