import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("api/search", "routes/search.ts"),
  route("robots.txt", "routes/robots.ts"),
  route("sitemap.xml", "routes/sitemap.ts"),
  route("docs/*", "routes/docs-redirect.ts"),
  route("*?", "routes/docs.tsx"),
] satisfies RouteConfig;
