import { META } from "@/utils/meta";
import { StaticProps } from "@/utils/types";
import NextHead from "next/head";

export function Head({ lastUpdated }: StaticProps) {
  return (
    <NextHead>
      <title>{META.DEMOS.SUNDAY_AFTERNOON.TITLE}</title>
      <meta
        name="description"
        content={META.DEMOS.SUNDAY_AFTERNOON.DESCRIPTION}
      />
      <meta property="og:title" content={META.DEMOS.SUNDAY_AFTERNOON.TITLE} />
      <meta
        property="og:description"
        content={META.DEMOS.SUNDAY_AFTERNOON.DESCRIPTION}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content="https://farazzshaikh.com/demos/sunday-afternoon"
      />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content="@CantBeFaraz" />
      <meta name="twitter:title" content={META.DEMOS.SUNDAY_AFTERNOON.TITLE} />
      <meta
        name="twitter:description"
        content={META.DEMOS.SUNDAY_AFTERNOON.DESCRIPTION}
      />
      <meta name="twitter:image" content="/og-image.png" />
      <meta
        name="theme-color"
        content={META.DEMOS.SUNDAY_AFTERNOON.THEME_COLOR}
      />
      <meta
        name="keywords"
        content={META.KEYWORDS_BASE + META.DEMOS.SUNDAY_AFTERNOON.KEYWORDS}
      />

      <link
        rel="canonical"
        href="https://farazzshaikh.com/demos/sunday-afternoon"
      />

      <meta httpEquiv="last-modified" content={lastUpdated} />
    </NextHead>
  );
}
