"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Click-to-load facade for YouTube. The poster is our own still, and the
 * iframe (plus roughly a megabyte of YouTube script) is only created once
 * someone actually presses play.
 */
export function VideoPlayer({
  videoId,
  videoFile,
  poster,
  title,
  className,
}: {
  videoId?: string;
  videoFile?: string;
  poster: string;
  title: string;
  className?: string;
}) {
  const [active, setActive] = useState(false);

  if (!videoId && !videoFile) return null;

  return (
    <div
      className={cn(
        "relative aspect-video w-full overflow-hidden rounded-3xl bg-ink",
        className,
      )}
    >
      {active ? (
        videoId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          <video
            src={videoFile}
            poster={poster}
            controls
            autoPlay
            playsInline
            className="absolute inset-0 size-full object-cover"
          />
        )
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`Play ${title}`}
          className="group absolute inset-0 size-full cursor-pointer"
        >
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 1024px"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-ink/30 transition-colors duration-300 group-hover:bg-ink/45"
          />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="inline-flex size-20 items-center justify-center rounded-pill bg-cream text-ink shadow-xl transition-transform duration-300 group-hover:scale-110">
              <Play className="ml-1 size-7 fill-current" />
            </span>
          </span>
          <span className="label-mono absolute bottom-5 left-5 rounded-pill bg-cream/90 px-4 py-2 text-ink backdrop-blur-sm">
            {videoId ? "Watch on YouTube" : "Watch the intro"}
          </span>
        </button>
      )}
    </div>
  );
}
