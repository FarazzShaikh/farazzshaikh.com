import { Root } from "@/components/root";
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
        <title>Faraz Shaikh</title>
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
