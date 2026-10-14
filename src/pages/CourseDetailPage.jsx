import React from 'react';
import Icon from '../components/Icon';

const COURSE_TRACKS = {
  'course-youtube-automation': {
    title: 'YouTube Automation Course',
    skillPill: '2026 in-demand skill',
    icon: 'trending-up',
    lead: 'Create, automate, and grow a YouTube channel with smart systems and practical content strategies.',
    image: '/images/course3.png',
    fallbackText: 'YouTube Track',
    introKicker: 'Course introduction',
    introTitle: 'Create • Automate • Earn',
    introText1: 'This course shows you how to build a YouTube channel around a repeatable content system. Learn how to research opportunities, produce engaging videos, and use automation to keep your channel moving.',
    introText2: 'No face or camera is required. You will learn practical workflows that let you work from anywhere and build toward a channel that can grow with consistent effort.',
    mentorRole: 'YouTube Automation Expert & Digital Creator',
    mentorBio: 'I am Ahmad Saleem, a YouTube Automation Expert and Digital Creator with 5 years of experience in building profitable YouTube channels. I help individuals and businesses automate, grow, and monetize their channels using smart strategies that generate consistent income.',
    tagline: 'Learn. Automate. Earn. Build your YouTube empire.',
    taglineSub: 'No face needed • No camera needed • Work from anywhere',
    taglineCta: 'Start your YouTube automation journey today and build toward a channel that works for you.',
    learnItems: [
      { title: 'Channel Setup', desc: 'Create and set up professional YouTube channels' },
      { title: 'Niche Research', desc: 'Find profitable niches with low competition' },
      { title: 'Video Automation', desc: 'Automate video creation using AI tools and methods' },
      { title: 'Script Writing', desc: 'Write engaging scripts that keep viewers hooked' },
      { title: 'AI Voiceover', desc: 'Generate realistic AI voiceovers in any language' },
      { title: 'Thumbnail Design', desc: 'Design clickable thumbnails that increase CTR' },
      { title: 'Upload & SEO', desc: 'Optimize videos for ranking and reach' },
      { title: 'Monetization Strategies', desc: 'Discover multiple ways to monetize YouTube channels' },
      { title: 'Channel Growth', desc: 'Grow your channel with proven strategies and automation' },
      { title: 'Automate & Scale', desc: 'Build a system that runs automatically and scales' }
    ]
  },
  'course-canva': {
    title: 'Graphic Designing with Canva',
    skillPill: '2026 in-demand skill',
    icon: 'sparkles',
    lead: 'Design, create, and inspire with practical Canva skills for content, branding, and client work.',
    image: '/images/course4.jpeg',
    fallbackText: 'Canva Track',
    introKicker: 'Course introduction',
    introTitle: 'Design • Create • Inspire',
    introText1: 'This course gives you a practical, creative path through Canva, from the first blank canvas to polished designs ready for social media, presentations, branding, and client work.',
    introText2: 'Learn the tools, build real projects, and develop a design workflow that helps your ideas look consistent, professional, and ready to share.',
    mentorRole: 'Graphic Designer & Digital Creator',
    mentorBio: 'I am Ahmad Saleem, a Graphic Designer and Digital Creator with 5 years of experience in visual communication, branding, and Canva workflows. I help learners turn ideas into professional graphics that elevate brands and build design confidence.',
    tagline: 'Design with purpose. Create with confidence.',
    taglineSub: 'Visual assets • Brand kits • Social media workflows',
    taglineCta: 'Join the Canva design track and turn blank pages into polished designs for clients and creators.',
    learnItems: [
      { title: 'Canva Basics to Advanced', desc: 'Learn the Canva interface, tools, features, and shortcuts' },
      { title: 'Social Media Designs', desc: 'Create eye-catching posts for Facebook, Instagram, LinkedIn, and more' },
      { title: 'Posters & Flyers', desc: 'Design professional posters, flyers, brochures, and banners' },
      { title: 'Presentations & Infographics', desc: 'Make attractive presentations and infographics easily' },
      { title: 'Video Creation in Canva', desc: 'Create engaging videos, reels, and animations' },
      { title: 'Brand Kit & Templates', desc: 'Build your brand kit and use templates like a pro' },
      { title: 'Photo Editing', desc: 'Edit photos, remove backgrounds, and apply effects and filters' },
      { title: 'Export & Share Designs', desc: 'Export in high quality and share for any platform' },
      { title: 'Client Workflow', desc: 'Organize projects, manage clients, and deliver like a pro' },
      { title: '& Much More', desc: 'Learn tips, tricks, creative ideas, and real-world projects' }
    ]
  },
  'course-wordpress': {
    title: 'Web Development through WordPress',
    skillPill: '2026 in-demand skill',
    icon: 'layers',
    lead: 'Build, design, and launch a professional online presence with WordPress.',
    image: '/images/course2.png',
    fallbackText: 'WordPress Track',
    introKicker: 'Course introduction',
    introTitle: 'Build • Design • Launch professional websites',
    introText1: 'This course gives you a practical path from WordPress basics to launching a polished, responsive website. Learn the tools, build real projects, and create an online identity you can be proud of.',
    introText2: 'You will work through design, content, performance, security, and SEO so your website is not only attractive, but ready for real visitors and real opportunities.',
    mentorRole: 'WordPress Developer & Digital Skills Mentor',
    mentorBio: 'I am Ahmad Saleem, a WordPress Developer and Instructor with 5 years of experience in creating fast, secure, and modern websites. I teach hands-on web building with Elementor and WordPress so you can publish independently.',
    tagline: 'Build real websites without writing every line of code.',
    taglineSub: 'Themes • Elementor • Hosting • Performance & SEO',
    taglineCta: 'Take control of the web. Launch websites that work for your clients or your own business.',
    learnItems: [
      { title: 'WordPress Basics', desc: 'Understand dashboard, settings, themes, and plugins' },
      { title: 'Theme Customization', desc: 'Customize themes without coding' },
      { title: 'Page Builder (Elementor)', desc: 'Design professional websites using Elementor' },
      { title: 'Responsive Design', desc: 'Make websites mobile-friendly and responsive' },
      { title: 'Landing Pages', desc: 'Create high converting landing pages' },
      { title: 'Plugins & Tools', desc: 'Use essential plugins to extend website features' },
      { title: 'Website Speed Optimization', desc: 'Improve website speed and performance' },
      { title: 'SEO Basics', desc: 'Use on-page SEO settings for better ranking' },
      { title: 'Website Security', desc: 'Secure your website from threats and attacks' },
      { title: 'Website Launch', desc: 'Publish and manage your live website' }
    ]
  },
  'course-artificial-intelligence': {
    title: 'Artificial Intelligence Course',
    skillPill: '2026 in-demand skill · Advance',
    icon: 'zap',
    lead: 'Explore AI tools, automation, image/video generation, and AI productivity.',
    image: '/images/course1.jpeg',
    fallbackText: 'AI Track',
    introKicker: 'Course introduction',
    introTitle: 'Turn AI into a practical creative advantage',
    introText1: "This course gives you a clear, hands-on path through today's most useful AI tools. You will learn how to turn ideas into images, videos, voiceovers, music, websites, and complete digital content systems.",
    introText2: 'Whether you are a beginner, creator, student, or business owner, the focus stays practical: learn the tool, build something real, and use AI to save time while producing better work.',
    mentorRole: 'AI Specialist & Digital Skills Mentor',
    mentorBio: 'I am Ahmad Saleem, an AI Tools Specialist and Digital Instructor. I show students and professionals how to deploy the modern generation of generative AI models into everyday workflows and creative production.',
    tagline: 'Supercharge your capabilities with modern AI systems.',
    taglineSub: 'Prompt engineering • Image/Video generation • Automation',
    taglineCta: 'Master practical AI to complete projects in minutes instead of days.',
    learnItems: [
      { title: 'Prompt Engineering', desc: 'Master AI prompts and get better results' },
      { title: 'Logo Creation', desc: 'Design professional logos using AI' },
      { title: 'Image Generation (Text-to-Image)', desc: 'Create stunning images from text' },
      { title: 'Image-to-Video', desc: 'Convert images into engaging videos' },
      { title: 'Text-to-Video', desc: 'Turn text into professional videos effortlessly' },
      { title: 'Kids Story Videos (Scene-by-Scene)', desc: 'Create educational and entertaining story videos for kids' },
      { title: 'Meme Generation', desc: 'Make viral memes quickly using AI' },
      { title: 'AI Influencer Creation', desc: 'Build realistic AI influencers from scratch' },
      { title: 'AI Vlogs', desc: 'Create, edit, and publish AI-powered vlogs' },
      { title: 'Text-to-Speech (AI Voiceovers)', desc: 'Generate natural voiceovers using AI voices' },
      { title: 'Voice Cloning', desc: 'Clone voices with AI for various uses' },
      { title: 'Background Music Generation', desc: 'Create royalty-free background music with AI' }
    ]
  }
};

export default function CourseDetailPage({ slug, onNavigate }) {
  // Normalize slug
  let key = slug;
  if (!COURSE_TRACKS[key]) {
    // Map alternate names
    if (key.includes('youtube')) key = 'course-youtube-automation';
    else if (key.includes('canva')) key = 'course-canva';
    else if (key.includes('word')) key = 'course-wordpress';
    else if (key.includes('ai') || key.includes('artificial')) key = 'course-artificial-intelligence';
    else key = 'course-youtube-automation';
  }

  const course = COURSE_TRACKS[key];

  return (
    <div className="course-detail-page">
      {/* COURSE HERO */}
      <div className="course-hero">
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-bg__mesh"></span>
          <span className="hero-bg__grid"></span>
          <span className="hero-bg__glow hero-bg__glow--a"></span>
          <span className="hero-bg__glow hero-bg__glow--b"></span>
        </div>

        <div className="main-container">
          <div className="row mb-3 course-nav-actions">
            <button
              className="btn course-back-btn"
              type="button"
              onClick={() => onNavigate('/courses')}
            >
              <Icon name="arrow-left" /> Back to all courses
            </button>
            <button
              className="btn course-live-btn"
              type="button"
              onClick={() => onNavigate(`/practical-classes?course=${encodeURIComponent(course.title)}`)}
            >
              <Icon name="play-circle" /> Live classes
            </button>
          </div>

          <div className="course-hero__grid">
            <div>
              <span className="pill-badge pill-glass">
                <Icon name={course.icon} />
                <span>{course.skillPill}</span>
              </span>
              <h1 className="mt-2">{course.title}</h1>
              <p className="lead mt-2 course-hero-lead" style={{ maxWidth: '52ch' }}>
                {course.lead}
              </p>

              <div className="row mt-3">
                <span className="badge badge-accent">
                  <Icon name="clock" /> 2 months
                </span>
                <span className="badge badge-primary">
                  <Icon name="bar-chart" /> Advanced
                </span>
                <span className="badge badge-emerald">
                  <Icon name="star" /> 5 years experience
                </span>
              </div>

              <div className="row mt-4">
                <a
                  className="btn btn-primary btn-lg"
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/register');
                  }}
                >
                  Enroll in this track <Icon name="arrow-right" />
                </a>
                <a
                  className="btn btn-glass btn-lg"
                  href="https://wa.me/923327451571"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="phone" /> Ask a question
                </a>
              </div>
            </div>

            <div className="course-hero__media">
              <img
                src={course.image}
                alt={`${course.title} course track`}
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.parentElement) {
                    e.target.parentElement.innerHTML = `<div style="display:grid;place-items:center;height:100%;font-weight:800;letter-spacing:.1em;text-transform:uppercase;color:#93a9fb;">${course.fallbackText}</div>`;
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* COURSE BODY */}
      <div className="course-content">
        <div className="main-container">
          <div className="course-layout">
            <div className="stack-md" style={{ gap: '1.25rem' }}>
              <section className="panel" id="introduction">
                <span className="section-kicker">{course.introKicker}</span>
                <h2 className="mt-1">{course.introTitle}</h2>
                <p className="muted mt-2">{course.introText1}</p>
                <p className="muted mt-2">{course.introText2}</p>
              </section>

              <section className="panel" id="curriculum">
                <h2>What you will learn</h2>
                <ul className="learn-list mt-3">
                  {course.learnItems.map((item, i) => (
                    <li key={i}>
                      <strong>{item.title}</strong>
                      {item.desc}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="panel mentor-panel">
                <div>
                  <span className="mentor-label">Meet your mentor</span>
                  <h2 className="mentor-name">Ahmad Saleem</h2>
                  <p className="mentor-role">{course.mentorRole}</p>
                </div>
                <p className="muted">{course.mentorBio}</p>
              </section>

              <section className="panel" id="included">
                <h2>What you will get</h2>
                <ul className="get-list mt-3">
                  <li><Icon name="check-circle-2" /> Practical Training</li>
                  <li><Icon name="award" /> E-Certificate After Completion</li>
                  <li><Icon name="shield-check" /> Lifetime Support</li>
                  <li><Icon name="target" /> Industry Relevant Skills</li>
                  <li><Icon name="layers" /> Lifetime Access to Resources</li>
                </ul>
              </section>

              <section className="middle-banner">
                <h2 className="course-tagline">{course.tagline}</h2>
                <p>{course.taglineSub}</p>
                <p>{course.taglineCta}</p>
              </section>
            </div>

            {/* STICKY ASIDE */}
            <aside className="course-aside-sticky">
              <div className="card mb-3">
                <h3 className="mb-2">Track facts</h3>
                <div className="stack-sm" style={{ gap: '0.75rem' }}>
                  <div className="row-between small">
                    <span className="muted">Duration</span>
                    <span className="strong">2 Months</span>
                  </div>
                  <div className="row-between small">
                    <span className="muted">Level</span>
                    <span className="strong">Advanced</span>
                  </div>
                  <div className="row-between small">
                    <span className="muted">Format</span>
                    <span className="strong">Practical + tasks</span>
                  </div>
                  <div className="row-between small">
                    <span className="muted">Review</span>
                    <span className="strong">Mentor feedback</span>
                  </div>
                  <div className="row-between small">
                    <span className="muted">Certificate</span>
                    <span className="strong">On completion</span>
                  </div>
                </div>
                <a
                  className="btn btn-primary btn-block mt-3"
                  href="/register"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/register');
                  }}
                >
                  Enroll in this track
                </a>
                <button
                  className="btn btn-secondary btn-block mt-2"
                  type="button"
                  onClick={() => onNavigate(`/practical-classes?course=${encodeURIComponent(course.title)}`)}
                >
                  <Icon name="play-circle" /> Open video playlist
                </button>
              </div>

              <div className="card mb-3">
                <h3 className="mb-2">On this page</h3>
                <ul className="course-toc">
                  <li>
                    <a href="#introduction">
                      <Icon name="chevron-right" /> Course introduction
                    </a>
                  </li>
                  <li>
                    <a href="#curriculum">
                      <Icon name="chevron-right" /> What you will learn
                    </a>
                  </li>
                  <li>
                    <a href="#included">
                      <Icon name="chevron-right" /> What you will get
                    </a>
                  </li>
                </ul>
              </div>

              <div className="card">
                <span className="section-kicker">Support</span>
                <h3 className="mt-1">Talk to your mentor</h3>
                <p className="muted small mt-1">Questions about the track, tools or time commitment?</p>
                <a
                  className="btn btn-outline btn-block mt-2"
                  href="https://wa.me/923327451571"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="phone" /> WhatsApp
                </a>
              </div>
            </aside>
          </div>

          <div className="bottom-banner" aria-label="Course benefits">
            <span>Beginner Friendly</span>
            <span>Flexible Learning</span>
            <span>Automation Focused</span>
            <span>Practical Approach</span>
            <span>Supportive Community</span>
          </div>
        </div>
      </div>
    </div>
  );
}
