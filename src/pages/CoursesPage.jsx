import React from 'react';
import Icon from '../components/Icon';
import { useCourses } from '../context/CourseContext';

export default function CoursesPage({ onNavigate }) {
  const { courses } = useCourses();

  return (
    <div className="courses-page-view main-container" style={{ padding: '40px 20px' }}>
      <div className="section-header" style={{ marginBottom: '32px' }}>
        <div>
          <span className="section-kicker">Curriculum</span>
          <h1 className="section-title mt-1">Practical Skill Tracks</h1>
          <p className="section-subtitle">
            Structured 2-month mentorship programs with step-by-step guidance, practical tasks, and mentor assignment review.
          </p>
        </div>
      </div>

      <div className="courses-detailed-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {courses.map(course => (
          <div key={course.id} className="card course-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="course-card-media" style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
              <img
                src={course.thumb || course.image}
                alt={course.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/thumb-ai.jpeg';
                }}
              />
              <span className="course-badge" style={{ position: 'absolute', top: '12px', right: '12px' }}>{course.badge}</span>
            </div>

            <div className="course-card-content" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div className="course-meta-pills" style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                <span className="pill-sm"><Icon name="clock" /> {course.duration}</span>
                <span className="pill-sm"><Icon name="award" /> {course.level}</span>
              </div>

              <h2 className="course-title" style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '10px' }}>{course.title}</h2>
              <p className="course-desc" style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>{course.description}</p>

              <div style={{ background: 'var(--surface-sunken)', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Key Deliverables</div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {(course.highlights || []).map((h, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem' }}>
                      <Icon name="check" style={{ color: 'var(--success)' }} />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => onNavigate(`/course/${course.slug}`)}
                >
                  View Full Track Details
                </button>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    className="btn btn-outline"
                    type="button"
                    onClick={() => onNavigate(`/practical-classes?course=${encodeURIComponent(course.title)}`)}
                  >
                    Watch lectures
                  </button>
                  <button
                    className="btn btn-secondary"
                    type="button"
                    onClick={() => onNavigate('/register')}
                  >
                    Enroll now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
