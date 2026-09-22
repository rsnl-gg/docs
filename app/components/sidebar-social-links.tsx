"use client";

import { Globe } from "lucide-react";
import { SiDiscord, SiGithub } from "react-icons/si";
import { discordUrl, githubRepoUrl, siteUrl } from "@/lib/layout.shared";

const linkClassName =
  "inline-flex items-center justify-center rounded-md p-1.5 text-fd-muted-foreground transition-colors hover:bg-fd-accent hover:text-fd-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fd-ring [&_svg]:size-4.5";

export function SidebarSocialLinks() {
  return (
    <div className="flex items-center gap-0.5">
      <a
        href={siteUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Website"
        className={linkClassName}
      >
        <Globe />
      </a>
      <a
        href={discordUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Discord"
        className={linkClassName}
      >
        <SiDiscord />
      </a>
      <a
        href={githubRepoUrl}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="GitHub"
        className={linkClassName}
      >
        <SiGithub />
      </a>
    </div>
  );
}
