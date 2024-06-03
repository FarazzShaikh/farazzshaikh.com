import { AppProvider } from "@/context/AppContext";
import { DebugProvider } from "@/context/DebugContext";
import { useInitialLoader } from "@/hooks/useInitialLoader";
import "@/styles/globals.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useInitialLoader();

  return (
    <AppProvider>
      <DebugProvider>
        <Component {...pageProps} />
      </DebugProvider>
    </AppProvider>
  );
}
