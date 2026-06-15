import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { StarMotif } from "@/components/StarMotif";
import { programs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Programs",
  description: `The programs through which ${site.shortName} delivers education and empowerment.`,
};

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our Programs"
        title="Practical programs, lasting change."
        intro="Each program targets a specific barrier — cost, skills, capital, or hardship — and pairs support with the follow-through that makes it stick."
      />

      <section className="container-page py-20">
        <div className="grid gap-8 md:grid-cols-2">
          {programs.map((program) => (
            <article
              key={program.title}
              className="flex flex-col rounded-2xl border border-forest/10 bg-white/50 p-8"
            >
              <div className="flex items-center gap-3">
                <StarMotif className="h-6 w-6 text-gold" />
                <h2 className="font-display text-2xl font-semibold text-ink">
                  {program.title}
                </h2>
              </div>
              <p className="mt-4 leading-relaxed text-ink/75">
                {program.summary}
              </p>
              <ul className="mt-6 space-y-3 border-t border-forest/10 pt-6">
                {program.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-ink/80">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest"
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-forest text-parchment">
        <div className="container-page flex flex-col items-center gap-6 py-16 text-center">
          <h2 className="font-display text-3xl font-semibold sm:text-4xl">
            Help us reach more people.
          </h2>
          <p className="max-w-2xl text-lg text-parchment/80">
            Every program runs on the generosity of donors and volunteers. Your
            support decides how many families we can reach this year.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="btn bg-gold text-ink hover:bg-gold-light">
              Fund a program
            </Link>
            <Link
              href="/contact"
              className="btn border border-parchment/40 text-parchment hover:bg-parchment/10"
            >
              Volunteer with us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
