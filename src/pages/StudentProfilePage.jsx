import React from 'react';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';

export default function StudentProfilePage({ onNavigate }) {
  const { user } = useAuth();
  const { courses, getCourseProgressPercentage, submissions } = useCourses();

  const studentName = user?.fullName || 'Demo Student';
  const studentCnic = user?.cnic || '35201-1234567-1';
  const studentEmail = user?.email || 'student@example.com';
  const enrolledCourseIds = user?.enrolledCourses || ['c1'];
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="student-profile-view main-container" style={{ padding: '36px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="section-kicker">Account &amp; Credentials</span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '4px 0' }}>Student Profile &amp; Certificate</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>View your credentials, enrollment history, and generated completion certificates.</p>
        </div>
        <button className="btn btn-secondary" onClick={() => onNavigate('/student/dashboard')}>
          <Icon name="arrow-left" /> Back to Workspace
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '28px' }}>
        {/* Profile Details Card */}
        <div className="card" style={{ padding: '24px', height: 'fit-content' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--gradient-brand)', color: '#fff', fontSize: '2rem', fontWeight: 800, display: 'grid', placeItems: 'center', margin: '0 auto 12px auto' }}>
              {studentName.charAt(0)}
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 4px 0' }}>{studentName}</h2>
            <span className="badge badge-accent">Verified Student</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
            <div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>CNIC Number</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>{studentCnic}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Email Address</div>
              <div style={{ fontWeight: 600, marginTop: '2px' }}>{studentEmail}</div>
            </div>
            <div>
              <div style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', textTransform: 'uppercase' }}>Enrolled Tracks</div>
              <div style={{ fontWeight: 600, marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {enrolledCourses.map(c => (
                  <span key={c.id} className="badge badge-primary">{c.title}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Certificate & Achievements */}
        <div>
          <div className="card" style={{ padding: '28px', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Certificate of Completion</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
                  Official certificate generated upon completion of course tracks and mentor sign-off.
                </p>
              </div>
              <button className="btn btn-outline btn-sm" onClick={handlePrint}>
                <Icon name="printer" /> Print / Save PDF
              </button>
            </div>

            {/* Certificate Template Preview */}
            <div
              className="certificate-card"
              style={{
                border: '4px double var(--primary-light, #3b6ef5)',
                padding: '40px 32px',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(30,64,175,0.03) 0%, rgba(6,182,212,0.05) 100%), #ffffff',
                textAlign: 'center',
                position: 'relative'
              }}
            >
              <div style={{ fontSize: '0.9rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 800 }}>
                Certificate of Practical Excellence
              </div>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '16px 0 8px 0', color: 'var(--navy-900, #08101f)' }}>
                {studentName}
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: '50ch', margin: '0 auto 20px auto', fontSize: '0.95rem' }}>
                has successfully fulfilled all course curriculum tasks, reference video lectures,
                and mentor-reviewed deliverables in:
              </p>
              <div style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '24px' }}>
                {enrolledCourses[0]?.title || 'Practical Digital Skills Mentorship'}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '36px', borderTop: '1px solid #e2e8f2', paddingTop: '20px' }}>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.75rem', color: '#8b97ad', textTransform: 'uppercase' }}>Lead Instructor</div>
                  <div style={{ fontWeight: 800, color: '#0c1524' }}>Ahmad Saleem</div>
                  <div style={{ fontSize: '0.75rem', color: '#55627c' }}>Mentorship Lead</div>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', border: '2px solid var(--accent)', display: 'grid', placeItems: 'center', margin: '0 auto', color: 'var(--accent)' }}>
                    <Icon name="award" />
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#8b97ad', marginTop: '4px' }}>Verified</div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.75rem', color: '#8b97ad', textTransform: 'uppercase' }}>Certificate ID</div>
                  <div style={{ fontWeight: 700, fontFamily: 'monospace', color: '#0c1524' }}>
                    ASM-{String(studentCnic).slice(-5)}-{new Date().getFullYear()}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#55627c' }}>{new Date().toLocaleDateString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
