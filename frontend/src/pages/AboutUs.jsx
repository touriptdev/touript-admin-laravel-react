import { useEffect, useState } from 'react';
import api from '../api';

export default function AboutUs() {
  const [page, setPage] = useState(null);

  useEffect(() => {
    api.get('/pages/about-us').then((r) => setPage(r.data));
  }, []);

  if (!page) return <p>Loading…</p>;

  return (
    <div>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}
