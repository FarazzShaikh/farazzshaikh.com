import { Root } from "@/components/root";
import { META } from "@/utils/meta";
import { StaticProps } from "@/utils/types";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Homemade_Apple, Lato, Playfair_Display } from "next/font/google";
import Head from "next/head";
import { useMemo } from "react";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
});

const lato = Lato({
  weight: "400",
  subsets: ["latin"],
});

const HomemadeApple = Homemade_Apple({
  weight: "400",
  subsets: ["latin"],
});

export default function Custom404({ lastUpdated }: StaticProps) {
  const theme = useMemo(
    () =>
      extendTheme({
        fonts: {
          body: "var(--font-lato)",
          "Playfair Display": "var(--font-playfairDisplay)",
          Lato: "var(--font-lato)",
          "Homemade Apple": "var(--font-HomemadeApple)",
        },
      }),
    []
  );

  return (
    <>
      <style jsx global>
        {`
          :root {
            --font-playfairDisplay: ${playfairDisplay.style.fontFamily};
            --font-lato: ${lato.style.fontFamily};
            --font-HomemadeApple: ${HomemadeApple.style.fontFamily};
          }
        `}
      </style>

      <Head>
        <title>{META.ROOT.TITLE}</title>
        <meta name="description" content={META.ROOT.DESCRIPTION} />
        <meta property="og:title" content={META.ROOT.TITLE} />
        <meta property="og:description" content={META.ROOT.DESCRIPTION} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://farazzshaikh.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@CantBeFaraz" />
        <meta name="twitter:title" content={META.ROOT.TITLE} />
        <meta name="twitter:description" content={META.ROOT.DESCRIPTION} />
        <meta name="twitter:image" content="/og-image.png" />
        <meta name="theme-color" content={META.ROOT.THEME_COLOR} />
        <meta
          name="keywords"
          content={META.KEYWORDS_BASE + META.ROOT.KEYWORDS}
        />

        <meta name="http-equiv" content={lastUpdated} />
      </Head>

      <ChakraProvider theme={theme}>
        <Root copy="This page does not exist yet." />
      </ChakraProvider>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {},
  };
}
