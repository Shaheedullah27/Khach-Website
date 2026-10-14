import React from 'react';
import Icon from './Icon';

export default function Footer({ onNavigate }) {
  const handleNav = (e, path) => {
    e.preventDefault();
    if (path.startsWith('#')) {
      const el = document.getElementById(path.substring(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    onNavigate(path);
  };

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-col brand-col">
          <div className="brand-logo">
            <span className="logo-icon" aria-hidden="true"><Icon name="graduation-cap" /></span>
            <span className="logo-text">Ahmad Saleem Mentorship</span>
          </div>
          <p className="footer-desc">
            Helping students build practical digital skills through focused courses, useful tools,
            and real-world learning.
          </p>
          <div className="footer-badges">
            <span className="badge badge-emerald"><Icon name="shield-check" /><span>Practical learning</span></span>
            <span className="badge badge-accent"><Icon name="award" /><span>Mentor guidance</span></span>
          </div>
        </div>

        <div className="footer-col">
          <span className="footer-kicker">Explore</span>
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links">
            <li><a href="/" onClick={(e) => handleNav(e, '/')}><span>Home</span><Icon name="arrow-right" /></a></li>
            <li><a href="/courses" onClick={(e) => handleNav(e, '/courses')}><span>All courses</span><Icon name="arrow-right" /></a></li>
            <li><a href="/tools" onClick={(e) => handleNav(e, '/tools')}><span>Tools</span><Icon name="arrow-right" /></a></li>
            <li><a href="#howItWorks" onClick={(e) => handleNav(e, '#howItWorks')}><span>How it works</span><Icon name="arrow-right" /></a></li>
            <li><a href="#faq" onClick={(e) => handleNav(e, '#faq')}><span>FAQ</span><Icon name="arrow-right" /></a></li>
          </ul>
        </div>

        <div className="footer-col">
          <span className="footer-kicker">Students</span>
          <h4 className="footer-heading">Get started</h4>
          <ul className="footer-links">
            <li><a href="/register" onClick={(e) => handleNav(e, '/register')}><span>Create account</span><Icon name="arrow-right" /></a></li>
            <li><a href="/login" onClick={(e) => handleNav(e, '/login')}><span>Student login</span><Icon name="arrow-right" /></a></li>
            <li><a href="/student/dashboard" onClick={(e) => handleNav(e, '/student/dashboard')}><span>Learning workspace</span><Icon name="arrow-right" /></a></li>
            <li><a href="/student/profile" onClick={(e) => handleNav(e, '/student/profile')}><span>Profile &amp; certificate</span><Icon name="arrow-right" /></a></li>
          </ul>
        </div>

        <div className="footer-col">
          <span className="footer-kicker">Support</span>
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-links">
            <li><a href="https://wa.me/923327451571" target="_blank" rel="noopener noreferrer"><span>WhatsApp mentor</span><Icon name="external-link" /></a></li>
            <li><a href="/admin/login" onClick={(e) => handleNav(e, '/admin/login')}><span>Admin portal</span><Icon name="arrow-right" /></a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Mentor Ahmad Saleem. All rights reserved.</p>
        <p>Built for practical, project-based learning.</p>
      </div>
    </footer>
  );
}
