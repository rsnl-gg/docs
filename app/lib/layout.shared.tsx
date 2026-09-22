import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

const TITLE_PREFIX = "Arsenal Documentation | ";

export const siteUrl = "https://rsnl.gg";
export const docsSiteUrl = "https://docs.rsnl.gg";
export const discordUrl = "https://discord.rsnl.gg";

export const gitConfig = {
  user: "rsnl-gg",
  repo: "docs",
  branch: "master",
} as const;

export const githubRepoUrl = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

export function pageTitle(title: string) {
  return `${TITLE_PREFIX}${title}`;
}

export function getPageMarkdownUrl(slugs: string[]) {
  const segments = [...slugs, "content.md"];
  return {
    segments,
    url: `/llms.mdx/${segments.join("/")}`,
  };
}

export function getPageGithubUrl(path: string) {
  return `${githubRepoUrl}/blob/${gitConfig.branch}/content/docs/${path}`;
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          <img
            src="/assets/rsnl.png"
            alt="Arsenal"
            width={28}
            height={28}
            className="rounded-sm"
          />
          <span className="font-mono tracking-wider">DOCUMENTATION</span>
        </>
      ),
    },
    themeSwitch: {
      enabled: false,
    },
  };
}
