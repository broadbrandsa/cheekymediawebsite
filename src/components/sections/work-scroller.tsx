"use client";

import { useCallback, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { WorkCard, type WorkCardItem } from "@/components/work-card";

const SPEED = 28; // pixels per second

/**
 * Continuously scrolling rail of the full catalogue, sitting under the
 * showreel. Native overflow scrolling underneath, so touch, trackpad and
 * keyboard all still work; the drift and the arrows are layered on top.
 *
 * The list is rendered twice. The second pass is hidden from assistive tech
 * and taken out of the tab order, and exists only so the rail can wrap from
 * the end back to the start without a visible jump.
 */
export function WorkScroller({ items }: { items: WorkCardItem[] }) {
  const railRef = useRef<HTMLUListElement>(null);
  const pausedUntil = useRef(0);
  const hovering = useRef(false);

  /** Hold the drift for a moment after someone interacts with the rail. */
  const hold = useCallback((ms = 3500) => {
    pausedUntil.current = Date.now() + ms;
  }, []);

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      frame = requestAnimationFrame(tick);

      if (reduced.matches) return;
      if (hovering.current) return;
      if (Date.now() < pausedUntil.current) return;
      if (el.matches(":focus-within")) return;
      if (document.hidden) return;

      el.scrollLeft += (SPEED * dt) / 1000;
    };

    // Wrapping is checked on every scroll, so a manual drag wraps too.
    const wrap = () => {
      const half = el.scrollWidth / 2;
      if (half <= 0) return;
      if (el.scrollLeft >= half) el.scrollLeft -= half;
      else if (el.scrollLeft <= 0) el.scrollLeft += half;
    };

    el.addEventListener("scroll", wrap, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", wrap);
    };
  }, []);

  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    hold();
    const card = el.querySelector("li");
    const step = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    // The browser clamps scrollLeft at zero, so a backwards nudge near the
    // start has to cross the seam first or it just dead-ends.
    if (dir === -1 && el.scrollLeft - step <= 0) {
      el.scrollLeft += el.scrollWidth / 2;
    }
    el.scrollBy({ left: step * dir, behavior: "smooth" });
  };

  const run = [...items, ...items];

  return (
    <section className="section-y" aria-labelledby="work-rail-heading">
      <h2 id="work-rail-heading" className="sr-only">
        Selected work
      </h2>

      <ul
        ref={railRef}
        tabIndex={0}
        aria-label={`All work, ${items.length} projects. Scroll sideways.`}
        onMouseEnter={() => (hovering.current = true)}
        onMouseLeave={() => (hovering.current = false)}
        onPointerDown={() => hold()}
        onWheel={() => hold()}
        onKeyDown={() => hold()}
        className="no-scrollbar flex gap-6 overflow-x-auto px-5 pb-2 sm:px-8 xl:pl-[max(2rem,calc((100vw-81rem)/2+2rem))]"
      >
        {run.map((item, i) => {
          const clone = i >= items.length;
          return (
            <li
              key={`${item.slug}-${i}`}
              aria-hidden={clone || undefined}
              className="w-[78vw] shrink-0 sm:w-[44vw] lg:w-[30vw] xl:w-[24rem]"
            >
              <WorkCard
                item={item}
                priority={i < 3}
                tabIndex={clone ? -1 : undefined}
              />
            </li>
          );
        })}
      </ul>

      <div className="shell mt-10 hidden justify-end gap-2 sm:flex">
        <button
          type="button"
          onClick={() => nudge(-1)}
          aria-label="Scroll work backwards"
          className="inline-flex size-12 items-center justify-center rounded-pill border border-border transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => nudge(1)}
          aria-label="Scroll work forwards"
          className="inline-flex size-12 items-center justify-center rounded-pill border border-border transition-colors hover:bg-secondary"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>
    </section>
  );
}
