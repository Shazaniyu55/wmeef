import Link from "next/link";
import { highlights, programs, site } from "@/lib/site";
import { getSortedPosts } from "@/lib/posts";
import { StarMotif, StarDivider } from "@/components/StarMotif";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const recentPosts = getSortedPosts().slice(0, 3);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        {/* Geometric watermark — the signature motif */}
        <StarMotif
          className="pointer-events-none absolute -right-24 -top-24 h-[28rem] w-[28rem] text-forest/[0.05]"
          strokeWidth={0.6}
        />
        <StarMotif
          className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 text-gold/[0.07]"
          strokeWidth={0.6}
        />

        <div className="container-page relative grid gap-12 py-20 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-28">
          <div className="animate-fade-up">
            <p className="eyebrow">
              <StarMotif className="h-4 w-4" /> Warrake · Edo State, Nigeria
            </p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              Rooted in the Qur&rsquo;an, building a{" "}
              <span className="text-forest">whole generation</span>.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
              {site.mission}
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/donate" className="btn-primary">
                Support our work
              </Link>
              <Link href="/blog" className="btn-secondary">
                See our activities
              </Link>
            </div>
          </div>

          {/* Approach panel */}
          <div className="animate-fade-up rounded-3xl border border-forest/10 bg-white/60 p-7 sm:p-9">
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-forest">
              How we begin
            </h2>
            <ul className="mt-6 space-y-5">
              {highlights.map((item) => (
                <li key={item.title} className="flex gap-4">
                  <StarMotif className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-display text-base font-semibold text-ink">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink/65">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Vision band ---------- */}
      <section className="bg-forest text-parchment">
        <div className="container-page py-16 text-center">
          <StarDivider className="text-gold-light" />
          <p className="mt-6 text-sm uppercase tracking-[0.2em] text-parchment/70">
            Our vision
          </p>
          <p className="mx-auto mt-5 max-w-3xl font-display text-2xl font-medium leading-snug sm:text-3xl">
            {site.vision}
          </p>
        </div>
      </section>

      {/* ---------- Programmes preview ---------- */}
      <section className="container-page py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="eyebrow">What we do</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Our key programmes
            </h2>
          </div>
          <Link
            href="/programs"
            className="text-sm font-semibold text-forest hover:text-forest-deep"
          >
            View all programmes →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <div
              key={program.title}
              className="rounded-2xl border border-forest/10 bg-white/50 p-7"
            >
              <h3 className="font-display text-lg font-semibold text-ink">
                {program.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {program.summary}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- Recent activities ---------- */}
      {recentPosts.length > 0 && (
        <section className="bg-sand/50">
          <div className="container-page py-20">
            <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
              <div>
                <p className="eyebrow">From the community</p>
                <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
                  Recent activities
                </h2>
              </div>
              <Link
                href="/blog"
                className="text-sm font-semibold text-forest hover:text-forest-deep"
              >
                All activities →
              </Link>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---------- Get involved ---------- */}
      <section className="container-page py-20">
        <div className="relative overflow-hidden rounded-3xl bg-forest-deep px-8 py-14 text-parchment sm:px-14">
          <StarMotif
            className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 text-parchment/[0.06]"
            strokeWidth={0.6}
          />
          <div className="relative max-w-2xl">
            <h2 className="font-display text-3xl font-semibold sm:text-4xl">
              Be part of the work.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-parchment/80">
              Whether you give, volunteer, or partner with us, your support
              helps young people learn the Qur&rsquo;an, stay in school, and
              build a self-reliant future.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/donate"
                className="btn bg-gold text-ink hover:bg-gold-light"
              >
                Donate now
              </Link>
              <Link
                href="/contact"
                className="btn border border-parchment/40 text-parchment hover:bg-parchment/10"
              >
                Volunteer or partner
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
