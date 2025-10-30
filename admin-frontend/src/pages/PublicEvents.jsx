import { useEffect, useState } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';

export default function PublicEvents() {
  const [list, setList] = useState([]);

  useEffect(() => {
    api.get('/events').then((r) => setList(r.data.data));
  }, []);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {list.map((e) => (
          <li key={e.id}>
            <Link to={`/events/${e.slug}`}>{e.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
