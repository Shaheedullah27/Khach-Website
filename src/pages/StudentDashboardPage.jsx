import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { useToast } from '../context/ToastContext';

export default function StudentDashboardPage({ onNavigate }) {
  const { user, logout } = useAuth();
  const {
    courses,
    isQuestionComplete,
    markQuestionComplete,
    getCourseProgressPercentage,
    submitAssignment,
    submissions
  } = useCourses();
  const { showToast } = useToast();

  const enrolledCourseIds = user?.enrolledCourses || ['c1'];
  const enrolledCourses = courses.filter(c => enrolledCourseIds.includes(c.id));
  const [activeCourseId, setActiveCourseId] = useState(enrolledCourses[0]?.id || courses[0]?.id);
  const activeCourse = courses.find(c => c.id === activeCourseId) || courses[0];

  // Video timers state: { [questionId]: { secondsLeft: number, running: boolean } }
  const [videoTimers, setVideoTimers] = useState({});

  // Final assignment submission form state
  const [answersText, setAnswersText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Timer interval effect
  useEffect(() => {
    const interval = setInterval(() => {
      setVideoTimers(prev => {
        let changed = false;
        const next = { ...prev };
        Object.keys(next).forEach(qId => {
          if (next[qId]?.running && next[qId].secondsLeft > 0) {
            next[qId] = { ...next[qId], secondsLeft: next[qId].secondsLeft - 1 };
            changed = true;
          }
        });
        return changed ? next : prev;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleStartTimer = (questionId) => {
    setVideoTimers(prev => ({
      ...prev,
      [questionId]: {
        secondsLeft: prev[questionId]?.secondsLeft ?? 600, // 10 minutes
        running: true
      }
    }));
    showToast('Reference lecture timer started (10:00 requirement).', 'info');
  };

  const handleMarkComplete = (questionId) => {
    const studentId = user?.id || 'student-1';
    const isDone = isQuestionComplete(studentId, questionId);
    markQuestionComplete(studentId, questionId, !isDone);
    showToast(!isDone ? 'Task marked as complete!' : 'Task unmarked.', 'success');
  };

  const handleAssignmentSubmit = (e) => {
    e.preventDefault();
    if (!answersText && !selectedFile) {
      showToast('Please provide your project answer or attach a file.', 'error');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      submitAssignment({
        studentId: user?.id || 'student-1',
        studentName: user?.fullName || 'Demo Student',
        courseId: activeCourse.id,
        answersText,
        file: selectedFile
      });
      setAnswersText('');
      setSelectedFile(null);
      setSubmitting(false);
      showToast('Assignment submitted successfully for mentor review!', 'success');
    }, 600);
  };

  const studentId = user?.id || 'student-1';
  const progressPercent = getCourseProgressPercentage(studentId, activeCourse.id);
  const courseSubmission = submissions.find(s => s.courseId === activeCourse.id && s.studentId === studentId);

  // Total stats across enrolled tracks
  const totalTasks = enrolledCourses.reduce((sum, c) => sum + (c.questions?.length || 0), 0);
  const completedTasks = enrolledCourses.reduce((sum, c) => {
    const count = (c.questions || []).filter(q => isQuestionComplete(studentId, q.id)).length;
    return sum + count;
  }, 0);
  const overallPercent = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="student-dashboard-wrapper" style={{ minHeight: 'calc(100vh - 70px)', background: 'var(--background)' }}>
      <div className="main-container" style={{ padding: '32px 20px' }}>
        {/* Welcome greeting header */}
        <div className="dash-header workspace-section" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span className="pill-badge"><Icon name="award" /><span>Student workspace</span></span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '8px 0 4px 0' }}>
              Welcome, {user?.fullName || 'Student'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
              Work through your course track tasks, watch reference lectures, and submit project assignments.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-outline" onClick={() => onNavigate('/student/profile')}>
              <Icon name="award" /> Certificate &amp; Profile
            </button>
            <button className="btn btn-ghost" onClick={() => { logout(); onNavigate('/login'); }}>
              <Icon name="log-out" /> Log out
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <section className="workspace-section card" style={{ padding: '24px', marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Progress Overview</h2>
            <span className="badge badge-neutral"><Icon name="refresh-cw" /> Live sync</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '18px' }}>
            <div className="stat-card" style={{ padding: '16px', background: 'var(--surface-sunken)', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Courses Enrolled</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>{enrolledCourses.length}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Across all tracks</div>
            </div>

            <div className="stat-card" style={{ padding: '16px', background: 'var(--surface-sunken)', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Tasks Completed</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--success)', margin: '4px 0' }}>{completedTasks}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Marked complete by you</div>
            </div>

            <div className="stat-card" style={{ padding: '16px', background: 'var(--surface-sunken)', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Curriculum Tasks</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', margin: '4px 0' }}>{totalTasks}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Available in your tracks</div>
            </div>

            <div className="stat-card" style={{ padding: '16px', background: 'var(--surface-sunken)', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Overall Progress</div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary)', margin: '4px 0' }}>{overallPercent}%</div>
              <div style={{ width: '100%', height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden', marginTop: '8px' }}>
                <div style={{ width: `${overallPercent}%`, height: '100%', background: 'var(--primary)', transition: 'width 0.4s ease' }} />
              </div>
            </div>
          </div>
        </section>

        {/* Course Track Selector Tabs */}
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '12px', marginBottom: '20px' }}>
          {courses.map(course => {
            const isSelected = course.id === activeCourseId;
            const trackProgress = getCourseProgressPercentage(studentId, course.id);
            return (
              <button
                key={course.id}
                type="button"
                className={`btn ${isSelected ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveCourseId(course.id)}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', whiteSpace: 'nowrap' }}
              >
                <span>{course.title}</span>
                <span className="badge badge-accent" style={{ fontSize: '0.75rem' }}>{trackProgress}%</span>
              </button>
            );
          })}
        </div>

        {/* Active Course Workspace */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '28px' }}>
          {/* Left Column: Question Checklist */}
          <div>
            <div className="card" style={{ padding: '24px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <span className="section-kicker">Curriculum Tasks</span>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '4px 0' }}>{activeCourse.title}</h2>
                  <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
                    Complete each hands-on task below. Reference video requires 10 minutes viewing before sign-off.
                  </p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)' }}>{progressPercent}%</span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>Track Completion</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {(activeCourse.questions || []).map((q, idx) => {
                  const completed = isQuestionComplete(studentId, q.id);
                  const timer = videoTimers[q.id];
                  const seconds = timer ? timer.secondsLeft : 600;
                  const mins = Math.floor(seconds / 60);
                  const secs = seconds % 60;
                  const timerDisplay = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

                  return (
                    <div
                      key={q.id || idx}
                      style={{
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        padding: '20px',
                        background: completed ? 'var(--surface-sunken)' : 'var(--surface)',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span className={`badge ${completed ? 'badge-emerald' : 'badge-primary'}`}>
                            {completed ? '✓ Completed' : `Exercise ${q.number || idx + 1}`}
                          </span>
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>{q.title}</h3>
                        </div>
                      </div>

                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                        {q.description}
                      </p>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', paddingTop: '12px', borderTop: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <button
                            type="button"
                            className="btn btn-outline btn-sm"
                            onClick={() => handleStartTimer(q.id)}
                          >
                            <Icon name="play-circle" />
                            {timer?.running ? `Timer: ${timerDisplay}` : 'Watch Reference Lecture'}
                          </button>
                          <a
                            className="btn btn-ghost btn-sm"
                            href={q.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Icon name="external-link" /> Open Video
                          </a>
                        </div>

                        <button
                          type="button"
                          className={`btn btn-sm ${completed ? 'btn-ghost' : 'btn-primary'}`}
                          onClick={() => handleMarkComplete(q.id)}
                        >
                          <Icon name={completed ? 'refresh-cw' : 'check'} />
                          {completed ? 'Unmark Task' : 'Mark Task Complete'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Final Assignment Submission */}
          <div>
            <div className="card" style={{ padding: '24px', position: 'sticky', top: '90px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Icon name="file-text" />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Final Project Assignment</h3>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '20px' }}>
                Submit your final deliverables for mentor review to unlock your verified course certificate.
              </p>

              {courseSubmission ? (
                <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '10px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Submission Status:</span>
                    <span className={`badge ${
                      courseSubmission.status === 'approved' ? 'badge-emerald' :
                      courseSubmission.status === 'rejected' ? 'badge-danger' : 'badge-accent'
                    }`}>
                      {courseSubmission.status.toUpperCase()}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                    <strong>Attached File:</strong> {courseSubmission.fileName}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                    <strong>Submitted:</strong> {new Date(courseSubmission.submittedAt).toLocaleDateString()}
                  </div>

                  {courseSubmission.mentorFeedback && (
                    <div style={{ background: 'var(--surface)', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--primary)' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--primary)' }}>Mentor Feedback:</div>
                      <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                        {courseSubmission.mentorFeedback}
                      </p>
                    </div>
                  )}

                  {courseSubmission.status === 'approved' && (
                    <button
                      className="btn btn-primary mt-3"
                      style={{ width: '100%' }}
                      onClick={() => onNavigate('/student/profile')}
                    >
                      <Icon name="award" /> View Certificate
                    </button>
                  )}
                </div>
              ) : (
                <form onSubmit={handleAssignmentSubmit}>
                  <div className="form-group" style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>
                      Deliverable summary / answers
                    </label>
                    <textarea
                      className="form-control"
                      rows={4}
                      placeholder="Summarize your work, key outcomes, live URLs, or channel links..."
                      value={answersText}
                      onChange={(e) => setAnswersText(e.target.value)}
                      style={{ width: '100%', resize: 'vertical' }}
                    />
                  </div>

                  <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>
                      Upload project file (PDF, ZIP, DOCX, PNG)
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setSelectedFile(e.target.files[0] || null)}
                      style={{ padding: '8px' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    disabled={submitting}
                  >
                    <Icon name="upload" />
                    <span>{submitting ? 'Submitting...' : 'Send for Mentor Review'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
