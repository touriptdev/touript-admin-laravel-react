import { useEffect, useState } from "react";
import api from "../api";
import { useParams, useNavigate } from "react-router-dom";

export default function PostEdit() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    slug: "",
    body: "",
    status: "",
  });

  const [loading, setLoading] = useState(true);

  // Load existing post
  useEffect(() => {
    api.get(`/blog/${slug}`).then((res) => {
      setPost(res.data);
      setLoading(false);
    });
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post(`/admin/posts/${post.id}?_method=PUT`, post);

    alert("Post updated successfully!");
    navigate(`/post/${post.slug}`);
  };

  if (loading) return <p>Loading…</p>;

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Edit Post</h1>

      <form onSubmit={handleSubmit}>
        
        <label>Title</label>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          required
        />

        <label>Slug</label>
        <input
          type="text"
          value={post.slug}
          onChange={(e) => setPost({ ...post, slug: e.target.value })}
        />

        <label>Status</label>
        <input
          type="text"
          value={post.status}
          onChange={(e) => setPost({ ...post, status: e.target.value })}
        />

        <label>Body</label>
        <textarea
          rows={8}
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
