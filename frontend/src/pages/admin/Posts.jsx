import { useEffect, useState } from 'react';
import api from '../../api';
import TipTapEditor from '../../shared/TipTapEditor';

export default function Posts() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    content: '',
    published_at: '',
  });

  // Load posts from API
  const load = async () => {
    const r = await api.get('/admin/posts');
    setItems(r.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  // Submit new post
  const submit = async (e) => {
    e.preventDefault();
    await api.post('/posts', form);
    setForm({ title: '', slug: '', content: '', published_at: '' });
    await load();
  };

  return (
    <div>
      <h2>Posts</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
        />

        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
        />

        <TipTapEditor
          value={form.content}
          onChange={(v) => setForm((f) => ({ ...f, content: v }))}
          placeholder="Write the article…"
        />

        <label>
          Publish at
          <input
            type="datetime-local"
            value={form.published_at}
            onChange={(e) => setForm((f) => ({ ...f, published_at: e.target.value }))}
          />
        </label>

        <button type="submit">Create</button>
      </form>

      <ul>
        {items.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
