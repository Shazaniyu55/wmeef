import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllPostSlugs,
  getPost,
  getSortedPosts,
  formatDate,
} from "@/lib/posts";
import { StarDivider } from "@/components/StarMotif";
import PostCard from "@/components/PostCard";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: "Activity not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default async function PostPage({ params }: Params) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = getSortedPosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <article className="container-page max-w-3xl py-16 sm:py-20">
        <Link
          href="/blog"
          className="text-sm font-semibold text-forest hover:text-forest-deep"
        >
          ← All activities
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded-full bg-forest/10 px-3 py-1 font-semibold uppercase tracking-wider text-forest">
            {post.category}
          </span>
          <time dateTime={post.date} className="text-ink/50">
            {formatDate(post.date)}
          </time>
          {post.location && (
            <span className="text-ink/50">· {post.location}</span>
          )}
        </div>

        <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink sm:text-5xl">
          {post.title}
        </h1>

        <StarDivider className="mt-10" />

        <div
          className="prose-article mt-8"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>

      {related.length > 0 && (
        <section className="bg-sand/50">
          <div className="container-page py-16">
            <h2 className="font-display text-2xl font-semibold text-ink">
              More activities
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
