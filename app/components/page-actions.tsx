"use client";

import { useMemo } from "react";
import { ChevronDown, ExternalLinkIcon, TextIcon } from "lucide-react";
import { RiOpenaiFill } from "react-icons/ri";
import { SiClaude, SiCursor, SiGithub } from "react-icons/si";
import { usePathname } from "fumadocs-core/framework";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "fumadocs-ui/components/ui/popover";
import { buttonVariants } from "fumadocs-ui/components/ui/button";
import { MarkdownCopyButton } from "fumadocs-ui/layouts/docs/page";
import { docsSiteUrl } from "@/lib/layout.shared";

export function DocsPageActions({
  markdownUrl,
  githubUrl,
}: {
  markdownUrl: string;
  githubUrl: string;
}) {
  const pathname = usePathname();
  const pageUrl = `${docsSiteUrl}${pathname === "/" ? "" : pathname}`;
  const absoluteMarkdownUrl = `${docsSiteUrl}${markdownUrl}`;
  const prompt = `Read ${pageUrl}, I want to ask questions about it.`;

  const items = useMemo(
    () => [
      {
        title: "Open in GitHub",
        href: githubUrl,
        icon: <SiGithub />,
      },
      {
        title: "View as Markdown",
        href: absoluteMarkdownUrl,
        icon: <TextIcon />,
      },
      {
        title: "Open in ChatGPT",
        href: `https://chatgpt.com/?${new URLSearchParams({
          prompt,
          hints: "search",
        })}`,
        icon: <RiOpenaiFill />,
      },
      {
        title: "Open in Claude",
        href: `https://claude.ai/new?${new URLSearchParams({ q: prompt })}`,
        icon: <SiClaude />,
      },
      {
        title: "Open in Cursor",
        href: `https://cursor.com/link/prompt?${new URLSearchParams({
          text: prompt,
        })}`,
        icon: <SiCursor />,
      },
    ],
    [absoluteMarkdownUrl, githubUrl, prompt],
  );

  return (
    <div className="flex flex-row gap-2 items-center border-b pt-2 pb-6">
      <MarkdownCopyButton markdownUrl={markdownUrl} />
      <Popover>
        <PopoverTrigger
          className={buttonVariants({
            color: "secondary",
            size: "sm",
            className:
              "gap-2 data-[state=open]:bg-fd-accent data-[state=open]:text-fd-accent-foreground",
          })}
        >
          Open
          <ChevronDown className="size-3.5 text-fd-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent className="flex flex-col">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              rel="noreferrer noopener"
              target="_blank"
              className="text-sm p-2 rounded-lg inline-flex items-center gap-2 hover:text-fd-accent-foreground hover:bg-fd-accent [&_svg]:size-4"
            >
              {item.icon}
              {item.title}
              <ExternalLinkIcon className="text-fd-muted-foreground size-3.5 ms-auto" />
            </a>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
