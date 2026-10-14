import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';

const INITIAL_FAQS = [
  {
    q: 'Which course should I start with?',
    a: 'Start with the course that matches your current goal: YouTube Automation for content growth, Canva for visual design, WordPress for websites, or Artificial Intelligence for modern AI tools and workflows.'
  },
  {
    q: 'Are the courses suitable for beginners?',
    a: 'Yes. Each course introduces its main tools and practical concepts step by step, with a clear focus on useful skills rather than unnecessary theory.'
  },
  {
    q: 'What skills will I learn?',
    a: 'You will learn practical skills in content strategy, Canva design, WordPress website building, AI tools, automation, and digital productivity.'
  },
  {
    q: 'How do assignments and mentor review work?',
    a: 'Once you enroll, your course workspace lists every curriculum question. You watch the required video lesson, submit your answer or file, and send the final practical assignment for mentor review from the same workspace.'
  },
  {
    q: 'Do I get a certificate?',
    a: 'Yes. An e-certificate is issued after you complete the course requirements. Your registration name is used on the certificate, which is why the platform asks you to enter it exactly.'
  },
  {
    q: 'Can I switch between daylight and dark mode?',
    a: 'Yes. Use the theme button in the top navigation bar to switch between Daylight and Dark mode at any time. Your choice is remembered on this device.'
  }
];

export default function HomePage({ onNavigate }) {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    // Add home-page class to body for authentic styling
    document.body.classList.add('home-page');
    return () => {
      document.body.classList.remove('home-page');
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaq(prev => (prev === index ? null : index));
  };

  return (
    <div id="viewHome" className="view-section active">
      {/* ============================================================
           1. HERO SECTION
           ============================================================ */}
      <div className="hero-surface">
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-bg__mesh"></span>
          <span className="hero-bg__grid"></span>
          <span className="hero-bg__glow hero-bg__glow--a"></span>
          <span className="hero-bg__glow hero-bg__glow--b"></span>
          <span className="hero-bg__beam"></span>
        </div>

        <div className="main-container">
          <div className="hero-grid">
            <div className="hero-left">
              <span className="pill-badge pill-glass">
                <Icon name="sparkles" />
                <span>Practical, project-based mentorship</span>
              </span>

              <h1 className="display-1 hero-title">
                Turn your skills into <span>real-world progress</span>
              </h1>

              <p className="hero-desc">
                Four focused course tracks in YouTube Automation, Canva design, WordPress and
                Artificial Intelligence — taught through hands-on curriculum tasks, guided video
                lessons and assignments reviewed by your mentor.
              </p>

              <div className="hero-actions">
                <button
                  className="btn btn-primary btn-lg"
                  type="button"
                  onClick={() => onNavigate('/courses')}
                  id="heroExploreBtn"
                >
                  <span>Explore course tracks</span>
                  <Icon name="arrow-right" />
                </button>
                <a
                  className="btn btn-glass btn-lg"
                  href="/register"
                  onClick={(e) => { e.preventDefault(); onNavigate('/register'); }}
                >
                  <Icon name="user-plus" />
                  <span>Create free account</span>
                </a>
              </div>

              <div className="hero-features">
                <div className="feature-item">
                  <Icon name="check-circle-2" />
                  <span>Mentor-reviewed assignments</span>
                </div>
                <div className="feature-item">
                  <Icon name="check-circle-2" />
                  <span>Beginner-friendly tracks</span>
                </div>
                <div className="feature-item">
                  <Icon name="check-circle-2" />
                  <span>E-certificate on completion</span>
                </div>
              </div>
            </div>

            <div className="hero-right">
              <div className="card mentor-card">
                <div className="mentor-card-header">
                  <span className="status-indicator">
                    <span className="status-dot pulse"></span>
                    <span className="status-text">Mentor profile</span>
                  </span>
                  <a
                    className="whatsapp-contact"
                    href="https://wa.me/923327451571"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contact Ahmad Saleem on WhatsApp"
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '18px', height: '18px', fill: 'currentColor' }}>
                      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.3ZM12.2 21.6h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.7 9.7 0 0 1-1.5-5.2C2.2 6.4 6.7 2 12.1 2c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.7 9.8Zm5.4-7.3c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.8 4.3 1.8.8 2.4.9 3.3.8.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.2-.3-.3-.6-.4Z" />
                    </svg>
                    <span>Contact</span>
                  </a>
                </div>

                <div className="mentor-img-wrapper" id="mentorImgWrapper">
                  <img
                    id="mentorPhoto"
                    className="mentor-photo"
                    src="/images/profile.jpeg"
                    alt="Mentor Ahmad Saleem"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/profile copy.jpeg';
                    }}
                  />
                </div>

                <div className="mentor-card-body">
                  <h2 className="mentor-name">Ahmad Saleem</h2>
                  <p className="mentor-role">Lead Mentor &amp; Digital Skills Instructor</p>
                  <p className="mentor-bio">
                    Dedicated to helping students learn practical digital skills through clear
                    explanations, useful tools, and real-world examples.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================
           MARQUEE
           ============================================================ */}
      <div className="home-marquee" aria-label="Skills covered in the mentorship">
        <div className="home-marquee__track">
          <span className="home-marquee__tag home-marquee__tag--blue">
            <Icon name="play-circle" />YouTube Automation
          </span>
          <span className="home-marquee__tag home-marquee__tag--green">
            <Icon name="image" />Canva Design
          </span>
          <span className="home-marquee__tag home-marquee__tag--red">
            <Icon name="layers" />WordPress
          </span>
          <span className="home-marquee__tag home-marquee__tag--amber">
            <Icon name="sparkles" />Artificial Intelligence
          </span>
          <span className="home-marquee__tag home-marquee__tag--blue">
            <Icon name="play-circle" />YouTube Automation
          </span>
          <span className="home-marquee__tag home-marquee__tag--green">
            <Icon name="image" />Canva Design
          </span>
          <span className="home-marquee__tag home-marquee__tag--red">
            <Icon name="layers" />WordPress
          </span>
          <span className="home-marquee__tag home-marquee__tag--amber">
            <Icon name="sparkles" />Artificial Intelligence
          </span>
        </div>
      </div>

      <div className="main-container">
        {/* ============================================================
             2. WHAT STUDENTS CAN ACHIEVE
             ============================================================ */}
        <div className="section-block" id="outcomes">
          <div className="section-header">
            <div>
              <span className="section-kicker">Outcomes</span>
              <h2 className="section-title mt-1">What you can build here</h2>
              <p className="section-subtitle">
                Every track is built around practical deliverables rather than passive theory.
              </p>
            </div>
            <button
              className="btn btn-outline"
              type="button"
              onClick={() => onNavigate('/courses')}
            >
              Browse tracks <Icon name="arrow-right" />
            </button>
          </div>

          <div className="grid-3">
            <article className="card card-hover">
              <span className="feature-icon"><Icon name="target" /></span>
              <h3>A repeatable content engine</h3>
              <p className="muted small mt-1">
                YouTube Automation takes you from niche research to upload workflows, thumbnails,
                SEO and channel growth systems.
              </p>
            </article>

            <article className="card card-hover">
              <span className="feature-icon"><Icon name="sparkles" /></span>
              <h3>A professional design workflow</h3>
              <p className="muted small mt-1">
                Canva takes you from a blank canvas to social graphics, brand kits, presentations
                and client-ready exports.
              </p>
            </article>

            <article className="card card-hover">
              <span className="feature-icon"><Icon name="layers" /></span>
              <h3>A live website you launched yourself</h3>
              <p className="muted small mt-1">
                WordPress covers themes, page builders, speed, security and on-page SEO so you can
                publish confidently.
              </p>
            </article>

            <article className="card card-hover">
              <span className="feature-icon"><Icon name="zap" /></span>
              <h3>An AI-powered toolkit</h3>
              <p className="muted small mt-1">
                Artificial Intelligence covers prompt engineering, image and video generation,
                voiceovers and AI-assisted websites.
              </p>
            </article>

            <article className="card card-hover">
              <span className="feature-icon"><Icon name="trending-up" /></span>
              <h3>Visible progress you can point to</h3>
              <p className="muted small mt-1">
                Your workspace tracks each curriculum task and completion percentage per course
                track, in real time.
              </p>
            </article>

            <article className="card card-hover">
              <span className="feature-icon"><Icon name="award" /></span>
              <h3>An e-certificate on completion</h3>
              <p className="muted small mt-1">
                Finish the required tasks and your course completion is recorded on your student
                profile and certificate.
              </p>
            </article>
          </div>
        </div>

        {/* ============================================================
             3. MENTORSHIP BENEFITS
             ============================================================ */}
        <div className="section-block">
          <div className="card card-deep-indigo mentorship-highlight" style={{ padding: 'clamp(1.5rem, 4vw, 2.75rem)' }}>
            <div className="row-between" style={{ alignItems: 'flex-start' }}>
              <div style={{ maxWidth: '44ch' }}>
                <span className="section-kicker mentorship-kicker">Why mentorship</span>
                <h2 className="mt-1 mentorship-title">You are not learning alone</h2>
                <p className="mt-2 mentorship-copy">
                  The platform keeps a mentor in the loop at the moments that matter — not just at
                  the end. Your answers and files reach a real review queue.
                </p>
                <a
                  className="btn btn-white mt-3"
                  href="/register"
                  onClick={(e) => { e.preventDefault(); onNavigate('/register'); }}
                >
                  Start learning <Icon name="arrow-right" />
                </a>
              </div>

              <div style={{ flex: '1 1 320px', minWidth: 'min(100%, 280px)' }}>
                <div className="grid-2" style={{ gap: '0.85rem' }}>
                  <div className="info-box mentorship-info-box">
                    <div className="info-label mentorship-info-label">Guided curriculum</div>
                    <div className="info-val mentorship-info-value">Structured tasks per track</div>
                  </div>
                  <div className="info-box mentorship-info-box">
                    <div className="info-label mentorship-info-label">Video lessons</div>
                    <div className="info-val mentorship-info-value">Optional required viewing</div>
                  </div>
                  <div className="info-box mentorship-info-box">
                    <div className="info-label mentorship-info-label">Submissions</div>
                    <div className="info-val mentorship-info-value">Mentor review queue</div>
                  </div>
                  <div className="info-box mentorship-info-box">
                    <div className="info-label mentorship-info-label">Feedback</div>
                    <div className="info-val mentorship-info-value">Review notes on your work</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
             4. HOW THE PLATFORM WORKS
             ============================================================ */}
        <div className="section-block" id="howItWorks">
          <div className="section-header text-center">
            <div>
              <span className="section-kicker">The process</span>
              <h2 className="section-title mt-1">How the mentorship works</h2>
              <p className="section-subtitle" style={{ marginInline: 'auto' }}>
                A clear path from choosing a skill to having your work reviewed.
              </p>
            </div>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-badge">1</span>
              <h3 className="step-title">
                <Icon name="compass" />
                <span>Choose your track</span>
              </h3>
              <p className="step-desc">
                Browse the course tracks and enrol in the skill that matches your goals. Your
                workspace is created the moment you enrol.
              </p>
            </div>

            <div className="step-card">
              <span className="step-badge badge-indigo">2</span>
              <h3 className="step-title">
                <Icon name="play-circle" />
                <span>Work through the lessons</span>
              </h3>
              <p className="step-desc">
                Follow each curriculum question, watch the reference lesson where one is attached,
                and mark tasks complete as you go.
              </p>
            </div>

            <div className="step-card">
              <span className="step-badge badge-emerald">3</span>
              <h3 className="step-title">
                <Icon name="send" />
                <span>Submit for mentor review</span>
              </h3>
              <p className="step-desc">
                Attach your final practical work and send it in. Your mentor reviews the submission
                and returns feedback in your workspace.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================
             5. INSIDE THE WORKSPACE
             ============================================================ */}
        <div className="section-block">
          <div className="section-header">
            <div>
              <span className="section-kicker">Your workspace</span>
              <h2 className="section-title mt-1">A learning workspace, not a video dump</h2>
              <p className="section-subtitle">
                Everything you submit and complete lives in one place, tied to your account.
              </p>
            </div>
          </div>

          <div className="grid-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))' }}>
            <div className="card card-hover">
              <span className="feature-icon"><Icon name="layout-dashboard" /></span>
              <h3>Student dashboard</h3>
              <p className="muted small mt-1">
                Pick a track, see your enrolled courses, and open the active course workspace
                without leaving the page.
              </p>
            </div>

            <div className="card card-hover">
              <span className="feature-icon"><Icon name="message-square" /></span>
              <h3>Curriculum tasks &amp; questions</h3>
              <p className="muted small mt-1">
                Each track lists numbered questions. Locked tasks unlock in order so you are never
                asked to skip ahead.
              </p>
            </div>

            <div className="card card-hover">
              <span className="feature-icon"><Icon name="play" /></span>
              <h3>Reference video lessons</h3>
              <p className="muted small mt-1">
                Where a question includes a video requirement, your answer field unlocks once the
                study time is fulfilled.
              </p>
            </div>

            <div className="card card-hover">
              <span className="feature-icon"><Icon name="pie-chart" /></span>
              <h3>Real-time progress</h3>
              <p className="muted small mt-1">
                Track completed tasks and overall percentage per course on your dashboard and
                student profile.
              </p>
            </div>

            <div className="card card-hover">
              <span className="feature-icon"><Icon name="file-up" /></span>
              <h3>Assignment submissions</h3>
              <p className="muted small mt-1">
                Attach documents, images or archives — PDF, DOCX, ZIP, PNG, JPG and PPTX are
                supported up to 10&nbsp;MB.
              </p>
            </div>

            <div className="card card-hover">
              <span className="feature-icon"><Icon name="shield-check" /></span>
              <h3>Private student account</h3>
              <p className="muted small mt-1">
                Access is protected by your own student login. Only you and your mentor can see
                your submissions.
              </p>
            </div>
          </div>
        </div>

        {/* ============================================================
             6. MENTOR
             ============================================================ */}
        <div className="section-block">
          <div className="card mentor-panel" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
            <div>
              <span className="mentor-label">Meet your mentor</span>
              <h2 className="mentor-name">Ahmad Saleem</h2>
              <p className="mentor-role">Digital Skills Instructor &amp; Creator</p>
              <div className="row mt-3">
                <a
                  className="btn btn-secondary btn-sm"
                  href="https://wa.me/923327451571"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="phone" /> Message on WhatsApp
                </a>
              </div>
            </div>
            <div>
              <p className="muted">
                I teach practical digital skills through project-based learning and real-world
                assignments across YouTube Automation, Canva, WordPress and Artificial
                Intelligence. Five years of hands-on work in these tools shapes how each track is
                taught — clear explanations, useful tools, and tasks that connect skills to real
                work.
              </p>
              <div className="hero-features mt-3" style={{ borderTop: 'none', paddingTop: 0 }}>
                <div className="feature-item">
                  <Icon name="check" />
                  <span>Clear, beginner-friendly explanations</span>
                </div>
                <div className="feature-item">
                  <Icon name="check" />
                  <span>Feedback on submitted work</span>
                </div>
                <div className="feature-item">
                  <Icon name="check" />
                  <span>Lifetime access to course resources</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================
             7. FAQ
             ============================================================ */}
        <div className="section-block faq-section" id="faq">
          <div className="section-header text-center">
            <div>
              <span className="section-kicker">Questions</span>
              <h2 className="section-title mt-1">Frequently asked questions</h2>
            </div>
          </div>

          <div className="faq-list" id="faqList">
            {INITIAL_FAQS.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-question"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    <Icon name="chevron-down" />
                  </button>
                  <div
                    className="faq-answer"
                    id={`faq-answer-${index}`}
                    style={{ display: isOpen ? 'block' : 'none' }}
                  >
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================
             8. FINAL CTA
             ============================================================ */}
        <div className="section-block">
          <div className="middle-banner">
            <span className="pill-badge pill-glass" style={{ marginBottom: '1rem' }}>
              <Icon name="rocket" />
              <span>Ready when you are</span>
            </span>
            <h2>Start your first track today</h2>
            <p>
              Create your student account, choose a skill, and get straight into a workspace built
              for practical progress.
            </p>
            <div className="row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
              <a
                className="btn btn-white btn-lg"
                href="/register"
                onClick={(e) => { e.preventDefault(); onNavigate('/register'); }}
              >
                Create student account <Icon name="arrow-right" />
              </a>
              <a
                className="btn btn-glass btn-lg"
                href="/login"
                onClick={(e) => { e.preventDefault(); onNavigate('/login'); }}
              >
                I already have an account
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
