import React from 'react';
import Icon from '../components/Icon';

export default function MeetDeveloperPage({ onNavigate }) {
  return (
    <div className="meet-developer-view main-container" style={{ padding: '40px 20px', maxWidth: '1100px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="pill-badge pill-glass">
          <Icon name="sparkles" />
          <span>The Team Behind The Platform</span>
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '16px 0 8px 0' }}>
          Meet the Creator &amp; Mentor
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '60ch', margin: '0 auto', fontSize: '1.1rem' }}>
          Combining real-world industry mentoring with modern high-performance engineering to deliver
          an exceptional learning experience.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginBottom: '48px' }}>
        {/* Mentor Card */}
        <div className="card mentor-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', marginBottom: '20px', boxShadow: 'var(--shadow-xl)', border: '4px solid var(--primary-light)' }}>
            <img
              src="/images/profile.jpeg"
              alt="Mentor Ahmad Saleem"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/profile copy.jpeg';
              }}
            />
          </div>

          <span className="badge badge-accent mb-2">Lead Mentor &amp; Digital Instructor</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '6px 0' }}>Ahmad Saleem</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Experienced instructor dedicated to empowering Pakistani youth with practical skills in YouTube Automation,
            Canva visual design, WordPress website creation, and generative AI tools. Ahmad provides hands-on mentorship,
            video reviews, and real client roadmaps.
          </p>

          <a
            className="btn btn-primary"
            href="https://wa.me/923327451571"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: '100%', marginTop: 'auto' }}
          >
            <Icon name="phone" /> Contact on WhatsApp
          </a>
        </div>

        {/* Developer Card */}
        <div className="card developer-card" style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ position: 'relative', width: '180px', height: '180px', borderRadius: '50%', overflow: 'hidden', marginBottom: '20px', boxShadow: 'var(--shadow-xl)', border: '4px solid var(--accent)' }}>
            <img
              src="/images/Shaheed Sibghatullah.jpeg"
              alt="Developer Shaheed Sibghatullah"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/profile.jpeg';
              }}
            />
          </div>

          <span className="badge badge-emerald mb-2">Full-Stack Architect &amp; Engineer</span>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '6px 0' }}>Shaheed Sibghatullah</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '20px' }}>
            Full-stack software engineer specializing in scalable React, Vite, Node.js applications, and browser-native
            WASM document utilities. Architected the Mentorship Platform’s reactive workspace, in-memory ACID fallback engines,
            and 10-tool creation suite.
          </p>

          <a
            className="btn btn-outline"
            href="https://github.com/Shaheedullah27/Khach-Website"
            target="_blank"
            rel="noopener noreferrer"
            style={{ width: '100%', marginTop: 'auto' }}
          >
            <Icon name="external-link" /> GitHub: Khach-Website
          </a>
        </div>
      </div>

      {/* Platform Architecture & Mission */}
      <div className="card panel" style={{ padding: '32px' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '16px' }}>Platform Technical Architecture</h3>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
          The Ahmad Saleem Mentorship Platform combines a reactive front-end with robust document processing engines.
          Built using React with Vite for lightning-fast client transitions, backed by ACID database workflows, and
          equipped with client-side WebAssembly QPDF processing for high-security document manipulation.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '20px' }}>
          <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '10px' }}>
            <div style={{ fontWeight: 700 }}>React &amp; Vite</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Declarative component hierarchy with zero layout shift</div>
          </div>
          <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '10px' }}>
            <div style={{ fontWeight: 700 }}>Document Engines</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>In-browser PDF manipulation via PDF-Lib &amp; QPDF WASM</div>
          </div>
          <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '10px' }}>
            <div style={{ fontWeight: 700 }}>ACID Persistence</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>Structured data models with transactional integrity</div>
          </div>
          <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '10px' }}>
            <div style={{ fontWeight: 700 }}>Zero Design Regressions</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>100% preservation of original stylesheets and tokens</div>
          </div>
        </div>
      </div>
    </div>
  );
}
