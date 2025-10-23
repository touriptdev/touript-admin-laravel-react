import { useEffect, useState } from 'react';
import api from '../../api';
import TipTapEditor from '../../shared/TipTapEditor';

export default function About() {
  const [page, setPage] = useState(null);
  const slug = 'about-us';

  useEffect(() => {
    api
      .get(`/pages/${slug}`)
      .then((r) => setPage(r.data))
      .catch(() =>
        setPage({ slug, title: 'About Us', content: '' })
      );
  }, []);

  const save = async () => {
    const r = await api.put(`/pages/${slug}`, {
      title: page.title,
      content: page.content,
    });
    setPage(r.data);
  };

  if (!page) return <p>Loading…</p>;

  return (
    <div>
      <h2>About Us</h2>

      <input
        value={page.title}
        onChange={(e) =>
          setPage((p) => ({ ...p, title: e.target.value }))
        }
      />

      <TipTapEditor
        value={page.content}
        onChange={(v) =>
          setPage((p) => ({ ...p, content: v }))
        }
        placeholder="Touript. Every Story has a fable…"
      />

      <button onClick={save}>Save</button>
    </div>
  );
}
