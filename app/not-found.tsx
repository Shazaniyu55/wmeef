import Link from "next/link";
import { StarMotif } from "@/components/StarMotif";

export default function NotFound() {
  return (
    <section className="container-page flex flex-col items-center py-32 text-center">
      <StarMotif className="h-16 w-16 text-gold" />
      <h1 className="mt-8 font-display text-4xl font-semibold text-ink">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-ink/70">
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <Link href="/" className="btn-primary mt-8">
        Back to home
      </Link>
    </section>
  );
}
