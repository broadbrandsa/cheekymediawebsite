"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
      <div className="bg-ink text-cream">
        <Link
          href="/about"
          className="shell flex h-9 items-center justify-center gap-2 transition-opacity hover:opacity-80"
        >
          <p className="label-mono truncate text-cream/70">
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
              className="label-mono hidden items-center gap-2 rounded-pill bg-ink px-5 py-3 text-cream transition-colors hover:bg-ink-soft sm:inline-flex"
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
                className="w-full border-none bg-ink p-0 text-cream sm:max-w-md"
              >
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex items-center justify-between border-b border-cream/15 px-6 py-5">
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
                    className="inline-flex size-11 items-center justify-center rounded-pill border border-cream/25"
                  >
                    <X className="size-5" />
                  </button>
                </div>
                <nav className="flex flex-col px-6 pt-6">
                  {site.nav.map((item, i) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 border-b border-cream/12 py-5 font-display text-4xl transition-colors hover:text-coral"
                    >
                      <span className="label-mono text-cream/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </Link>
                  ))}
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="label-mono mt-8 inline-flex items-center justify-center gap-2 rounded-pill bg-coral px-6 py-4 text-white"
                  >
                    Start a project
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
