import React from 'react';

export default function MeetDeveloperPage() {
  return (
    <div style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <iframe
        src="/meet-developer.html"
        title="Meet the Developers — Ahmad Saleem Mentorship"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block'
        }}
      />
    </div>
  );
}
