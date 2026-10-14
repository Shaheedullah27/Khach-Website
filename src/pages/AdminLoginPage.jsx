import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function AdminLoginPage({ onNavigate }) {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('ahmadsaleem298gb@gmail.com');
  const [password, setPassword] = useState('Password123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please provide your admin email and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password, 'admin');
      showToast('Welcome to the Mentor Administration Console!', 'success');
      onNavigate('/admin/dashboard');
    } catch (err) {
      setError(err.message || 'Authentication error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell" id="authMain">
      <aside className="auth-aside" aria-hidden="true">
        <div className="hero-bg">
          <span className="hero-bg__mesh"></span>
          <span className="hero-bg__grid"></span>
          <span className="hero-bg__glow hero-bg__glow--a"></span>
          <span className="hero-bg__glow hero-bg__glow--b"></span>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="pill-badge pill-admin" style={{ background: 'rgba(255,255,255,.1)', borderColor: 'rgba(255,255,255,.22)', color: '#ffd9a8' }}>
            <Icon name="shield-check" /><span>Restricted Area</span>
          </span>
          <h2 className="mt-3">Mentor administration centre.</h2>
          <p className="mt-2">
            Manage the curriculum, review student submissions, and monitor cohort progress from a
            single console.
          </p>
        </div>

        <div className="auth-aside__points" style={{ position: 'relative', zIndex: 1 }}>
          <div className="auth-aside__point">
            <Icon name="book-open" />
            <div><strong>Course management</strong><span>Create courses and curriculum questions.</span></div>
          </div>
          <div className="auth-aside__point">
            <Icon name="file-text" />
            <div><strong>Submission review queue</strong><span>Approve, reject and leave feedback.</span></div>
          </div>
          <div className="auth-aside__point">
            <Icon name="users" />
            <div><strong>Student records</strong><span>Browse individual student dossiers.</span></div>
          </div>
        </div>

        <p className="small" style={{ position: 'relative', zIndex: 1, color: '#8fa2c4' }}>
          © 2026 Mentor Ahmad Saleem
        </p>
      </aside>

      <div className="auth-main">
        <div className="auth-card">
          <div className="auth-header">
            <span className="pill-badge badge-admin"><Icon name="shield-check" /><span>Mentor &amp; Admin</span></span>
            <h1>Admin portal</h1>
            <p>Sign in to manage curriculum, review submissions, and view students.</p>
          </div>

          {error && (
            <div className="alert alert-error" role="alert" style={{ display: 'block', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="adminEmail">Admin email</label>
              <div className="input-wrap">
                <span className="input-icon" aria-hidden="true"><Icon name="mail" /></span>
                <input
                  type="email"
                  id="adminEmail"
                  className="form-control"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="adminPassword">Password</label>
              <div className="input-wrap">
                <span className="input-icon" aria-hidden="true"><Icon name="lock" /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="adminPassword"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  className="input-trailing"
                  type="button"
                  onClick={() => setShowPassword(p => !p)}
                  aria-label="Toggle password visibility"
                >
                  <Icon name="eye" />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg mt-2"
              disabled={loading}
            >
              <span>{loading ? 'Authenticating...' : 'Sign in as Admin'}</span>
              <Icon name="arrow-right" />
            </button>
          </form>

          <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>
              Looking for student workspace?{' '}
              <a href="/login" onClick={(e) => { e.preventDefault(); onNavigate('/login'); }}>
                Student Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
