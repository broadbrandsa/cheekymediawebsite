import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { VideoPlayer } from "@/components/video-player";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section className="relative">
      <div className="shell pb-14 pt-16 text-center sm:pt-24">
        <p className="label-pill label-mono mx-auto text-muted-foreground">
          <span className="size-1.5 rounded-full bg-coral" />
          Johannesburg, since 2014
        </p>

        <h1 className="type-h0 mx-auto mt-8 max-w-[16ch]">
          Your brand is more than a{" "}
          <em className="font-display italic text-coral">logo</em>
        </h1>

        <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-muted-foreground">
          It is a story, and we are here to tell it. Television, film,
          commercials and digital content, made out of our own studios in
          Houghton.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/work"
            className="label-mono inline-flex w-full items-center justify-center gap-2 rounded-pill bg-primary px-7 py-4 text-primary-foreground transition-colors hover:opacity-85 sm:w-auto"
          >
            See the work
            <ArrowUpRight className="size-3.5" />
          </Link>
          <Link
            href="/contact"
            className="label-mono inline-flex w-full items-center justify-center gap-2 rounded-pill border border-border px-7 py-4 transition-colors hover:bg-secondary sm:w-auto"
          >
            Start a project
          </Link>
        </div>
      </div>

      <VideoPlayer
        videoId={site.showreelId}
        poster="/images/work/barcelo.jpg"
        title="Cheeky Media showreel"
        className="rounded-none sm:aspect-[21/9]"
      />
    </section>
  );
}
