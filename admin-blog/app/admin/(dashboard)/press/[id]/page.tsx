/* eslint-disable @next/next/no-img-element */
// app/press/[id]/page.tsx

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://adminread.touript.com/api";

type PressRelease = {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  cover_image_url?: string | null;
  created_at?: string;
};

type PressParams = {
  id: string;
};

async function getPresses(id: string): Promise<PressRelease> {
  const res = await fetch(`${API_BASE}/admin/press/public/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load press (${res.status})`);
  }

  return res.json();
}

export default async function PressReleasePage({
  params,
}: {
  params: Promise<PressParams>;
}) {
  const { id } = await params;
  const post = await getPresses(id);

  const dateString = post.created_at
    ? new Date(post.created_at).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <main className="mx-auto w-full px-4 pb-8 lg:px-0">
      {post.cover_image_url && (
        <div className="mb-8 overflow-hidden rounded-b-lg">
          <img
            src={post.cover_image_url || ""}
            alt={post.title}
            className="h-72 w-full object-cover"
          />
        </div>
      )}
      <div className="w-full max-w-4xl mx-auto">
        <p className="text-sm font-medium uppercase tracking-wide text-gray-700">
          {dateString}
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-normal text-gray-900">
          {post.title}
        </h1>

        {/* Full content */}
        <article className="prose prose-sm sm:prose  lg:prose-lg mt-8 max-w-none leading-relaxed text-gray-700">
          <div dangerouslySetInnerHTML={{ __html: post.content || "" }} />
        </article>
      </div>
    </main>
  );
}
