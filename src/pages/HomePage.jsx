import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useCourses } from '../context/CourseContext';

export default function HomePage({ onNavigate }) {
  const { courses, faqs } = useCourses();
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(prev => (prev === index ? null : index));
  };

  return (
    <div className="home-view-container">
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
                      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.3ZM12.2 21.6h-.1a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.8 1 1-3.7-.2-.4a9.7 9.7 0 0 1-1.5-5.2C2.2 6.4 6.7 2 12.1 2c2.6 0 5.1 1 6.9 2.9a9.7 9.7 0 0 1 2.9 6.9c0 5.4-4.4 9.8-9.7 9.8Zm5.4-7.3c-.3-.1-1.7-.8-1.9-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.5.8-1.6.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.8 4.3 1.8.8 2.4.9 3.3.8.5-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3-.1-.2-.3-.3-.6-.4Z"/>
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

      {/* MARQUEE */}
      <div className="home-marquee" aria-label="Skills covered in the mentorship">
        <div className="home-marquee__track">
          <span className="home-marquee__tag home-marquee__tag--blue"><Icon name="play-circle" />YouTube Automation</span>
          <span className="home-marquee__tag home-marquee__tag--green"><Icon name="image" />Canva Design</span>
          <span className="home-marquee__tag home-marquee__tag--red"><Icon name="layers" />WordPress</span>
          <span className="home-marquee__tag home-marquee__tag--amber"><Icon name="sparkles" />Artificial Intelligence</span>
          <span className="home-marquee__tag home-marquee__tag--blue"><Icon name="play-circle" />YouTube Automation</span>
          <span className="home-marquee__tag home-marquee__tag--green"><Icon name="image" />Canva Design</span>
          <span className="home-marquee__tag home-marquee__tag--red"><Icon name="layers" />WordPress</span>
          <span className="home-marquee__tag home-marquee__tag--amber"><Icon name="sparkles" />Artificial Intelligence</span>
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
            <button className="btn btn-outline" type="button" onClick={() => onNavigate('/courses')}>
              Browse tracks <Icon name="arrow-right" />
            </button>
          </div>

          <div className="grid-4 mt-4">
            <div className="card outcome-card">
              <span className="outcome-step">01</span>
              <h3 className="outcome-title">Automated YouTube Channels</h3>
              <p className="outcome-desc">
                From niche validation to automated production pipelines, learn to launch content that attracts audiences.
              </p>
              <span className="badge badge-subtle mt-2">Channel Playbook</span>
            </div>

            <div className="card outcome-card">
              <span className="outcome-step">02</span>
              <h3 className="outcome-title">Client-Ready Graphic Kits</h3>
              <p className="outcome-desc">
                Design complete brand packages, social templates, and advertising assets using high-efficiency Canva workflows.
              </p>
              <span className="badge badge-subtle mt-2">Visual Portfolio</span>
            </div>

            <div className="card outcome-card">
              <span className="outcome-step">03</span>
              <h3 className="outcome-title">Custom WordPress Sites</h3>
              <p className="outcome-desc">
                Build professional business pages, blogs, and portfolio portals without getting trapped in boilerplate code.
              </p>
              <span className="badge badge-subtle mt-2">Live Web Asset</span>
            </div>

            <div className="card outcome-card">
              <span className="outcome-step">04</span>
              <h3 className="outcome-title">AI Content Pipelines</h3>
              <p className="outcome-desc">
                Leverage generative image, voice, and text tools to speed up creative production across all your workflows.
              </p>
              <span className="badge badge-subtle mt-2">Productivity System</span>
            </div>
          </div>
        </div>

        {/* ============================================================
             3. COURSES CATALOGUE
             ============================================================ */}
        <div className="section-block" id="courses">
          <div className="section-header">
            <div>
              <span className="section-kicker">Curriculum</span>
              <h2 className="section-title mt-1">Featured Mentorship Tracks</h2>
              <p className="section-subtitle">
                Choose a structured track with step-by-step video guidance and mentor-reviewed assignments.
              </p>
            </div>
          </div>

          <div className="courses-grid mt-4">
            {courses.map(course => (
              <div key={course.id} className="card course-card">
                <div className="course-card-media">
                  <img
                    src={course.thumb || course.image}
                    alt={course.title}
                    loading="lazy"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/thumb-ai.jpeg';
                    }}
                  />
                  <span className="course-badge">{course.badge}</span>
                </div>
                <div className="course-card-content">
                  <div className="course-meta-pills">
                    <span className="pill-sm"><Icon name="clock" /> {course.duration}</span>
                    <span className="pill-sm"><Icon name="award" /> {course.level}</span>
                  </div>
                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-desc">{course.description}</p>

                  <div className="course-topics">
                    {(course.topics || []).map((topic, i) => (
                      <span key={i} className="topic-tag"><Icon name="check" /> {topic}</span>
                    ))}
                  </div>

                  <div className="course-card-actions">
                    <button
                      className="btn btn-primary"
                      type="button"
                      onClick={() => onNavigate(`/course/${course.slug}`)}
                    >
                      Track Details
                    </button>
                    <button
                      className="btn btn-outline"
                      type="button"
                      onClick={() => onNavigate(`/practical-classes?course=${encodeURIComponent(course.title)}`)}
                    >
                      Practical classes
                    </button>
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => onNavigate('/register')}
                    >
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ============================================================
             4. WHY THIS PLATFORM
             ============================================================ */}
        <div className="section-block" id="whyUs">
          <div className="section-header">
            <div>
              <span className="section-kicker">Experience</span>
              <h2 className="section-title mt-1">Designed for real learning</h2>
              <p className="section-subtitle">
                Everything here is organized around guided execution rather than passive video watching.
              </p>
            </div>
          </div>

          <div className="features-grid mt-4">
            <div className="card feature-card">
              <div className="feature-icon-wrapper feature-icon--blue">
                <Icon name="book-open" />
              </div>
              <h3 className="feature-title">Structured Curriculum</h3>
              <p className="feature-desc">Clear progression from fundamental tools through to complete project deliverables.</p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon-wrapper feature-icon--purple">
                <Icon name="play-circle" />
              </div>
              <h3 className="feature-title">Guided Lecture Videos</h3>
              <p className="feature-desc">Watch concise, focused walkthroughs covering each tool and exercise in full detail.</p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon-wrapper feature-icon--green">
                <Icon name="award" />
              </div>
              <h3 className="feature-title">Mentor Review</h3>
              <p className="feature-desc">Submit assignments to your mentor workspace and receive actionable constructive feedback.</p>
            </div>

            <div className="card feature-card">
              <div className="feature-icon-wrapper feature-icon--amber">
                <Icon name="shield-check" />
              </div>
              <h3 className="feature-title">Verified Certificate</h3>
              <p className="feature-desc">Earn an official e-certificate recognizing your practical course completion.</p>
            </div>
          </div>
        </div>

        {/* ============================================================
             5. TOOLS PREVIEW SECTION
             ============================================================ */}
        <div className="section-block" id="toolsPreview">
          <div className="section-header">
            <div>
              <span className="section-kicker">Utility Suite</span>
              <h2 className="section-title mt-1">Free Creator &amp; Document Tools</h2>
              <p className="section-subtitle">
                A built-in suite of PDF, image, and conversion utilities available right in your browser.
              </p>
            </div>
            <button className="btn btn-primary" type="button" onClick={() => onNavigate('/tools')}>
              Explore all tools <Icon name="arrow-right" />
            </button>
          </div>

          <div className="tools-preview-grid mt-4">
            <div className="card tool-preview-card" onClick={() => onNavigate('/tools/calculator')}>
              <span className="tool-emoji">🧮</span>
              <h4>Calculator</h4>
              <p>Basic and advanced mathematics calculator</p>
            </div>
            <div className="card tool-preview-card" onClick={() => onNavigate('/tools/merge-pdf')}>
              <span className="tool-emoji">📑</span>
              <h4>Merge PDF</h4>
              <p>Combine multiple documents into one PDF</p>
            </div>
            <div className="card tool-preview-card" onClick={() => onNavigate('/tools/compress-image')}>
              <span className="tool-emoji">🖼️</span>
              <h4>Compress Image</h4>
              <p>Reduce image sizes while preserving quality</p>
            </div>
            <div className="card tool-preview-card" onClick={() => onNavigate('/tools/remove-background')}>
              <span className="tool-emoji">🎭</span>
              <h4>Remove Background</h4>
              <p>Automatic background removal with edge refinement</p>
            </div>
          </div>
        </div>

        {/* ============================================================
             6. FAQ SECTION
             ============================================================ */}
        <div className="section-block" id="faq">
          <div className="section-header">
            <div>
              <span className="section-kicker">Help Center</span>
              <h2 className="section-title mt-1">Frequently Asked Questions</h2>
              <p className="section-subtitle">
                Answers to common questions about courses, certifications, and mentorship.
              </p>
            </div>
          </div>

          <div className="faq-list mt-4">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className={`faq-item card ${isOpen ? 'open' : ''}`}>
                  <button
                    className="faq-trigger"
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                  >
                    <span className="faq-question">{faq.q}</span>
                    <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} />
                  </button>
                  {isOpen && (
                    <div className="faq-content">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ============================================================
             7. BOTTOM CTA
             ============================================================ */}
        <div className="cta-banner mt-5 mb-5 card">
          <div className="cta-content">
            <h2>Ready to develop real practical skills?</h2>
            <p>
              Join the cohort, receive hands-on instruction from Ahmad Saleem, and build client-ready deliverables.
            </p>
            <div className="cta-buttons mt-3">
              <button className="btn btn-primary btn-lg" type="button" onClick={() => onNavigate('/register')}>
                Create student account <Icon name="arrow-right" />
              </button>
              <a
                className="btn btn-outline btn-lg"
                href="https://wa.me/923327451571"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon name="phone" /> WhatsApp Mentor
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
