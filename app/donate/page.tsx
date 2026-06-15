import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { StarMotif, StarDivider } from "@/components/StarMotif";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Donate",
  description: `Support the work of ${site.name} with a one-time or recurring gift.`,
};

const impact = [
  { amount: "₦5,000", outcome: "School materials for one child for a term." },
  { amount: "₦20,000", outcome: "A month of vocational training for a young person." },
  { amount: "₦50,000", outcome: "A starter kit for a graduate to begin earning." },
  { amount: "₦100,000", outcome: "A full-year scholarship for one student." },
];

const ways = [
  {
    title: "Bank transfer",
    body: "Make a direct transfer to the Foundation's account.",
    // TODO: replace with the foundation's real bank details
    lines: ["Bank: [Your Bank Name]", "Account name: WMEEF", "Account no: 0000000000"],
  },
  {
    title: "Mobile / online",
    body: "Send via your preferred mobile transfer or payment platform, then let us know so we can acknowledge your gift.",
    lines: [`Email proof to ${site.email}`],
  },
  {
    title: "Give in kind",
    body: "Donate books, equipment, or supplies, or sponsor a specific program.",
    lines: ["Contact us to arrange a drop-off or pickup."],
  },
];

export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Support Our Work"
        title="Your gift keeps a child in school."
        intro="Every contribution — large or small, one-time or recurring — goes directly into education, skills, and community welfare in Warrake."
      />

      {/* Impact */}
      <section className="container-page py-20">
        <div className="text-center">
          <p className="eyebrow justify-center">What your gift does</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-ink sm:text-4xl">
            Real support, real outcomes
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {impact.map((item) => (
            <div
              key={item.amount}
              className="rounded-2xl border border-forest/10 bg-white/50 p-6 text-center"
            >
              <p className="font-display text-2xl font-semibold text-forest">
                {item.amount}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/70">
                {item.outcome}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-ink/45">
          Amounts are illustrative — give whatever you are able to.
        </p>
      </section>

      {/* Ways to give */}
      <section className="bg-sand/50">
        <div className="container-page py-20">
          <StarDivider />
          <h2 className="mt-8 text-center font-display text-3xl font-semibold text-ink sm:text-4xl">
            Ways to give
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {ways.map((way) => (
              <div
                key={way.title}
                className="flex flex-col rounded-2xl border border-forest/10 bg-white/60 p-7"
              >
                <StarMotif className="h-6 w-6 text-gold" />
                <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                  {way.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/70">
                  {way.body}
                </p>
                <ul className="mt-4 space-y-1 border-t border-forest/10 pt-4 text-sm text-ink/80">
                  {way.lines.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Note + CTA */}
      <section className="container-page py-20 text-center">
        <h2 className="font-display text-3xl font-semibold text-ink">
          Questions about giving?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-ink/70">
          We're glad to talk through one-time gifts, monthly giving, or
          sponsoring a specific student or program.
        </p>
        <div className="mt-8">
          <Link href="/contact" className="btn-primary">
            Contact the team
          </Link>
        </div>
      </section>
    </>
  );
}
