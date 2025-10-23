import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './auth';
import ProtectedRoute from './ProtectedRoute';

import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import Posts from './pages/admin/Posts';
import Events from './pages/admin/Events';
import About from './pages/admin/About';
import PublicBlog from './pages/Blog';
import PostView from './pages/PostView';
import PublicEvents from './pages/PublicEvents';
import EventView from './pages/EventView';
import AboutUs from './pages/AboutUs';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav>
          <Link to="/">Home</Link> |{' '}
          <Link to="/blog">Blog</Link> |{' '}
          <Link to="/events">Events</Link> |{' '}
          <Link to="/about-us">About</Link>
        </nav>

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/blog" element={<PublicBlog />} />
          <Route path="/blog/:slug" element={<PostView />} />
          <Route path="/events" element={<PublicEvents />} />
          <Route path="/events/:slug" element={<EventView />} />
          <Route path="/about-us" element={<AboutUs />} />

          {/* Admin Protected Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/posts"
            element={
              <ProtectedRoute>
                <Posts />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <ProtectedRoute>
                <Events />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/about"
            element={
              <ProtectedRoute>
                <About />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
