import type { FC, SVGProps } from "react";

import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  YoutubeIcon,
} from "@/components/social-icons";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

const icons: Record<string, FC<SVGProps<SVGSVGElement>>> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  X: XIcon,
  YouTube: YoutubeIcon,
};

export function SocialLinks({
  className,
  tone = "light",
}: {
  className?: string;
  /** "light" sits on cream, "contrast" sits on the inverted sections. */
  tone?: "light" | "contrast";
}) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {site.social.map((item) => {
        const Icon = icons[item.label];
        return (
          <li key={item.label}>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Cheeky Media on ${item.label}`}
              className={cn(
                "inline-flex size-11 items-center justify-center rounded-pill border transition-colors",
                tone === "contrast"
                  ? "border-on-contrast/25 text-on-contrast/80 hover:border-coral hover:bg-on-contrast/10 hover:text-coral"
                  : "border-border text-muted-foreground hover:border-coral-text hover:bg-secondary hover:text-coral-text",
              )}
            >
              <Icon className="size-[18px]" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
