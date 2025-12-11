/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

// app/admin/(dashboard)/press/page.tsx
import Image from "next/image";
import Link from "next/link";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://read.touript.com/admin-backend/public/api";

interface PressRelease {
  id: number;
  title: string;
  slug: string;
  content?: string | null;
  cover_image?: string | null;
  cover_image_url?: string | null;
  created_at?: string;
  published_at?: string | null; // in case you add it later
}

interface PaginatedPresses {
  data: PressRelease[];
  meta: {
    total: number;
    page: number;
    per_page: number;
  };
}

async function getPresses(): Promise<PaginatedPresses> {
  const res = await fetch(`${API_BASE}/admin/presses`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(
      `Failed to fetch presses (${res.status}): ${await res.text()}`
    );
  }

  return res.json();
}

// simple helper to strip HTML from content and shorten it
function getContent(html?: string | null, maxLength = 140): string {
  if (!html) return "";
  const text = html
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "…";
}



export default async function AdminPress() {
  const result = await getPresses();
  const posts: PressRelease[] = result.data ?? [];

  return (
    <div className="space-y-4 px-4 pt-8 lg:px-0">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-900">Press Release</h1>
        <Link
          href="/admin/press/new"
          className="rounded-md bg-orange-600/10 text-orange-600 border border-orange-600/10 px-8 py-4 text-sm font-medium transition-all ease-in-out duration-300 hover:text-white hover:bg-orange-600"
        >
          Release a Press
        </Link>
      </div>

      <p className="text-xs text-gray-700">
        Total: {result.meta.total} • Page {result.meta.page}
      </p>

      {/* <div className="space-y-4"> */}
      <div className="grid gap-11 md:grid-cols-2">
        {posts.map((post) => {
          const dateString =
            post.published_at ??
            (post.created_at
              ? new Date(post.created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })
              : null);

          const content = getContent(post.content);

          return (
            <article
              key={post.id}
              className="flex flex-col overflow-hidden rounded-lg bg-gray-50 hover:bg-white transition  hover:shadow-xl"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={post.cover_image_url || ""}
                  alt={post.title}
                  // width={1200}
                  // height={600}
                  className="w-full h-auto object-cover"
                  // unoptimized
                />
              </div>

              <div className="flex flex-1 flex-col px-8 pb-6 pt-5">
                <p className="text-sm font-medium uppercase tracking-wide text-gray-700">
                  {dateString}
                </p>
                <h2 className="mt-2 text-xl font-semibold leading-tight text-slate-900">
                  {post.title}
                </h2>
                <p className="mt-2 line-clamp-3 text-sm font-medium leading-relaxed text-gray-400 prose prose-sm max-w-none">
                  {/* // dangerouslySetInnerHTML={{ __html: post.content || "" }} */}
                  {content}
                </p>
                {/* <button className="mt-4 text-left  text-sm  underline-offset-4 hover:underline">
                  Read More
                </button> */}

                <div className="mt-4 border-t border-gray-100 flex justify-between gap-4 text-sm cursor-pointer font-semibold ">
                  {/* public view by slug (you’ll wire this route) */}
                  <Link
                    href={`/admin/press/${post.id}`}
                    className="text-orange-600 py-4 w-full text-center hover:bg-gray-50 underline-offset-20 hover:underline"
                  >
                    Read more
                  </Link>
                  {/* admin edit by ID */}
                  <Link
                    href={`/admin/press/${post.id}/edit`}
                    className="text-gray-900 py-4 w-full text-center hover:bg-gray-50 underline-offset-20 hover:underline"
                  >
                    Edit Press
                  </Link>

                  <Link
                    href={`/admin/press/${post.id}/edit`}
                    className="text-teal-600 py-4 w-full text-center hover:bg-gray-50 underline-offset-20 hover:underline"
                  >
                    Release Press
                  </Link>
                </div>
              </div>
            </article>
          );
        })}

        {posts.length === 0 && (
          <p className="text-sm text-slate-500">No press yet.</p>
        )}
      </div>
    </div>
  );
}
