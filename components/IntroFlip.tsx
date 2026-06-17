"use client";

import { useEffect, useState } from "react";
import { StarMotif, StarDivider } from "@/components/StarMotif";
import { site } from "@/lib/site";

/**
 * IntroFlip — a Quran-manuscript style intro that loads over the homepage.
 * It shows the "About" page, turns like a leaf to "Activities", and loops
 * until the visitor taps anywhere / presses Esc / clicks "Enter the site".
 *
 * Tweak the two timings below to taste.
 */
const READ_MS = 4000; // how long each page rests before turning
const FLIP_MS = 1000; // must match the CSS animation duration (qflip-turn)

const QFLIP_CSS = `
        .qflip-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 1.75rem;
          padding: 1.5rem;
          cursor: pointer;
          background:
            radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,0.6), transparent 60%),
            #F7F3EA;
          animation: qflip-in 0.5s ease both;
        }
        .qflip-overlay.is-closing {
          animation: qflip-out 0.48s ease forwards;
        }

        .qflip-stage {
          perspective: 1800px;
          width: min(86vw, 30rem);
        }

        .qflip-book {
          position: relative;
          width: 100%;
          height: min(72vh, 38rem);
          transform-style: preserve-3d;
          filter: drop-shadow(0 30px 50px rgba(28,34,24,0.18));
        }

        /* a subtle spine on the left */
        .qflip-book::before {
          content: "";
          position: absolute;
          top: 4%;
          bottom: 4%;
          left: -2px;
          width: 14px;
          border-radius: 8px 0 0 8px;
          background: linear-gradient(90deg, rgba(28,34,24,0.18), transparent);
          z-index: 0;
        }

        .qflip-page,
        .qflip-leaf {
          position: absolute;
          inset: 0;
        }
        .qflip-page { z-index: 1; }
        .qflip-leaf {
          z-index: 2;
          transform-origin: left center;
          transform-style: preserve-3d;
        }
        .qflip-leaf.is-turning {
          animation: qflip-turn ${FLIP_MS}ms cubic-bezier(0.32, 0, 0.18, 1) forwards;
        }

        .qflip-face {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .qflip-back {
          transform: rotateY(180deg);
          border-radius: 14px;
          background:
            radial-gradient(80% 60% at 50% 40%, rgba(255,255,255,0.5), transparent 70%),
            #F7F3EA;
          box-shadow: inset 0 0 0 1px rgba(28,34,24,0.06);
        }
        .qflip-gloss {
          position: absolute;
          inset: 0;
          border-radius: 14px;
          pointer-events: none;
          background: linear-gradient(105deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.55) 50%, rgba(28,34,24,0.06) 70%);
          opacity: 0;
          animation: qflip-sheen ${FLIP_MS}ms ease forwards;
        }

        /* The manuscript page itself */
        .qflip-pageface {
          width: 100%;
          height: 100%;
          border-radius: 14px;
          padding: 10px;
          background:
            radial-gradient(70% 50% at 50% 0%, rgba(255,255,255,0.6), transparent 70%),
            #ECE4D2;
        }
        .qflip-frame {
          position: relative;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          padding: clamp(1.5rem, 5vw, 2.75rem);
          text-align: center;
          background: #F7F3EA;
          box-shadow:
            inset 0 0 0 1.5px rgba(184,137,59,0.6),
            inset 0 0 0 8px #F7F3EA,
            inset 0 0 0 9.5px rgba(184,137,59,0.25);
        }
        .qflip-corner {
          position: absolute;
          height: 1.4rem;
          width: 1.4rem;
          color: rgba(184,137,59,0.7);
        }
        .qflip-corner.tl { top: 0.9rem; left: 0.9rem; }
        .qflip-corner.tr { top: 0.9rem; right: 0.9rem; }
        .qflip-corner.bl { bottom: 0.9rem; left: 0.9rem; }
        .qflip-corner.br { bottom: 0.9rem; right: 0.9rem; }

        .qflip-content { max-width: 24rem; }

        .qflip-photo-wrap {
          display: block;
          margin: 0 auto 0.25rem;
          width: 100%;
          max-width: 22rem;
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 8px 22px rgba(28,34,24,0.18),
            inset 0 0 0 1px rgba(184,137,59,0.45);
          background: #ECE4D2;
        }
        .qflip-photo {
          display: block;
          width: 100%;
          aspect-ratio: 3 / 2;
          object-fit: cover;
        }
        .qflip-logo-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 5.5rem;
          height: 5.5rem;
          margin: 0 auto;
          border-radius: 999px;
          background: #FFFFFF;
          box-shadow:
            0 6px 16px rgba(28,34,24,0.15),
            inset 0 0 0 2px rgba(184,137,59,0.45);
        }
        .qflip-logo {
          width: 78%;
          height: 78%;
          object-fit: contain;
        }
        .qflip-eyebrow {
          display: block;
          margin-top: 1.25rem;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #125F36;
        }
        .qflip-title {
          margin-top: 0.6rem;
          font-family: var(--font-display), Georgia, serif;
          font-weight: 600;
          line-height: 1.1;
          font-size: clamp(1.6rem, 5vw, 2.25rem);
          color: #1C2218;
        }
        .qflip-body {
          margin-top: 1rem;
          line-height: 1.65;
          font-size: clamp(0.95rem, 2.4vw, 1.05rem);
          color: rgba(28,34,24,0.8);
        }
        .qflip-meta {
          margin-top: 1.25rem;
          font-size: 0.78rem;
          letter-spacing: 0.04em;
          color: rgba(28,34,24,0.5);
        }

        /* Controls */
        .qflip-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.9rem;
        }
        .qflip-dots { display: flex; gap: 0.5rem; }
        .qflip-dot {
          height: 7px; width: 7px;
          border-radius: 999px;
          background: rgba(18,95,54,0.25);
          transition: width 0.3s ease, background-color 0.3s ease;
        }
        .qflip-dot.is-on {
          width: 20px;
          background: #B8893B;
        }
        .qflip-enter {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          padding: 0.7rem 1.6rem;
          font-size: 0.85rem;
          font-weight: 600;
          color: #F7F3EA;
          background: #125F36;
          transition: background-color 0.2s ease;
        }
        .qflip-enter:hover { background: #0E4A2A; }
        .qflip-hint {
          font-size: 0.72rem;
          letter-spacing: 0.04em;
          color: rgba(28,34,24,0.45);
        }

        @keyframes qflip-turn {
          0%   { transform: rotateY(0deg); }
          100% { transform: rotateY(-180deg); }
        }
        @keyframes qflip-sheen {
          0%   { opacity: 0; }
          45%  { opacity: 0.9; }
          100% { opacity: 0; }
        }
        @keyframes qflip-rise {
          from { opacity: 0; transform: translateY(8px) scale(0.995); }
          to   { opacity: 1; transform: none; }
        }
        @keyframes qflip-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes qflip-out {
          from { opacity: 1; }
          to   { opacity: 0; visibility: hidden; }
        }
        .qflip-rise { animation: qflip-rise 0.5s ease both; }

        @media (prefers-reduced-motion: reduce) {
          .qflip-leaf, .qflip-rise, .qflip-overlay { animation: none !important; }
          .qflip-page { transition: opacity 0.4s ease; }
        }
      `;

type IntroPage = {
  eyebrow: string;
  title: string;
  body?: string;
  meta?: string;
  image?: string;
  imageKind?: "logo" | "photo";
};

/** Light-weight date formatter (avoids importing the fs-based util into the client). */
function prettyDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function IntroFlip({
  activities = [],
}: {
  /** Recent activities, passed from the server homepage. */
  activities?: {
    title: string;
    cover?: string;
    category?: string;
    date?: string;
  }[];
}) {
  // Title page (logo), then one image "plate" per recent activity.
  const activityPages: IntroPage[] = activities.map((a) => ({
    eyebrow: a.category || "Recent activity",
    title: a.title,
    meta: prettyDate(a.date),
    image: a.cover || undefined,
    imageKind: "photo" as const,
  }));

  const pages: IntroPage[] = [
    {
      eyebrow: "About the Foundation",
      title: "The Warrake Muslims Education and Empowerment Foundation",
      body: site.mission,
      meta: site.location,
      image: "/logonew.png",
      imageKind: "logo",
    },
    ...(activityPages.length > 0
      ? activityPages
      : [
          {
            eyebrow: "Recent activities",
            title: "Stories from the work",
            body: "Reports, milestones, and moments from the field \u2014 see how support turns into real change.",
            meta: "Tap anywhere to read more",
          },
        ]),
  ];

  const [index, setIndex] = useState(0); // page resting beneath
  const [leafFrom, setLeafFrom] = useState<number | null>(null); // page on the turning leaf
  const [closing, setClosing] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [reduced, setReduced] = useState(false);

  // Detect reduced-motion on the client
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  // Lock body scroll while the overlay is visible
  useEffect(() => {
    if (hidden) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [hidden]);

  // Esc to dismiss
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Schedule the next flip (full animation path)
  useEffect(() => {
    if (hidden || reduced || leafFrom !== null) return;
    const t = setTimeout(() => {
      setLeafFrom(index); // snapshot current page onto the leaf
      setIndex((i) => (i + 1) % pages.length); // reveal next underneath
    }, READ_MS);
    return () => clearTimeout(t);
  }, [index, leafFrom, hidden, reduced, pages.length]);

  // End the flip
  useEffect(() => {
    if (leafFrom === null) return;
    const t = setTimeout(() => setLeafFrom(null), FLIP_MS);
    return () => clearTimeout(t);
  }, [leafFrom]);

  // Reduced-motion: simple cross-fade through the pages
  useEffect(() => {
    if (hidden || !reduced) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % pages.length), READ_MS);
    return () => clearTimeout(t);
  }, [index, hidden, reduced, pages.length]);

  function dismiss() {
    if (closing) return;
    setClosing(true);
    window.setTimeout(() => setHidden(true), 480);
  }

  if (hidden) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to the Foundation"
      onClick={dismiss}
      className={`qflip-overlay ${closing ? "is-closing" : ""}`}
    >
      <div className="qflip-stage">
        <div className="qflip-book">
          {/* The page resting underneath */}
          <div key={index} className="qflip-page qflip-rise">
            <PageFace page={pages[index]} />
          </div>

          {/* The turning leaf (only while flipping) */}
          {leafFrom !== null && (
            <div className="qflip-leaf is-turning">
              <div className="qflip-face qflip-front">
                <PageFace page={pages[leafFrom]} />
              </div>
              <div className="qflip-face qflip-back" />
              <span className="qflip-gloss" aria-hidden="true" />
            </div>
          )}
        </div>
      </div>

      {/* Progress + controls */}
      <div className="qflip-controls">
        <div className="qflip-dots" aria-hidden="true">
          {pages.map((_, i) => (
            <span key={i} className={`qflip-dot ${i === index ? "is-on" : ""}`} />
          ))}
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            dismiss();
          }}
          className="qflip-enter"
        >
          Enter the site
        </button>
        <p className="qflip-hint">Tap anywhere to continue</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: QFLIP_CSS }} />
    </div>
  );
}

function PageFace({ page }: { page: IntroPage }) {
  return (
    <div className="qflip-pageface">
      <div className="qflip-frame">
        <StarMotif className="qflip-corner tl" />
        <StarMotif className="qflip-corner tr" />
        <StarMotif className="qflip-corner bl" />
        <StarMotif className="qflip-corner br" />

        <div className="qflip-content">
          {page.image && page.imageKind === "logo" && (
            <span className="qflip-logo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={page.image} alt="" className="qflip-logo" />
            </span>
          )}
          {page.image && page.imageKind !== "logo" && (
            <span className="qflip-photo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={page.image}
                alt=""
                className="qflip-photo"
                loading="eager"
              />
            </span>
          )}

          <StarDivider />
          <span className="qflip-eyebrow">{page.eyebrow}</span>
          <h2 className="qflip-title">{page.title}</h2>
          {page.body && <p className="qflip-body">{page.body}</p>}
          {page.meta && <p className="qflip-meta">{page.meta}</p>}
        </div>
      </div>
    </div>
  );
}