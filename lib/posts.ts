import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "content", "posts");

export type GalleryImage = {
  src: string;
  caption?: string;
};

export type PostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  location?: string;
  cover?: string;
};

export type Post = PostMeta & {
  contentHtml: string;
  gallery: GalleryImage[];
};

/** Normalise frontmatter gallery entries (strings or {src, caption}). */
function normalizeGallery(raw: unknown): GalleryImage[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item): GalleryImage | null => {
      if (typeof item === "string") return { src: item };
      if (item && typeof item === "object" && "src" in item) {
        const obj = item as { src: string; caption?: string };
        return { src: obj.src, caption: obj.caption };
      }
      return null;
    })
    .filter((x): x is GalleryImage => x !== null);
}

function readPostFile(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  return matter(fileContents);
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getSortedPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const { data } = readPostFile(slug);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date ?? "",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "Activity",
        location: data.location ?? "",
        cover: data.cover ?? "",
      } satisfies PostMeta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const { data, content } = readPostFile(slug);
    const processed = await remark().use(html).process(content);
    return {
      slug,
      title: data.title ?? slug,
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      category: data.category ?? "Activity",
      location: data.location ?? "",
      cover: data.cover ?? "",
      gallery: normalizeGallery(data.gallery),
      contentHtml: processed.toString(),
    };
  } catch {
    return null;
  }
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-NG", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
