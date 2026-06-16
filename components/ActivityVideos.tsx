"use client";

import { useState } from "react";
import Image from "next/image";
import type { VideoItem } from "@/lib/posts";

function PlayButton() {
  return (
    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest/90 text-parchment shadow-lg transition-transform duration-300 group-hover:scale-110">
        <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </span>
  );
}

function FrameWrap({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-ink">
      {children}
    </div>
  );
}

function LiteEmbed({ video }: { video: VideoItem }) {
  const [playing, setPlaying] = useState(false);

  const embedSrc =
    video.kind === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`
      : `https://player.vimeo.com/video/${video.id}?autoplay=1`;

  const poster =
    video.poster ||
    (video.kind === "youtube"
      ? `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`
      : "");

  const label = video.title ? `Play video: ${video.title}` : "Play video";

  if (playing) {
    return (
      <FrameWrap>
        <iframe
          src={embedSrc}
          title={video.title ?? "Activity video"}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </FrameWrap>
    );
  }

  return (
    <FrameWrap>
      <button
        type="button"
        onClick={() => setPlaying(true)}
        className="group absolute inset-0 h-full w-full"
        aria-label={label}
      >
        {poster ? (
          // YouTube thumbnail (remote) or a provided poster image
          <Image
            src={poster}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 768px"
            className="object-cover opacity-90 transition-opacity group-hover:opacity-100"
          />
        ) : (
          // Vimeo has no static thumbnail URL — use a branded fallback
          <span className="absolute inset-0 bg-gradient-to-br from-forest to-forest-deep" />
        )}
        <PlayButton />
      </button>
    </FrameWrap>
  );
}

function FileVideo({ video }: { video: VideoItem }) {
  return (
    <FrameWrap>
      <video
        controls
        preload="none"
        poster={video.poster}
        className="absolute inset-0 h-full w-full bg-ink"
      >
        <source src={video.src} />
        Your browser does not support the video tag.
      </video>
    </FrameWrap>
  );
}

export default function ActivityVideos({
  videos,
}: {
  videos: VideoItem[];
}) {
  if (videos.length === 0) return null;

  return (
    <section className="mt-12">
      <h2 className="font-display text-2xl font-semibold text-ink">Videos</h2>
      <div className="mt-6 space-y-8">
        {videos.map((video, i) => (
          <figure key={i}>
            {video.kind === "file" ? (
              <FileVideo video={video} />
            ) : (
              <LiteEmbed video={video} />
            )}
            {video.caption && (
              <figcaption className="mt-3 text-sm text-ink/60">
                {video.caption}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </section>
  );
}
