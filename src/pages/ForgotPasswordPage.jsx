import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useToast } from '../context/ToastContext';

export default function ForgotPasswordPage({ onNavigate }) {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    showToast('If an account exists, a recovery link has been sent to your email.', 'success');
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
          <span className="pill-badge pill-glass">
            <Icon name="graduation-cap" />
            <span>Student portal</span>
          </span>
          <h2 className="mt-3">Your learning journey is right where you left it.</h2>
          <p className="mt-2">Reset your password securely and return to your courses, tasks and progress.</p>
        </div>
        <p className="small" style={{ position: 'relative', zIndex: 1, color: '#8fa2c4' }}>
          © 2026 Mentor Ahmad Saleem
        </p>
      </aside>

      <div className="auth-main">
        <div className="auth-card">
          <div className="auth-header">
            <span className="pill-badge">
              <Icon name="key" />
              <span>Account recovery</span>
            </span>
            <h1>Forgot your password?</h1>
            <p>Enter the email address registered to your student account and we’ll send you a secure reset link.</p>
          </div>

          {submitted ? (
            <div className="alert alert-success" style={{ display: 'block', margin: '20px 0' }}>
              <p>Please check your inbox at <strong>{email}</strong> for instructions to reset your account password.</p>
              <button
                className="btn btn-outline mt-3"
                type="button"
                onClick={() => onNavigate('/login')}
              >
                Return to student login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="recoveryEmail">Email address</label>
                <div className="input-wrap">
                  <span className="input-icon">
                    <Icon name="mail" />
                  </span>
                  <input
                    type="email"
                    id="recoveryEmail"
                    className="form-control"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
                <span>Send reset link</span>
                <Icon name="arrow-right" />
              </button>
            </form>
          )}

          <div className="auth-footer">
            <p>
              <a
                href="/login"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/login');
                }}
              >
                Return to student login
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
