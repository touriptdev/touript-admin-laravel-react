import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch posts from Laravel public API
    axios
      .get("http://localhost:8000/api/admin/posts/user-end")
      .then((res) => {
        // Laravel paginate returns { data: [...], current_page, last_page, ... }
        setPosts(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading posts...</p>;

  if (!posts || posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h1>Latest Posts</h1>

      {posts.map((post) => (
        <div
          key={post.id}
          style={{
            marginBottom: 30,
            padding: 15,
            border: "1px solid #ddd",
            borderRadius: 8,
          }}
        >
          <Link to={`/post/${post.id}`} style={{ textDecoration: "none" }}>
            <h2>{post.title}</h2>
          </Link>

          {post.cover_image_url && (
            <img
              src={post.cover_image_url}
              alt={post.title}
              style={{ width: "100%", borderRadius: 6, marginBottom: 10 }}
            />
          )}

          <p>
            {post.excerpt
              ? post.excerpt
              : post.content
              ? post.content.substring(0, 150)
              : ""}
            ...
          </p>

          <Link to={`/post/${post.id}`}>Read more →</Link>
        </div>
      ))}
    </div>
  );
}
