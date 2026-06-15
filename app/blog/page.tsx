import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import PostCard from "@/components/PostCard";
import { getSortedPosts } from "@/lib/posts";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Activities",
  description: `News and stories from the work of ${site.name}.`,
};

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <>
      <PageHeader
        eyebrow="Activities & Updates"
        title="Stories from the work."
        intro="Reports, milestones, and moments from the field — see how support turns into real change in the community."
      />

      <section className="container-page py-20">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-forest/20 bg-white/40 p-12 text-center">
            <p className="font-display text-xl text-ink">No activities yet.</p>
            <p className="mt-2 text-ink/60">
              New updates will appear here. Add markdown files to{" "}
              <code className="rounded bg-sand px-1.5 py-0.5 text-sm">
                content/posts
              </code>
              .
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
