import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8000/api/admin/posts/public/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!post) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: 20 }}>
      <h1>{post.title}</h1>

      {post.cover_image_url && (
        <img
          src={post.cover_image_url}
          alt={post.title}
          style={{ width: "100%", borderRadius: 6 }}
        />
      )}

      <p>{post.content}</p>

      <Link to="/">← Back to all posts</Link>
    </div>
  );
}
