import { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

export default function PostView() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/blog/${slug}`).then((r) => setPost(r.data));
  }, [slug]);

  if (!post) return <p>Loading…</p>;

  return (
    <article>
      <h1>{post.title}</h1>
      {post.cover_image && <img src={post.cover_image} alt={post.title} />}
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
