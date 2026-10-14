import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function StudentLoginPage({ onNavigate }) {
  const { login } = useAuth();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in both your email address and password.');
      return;
    }

    setLoading(true);
    try {
      await login(email, password, 'student');
      showToast('Welcome back to your learning workspace!', 'success');
      onNavigate('/student/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell" id="authMain">
      {/* Storytelling panel */}
      <aside className="auth-aside" aria-hidden="true">
        <div className="hero-bg">
          <span className="hero-bg__mesh"></span>
          <span className="hero-bg__grid"></span>
          <span className="hero-bg__glow hero-bg__glow--a"></span>
          <span className="hero-bg__glow hero-bg__glow--b"></span>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="pill-badge pill-glass">
            <Icon name="graduation-cap" />
            <span>Student portal</span>
          </span>
          <h2 className="mt-3">Welcome back to your learning workspace.</h2>
          <p className="mt-2">
            Pick up exactly where you left off — your course track, curriculum tasks and submitted work
            are all waiting for you.
          </p>
        </div>

        <div className="auth-aside__points" style={{ position: 'relative', zIndex: 1 }}>
          <div className="auth-aside__point">
            <Icon name="layers" />
            <div><strong>4 course tracks</strong><span>YouTube Automation, Canva, WordPress and AI.</span></div>
          </div>
          <div className="auth-aside__point">
            <Icon name="message-square" />
            <div><strong>Mentor-reviewed work</strong><span>Your submissions reach a real review queue.</span></div>
          </div>
          <div className="auth-aside__point">
            <Icon name="award" />
            <div><strong>E-certificate</strong><span>Issued when the course requirements are met.</span></div>
          </div>
        </div>

        <p className="small" style={{ position: 'relative', zIndex: 1, color: '#8fa2c4' }}>
          © 2026 Mentor Ahmad Saleem
        </p>
      </aside>

      {/* Form panel */}
      <div className="auth-main">
        <div className="auth-card">
          <div className="auth-header">
            <span className="pill-badge"><Icon name="log-in" /><span>Student portal</span></span>
            <h1>Welcome back</h1>
            <p>Log in to access your enrolled courses and tasks.</p>
          </div>

          {error && (
            <div className="alert alert-error" role="alert" style={{ display: 'block', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <div className="input-wrap">
                <span className="input-icon" aria-hidden="true"><Icon name="mail" /></span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <label htmlFor="password">Password</label>
                <a
                  href="/forgot-password"
                  onClick={(e) => { e.preventDefault(); onNavigate('/forgot-password'); }}
                  style={{ fontSize: '0.85rem', color: 'var(--primary)' }}
                >
                  Forgot password?
                </a>
              </div>
              <div className="input-wrap">
                <span className="input-icon" aria-hidden="true"><Icon name="lock" /></span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
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
              <span>{loading ? 'Logging in...' : 'Sign in to workspace'}</span>
              <Icon name="arrow-right" />
            </button>
          </form>

          <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>
              Don't have an account yet?{' '}
              <a href="/register" onClick={(e) => { e.preventDefault(); onNavigate('/register'); }}>
                Create one now
              </a>
            </p>
            <p style={{ marginTop: '8px' }}>
              Are you the mentor?{' '}
              <a href="/admin/login" onClick={(e) => { e.preventDefault(); onNavigate('/admin/login'); }}>
                Admin login
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
