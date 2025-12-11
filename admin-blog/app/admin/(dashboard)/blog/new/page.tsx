/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent } from "react";

const API = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://read.touript.com/admin-backend/public/api";

const RichTextEditor = dynamic(
  () => import("@/app/components/RichTextEditor"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-md border border-dashed border-gray-200 px-3 py-2 text-xs text-gray-400">
        Loading editor…
      </div>
    ),
  }
);



export default function AdminBlogNewPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [coverImage, setCoverImage] = useState<File | null>(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (!slug) {
      setSlug(
        value
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)+/g, "")
      );
    }
  }

  function handleCoverChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    setCoverImage(file);
  }

  async function handleSave() {
    try {
      setSaving(true);
      setError(null);

      if (!title.trim()) {
        throw new Error("Title is required");
      }
      if (!content || content.trim() === "<p>Write your story...</p>") {
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



      const res = await fetch(`${API}/admin/posts`, {
        method: "POST",
        body: formData, // let browser set Content-Type
        // credentials: "include",
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Save failed:", res.status, text);
        throw new Error(text || "Failed to create post");
      }

      router.push("/admin/blog");
    } catch (err: any) {
      console.error(err);
      setError(err.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-8 px-6 min-w-sm pt-8 lg:px-0">
      <h1 className="text-xl font-semibold text-gray-900">New Blog Post</h1>

      {error && (
        <div className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </div>
      )}

      <div>
        <label className="mb-1 block text-sm text-gray-700">Title</label>
        <input
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900  focus:outline-teal-950"
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="Trip to Cocoa Beach"
        />
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-700">Slug</label>
        <input
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm text-gray-900  focus:outline-teal-950"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="trip-to-cocoa-beach"
        />
        <p className="mt-1 text-xs text-gray-400">
          If left empty, a slug will be generated from the title.
        </p>
      </div>

      <div className="space-y-1">
        <label className="mb-1 block text-sm text-gray-700">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverChange}
          className="block w-full text-sm font-medium file:transition-all file:duration-300 file:ease-in-out text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-orange-600/10 file:px-6 file:py-4 file:cursor-pointer file:text-xs file:font-medium file:text-orange-600 hover:file:text-white hover:file:bg-orange-600"
        />
        <p className="text-xs text-gray-400">
          JPG/PNG/WEBP, Max 1MB, Size 1200×600
        </p>
      </div>

      <div>
        <label className="mb-1 block text-sm text-gray-700">Content</label>
        <RichTextEditor value={content} onChange={setContent} />
      </div>
      {/* <div className="flex items-center justify-center">
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg w-full max-w-sm bg-orange-600 px-6 py-4 text-sm font-medium text-white cursor-pointer disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Post"}
        </button>
      </div> */}

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
          {saving ? "Saving..." : "Save Post"}
        </button>
      </div>
    </div>
  );
}
