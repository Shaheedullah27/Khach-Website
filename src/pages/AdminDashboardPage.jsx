import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { useToast } from '../context/ToastContext';

export default function AdminDashboardPage({ onNavigate }) {
  const { user, logout, usersList } = useAuth();
  const {
    courses,
    submissions,
    reviewSubmission,
    addCourse,
    addQuestion,
    deleteCourse,
    totalCapacity,
    enrolledCount,
    remainingSeats
  } = useCourses();
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState('submissions'); // 'submissions' | 'students' | 'courses'
  const [studentSearch, setStudentSearch] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');

  // Review feedback state
  const [reviewNotes, setReviewNotes] = useState({});

  // Add course modal/form state
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseDesc, setNewCourseDesc] = useState('');

  // Add question state
  const [questionModalCourseId, setQuestionModalCourseId] = useState(null);
  const [newQTitle, setNewQTitle] = useState('');
  const [newQDesc, setNewQDesc] = useState('');
  const [newQVideo, setNewQVideo] = useState('https://www.youtube.com/watch?v=dQw4w9WgXcQ');

  const students = usersList.filter(u => u.role === 'student');
  const filteredStudents = students.filter(s => {
    const query = studentSearch.toLowerCase();
    const matchSearch = (s.fullName || '').toLowerCase().includes(query) ||
                        (s.email || '').toLowerCase().includes(query) ||
                        (s.cnic || '').includes(query);
    const matchCourse = courseFilter === 'all' || (s.enrolledCourses || []).includes(courseFilter);
    return matchSearch && matchCourse;
  });

  const pendingSubmissions = submissions.filter(s => s.status === 'pending');

  const handleReview = (subId, status) => {
    const note = reviewNotes[subId] || (status === 'approved' ? 'Great work on fulfilling the practical requirements!' : 'Please review and resubmit.');
    reviewSubmission(subId, status, note);
    showToast(`Submission has been marked as ${status}.`, 'success');
  };

  const handleCreateCourse = (e) => {
    e.preventDefault();
    if (!newCourseTitle || !newCourseDesc) {
      showToast('Please provide course title and description.', 'error');
      return;
    }
    addCourse({ title: newCourseTitle, description: newCourseDesc });
    setNewCourseTitle('');
    setNewCourseDesc('');
    setShowAddCourse(false);
    showToast('New course track added successfully!', 'success');
  };

  const handleCreateQuestion = (e) => {
    e.preventDefault();
    if (!newQTitle || !newQDesc) {
      showToast('Please provide question title and description.', 'error');
      return;
    }
    addQuestion(questionModalCourseId, {
      title: newQTitle,
      description: newQDesc,
      videoUrl: newQVideo
    });
    setNewQTitle('');
    setNewQDesc('');
    setQuestionModalCourseId(null);
    showToast('Exercise question added to track!', 'success');
  };

  return (
    <div className="admin-dashboard-wrapper main-container" style={{ padding: '36px 20px', minHeight: '80vh' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <span className="pill-badge badge-admin"><Icon name="shield-check" /><span>Admin Console</span></span>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: '8px 0 4px 0' }}>Mentor Control Centre</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Review student submissions, manage cohort enrollments, and update tracks.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-outline" onClick={() => onNavigate('/')}>
            Public Site
          </button>
          <button className="btn btn-ghost" onClick={() => { logout(); onNavigate('/admin/login'); }}>
            <Icon name="log-out" /> Sign out
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Cohort Capacity</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', margin: '6px 0' }}>{enrolledCount} / {totalCapacity}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{remainingSeats} seats remaining</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Review Queue</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: pendingSubmissions.length > 0 ? 'var(--warning, #d97706)' : 'var(--success)', margin: '6px 0' }}>
            {pendingSubmissions.length} Pending
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Student assignments awaiting review</div>
        </div>

        <div className="card" style={{ padding: '20px' }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Active Tracks</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', margin: '6px 0' }}>{courses.length}</div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Published mentorship curricula</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid var(--border)', marginBottom: '28px' }}>
        <button
          className={`btn ${activeTab === 'submissions' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('submissions')}
          style={{ borderRadius: '8px 8px 0 0' }}
        >
          <Icon name="file-text" /> Submissions Queue ({pendingSubmissions.length})
        </button>
        <button
          className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('students')}
          style={{ borderRadius: '8px 8px 0 0' }}
        >
          <Icon name="users" /> Student Roster ({students.length})
        </button>
        <button
          className={`btn ${activeTab === 'courses' ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => setActiveTab('courses')}
          style={{ borderRadius: '8px 8px 0 0' }}
        >
          <Icon name="book-open" /> Manage Tracks &amp; Curricula
        </button>
      </div>

      {/* 1. Submissions Review Queue */}
      {activeTab === 'submissions' && (
        <div className="card" style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '16px' }}>Assignment Review Queue</h2>
          {submissions.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>
              No assignment submissions in the queue.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {submissions.map(sub => {
                const subCourse = courses.find(c => c.id === sub.courseId);
                return (
                  <div
                    key={sub.id}
                    style={{
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      padding: '20px',
                      background: 'var(--surface-sunken)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{sub.studentName}</span>
                        <span style={{ margin: '0 8px', color: 'var(--text-tertiary)' }}>·</span>
                        <span className="badge badge-primary">{subCourse?.title || 'Course Track'}</span>
                        <span style={{ margin: '0 8px', color: 'var(--text-tertiary)' }}>·</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{new Date(sub.submittedAt).toLocaleString()}</span>
                      </div>
                      <span className={`badge ${
                        sub.status === 'approved' ? 'badge-emerald' :
                        sub.status === 'rejected' ? 'badge-danger' : 'badge-accent'
                      }`}>
                        {sub.status.toUpperCase()}
                      </span>
                    </div>

                    <div style={{ background: 'var(--surface)', padding: '14px', borderRadius: '8px', marginBottom: '16px' }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                        Submission Text &amp; Deliverables:
                      </div>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-primary)', whiteSpace: 'pre-wrap' }}>
                        {sub.answersText || 'No description provided.'}
                      </p>
                      {sub.fileName && (
                        <div style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--primary)' }}>
                          <strong>Attached File:</strong> {sub.fileName}
                        </div>
                      )}
                    </div>

                    {/* Mentor Feedback input */}
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>
                        Mentor feedback note:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter feedback for student..."
                        value={reviewNotes[sub.id] ?? (sub.mentorFeedback || '')}
                        onChange={(e) => setReviewNotes({ ...reviewNotes, [sub.id]: e.target.value })}
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => handleReview(sub.id, 'approved')}
                      >
                        <Icon name="check" /> Approve &amp; Issue Sign-Off
                      </button>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => handleReview(sub.id, 'rejected')}
                      >
                        Request Revisions
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 2. Student Roster */}
      {activeTab === 'students' && (
        <div className="card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Enrolled Student Roster</h2>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name, CNIC, email..."
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                style={{ width: '240px' }}
              />
              <select
                className="form-control"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="all">All Tracks</option>
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border)', background: 'var(--surface-sunken)' }}>
                  <th style={{ padding: '12px' }}>Student Name</th>
                  <th style={{ padding: '12px' }}>CNIC</th>
                  <th style={{ padding: '12px' }}>WhatsApp</th>
                  <th style={{ padding: '12px' }}>Email</th>
                  <th style={{ padding: '12px' }}>Tracks</th>
                  <th style={{ padding: '12px' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map(student => (
                  <tr key={student.id} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{student.fullName}</td>
                    <td style={{ padding: '12px' }}>{student.cnic || '—'}</td>
                    <td style={{ padding: '12px' }}>{student.whatsapp || '—'}</td>
                    <td style={{ padding: '12px' }}>{student.email}</td>
                    <td style={{ padding: '12px' }}>
                      <span className="badge badge-accent">{(student.enrolledCourses || []).length} enrolled</span>
                    </td>
                    <td style={{ padding: '12px' }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => onNavigate(`/admin/student/${student.id}`)}
                      >
                        Inspect Dossier
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 3. Manage Tracks & Curricula */}
      {activeTab === 'courses' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: 0 }}>Course Tracks &amp; Question Builder</h2>
            <button className="btn btn-primary" onClick={() => setShowAddCourse(true)}>
              <Icon name="award" /> + Add New Track
            </button>
          </div>

          {/* Add Course Form */}
          {showAddCourse && (
            <div className="card" style={{ padding: '24px', marginBottom: '24px', border: '2px solid var(--primary)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px' }}>Create New Mentorship Track</h3>
              <form onSubmit={handleCreateCourse}>
                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Course Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Full-Stack Web App Mentorship"
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Description &amp; Deliverables</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Describe curriculum and outcomes..."
                    value={newCourseDesc}
                    onChange={(e) => setNewCourseDesc(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary">Create Track</button>
                  <button type="button" className="btn btn-ghost" onClick={() => setShowAddCourse(false)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Question Add Modal/Form */}
          {questionModalCourseId && (
            <div className="card" style={{ padding: '24px', marginBottom: '24px', border: '2px solid var(--accent)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '14px' }}>
                Add Exercise Task to: {courses.find(c => c.id === questionModalCourseId)?.title}
              </h3>
              <form onSubmit={handleCreateQuestion}>
                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Task / Exercise Title</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Master High-CTR Thumbnail Design"
                    value={newQTitle}
                    onChange={(e) => setNewQTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Exercise Instructions</label>
                  <textarea
                    className="form-control"
                    rows={3}
                    placeholder="Detailed steps for student..."
                    value={newQDesc}
                    onChange={(e) => setNewQDesc(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: '18px' }}>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Reference Video URL (YouTube)</label>
                  <input
                    type="url"
                    className="form-control"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={newQVideo}
                    onChange={(e) => setNewQVideo(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button type="submit" className="btn btn-primary">Add Task</button>
                  <button type="button" className="btn btn-ghost" onClick={() => setQuestionModalCourseId(null)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Courses List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {courses.map(course => (
              <div key={course.id} className="card" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
                  <div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 6px 0' }}>{course.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.95rem' }}>{course.description}</p>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setQuestionModalCourseId(course.id)}
                    >
                      + Add Exercise Task
                    </button>
                    <button
                      className="btn btn-ghost btn-sm"
                      style={{ color: 'var(--danger)' }}
                      onClick={() => {
                        if (confirm(`Delete course ${course.title}?`)) {
                          deleteCourse(course.id);
                          showToast('Course removed.', 'info');
                        }
                      }}
                    >
                      <Icon name="trash-2" />
                    </button>
                  </div>
                </div>

                <div style={{ background: 'var(--surface-sunken)', padding: '16px', borderRadius: '10px' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                    Exercise Tasks ({course.questions?.length || 0}):
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(course.questions || []).map((q, idx) => (
                      <div key={q.id || idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--surface)', padding: '10px 14px', borderRadius: '8px' }}>
                        <div>
                          <strong>Exercise {q.number || idx + 1}:</strong> {q.title}
                        </div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>10:00 Video Req</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
