import React from 'react';
import Icon from '../components/Icon';

export default function NotFoundPage({ onNavigate }) {
  return (
    <div className="not-found-view main-container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <div className="card" style={{ maxWidth: '540px', margin: '0 auto', padding: '48px 32px' }}>
        <span style={{ fontSize: '4rem', display: 'block', marginBottom: '16px' }}>404</span>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 10px 0' }}>Page Not Found</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', lineHeight: 1.6 }}>
          The page or tool you are looking for does not exist or may have been relocated.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => onNavigate('/')}>
          <Icon name="arrow-left" /> Return to Mentorship Home
        </button>
      </div>
    </div>
  );
}
