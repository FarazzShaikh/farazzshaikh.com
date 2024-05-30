import { SundayAfternoon } from "@/components/demos/sunday-afternoon";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Homemade_Apple, Raleway } from "next/font/google";
import { useMemo } from "react";
import { Head } from "./Head";

const HomemadeApple = Homemade_Apple({
  weight: "400",
  subsets: ["latin"],
});

const RalewayVariable = Raleway({
  subsets: ["latin"],
});

export default function Page() {
  const theme = useMemo(
    () =>
      extendTheme({
        fonts: {
          "Raleway Variable": "var(--font-RalewayVariable)",
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
            --font-RalewayVariable: ${RalewayVariable.style.fontFamily};
            --font-HomemadeApple: ${HomemadeApple.style.fontFamily};
          }
        `}
      </style>

      <Head />

      <ChakraProvider theme={theme}>
        <SundayAfternoon />
      </ChakraProvider>
    </>
  );
}

export function getStaticProps() {
  return {
    props: {},
  };
}
