import React from 'react';
import Icon from '../components/Icon';
import { useCourses } from '../context/CourseContext';

export default function CourseDetailPage({ slug, onNavigate }) {
  const { courses } = useCourses();
  const course = courses.find(c => c.slug === slug || c.id === slug) || courses[0];

  return (
    <div className="course-detail-view">
      <div className="course-hero" style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
        <div className="main-container">
          <div className="course-nav-actions" style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <button className="btn course-back-btn" onClick={() => onNavigate('/courses')}>
              <Icon name="arrow-left" /> Back to all courses
            </button>
            <button
              className="btn course-live-btn btn-outline"
              onClick={() => onNavigate(`/practical-classes?course=${encodeURIComponent(course.title)}`)}
            >
              <Icon name="play-circle" /> Live &amp; Practical Classes
            </button>
          </div>

          <div className="course-hero__grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
            <div>
              <span className="pill-badge pill-glass">
                <Icon name="zap" />
                <span>2026 In-Demand Skill · {course.badge}</span>
              </span>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginTop: '16px', lineHeight: 1.2 }}>
                {course.title}
              </h1>
              <p className="lead" style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', marginTop: '16px', maxWidth: '52ch' }}>
                {course.description}
              </p>

              <div className="row mt-3" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <span className="badge badge-accent"><Icon name="clock" /> {course.duration}</span>
                <span className="badge badge-primary"><Icon name="award" /> {course.level}</span>
                <span className="badge badge-emerald"><Icon name="star" /> 5+ Years Experience</span>
              </div>

              <div className="row mt-4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-lg" onClick={() => onNavigate('/register')}>
                  Enroll in this track <Icon name="arrow-right" />
                </button>
                <a
                  className="btn btn-glass btn-lg"
                  href="https://wa.me/923327451571"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="phone" /> Ask mentor on WhatsApp
                </a>
              </div>
            </div>

            <div className="course-hero__media" style={{ borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-xl)' }}>
              <img
                src={course.thumb || course.image}
                alt={course.title}
                style={{ width: '100%', height: '340px', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/thumb-ai.jpeg';
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="course-content main-container" style={{ padding: '48px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
          <div>
            <section className="card panel magic" style={{ padding: '32px', marginBottom: '24px' }}>
              <span className="section-kicker">Course introduction</span>
              <h2 style={{ marginTop: '8px', fontSize: '1.6rem', fontWeight: 700 }}>{course.magic}</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '12px', lineHeight: 1.6 }}>
                This program gives you a clear, hands-on path through today's industry standards.
                You will build real assets, master industry tools, and submit assignments reviewed
                directly by your mentor Ahmad Saleem.
              </p>
            </section>

            <section className="card panel" style={{ padding: '32px', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '20px' }}>Curriculum Questions &amp; Practical Exercises</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(course.questions || []).map((q, idx) => (
                  <div key={q.id || idx} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '18px', background: 'var(--surface)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                      <span className="badge badge-primary">Exercise {q.number || idx + 1}</span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 600, margin: 0 }}>{q.title}</h3>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>{q.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div>
            <div className="card panel" style={{ padding: '24px', position: 'sticky', top: '90px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Course Summary</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.95rem' }}>
                <div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Tools Covered</div>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{course.tools}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Best Suited For</div>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>{course.bestFor}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Certification</div>
                  <div style={{ fontWeight: 600, marginTop: '2px' }}>Verified Completion E-Certificate</div>
                </div>
                <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '8px 0' }} />
                <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => onNavigate('/register')}>
                  Enroll Now
                </button>
                <button
                  className="btn btn-outline"
                  style={{ width: '100%' }}
                  onClick={() => onNavigate(`/practical-classes?course=${encodeURIComponent(course.title)}`)}
                >
                  Watch Lecture Videos
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
