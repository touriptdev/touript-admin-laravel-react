import { Navigate } from 'react-router-dom';
import { useAuth } from './auth';

export default function ProtectedRoute({ children, allowed = ['admin', 'support'] }) {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (!allowed.includes(user.role)) return <Navigate to="/" replace />;

  return children;
}
