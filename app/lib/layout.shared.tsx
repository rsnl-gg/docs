import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

const TITLE_PREFIX = "Arsenal Documentation | ";

export function pageTitle(title: string) {
  return `${TITLE_PREFIX}${title}`;
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
