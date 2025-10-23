import { useEffect, useState } from 'react';
import api from '../../api';
import TipTapEditor from '../../shared/TipTapEditor';

export default function Events() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    location: '',
    start_at: '',
    end_at: '',
    published_at: '',
  });

  // Load events from API
  const load = async () => {
    const r = await api.get('/admin/events');
    setItems(r.data.data);
  };

  useEffect(() => {
    load();
  }, []);

  // Submit new event
  const submit = async (e) => {
    e.preventDefault();
    await api.post('/events', form);
    setForm({
      title: '',
      slug: '',
      description: '',
      location: '',
      start_at: '',
      end_at: '',
      published_at: '',
    });
    await load();
  };

  return (
    <div>
      <h2>Events</h2>

      <form onSubmit={submit}>
        <input
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm((v) => ({ ...v, title: e.target.value }))}
        />
        <input
          placeholder="Slug"
          value={form.slug}
          onChange={(e) => setForm((v) => ({ ...v, slug: e.target.value }))}
        />

        <TipTapEditor
          value={form.description}
          onChange={(v) => setForm((x) => ({ ...x, description: v }))}
          placeholder="Event description…"
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm((v) => ({ ...v, location: e.target.value }))}
        />

        <label>
          Start
          <input
            type="datetime-local"
            value={form.start_at}
            onChange={(e) => setForm((v) => ({ ...v, start_at: e.target.value }))}
          />
        </label>

        <label>
          End
          <input
            type="datetime-local"
            value={form.end_at}
            onChange={(e) => setForm((v) => ({ ...v, end_at: e.target.value }))}
          />
        </label>

        <label>
          Publish
          <input
            type="datetime-local"
            value={form.published_at}
            onChange={(e) => setForm((v) => ({ ...v, published_at: e.target.value }))}
          />
        </label>

        <button type="submit">Create</button>
      </form>

      <ul>
        {items.map((e) => (
          <li key={e.id}>{e.title}</li>
        ))}
      </ul>
    </div>
  );
}
