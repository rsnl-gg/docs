import { redirect } from "react-router";
import type { Route } from "./+types/docs-redirect";

export function loader({ params }: Route.LoaderArgs) {
  const splat = params["*"] ?? "";
  return redirect(splat ? `/${splat}` : "/");
}
