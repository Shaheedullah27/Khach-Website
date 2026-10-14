import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { useToast } from '../context/ToastContext';

export default function SubmitAssignmentPage({ onNavigate }) {
  const { user } = useAuth();
  const { courses, submitAssignment } = useCourses();
  const { showToast } = useToast();

  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || 'c1');
  const [answersText, setAnswersText] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!answersText && !selectedFile) {
      showToast('Please provide your deliverable text or select a file to submit.', 'error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      submitAssignment({
        studentId: user?.id || 'student-1',
        studentName: user?.fullName || 'Demo Student',
        courseId: selectedCourse,
        answersText,
        file: selectedFile
      });
      setLoading(false);
      showToast('Assignment submitted successfully! Your mentor has been notified.', 'success');
      onNavigate('/student/dashboard');
    }, 600);
  };

  return (
    <div className="submit-assignment-view main-container" style={{ padding: '40px 20px', maxWidth: '760px' }}>
      <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('/student/dashboard')} style={{ marginBottom: '16px' }}>
        <Icon name="arrow-left" /> Back to Learning Workspace
      </button>

      <div className="card" style={{ padding: '36px' }}>
        <div style={{ marginBottom: '24px' }}>
          <span className="pill-badge"><Icon name="file-text" /><span>Practical Deliverable</span></span>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: '12px 0 6px 0' }}>Submit Course Assignment</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            Send your completed project files, live channel links, or website URLs directly to mentor Ahmad Saleem for review.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>Course Track</label>
            <select
              className="form-control"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              style={{ height: '46px' }}
            >
              {courses.map(c => (
                <option key={c.id} value={c.id}>{c.title}</option>
              ))}
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: '18px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>
              Project Summary &amp; Live Links
            </label>
            <textarea
              className="form-control"
              rows={5}
              placeholder="Provide a concise description of your deliverables, live URLs (YouTube channel, WordPress site, Canva portfolio), or methodology..."
              value={answersText}
              onChange={(e) => setAnswersText(e.target.value)}
              style={{ resize: 'vertical' }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px' }}>
              Attach Deliverable File (PDF, ZIP, DOCX, PNG)
            </label>
            <input
              type="file"
              className="form-control"
              onChange={(e) => setSelectedFile(e.target.files[0] || null)}
              style={{ padding: '10px' }}
            />
            {selectedFile && (
              <div style={{ marginTop: '8px', fontSize: '0.85rem', color: 'var(--success)' }}>
                ✓ Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: '100%' }}
            disabled={loading}
          >
            <Icon name="upload" />
            <span>{loading ? 'Submitting to review queue...' : 'Submit Assignment to Mentor'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
