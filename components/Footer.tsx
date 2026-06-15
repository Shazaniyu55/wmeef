import Link from "next/link";
import Image from "next/image";
import { navLinks, site } from "@/lib/site";
import { StarMotif } from "./StarMotif";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-forest/10 bg-forest-deep text-parchment">
      <div className="container-page grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-parchment">
              <Image
                src="/logo.png"
                alt={site.name}
                width={120}
                height={36}
                className="h-7 w-auto"
              />
            </span>
            <span className="font-display text-lg font-semibold">
              {site.shortName}
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-parchment/75">
            {site.mission}
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            Explore
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-parchment/80">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-gold-light">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/donate" className="hover:text-gold-light">
                Donate
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
            Get in touch
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-parchment/80">
            <li>{site.location}</li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-gold-light">
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="hover:text-gold-light"
              >
                {site.phone}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-parchment/10">
        <div className="container-page flex flex-col items-center justify-between gap-4 py-6 text-xs text-parchment/60 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <StarMotif className="h-5 w-5 text-gold-light/70" />
        </div>
      </div>
    </footer>
  );
}
