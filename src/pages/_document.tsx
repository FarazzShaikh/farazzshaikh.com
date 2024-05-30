import { META } from "@/utils/meta";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="all" />
        <link rel="icon" type="image/x-icon" href={META.FAVICON} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
