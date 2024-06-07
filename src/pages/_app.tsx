import { AppProvider } from "@/context/AppContext";
import { DebugProvider } from "@/context/DebugContext";
import { useInitialLoader } from "@/hooks/useInitialLoader";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useInitialLoader();

  return (
    <AppProvider>
      <DebugProvider>
        <Analytics />
        <Component {...pageProps} />
      </DebugProvider>
    </AppProvider>
  );
}
