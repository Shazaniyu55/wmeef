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

export type VideoItem = {
  kind: "youtube" | "vimeo" | "file";
  id?: string; // youtube / vimeo id
  src?: string; // self-hosted file path
  poster?: string; // optional poster image
  title?: string;
  caption?: string;
};

function youtubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /[?&]v=([\w-]{11})/,
    /\/embed\/([\w-]{11})/,
    /\/shorts\/([\w-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function vimeoId(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? m[1] : null;
}

function videoFromUrl(url: string): VideoItem | null {
  const yt = youtubeId(url);
  if (yt) return { kind: "youtube", id: yt };
  const vm = vimeoId(url);
  if (vm) return { kind: "vimeo", id: vm };
  if (/\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)) return { kind: "file", src: url };
  return null;
}

/** Normalise frontmatter video entries (URL strings or objects). */
function normalizeVideos(raw: unknown): VideoItem[] {
  if (!Array.isArray(raw)) return [];
  const out: VideoItem[] = [];
  for (const item of raw) {
    if (typeof item === "string") {
      const v = videoFromUrl(item);
      if (v) out.push(v);
    } else if (item && typeof item === "object") {
      const o = item as {
        url?: string;
        src?: string;
        poster?: string;
        title?: string;
        caption?: string;
      };
      if (o.url) {
        const v = videoFromUrl(o.url);
        if (v)
          out.push({
            ...v,
            poster: o.poster,
            title: o.title,
            caption: o.caption,
          });
      } else if (o.src) {
        out.push({
          kind: "file",
          src: o.src,
          poster: o.poster,
          title: o.title,
          caption: o.caption,
        });
      }
    }
  }
  return out;
}

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
  videos: VideoItem[];
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
      videos: normalizeVideos(data.videos),
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
