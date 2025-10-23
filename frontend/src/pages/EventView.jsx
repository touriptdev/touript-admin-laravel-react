import { useEffect, useState } from 'react';
import api from '../api';
import { useParams } from 'react-router-dom';

export default function EventView() {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    api.get(`/events/${slug}`).then((r) => setEvent(r.data));
  }, [slug]);

  if (!event) return <p>Loading…</p>;

  return (
    <article>
      <h1>{event.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: event.description }} />
      {event.location && <p>{event.location}</p>}
    </article>
  );
}
