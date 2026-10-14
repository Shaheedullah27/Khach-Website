import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';
import { useCourses } from '../context/CourseContext';
import { useToast } from '../context/ToastContext';

export default function StudentRegisterPage({ onNavigate }) {
  const { register } = useAuth();
  const { courses, remainingSeats } = useCourses();
  const { showToast } = useToast();

  const [fullName, setFullName] = useState('');
  const [cnic, setCnic] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || 'c1');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCnicChange = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 13) val = val.substring(0, 13);
    if (val.length > 12) {
      val = `${val.substring(0, 5)}-${val.substring(5, 12)}-${val.substring(12, 13)}`;
    } else if (val.length > 5) {
      val = `${val.substring(0, 5)}-${val.substring(5)}`;
    }
    setCnic(val);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!fullName || !cnic || !whatsappNumber || !email || !password) {
      setError('Please fill in all required registration fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      await register({
        fullName,
        cnic,
        whatsappNumber,
        email,
        password,
        courseId: selectedCourse
      });
      showToast('Account registered successfully! Welcome to your learning workspace.', 'success');
      onNavigate('/student/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-shell" id="authMain">
      <aside className="auth-aside" aria-hidden="true">
        <div className="hero-bg">
          <span className="hero-bg__mesh"></span>
          <span className="hero-bg__grid"></span>
          <span className="hero-bg__glow hero-bg__glow--a"></span>
          <span className="hero-bg__glow hero-bg__glow--b"></span>
        </div>

        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="pill-badge pill-glass">
            <Icon name="user-plus" />
            <span>Join Cohort</span>
          </span>
          <h2 className="mt-3">Begin your practical digital skill journey.</h2>
          <p className="mt-2">
            Register now to receive access to your track curriculum, submit hands-on project deliverables,
            and earn a verified certificate.
          </p>
        </div>

        <div className="auth-aside__points" style={{ position: 'relative', zIndex: 1 }}>
          <div className="auth-aside__point">
            <Icon name="layers" />
            <div><strong>4 course tracks</strong><span>YouTube Automation, Canva, WordPress and AI.</span></div>
          </div>
          <div className="auth-aside__point">
            <Icon name="award" />
            <div><strong>Official certificate</strong><span>Issued in your verified registration name.</span></div>
          </div>
        </div>

        <p className="small" style={{ position: 'relative', zIndex: 1, color: '#8fa2c4' }}>
          © 2026 Mentor Ahmad Saleem
        </p>
      </aside>

      <div className="auth-main">
        <div className="auth-card">
          <div className="auth-header">
            <span className="pill-badge"><Icon name="graduation-cap" /><span>Student Registration</span></span>
            <h1>Create your account</h1>
            <p>Enroll in courses, complete exercises, and track your progress.</p>
          </div>

          <div className="alert alert-warning is-visible" role="note" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
            <Icon name="award" />
            <span>Enter your full legal name exactly as it should appear on your completion certificate. ({remainingSeats} seats available)</span>
          </div>

          {error && (
            <div className="alert alert-error" role="alert" style={{ display: 'block', marginBottom: '16px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="fullName">Full legal name</label>
              <div className="input-wrap">
                <span className="input-icon" aria-hidden="true"><Icon name="user" /></span>
                <input
                  type="text"
                  id="fullName"
                  className="form-control"
                  placeholder="e.g. Muhammad Ahmad"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <p className="form-hint" style={{ color: 'var(--amber-text, #d97706)', fontWeight: 700, fontSize: '0.8rem', marginTop: '4px' }}>
                Use your correct name — it is printed directly on your e-certificate.
              </p>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="cnic">CNIC number</label>
                <div className="input-wrap">
                  <span className="input-icon" aria-hidden="true"><Icon name="file-text" /></span>
                  <input
                    type="text"
                    id="cnic"
                    className="form-control"
                    placeholder="12345-6789012-3"
                    value={cnic}
                    onChange={handleCnicChange}
                    required
                    maxLength={15}
                  />
                </div>
                <p className="form-hint" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Format: XXXXX-XXXXXXX-X</p>
              </div>

              <div className="form-group">
                <label htmlFor="whatsappNumber">WhatsApp number</label>
                <div className="input-wrap">
                  <span className="input-icon" aria-hidden="true"><Icon name="phone" /></span>
                  <input
                    type="tel"
                    id="whatsappNumber"
                    className="form-control"
                    placeholder="03001234567"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    required
                  />
                </div>
                <p className="form-hint" style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>Used only for course support.</p>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="courseTrack">Select your primary course track</label>
              <select
                id="courseTrack"
                className="form-control"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                style={{ height: '46px' }}
              >
                {courses.map(c => (
                  <option key={c.id} value={c.id}>{c.title} ({c.duration})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email address</label>
              <div className="input-wrap">
                <span className="input-icon" aria-hidden="true"><Icon name="mail" /></span>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="student@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <span className="input-icon" aria-hidden="true"><Icon name="lock" /></span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    className="input-trailing"
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    aria-label="Toggle password visibility"
                  >
                    <Icon name="eye" />
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm password</label>
                <div className="input-wrap">
                  <span className="input-icon" aria-hidden="true"><Icon name="lock" /></span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    className="form-control"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-block btn-lg mt-2"
              disabled={loading}
            >
              <span>{loading ? 'Creating account...' : 'Complete registration'}</span>
              <Icon name="arrow-right" />
            </button>
          </form>

          <div className="auth-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
            <p>
              Already registered?{' '}
              <a href="/login" onClick={(e) => { e.preventDefault(); onNavigate('/login'); }}>
                Log in to workspace
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
