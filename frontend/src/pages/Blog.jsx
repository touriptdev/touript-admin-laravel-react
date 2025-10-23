import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function PublicBlog() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get('/blog').then((r) => setList(r.data.data));
  }, []);

  return (
    <div>
      <h1>Blog</h1>
      <ul>
        {list.map((p) => (
          <li key={p.id}>
            <Link to={`/blog/${p.slug}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
