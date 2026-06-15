import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { StarMotif } from "@/components/StarMotif";
import { site, leadership } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's talk."
        intro="Have a question, want to volunteer, or hoping to partner with us? Call any of our lines or send a message and we'll respond as soon as we can."
      />

      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          {/* Details */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Reach the Foundation
            </h2>

            <ul className="mt-8 space-y-6">
              <li className="flex gap-4">
                <StarMotif className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                    Location
                  </p>
                  <p className="mt-1 text-lg text-ink">{site.location}</p>
                </div>
              </li>

              <li className="flex gap-4">
                <StarMotif className="mt-1 h-5 w-5 shrink-0 text-gold" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                    Phone
                  </p>
                  <ul className="mt-1 space-y-1">
                    {site.phones.map((phone) => (
                      <li key={phone}>
                        <a
                          href={`tel:${phone}`}
                          className="text-lg text-forest hover:text-forest-deep"
                        >
                          {phone}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>

              {site.email && (
                <li className="flex gap-4">
                  <StarMotif className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                      Email
                    </p>
                    <a
                      href={`mailto:${site.email}`}
                      className="mt-1 block text-lg text-forest hover:text-forest-deep"
                    >
                      {site.email}
                    </a>
                  </div>
                </li>
              )}
            </ul>

            {/* Officers */}
            <div className="mt-10 rounded-2xl bg-sand/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                Foundation officers
              </p>
              <ul className="mt-3 space-y-3">
                {leadership.map((person) => (
                  <li key={person.name}>
                    <p className="font-medium text-ink">{person.name}</p>
                    <p className="text-sm text-ink/60">{person.role}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-forest/10 bg-white/50 p-7 sm:p-9">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Send a message
            </h2>
            <p className="mt-2 text-ink/65">Fields marked are required.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
