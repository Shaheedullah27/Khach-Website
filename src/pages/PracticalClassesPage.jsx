import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useCourses } from '../context/CourseContext';

export default function PracticalClassesPage({ onNavigate, searchParams }) {
  const { courses } = useCourses();
  const initialCourseName = searchParams?.get('course') || courses[0].title;
  const initialCourse = courses.find(c => c.title.toLowerCase() === initialCourseName.toLowerCase()) || courses[0];

  const [selectedCourse, setSelectedCourse] = useState(initialCourse);
  const [activeQuestion, setActiveQuestion] = useState(selectedCourse.questions?.[0] || null);

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    setActiveQuestion(course.questions?.[0] || null);
  };

  return (
    <div className="practical-classes-view main-container" style={{ padding: '36px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="section-kicker">Interactive Classroom</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0' }}>Live &amp; Practical Classes</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Follow guided walkthroughs for every curriculum question.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => onNavigate('/student/dashboard')}>
          Go to Student Workspace <Icon name="arrow-right" />
        </button>
      </div>

      {/* Course Selection Pills */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '24px' }}>
        {courses.map(course => (
          <button
            key={course.id}
            type="button"
            className={`btn ${selectedCourse.id === course.id ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => handleCourseChange(course)}
            style={{ whiteSpace: 'nowrap' }}
          >
            {course.title}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
        {/* Main Video View */}
        <div className="card" style={{ padding: '24px', overflow: 'hidden' }}>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%', background: '#000', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px' }}>
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0"
              title="Lecture Video"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {activeQuestion && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span className="badge badge-accent">Lecture {activeQuestion.number}</span>
                <span className="pill-sm"><Icon name="clock" /> 10:00 Requirement</span>
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '8px' }}>{activeQuestion.title}</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{activeQuestion.description}</p>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button
                  className="btn btn-primary"
                  onClick={() => onNavigate('/student/dashboard')}
                >
                  <Icon name="check-circle-2" /> Mark Complete in Workspace
                </button>
                <a
                  className="btn btn-glass"
                  href={selectedCourse.playlist}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="external-link" /> Full YouTube Playlist
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Playlist & Questions Sidebar */}
        <div className="card" style={{ padding: '20px', height: 'fit-content' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Icon name="book-open" /> Curriculum Lessons
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {(selectedCourse.questions || []).map((q, idx) => {
              const isSelected = activeQuestion?.id === q.id;
              return (
                <div
                  key={q.id || idx}
                  onClick={() => setActiveQuestion(q)}
                  style={{
                    padding: '14px',
                    borderRadius: '8px',
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border)',
                    background: isSelected ? 'var(--primary-subtle, rgba(30,64,175,0.08))' : 'var(--surface)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Exercise {q.number || idx + 1}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}><Icon name="play" /> 10 min</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {q.title}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
