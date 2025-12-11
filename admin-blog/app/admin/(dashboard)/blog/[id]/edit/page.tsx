/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(
  () => import("@/app/components/RichTextEditor"),
  { ssr: false }
);

const API =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://read.touript.com/api";

type LoadedPost = {
  id: number;
  title: string;
  slug: string;
  content: string | null;
  cover_image_url?: string | null;
};

export default function AdminBlogEditPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("<p>Loading...</p>");

  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null); // existing or new

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // normalize id in case Next ever gives an array
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  useEffect(() => {
    async function loadPost() {
      try {
        setError(null);
        setLoading(true);

        const res = await fetch(`${API}/admin/posts/${id}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || `Failed to load post (${res.status})`);
        }

        const data: LoadedPost = await res.json();

        setTitle(data.title ?? "");
        setSlug(data.slug ?? ""); // 👈 allow editing slug
        setContent(data.content ?? "<p>...</p>");
        setCoverPreview(data.cover_image_url ?? null); // show existing image if any
      } catch (err: any) {
        setError(err.message ?? "Failed to load post");
        setContent("<p>Failed to load content.</p>");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadPost();
    }
  }, [id]);

  function handleCoverChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCoverImage(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setCoverPreview(url);
    }
  }

  // async function handleSave() {
  //   try {
  //     setSaving(true);
  //     setError(null);

  //     if (!title.trim()) {
  //       throw new Error("Title is required");
  //     }
  //     if (!content || content.trim() === "") {
  //       throw new Error("Please write some content.");
  //     }

  //     const formData = new FormData();

  //     // spoof PUT so Laravel can handle multipart + route model binding
  //     formData.append("_method", "PUT");
  //     formData.append("title", title);
  //     if (slug) formData.append("slug", slug);
  //     formData.append("content", content);

  //     if (coverImage) {
  //       formData.append("cover_image", coverImage);
  //     }

  //     const res = await fetch(`${API}/admin/posts/${id}`, {
  //       method: "POST", // POST + _method=PUT → Laravel treats as PUT
  //       body: formData,
  //     });

  //     if (!res.ok) {
  //       const text = await res.text();
  //       throw new Error(text || `Failed to save post (${res.status})`);
  //     }

  //     router.push("/admin/blog");
  //   } catch (err: any) {
  //     console.error(err);
  //     setError(err.message ?? "Failed to save");
  //   } finally {
  //     setSaving(false);
  //   }
  // }

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);

      if (!title.trim()) {
        throw new Error("Title is required");
      }
      if (!content || content.trim() === "") {
        throw new Error("Please write some content.");
      }

      const formData = new FormData();
      formData.append("title", title);
      if (slug) formData.append("slug", slug);
      formData.append("content", content);

      if (coverImage && coverImage.size > 2 * 1024 * 1024) {
        throw new Error("Cover image must be smaller than 2MB.");
      }
      if (coverImage) {
        formData.append("cover_image", coverImage);
      }

      const res = await fetch(`${API}/admin/posts/${id}`, {
        method: "POST", // 👈 now matches the new POST route
        body: formData,
      });

      // if (!res.ok) {
      //   const text = await res.text();
      //   throw new Error(text || `Failed to save post (${res.status})`);
      // }

      if (!res.ok) {
        let message = `Failed to save post (${res.status})`;

        try {
          const data = await res.json();
          if (data.message) {
            message = data.message;
          }
          // Laravel validation errors
          if (data.errors) {
            if (data.errors.cover_image && data.errors.cover_image[0]) {
              message = data.errors.cover_image[0];
            } else if (data.errors.title && data.errors.title[0]) {
              message = data.errors.title[0];
            }
            // add others if needed
          }
        } catch {
          // ignore JSON parse errors, fall back to default message
        }

        throw new Error(message);
      }

      router.push("/admin/blog");
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <p className="text-sm text-slate-500">Loading post…</p>;
  }

  return (
    <div className="space-y-8 px-6 min-w-sm pt-8 lg:px-0">
      <h1 className="text-xl font-semibold text-gray-900">Edit Blog Post</h1>

      {error && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm text-gray-700">Title</label>
        <input
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-teal-950"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Trip to Cocoa Beach"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-700">Slug</label>
        <input
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900 focus:outline-teal-950"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="trip-to-cocoa-beach"
        />
        <p className="mt-1 text-xs text-gray-400">
          If left empty, the existing slug will be kept.
        </p>
      </div>

      <div className="space-y-2">
        <label className="mb-1 block text-sm text-gray-700">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="block w-full text-sm font-medium text-gray-700 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-orange-600/10 file:px-6 file:py-4 file:text-xs file:font-medium file:text-orange-600 file:transition-all file:duration-300 file:ease-in-out hover:file:bg-orange-600 hover:file:text-white"
        />
        <p className="text-xs text-gray-400">
          JPG/PNG/WEBP, Max 1MB, Size 1200×600
        </p>

        {coverPreview && (
          <div className="mt-2">
            <p className="mb-1 text-xs text-gray-500">Current / New preview:</p>
            <img
              src={coverPreview}
              alt="Cover preview"
              className="h-40 w-full max-w-xl rounded-md border border-gray-200 object-cover"
            />
          </div>
        )}
      </div>

      <div>
        <label className="block mb-1 text-sm text-slate-700">Content</label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>

      <div className="flex items-center justify-center gap-8">
        <button
          onClick={() => router.back()}
          disabled={saving}
          className="rounded-lg w-full  bg-gray-200 px-6 py-4 text-sm font-medium text-gray-900 cursor-pointer disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg w-full bg-orange-600 px-6 py-4 text-sm font-medium text-white cursor-pointer disabled:opacity-60"
        >
          {saving ? "Updating..." : "Update Post"}
        </button>
      </div>
    </div>
  );
}
