import { use } from "react";
import { redirect } from "react-router";
import type { Route } from "./+types/docs";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from "fumadocs-ui/layouts/docs/page";
import { useFumadocsLoader } from "fumadocs-core/source/client";
import { useMDXComponents } from "@/components/mdx";
import { baseOptions, pageTitle } from "@/lib/layout.shared";
import { docs, source } from "@/lib/source";

export async function loader({ params }: Route.LoaderArgs) {
  const slugs = (params["*"] ?? "").split("/").filter((segment) => segment.length > 0);

  if (slugs[0] === "mod-builder-legacy") {
    const rest = slugs.slice(1).join("/");
    return redirect(rest ? `/legacy/mod-builder/${rest}` : "/legacy/mod-builder");
  }

  const page = source.getPage(slugs);
  if (!page) throw new Response("Not found", { status: 404 });

  await docs.getPage(page.path)?.preload();

  return {
    path: page.path,
    url: page.url,
    pageTree: await source.serializePageTree(source.getPageTree()),
  };
}

function Content({ path }: { path: string }) {
  const page = docs.getPage(path);
  if (!page) throw new Error(`unknown page: ${path}`);

  const { toc } = use(page.load());
  const Mdx = page.body;

  return (
    <DocsPage toc={toc}>
      <title>{pageTitle(page.title)}</title>
      <meta name="description" content={page.description} />
      <DocsTitle>{page.title}</DocsTitle>
      <DocsDescription>{page.description}</DocsDescription>
      <DocsBody>
        <Mdx components={useMDXComponents()} />
      </DocsBody>
    </DocsPage>
  );
}

export default function Page({ loaderData }: Route.ComponentProps) {
  const { path, pageTree } = useFumadocsLoader(loaderData);

  return (
    <DocsLayout {...baseOptions()} tree={pageTree}>
      <Content path={path} />
    </DocsLayout>
  );
}
