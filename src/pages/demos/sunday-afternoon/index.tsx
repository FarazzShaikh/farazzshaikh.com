import { SundayAfternoon } from "@/components/demos/sunday-afternoon";
import { Head } from "@/components/demos/sunday-afternoon/Head";
import { META } from "@/utils/meta";
import { StaticProps } from "@/utils/types";
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

export default function Page(staticProps: StaticProps) {
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

      <Head {...staticProps} />

      <ChakraProvider theme={theme}>
        <SundayAfternoon />
      </ChakraProvider>
    </>
  );
}

export function getStaticProps() {
  const date = new Date();
  const isoDateTime = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  ).toISOString();
  const lastUpdated = isoDateTime.slice(0, 10);

  return {
    props: {
      lastUpdated: lastUpdated,
    },
  };
}
