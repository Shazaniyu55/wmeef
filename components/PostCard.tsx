import Link from "next/link";
import Image from "next/image";
import { formatDate, type PostMeta } from "@/lib/posts";

export default function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-forest/10 bg-white/60 transition-shadow hover:shadow-lg hover:shadow-forest/5">
      {post.cover && (
        <div className="relative aspect-[3/2] overflow-hidden bg-sand">
          <Image
            src={post.cover}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
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
      </div>
    </article>
  );
}
