import { META } from "@/utils/meta";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="robots" content="all" />
        <link rel="icon" type="image/x-icon" href={META.FAVICON} />
        <link rel="stylesheet" href="/staticStyles.css" />
      </Head>
      <body>
        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader-text">Loading application</div>
        </div>

        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
