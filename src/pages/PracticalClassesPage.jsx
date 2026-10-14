import React, { useEffect } from 'react';
import Icon from '../components/Icon';

const PLAYLIST_LINKS = {
  canva: 'https://youtube.com/playlist?list=PLEUsuq8UIsYA&si=Qs0RNbVoQD7Kdng4',
  graphicdesigning: 'https://youtube.com/playlist?list=PLEUsuq8UIsYA&si=Qs0RNbVoQD7Kdng4',
  graphicdesigningthroughcanva: 'https://youtube.com/playlist?list=PLEUsuq8UIsYA&si=Qs0RNbVoQD7Kdng4',
  graphicsdesigning: 'https://youtube.com/playlist?list=PLEUsuq8UIsYA&si=Qs0RNbVoQD7Kdng4',
  ai: 'https://youtube.com/playlist?list=PLQTO9V3Zldy4&si=y9dn_XdUIkElVZkj',
  artificialintelligence: 'https://youtube.com/playlist?list=PLQTO9V3Zldy4&si=y9dn_XdUIkElVZkj',
  advancedartificialintelligence: 'https://youtube.com/playlist?list=PLQTO9V3Zldy4&si=y9dn_XdUIkElVZkj',
  wordpress: 'https://youtube.com/playlist?list=PLc0Bqc25RKTg&si=RezB3e_Dcfm7jOqA',
  webdevelopment: 'https://youtube.com/playlist?list=PLc0Bqc25RKTg&si=RezB3e_Dcfm7jOqA',
  webdevelopmentthroughwordpress: 'https://youtube.com/playlist?list=PLc0Bqc25RKTg&si=RezB3e_Dcfm7jOqA',
  youtubeautomation: 'https://youtube.com/playlist?list=PLfwp9CvuUprE&si=PQzJ7KfoQkhiD6xm'
};

const PLAYLIST_THUMBNAILS = {
  canva: '/images/thumb-graphics.jpeg',
  graphicdesigning: '/images/thumb-graphics.jpeg',
  graphicdesigningthroughcanva: '/images/thumb-graphics.jpeg',
  graphicsdesigning: '/images/thumb-graphics.jpeg',
  ai: '/images/thumb-ai.jpeg',
  artificialintelligence: '/images/thumb-ai.jpeg',
  advancedartificialintelligence: '/images/thumb-ai.jpeg',
  wordpress: '/images/thumb-webdev.jpeg',
  webdevelopment: '/images/thumb-webdev.jpeg',
  webdevelopmentthroughwordpress: '/images/thumb-webdev.jpeg',
  youtubeautomation: '/images/thumb-yt.jpeg'
};

export default function PracticalClassesPage({ onNavigate, searchParams }) {
  const courseParam = searchParams ? searchParams.get('course') : null;
  const label = courseParam || 'YouTube Automation';
  const courseKey = label.toLowerCase().replace(/[^a-z]/g, '');

  const themeClass = label.toLowerCase().includes('youtube')
    ? 'theme-youtube'
    : label.toLowerCase().includes('artificial') || label.toLowerCase().includes('ai')
    ? 'theme-ai'
    : label.toLowerCase().includes('canva') || label.toLowerCase().includes('graphic')
    ? 'theme-canva'
    : 'theme-wordpress';

  useEffect(() => {
    document.body.classList.add(themeClass);
    return () => {
      document.body.classList.remove('theme-youtube', 'theme-ai', 'theme-canva', 'theme-wordpress');
    };
  }, [themeClass]);

  const playlistLink = PLAYLIST_LINKS[courseKey] || PLAYLIST_LINKS.youtubeautomation;
  const playlistThumbnail = PLAYLIST_THUMBNAILS[courseKey] || PLAYLIST_THUMBNAILS.youtubeautomation;

  return (
    <div id="classesMain">
      <div className="page-hero">
        <div className="hero-bg" aria-hidden="true">
          <span className="hero-bg__grid"></span>
          <span className="hero-bg__glow hero-bg__glow--b"></span>
        </div>

        <div className="main-container">
          <button
            type="button"
            className="btn btn-glass btn-sm mb-3"
            onClick={() => onNavigate('/courses')}
          >
            <Icon name="arrow-left" /> Back to course
          </button>

          <span className="pill-badge pill-glass">
            <Icon name="play-circle" />
            <span>Practical live classes</span>
          </span>
          <h1 className="display-2 mt-2" id="pageTitle">
            {label} practical live classes.
          </h1>
          <p className="lead mt-2" style={{ color: '#b3c1dc', maxWidth: '62ch' }}>
            Watch the selected course videos, follow along with each lesson, and practice the workflow
            shown by your mentor.
          </p>
        </div>
      </div>

      <div className="main-container">
        <div className="card" style={{ marginTop: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          <div className="playlist-heading">
            <span className="tv-logo" aria-hidden="true">
              <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: 'currentColor' }}>
                <rect x="3" y="5" width="18" height="14" rx="2"></rect>
                <path d="m8 2 4 3 4-3"></path>
                <path d="m10 10 4 2-4 2z"></path>
              </svg>
            </span>
            <div>
              <h2 id="playlistTitle">{label} video playlist</h2>
              <p className="muted small">Open the official playlist for this course.</p>
            </div>
          </div>

          <div className="playlist-form mt-3">
            <img
              className="playlist-thumbnail"
              id="playlistThumbnail"
              src={playlistThumbnail}
              alt={`${label} playlist thumbnail`}
              loading="lazy"
              decoding="async"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
            <a
              className="playlist-button"
              id="playlistButton"
              href={playlistLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon name="external-link" /> Open video playlist
            </a>
          </div>
        </div>

        <div className="section-block">
          <div className="section-header text-center">
            <div>
              <span className="section-kicker">How to use this page</span>
              <h2 className="section-title mt-1">Get more out of every lesson</h2>
            </div>
          </div>

          <div className="grid-3">
            <div className="card card-hover">
              <span className="feature-icon"><Icon name="target" /></span>
              <h3>Follow the list in order</h3>
              <p className="muted small mt-1">
                The playlist is arranged so each lesson builds on the workflow covered in the previous one.
              </p>
            </div>
            <div className="card card-hover">
              <span className="feature-icon"><Icon name="rocket" /></span>
              <h3>Practise while you watch</h3>
              <p className="muted small mt-1">
                Keep your tool open next to the video and repeat each step yourself instead of only watching.
              </p>
            </div>
            <div className="card card-hover">
              <span className="feature-icon"><Icon name="send" /></span>
              <h3>Submit your practice work</h3>
              <p className="muted small mt-1">
                Send the result back from your student workspace so your mentor can review it.
              </p>
            </div>
          </div>

          <div className="row mt-4" style={{ justifyContent: 'center' }}>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => onNavigate('/student/dashboard')}
            >
              <Icon name="layout-dashboard" /> Open your workspace
            </button>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => onNavigate('/register')}
            >
              Create student account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
