import { useEffect, useState } from 'react';
import api from '../../api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/stats').then((r) => setStats(r.data));
  }, []);

  if (!stats) return <p>Loading…</p>;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li>Users: {stats.users}</li>
        <li>Posts: {stats.posts}</li>
      </ul>
    </div>
  );
}
