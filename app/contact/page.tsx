import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import { StarMotif } from "@/components/StarMotif";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${site.name}.`,
};

const details = [
  { label: "Location", value: site.location },
  { label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s/g, "")}`,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact Us"
        title="Let's talk."
        intro="Have a question, want to volunteer, or hoping to partner with us? Send a message and we'll respond as soon as we can."
      />

      <section className="container-page py-20">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1.2fr]">
          {/* Details */}
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              Reach the Foundation
            </h2>
            <ul className="mt-8 space-y-6">
              {details.map((item) => (
                <li key={item.label} className="flex gap-4">
                  <StarMotif className="mt-1 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink/50">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="mt-1 block text-lg text-forest hover:text-forest-deep"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="mt-1 text-lg text-ink">{item.value}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl bg-sand/60 p-6">
              <p className="text-sm leading-relaxed text-ink/75">
                Office hours are Monday to Friday. For urgent welfare matters,
                please call directly rather than using the form.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-forest/10 bg-white/50 p-7 sm:p-9">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Send a message
            </h2>
            <p className="mt-2 text-ink/65">
              Fields marked are required.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
