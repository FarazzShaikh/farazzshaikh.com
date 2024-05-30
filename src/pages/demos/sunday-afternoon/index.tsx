import { SundayAfternoon } from "@/components/demos/sunday-afternoon";
import { Head } from "@/components/demos/sunday-afternoon/Head";
import { META } from "@/utils/meta";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { Homemade_Apple, Raleway } from "next/font/google";
import { useMemo } from "react";

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
        styles: {
          global: {
            body: {
              bg: META.DEMOS.SUNDAY_AFTERNOON.THEME_COLOR,
            },
          },
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

          html {
            background-color: ${META.DEMOS.SUNDAY_AFTERNOON.THEME_COLOR};
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
