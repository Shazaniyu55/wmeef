import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { StarMotif, StarDivider } from "@/components/StarMotif";
import { objectives, achievements, leadership, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${site.name} — our story, vision, mission, and objectives.`,
};

const values = [
  {
    title: "Faith & piety",
    body: "Spiritual growth grounded in the Qur'an sits at the centre of everything we do.",
  },
  {
    title: "Honesty",
    body: "We act with truthfulness and remain accountable to the community we serve.",
  },
  {
    title: "Compassion",
    body: "We reach out to the vulnerable — the poor, orphans, and those in need.",
  },
  {
    title: "Responsibility",
    body: "We nurture character and a sense of duty in the leaders of tomorrow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About the Foundation"
        title="Rooted in Warrake, grounded in the Qur'an."
        intro="The Warrake Muslims Education and Empowerment Foundation (WMEEF) is a community-based nonprofit working to renew Quranic learning and Islamic values, and to open doors to education and self-reliance for the people of Warrake."
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
              WMEEF was founded out of deep concern for moral decline in
              Warrake and the wider society. It was established in response to a
              falling interest in Quranic learning among children and youths — a
              trend that has weakened the moral fabric and core Islamic values
              of the community.
            </p>
            <p>
              We believe that strong Islamic foundations, built on the
              Qur&rsquo;an, are the bedrock of character, education, and
              economic empowerment. By making Quranic learning the entry point,
              the Foundation creates an incentive for beneficiaries to access
              conventional education and skills-acquisition opportunities.
            </p>
            <p>{site.registration}</p>
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
              {site.vision}
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

      {/* Objectives */}
      <section className="container-page py-20">
        <div className="text-center">
          <p className="eyebrow justify-center">Aim &amp; objectives</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            What we set out to do
          </h2>
        </div>
        <ol className="mx-auto mt-12 grid max-w-5xl gap-x-10 gap-y-8 sm:grid-cols-2">
          {objectives.map((objective, i) => (
            <li key={i} className="flex gap-4">
              <span className="font-display text-2xl font-semibold text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed text-ink/80">{objective}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Achievements */}
      <section className="bg-sand/50">
        <div className="container-page py-20">
          <div className="text-center">
            <p className="eyebrow justify-center">Milestones so far</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
              Key achievements
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {achievements.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-forest/10 bg-white/60 p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {item.date}
                </p>
                <h3 className="mt-3 font-display text-xl font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-page py-20">
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
              <p className="mt-2 leading-relaxed text-ink/75">{value.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Leadership */}
      <section className="bg-forest-deep text-parchment">
        <div className="container-page py-16">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              Leadership
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold sm:text-4xl">
              Those who serve
            </h2>
          </div>
          <div className="mx-auto mt-10 flex max-w-2xl flex-col justify-center gap-6 sm:flex-row">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="flex-1 rounded-2xl border border-parchment/15 bg-parchment/5 p-6 text-center"
              >
                <StarMotif className="mx-auto h-7 w-7 text-gold-light" />
                <p className="mt-4 font-display text-lg font-semibold">
                  {person.name}
                </p>
                <p className="mt-1 text-sm text-parchment/70">{person.role}</p>
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
