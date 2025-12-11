/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";
import Link from "next/link";

const FALLBACK_POSTS = [
  {
    id: 1,
    title: "Casting for Redfin",
    updated_at: "7 December 2025",
    content:
      "When I asked today’s guests what they were looking to catch, they had an immediate answer: Redfin.",
    cover_image: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1765217993868-ec400500c0bc?q=80&w=2370&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "A history lesson about Florida’s incredible Space Coast",
    updated_at: "7 December 2025",
    content:
      "Today, we dropped anchor off Cocoa Beach to enjoy some great fishing and a history lesson about Florida’s incredible Space Coast.",
    cover_image: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Casting for Redfin",
    updated_at: "7 December 2025",
    content:
      "When I asked today’s guests what they were looking to catch, they had an immediate answer: Redfin.",
    cover_image: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1765154017463-5ca216ec2b67?q=80&w=2375&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 4,
    title: "A history lesson about Florida’s incredible Space Coast",
    updated_at: "7 December 2025",
    content:
      "Today, we dropped anchor off Cocoa Beach to enjoy some great fishing and a history lesson about Florida’s incredible Space Coast.",
    cover_image: null,
    cover_image_url:
      "https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=1200&auto=format&fit=crop",
  },
];

type ApiPost = {
  id: number;
  title: string;
  updated_at: string;
  content: string | null;
  cover_image: string | null; // path
  cover_image_url: string | null; // full URL from API
};

type UiPost = {
  id: number;
  title: string;
  updated_at: string;
  content: string;
  cover_image_url: string | null; // only this
};

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://read.touript.com/admin-backend/public/api";

// Strip trailing "/api" so we can build "http://127.0.0.1:8000/storage/..."
const API_ORIGIN = API_BASE.replace(/\/api\/?$/, "");

// Helper: build a full image URL from API post or fallback
function getCoverImageUrl(cover_image: string | null): string {
  if (!cover_image) {
    // no image from API → just use first fallback image
    return FALLBACK_POSTS[0].cover_image_url;
  }

  // If Laravel already returns full URL (e.g. from your API), just use it
  if (cover_image.startsWith("http://") || cover_image.startsWith("https://")) {
    return cover_image;
  }

  // Otherwise assume it's a path like "cover_images/foo.jpg" stored on "public" disk
  return `${API_ORIGIN}/storage/${cover_image}`;
}

// async function fetchPosts(): Promise<UiPost[]> {
//   try {
//     const res = await fetch(`${API_BASE}/admin/posts`, {
//       cache: "no-store",
//     });

//     if (!res.ok) {
//       console.error("Failed to fetch posts:", res.status, await res.text());
//       return FALLBACK_POSTS;
//     }

//     const json = await res.json();
//     const apiPosts: ApiPost[] = json.data ?? [];

//     if (!Array.isArray(apiPosts) || apiPosts.length === 0) {
//       return FALLBACK_POSTS;
//     }

//     return apiPosts.map((p) => ({
//       id: p.id,
//       title: p.title,
//       updated_at: new Date(p.updated_at).toLocaleDateString("en-US", {
//         day: "numeric",
//         month: "long",
//         year: "numeric",
//       }),
//       content: p.content ?? "",
//       cover_image: getCoverImageUrl(p.cover_image),
//       cover_image_url: p.cover_image_url,
//     }));
//   } catch (err) {
//     console.error("Error fetching posts:", err);
//     return FALLBACK_POSTS;
//   }
// }

async function fetchPosts(): Promise<UiPost[]> {
  try {
    const res = await fetch(`${API_BASE}/admin/posts`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch posts:", res.status, await res.text());
      return FALLBACK_POSTS;
    }

    const json = await res.json();
    const apiPosts: ApiPost[] = json.data ?? [];

    if (!Array.isArray(apiPosts) || apiPosts.length === 0) {
      return FALLBACK_POSTS;
    }

    return apiPosts.map((p) => ({
      id: p.id,
      title: p.title,
      updated_at: new Date(p.updated_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
      content: p.content ?? "",
      cover_image_url: p.cover_image_url || FALLBACK_POSTS[0].cover_image_url, // safety
    }));
  } catch (err) {
    console.error("Error fetching posts:", err);
    return FALLBACK_POSTS;
  }
}

function getContent(html?: string | null, maxLength = 140): string {
  if (!html) return "";
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}

export default async function Blog() {
  const posts = await fetchPosts();

  return (
    <div className="min-h-screen">
      {/* Hero + header */}

      <section className="w-full relative bg-linear-to-b bg-teal-50 pb-16 pt-2">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -left-40 -top-80 h-[550px] w-[550px] rounded-full bg-teal-800 blur-3xl" />
          <div className="absolute -right-40 -bottom-100 h-[550px] w-[550px] rounded-full bg-teal-800 blur-3xl" />
        </div>
        <div className="mx-auto  flex max-w-5xl flex-col items-center px-4 sm:px-0  pt-10 text-center lg:px-0">
          <h1 className="text-4xl z-10 font-semibold tracking-tight text-white sm:text-teal-950 sm:text-5xl lg:text-6xl">
            Unfold the Fable
          </h1>
          <p className="mt-3 z-10 text-sm tracking-relaxed text-white sm:text-teal-950/80">
            Read about the touript
          </p>

          {/* Search bar */}
          <div className="mt-10 z-10 w-full max-w-2xl">
            <div className="flex items-center rounded-full bg-white p-2 shadow-2xl shadow-teal-950/10">
              <input
                type="text"
                placeholder="Search touript blog posts"
                className="flex-1 rounded-full border-0 bg-transparent px-4 py-2 text-sm text-slate-900 placeholder:text-gray-400 focus:outline-none focus:ring-0"
              />
              <button className="mr-1 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white cursor-pointer">
                <HugeiconsIcon icon={Search01Icon} size={24} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog list */}
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 lg:px-0">
        <div className="grid gap-11 md:grid-cols-2">
          {posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-lg bg-gray-50 hover:bg-white transition  hover:shadow-xl"
            >
              <div className="relative h-64 w-full overflow-hidden">
                {post.cover_image_url && (
                  <img
                    src={post.cover_image_url || ""}
                    alt={post.title}
                    // width={1200}
                    // height={600}
                    className="w-full h-auto object-cover"
                    // unoptimized
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col px-8 pb-6 pt-5">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-700">
                  {post.updated_at}
                </p>
                <h2 className="mt-2 text-xl font-semibold leading-tight text-slate-900">
                  {post.title}
                </h2>
                <div
                  className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-gray-400 prose prose-sm max-w-none"
                  // dangerouslySetInnerHTML={{ __html: post.content || "" }}
                >
                  {getContent(post.content)}
                </div>

                <Link
                  href={`/${post.id}`}
                  className="mt-4 text-left cursor-pointer text-sm font-semibold text-orange-600 underline-offset-4 hover:underline"
                >
                  Read more
                </Link>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
