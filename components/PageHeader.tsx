import { StarMotif } from "./StarMotif";

export default function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-forest/10 bg-sand/40">
      <StarMotif
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 text-forest/[0.05]"
        strokeWidth={0.6}
      />
      <div className="container-page relative py-16 sm:py-20">
        <p className="eyebrow">
          <StarMotif className="h-4 w-4" /> {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink/75">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
