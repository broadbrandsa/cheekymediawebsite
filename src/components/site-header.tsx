"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SocialLinks } from "@/components/social-links";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Thin announcement strip, as on the reference headers. */}
      <div className="bg-contrast text-on-contrast">
        <Link
          href="/about"
          className="shell flex h-9 items-center justify-center gap-2 transition-opacity hover:opacity-80"
        >
          <p className="label-mono truncate text-on-contrast/70">
            <span className="sm:hidden">Level 1 BBBEE</span>
            <span className="hidden sm:inline">
              Level 1 BBBEE, black owned and managed
            </span>
          </p>
          <span className="label-mono inline-flex shrink-0 items-center gap-1 text-coral">
            Read more
            <ArrowUpRight className="size-3" />
          </span>
        </Link>
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur-md transition-shadow duration-300",
          scrolled && "shadow-[0_1px_0_0_var(--border)]",
        )}
      >
        <div className="shell flex h-[4.5rem] items-center justify-between">
          {/* Vertical hairlines either side of the wordmark, as on Franco. */}
          <Link
            href="/"
            aria-label={site.name}
            className="relative z-10 flex h-full shrink-0 items-center pr-6 sm:border-r sm:border-border"
          >
            <Image
              src="/images/brand/logo-navy.png"
              alt={site.name}
              width={1531}
              height={597}
              priority
              className="h-8 w-auto dark:hidden"
            />
            <Image
              src="/images/brand/logo-white.png"
              alt={site.name}
              width={1531}
              height={597}
              priority
              className="hidden h-8 w-auto dark:block"
            />
          </Link>

          <nav className="hidden flex-1 items-center justify-center gap-8 md:flex">
            {site.nav.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);

              if ("children" in item && item.children) {
                return (
                  <DropdownMenu key={item.href}>
                    <DropdownMenuTrigger
                      className={cn(
                        "relative -my-3 inline-flex items-center gap-1.5 py-3 text-sm outline-none transition-colors",
                        active
                          ? "text-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      {item.label}
                      <ChevronDown className="size-3.5 transition-transform duration-200 data-[state=open]:rotate-180" />
                      {active && (
                        <span className="absolute bottom-1.5 left-0 h-px w-full bg-coral" />
                      )}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="center"
                      sideOffset={18}
                      className="w-60 rounded-2xl border-border p-2"
                    >
                      {item.children.map((child) => (
                        <DropdownMenuItem key={child.href} asChild>
                          <Link
                            href={child.href}
                            className={cn(
                              "cursor-pointer rounded-xl px-3 py-3 text-sm",
                              pathname === child.href && "text-coral-text",
                            )}
                          >
                            {child.label}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative text-sm transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-1.5 left-0 h-px w-full bg-coral" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex h-full items-center gap-3 sm:border-l sm:border-border sm:pl-6">
            <Link
              href="/contact"
              className="label-mono hidden items-center gap-2 rounded-pill bg-primary px-5 py-4 text-primary-foreground transition-colors hover:opacity-85 sm:inline-flex"
            >
              Start a project
              <ArrowUpRight className="size-3.5" />
            </Link>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  aria-label="Open menu"
                  className="inline-flex size-11 items-center justify-center rounded-pill border border-border transition-colors hover:bg-secondary md:hidden"
                >
                  <Menu className="size-5" />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                showCloseButton={false}
                className="w-full border-none bg-contrast p-0 text-on-contrast sm:max-w-md"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex items-center justify-between border-b border-on-contrast/15 px-6 py-5">
                  <Image
                    src="/images/brand/logo-white.png"
                    alt={site.name}
                    width={1531}
                    height={597}
                    className="h-8 w-auto"
                  />
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="inline-flex size-11 items-center justify-center rounded-pill border border-on-contrast/25"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <nav className="flex flex-col px-6 pt-6">
                  {site.nav.map((item, i) => {
                    const children = "children" in item ? item.children : null;
                    if (children) {
                      return (
                        <div
                          key={item.href}
                          className="border-b border-on-contrast/15 py-5"
                        >
                          <p className="flex items-baseline gap-4 font-display text-4xl">
                            <span className="label-mono text-on-contrast/50">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            {item.label}
                          </p>
                          <ul className="mt-4 space-y-1 pl-12">
                            {children.map((child) => (
                              <li key={child.href}>
                                <Link
                                  href={child.href}
                                  onClick={() => setOpen(false)}
                                  className="block py-2 text-lg text-on-contrast/70 transition-colors hover:text-coral"
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 border-b border-on-contrast/15 py-5 font-display text-4xl transition-colors hover:text-coral"
                      >
                        <span className="label-mono text-on-contrast/50">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                    );
                  })}
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="label-mono mt-8 inline-flex items-center justify-center gap-2 rounded-pill bg-coral-deep px-6 py-4 text-white"
                  >
                    Start a project
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                  <SocialLinks tone="contrast" className="mt-8" />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
