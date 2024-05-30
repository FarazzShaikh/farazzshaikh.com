import { Root } from "@/components/root";
import { META } from "@/utils/meta";
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

export default function Home() {
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
        <meta property="og:url" content="https://farazshaikh.com" />
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

        <link rel="canonical" href="https://farazshaikh.com" />
      </Head>

      <ChakraProvider theme={theme}>
        <Root />
      </ChakraProvider>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {},
  };
}
