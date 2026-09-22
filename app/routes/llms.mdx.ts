import type { Route } from "./+types/llms.mdx";
import { docs, source } from "@/lib/source";

export async function loader({ params }: Route.LoaderArgs) {
  const segments = (params["*"] ?? "").split("/").filter((segment) => segment.length > 0);
  if (segments.at(-1) !== "content.md") {
    return new Response("Not found", { status: 404 });
  }

  const slugs = segments.slice(0, -1);
  if (slugs.at(-1) === "index") slugs.pop();

  const page = source.getPage(slugs);
  if (!page) return new Response("Not found", { status: 404 });

  const entry = docs.getPage(page.path);
  if (!entry) return new Response("Not found", { status: 404 });

  const markdown = await entry.getText("raw");

  return new Response(markdown, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
