import React from 'react';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

export default function AdminStudentDetailPage({ studentId, onNavigate }) {
  const { usersList } = useAuth();
  const { courses, isQuestionComplete, submissions, getCourseProgressPercentage } = useCourses();

  const student = usersList.find(u => u.id === studentId) || {
    id: studentId,
    fullName: 'Demo Student',
    email: 'student@example.com',
    cnic: '35201-1234567-1',
    whatsapp: '+923001234567',
    enrolledCourses: ['c1', 'c2']
  };

  const studentSubmissions = submissions.filter(s => s.studentId === student.id);

  return (
    <div className="admin-student-detail-view main-container" style={{ padding: '36px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('/admin/dashboard')} style={{ marginBottom: '8px' }}>
            <Icon name="arrow-left" /> Back to Student Roster
          </button>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0 }}>Student Dossier: {student.fullName}</h1>
        </div>
        <span className="badge badge-emerald">Active Student</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '28px' }}>
        {/* Info card */}
        <div className="card" style={{ padding: '24px', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Registration Details</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.9rem' }}>
            <div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Full Legal Name</div>
              <div style={{ fontWeight: 600 }}>{student.fullName}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>CNIC Number</div>
              <div style={{ fontWeight: 600 }}>{student.cnic || 'Not provided'}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>WhatsApp Number</div>
              <div style={{ fontWeight: 600 }}>
                {student.whatsapp ? (
                  <a href={`https://wa.me/${student.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                    {student.whatsapp} <Icon name="external-link" />
                  </a>
                ) : 'Not provided'}
              </div>
            </div>
            <div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email Address</div>
              <div style={{ fontWeight: 600 }}>{student.email}</div>
            </div>
          </div>
        </div>

        {/* Progress per track */}
        <div>
          <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '18px' }}>Course Track Progress</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {courses.map(course => {
                const percent = getCourseProgressPercentage(student.id, course.id);
                const isEnrolled = (student.enrolledCourses || []).includes(course.id);
                return (
                  <div key={course.id} style={{ border: '1px solid var(--border)', borderRadius: '10px', padding: '16px', background: isEnrolled ? 'var(--surface)' : 'var(--surface-sunken)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{ fontWeight: 700 }}>{course.title}</div>
                      <span className={`badge ${isEnrolled ? 'badge-primary' : 'badge-neutral'}`}>
                        {isEnrolled ? `${percent}% Complete` : 'Not Enrolled'}
                      </span>
                    </div>

                    {isEnrolled && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '12px' }}>
                        {(course.questions || []).map((q, idx) => {
                          const done = isQuestionComplete(student.id, q.id);
                          return (
                            <span key={q.id || idx} className={`badge ${done ? 'badge-emerald' : 'badge-subtle'}`} style={{ fontSize: '0.8rem' }}>
                              Ex {q.number || idx + 1}: {done ? '✓ Done' : 'Pending'}
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Submissions */}
          <div className="card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '16px' }}>Assignment History</h2>
            {studentSubmissions.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', margin: 0 }}>No assignments submitted yet by this student.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {studentSubmissions.map(sub => (
                  <div key={sub.id} style={{ border: '1px solid var(--border)', borderRadius: '8px', padding: '16px', background: 'var(--surface-sunken)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontWeight: 600 }}>{sub.fileName || 'Project Deliverable'}</span>
                      <span className="badge badge-accent">{sub.status.toUpperCase()}</span>
                    </div>
                    <p style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {sub.answersText}
                    </p>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                      Submitted: {new Date(sub.submittedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
