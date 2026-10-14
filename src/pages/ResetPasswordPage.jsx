import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useToast } from '../context/ToastContext';

export default function ResetPasswordPage({ onNavigate }) {
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password || !confirmPassword) {
      setError('Please fill in both fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    showToast('Your password has been successfully updated! Please log in.', 'success');
    onNavigate('/login');
  };

  return (
    <main className="auth-shell" id="authMain">
      <div className="auth-main" style={{ margin: '0 auto', maxWidth: '480px' }}>
        <div className="auth-card">
          <div className="auth-header">
            <span className="pill-badge"><Icon name="lock" /><span>Set New Password</span></span>
            <h1>Choose new password</h1>
            <p>Enter a secure password for your student mentorship profile.</p>
          </div>

          {error && <div className="alert alert-error" style={{ display: 'block', marginBottom: '16px' }}>{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-wrap">
                <span className="input-icon"><Icon name="lock" /></span>
                <input
                  type="password"
                  id="newPassword"
                  className="form-control"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <div className="input-wrap">
                <span className="input-icon"><Icon name="lock" /></span>
                <input
                  type="password"
                  id="confirmNewPassword"
                  className="form-control"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-block btn-lg mt-3">
              Update Password &amp; Log In <Icon name="arrow-right" />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
