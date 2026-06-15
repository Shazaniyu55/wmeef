import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { StarMotif, StarDivider } from "@/components/StarMotif";
import { pillars, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${site.name} — our story, vision, and the values that guide our work.`,
};

const values = [
  {
    title: "Knowledge",
    body: "We believe learning is the surest path out of poverty and the foundation of a dignified life.",
  },
  {
    title: "Dignity",
    body: "We serve every person with respect, protecting the dignity of those we support.",
  },
  {
    title: "Service",
    body: "We measure success by lives improved, not by activity. Service is the point.",
  },
  {
    title: "Trust",
    body: "We are accountable to our community and transparent about how every contribution is used.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Foundation"
        title="Rooted in Warrake, working for its future."
        intro="The Warrake Muslims Education & Empowerment Foundation exists to open doors — to schooling, to skills, and to a self-reliant future — for the families of our community."
      />

      {/* Story */}
      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink">
              Why we exist
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-ink/80">
            <p>
              In Warrake and the villages around it, talent has never been in
              short supply — but opportunity often is. Too many bright children
              leave school early because of fees, and too many capable adults
              lack the skills or starting capital to earn a steady living.
            </p>
            <p>
              The Foundation was formed to change that. We bring together
              members of the community, well-wishers, and partners to fund
              education, build practical skills, and support families through
              hard seasons — all grounded in Islamic values of knowledge,
              charity, and service.
            </p>
            <p>
              Everything we do is organised around four pillars: education,
              empowerment, community, and faith &amp; character.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-forest text-parchment">
        <div className="container-page grid gap-10 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">
              Our vision
            </h2>
            <p className="mt-4 font-display text-2xl font-medium leading-snug">
              A community where every child can learn and every family can
              stand on its own.
            </p>
          </div>
          <div>
            <h2 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-gold-light">
              Our mission
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-parchment/85">
              {site.mission}
            </p>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="container-page py-20">
        <div className="text-center">
          <p className="eyebrow justify-center">How we work</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Four pillars, one purpose
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, i) => (
            <div
              key={pillar.title}
              className="rounded-2xl border border-forest/10 bg-white/50 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="font-display text-2xl font-semibold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <StarMotif className="h-5 w-5 text-forest" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-sand/50">
        <div className="container-page py-20">
          <StarDivider />
          <h2 className="mt-8 text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
            The values that guide us
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-x-12 gap-y-10 sm:grid-cols-2">
            {values.map((value) => (
              <div key={value.title}>
                <h3 className="font-display text-xl font-semibold text-forest">
                  {value.title}
                </h3>
                <p className="mt-2 leading-relaxed text-ink/75">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Walk with us.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
          There is room for everyone in this work — as a donor, a volunteer, or
          a partner.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/donate" className="btn-primary">
            Donate
          </Link>
          <Link href="/contact" className="btn-secondary">
            Get involved
          </Link>
        </div>
      </section>
    </>
  );
}
