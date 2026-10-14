import React from 'react';
import Icon from '../components/Icon';

const COURSES_DATA = [
  {
    id: 'c1',
    slug: 'course-youtube-automation',
    title: 'YouTube Automation',
    description: 'Master YouTube channel growth, automation tools, and content strategy.',
    badge: 'Advanced',
    duration: '2 Months',
    level: 'Advanced',
    image: '/images/yt.png',
    topics: ['Niche research', 'Channel automation', 'YouTube SEO']
  },
  {
    id: 'c2',
    slug: 'course-canva',
    title: 'Graphic Designing through Canva',
    description: 'Create stunning graphics with Canva for social media, branding and more.',
    badge: 'Advanced',
    duration: '2 Months',
    level: 'Advanced',
    image: '/images/canva.png',
    topics: ['Design fundamentals', 'Brand kits', 'Social graphics']
  },
  {
    id: 'c3',
    slug: 'course-wordpress',
    title: 'Web Development through WordPress',
    description: 'Build professional websites without coding using WordPress.',
    badge: 'Advanced',
    duration: '2 Months',
    level: 'Advanced',
    image: '/images/wp.png',
    topics: ['Themes & plugins', 'Elementor builds', 'SEO basics']
  },
  {
    id: 'c4',
    slug: 'course-artificial-intelligence',
    title: 'Advanced Artificial Intelligence',
    description: 'Explore AI tools, automation, image/video generation, AI productivity.',
    badge: 'Advanced',
    duration: '2 Months',
    level: 'Advanced',
    image: '/images/Ai.png',
    topics: ['Prompt engineering', 'Image & video AI', 'AI automation']
  }
];

export default function CoursesPage({ onNavigate }) {
  return (
    <section id="viewCourses" className="view-section active">
      <div className="main-container">
        <div className="page-heading">
          <span className="pill-badge">
            <Icon name="book-open" />
            <span>Curriculum</span>
          </span>
          <h1 className="page-title">Course tracks</h1>
          <p className="page-subtitle">
            Explore each track and the practical skills covered across the programme. Every track
            runs for two months and is built around real deliverables.
          </p>
        </div>

        <div className="course-grid" id="allCoursesGrid">
          {COURSES_DATA.map((course) => (
            <a
              key={course.id}
              className="course-card"
              href={`/course/${course.slug}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(`/course/${course.slug}`);
              }}
              aria-label={`Open the ${course.title} course page`}
            >
              <div className="course-image-slot">
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.title}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.parentElement) {
                        e.target.parentElement.innerHTML = `<span>${course.title}</span>`;
                      }
                    }}
                  />
                ) : (
                  <span>{course.title}</span>
                )}
              </div>
              <div className="course-badge-row">
                <span className="badge badge-primary">{course.duration}</span>
                <span className="badge badge-accent">{course.badge}</span>
              </div>
              <h3 className="course-title">{course.title}</h3>
              <p className="course-desc">{course.description}</p>
              {Array.isArray(course.topics) && (
                <div className="course-topics">
                  {course.topics.map((topic, i) => (
                    <span key={i} className="topic-chip">{topic}</span>
                  ))}
                </div>
              )}
              <div className="course-footer">
                <span className="badge badge-neutral">{course.level}</span>
                <span className="course-card-cta">
                  View course <Icon name="arrow-right" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="middle-banner mt-4">
          <h2>Not sure which track fits?</h2>
          <p>Message your mentor on WhatsApp and describe your goal — you will get a straight answer.</p>
          <div className="row" style={{ justifyContent: 'center', marginTop: '1.5rem' }}>
            <a
              className="btn btn-white"
              href="https://wa.me/923327451571"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="phone" /> Ask on WhatsApp
            </a>
            <a
              className="btn btn-glass"
              href="/register"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/register');
              }}
            >
              Create account
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
