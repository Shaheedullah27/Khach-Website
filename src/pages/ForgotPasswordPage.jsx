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
      <div className="auth-main" style={{ margin: '0 auto', maxWidth: '480px' }}>
        <div className="auth-card">
          <div className="auth-header">
            <span className="pill-badge"><Icon name="key" /><span>Password Recovery</span></span>
            <h1>Reset your password</h1>
            <p>Enter your student account email address to receive password reset instructions.</p>
          </div>

          {submitted ? (
            <div className="alert alert-success" style={{ display: 'block', margin: '20px 0' }}>
              <h3>Recovery email dispatched</h3>
              <p>Please check your inbox at <strong>{email}</strong> for instructions to reset your account password.</p>
              <button className="btn btn-outline mt-3" onClick={() => onNavigate('/login')}>
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="recoveryEmail">Email address</label>
                <div className="input-wrap">
                  <span className="input-icon"><Icon name="mail" /></span>
                  <input
                    type="email"
                    id="recoveryEmail"
                    className="form-control"
                    placeholder="student@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
                Send Recovery Instructions <Icon name="arrow-right" />
              </button>
            </form>
          )}

          <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>
              Remember your password?{' '}
              <a href="/login" onClick={(e) => { e.preventDefault(); onNavigate('/login'); }}>
                Back to Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
