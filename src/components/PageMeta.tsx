import { Helmet } from "react-helmet-async";
import type { RouteMeta } from "@/lib/seo";
import { getCanonicalUrl, getOgImageUrl, getWebSiteJsonLd, siteConfig } from "@/lib/seo";

type PageMetaProps = { meta: RouteMeta };

export default function PageMeta({ meta }: PageMetaProps) {
  const canonical = getCanonicalUrl(meta.path);
  const ogImage = getOgImageUrl(meta.ogImage);
  const jsonLd = meta.path === "/" ? getWebSiteJsonLd() : null;
  return (
    <Helmet>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {jsonLd && (
        <script type="application/ld+json">
          {jsonLd}
        </script>
      )}
    </Helmet>
  );
}
