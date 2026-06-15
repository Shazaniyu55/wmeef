import Link from "next/link";
import { formatDate, type PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative flex h-full flex-col rounded-2xl border border-forest/10 bg-white/60 p-6 transition-shadow hover:shadow-lg hover:shadow-forest/5">
      <div className="flex items-center gap-3 text-xs">
        <span className="rounded-full bg-forest/10 px-3 py-1 font-semibold uppercase tracking-wider text-forest">
          {post.category}
        </span>
        <time dateTime={post.date} className="text-ink/50">
          {formatDate(post.date)}
        </time>
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold leading-snug text-ink">
        <Link
          href={`/blog/${post.slug}`}
          className="transition-colors after:absolute after:inset-0 group-hover:text-forest"
        >
          {post.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">
        {post.excerpt}
      </p>

      <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-forest">
        Read more
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </article>
  );
}
