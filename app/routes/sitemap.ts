import { source } from "@/lib/source";

const SITE = "https://docs.rsnl.gg";

function loc(url: string) {
  if (!url || url === "/") return `${SITE}/`;
  return `${SITE}${url.startsWith("/") ? url : `/${url}`}`;
}

export function loader() {
  const urls = source
    .getPages()
    .map((page) => page.url)
    .filter((url, index, list) => list.indexOf(url) === index)
    .sort((a, b) => a.localeCompare(b))
    .map(
      (url) => `  <url>
    <loc>${loc(url)}</loc>
    <changefreq>weekly</changefreq>
  </url>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
