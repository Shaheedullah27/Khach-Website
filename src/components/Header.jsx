import React, { useState, useEffect, useRef } from 'react';
import Icon from './Icon';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export const TOOLS_CONFIG = [
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Perform basic and advanced mathematical calculations.',
    icon: '🧮',
    route: '/tools/calculator'
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDF files into one document.',
    icon: '<svg class="pdf-merge-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5.5 9.5A3.5 3.5 0 0 1 9 6h12l6 6v4" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M21 6v7h6" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M9 14.5h9M9 19h8M9 23.5h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M23 23h9.5M28 18l5 5-5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M26 30v2.5a2 2 0 0 1-2 2H9a3.5 3.5 0 0 1-3.5-3.5V13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M29 27.5h4.5A2.5 2.5 0 0 1 36 30v4H24v-4a2.5 2.5 0 0 1 2.5-2.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M27 31.5h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    route: '/tools/merge-pdf'
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract specific pages or page ranges from a PDF.',
    icon: '<svg class="pdf-split-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 5.5h14l6 6v8" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M22 6v7h6M11 18h9M11 22h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M25 22v-3m0 3-3-3m3 3 3-3M25 22v4m0 0-3 3m3-3 3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 13v17a3 3 0 0 0 3 3h7m7-8h1.5a3 3 0 0 1 3 3v2.5h-9V31a3 3 0 0 1 3-3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    route: '/tools/split-pdf'
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce PDF file size while choosing your preferred compression level.',
    icon: '<svg class="pdf-compress-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 5.5h14l6 6v8" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M22 6v7h6M11 18h9M11 22h7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M25 22v-5m0 0-3 3m3-3 3 3M25 22v5m0 0-3-3m3 3 3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M10 13v17a3 3 0 0 0 3 3h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    route: '/tools/compress-pdf'
  },
  {
    id: 'compress-image',
    name: 'Compress Image',
    description: 'Reduce image file size while preserving its format and dimensions.',
    icon: '<svg class="image-compress-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="5.5" y="7.5" width="29" height="25" rx="4" stroke="currentColor" stroke-width="2"/><circle cx="14" cy="16" r="2.5" stroke="currentColor" stroke-width="2"/><path d="m8 29 8-8 5 5 4-4 7 7M28 12v7m0 0-3-3m3 3 3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    route: '/tools/compress-image'
  },
  {
    id: 'upscale-image',
    name: 'Upscale Image',
    description: 'Automatically enhance and upscale images with AI, then compare before and after.',
    icon: '<svg class="image-upscale-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="5.5" y="7.5" width="29" height="25" rx="4" stroke="currentColor" stroke-width="2"/><circle cx="14" cy="16" r="2.5" stroke="currentColor" stroke-width="2"/><path d="m8 29 8-8 5 5 5-7 6 10M27 12h6m0 0v6m0-6-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    route: '/tools/upscale-image'
  },
  {
    id: 'remove-background',
    name: 'Remove Background',
    description: 'Automatically remove image backgrounds and refine transparent edges.',
    icon: '<svg class="image-background-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><rect x="5.5" y="5.5" width="29" height="29" rx="5" stroke="currentColor" stroke-width="2"/><path d="M9 9h6v6H9zm8 0h6v6h-6zm8 0h6v6h-6zM9 17h6v6H9zm16 0h6v6h-6zM9 25h6v6H9zm8 0h6v6h-6zm8 0h6v6h-6z" fill="currentColor" opacity=".18"/><circle cx="20" cy="19" r="5" fill="var(--surface)" stroke="currentColor" stroke-width="2"/><path d="m16.5 22.5-3 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    route: '/tools/remove-background'
  },
  {
    id: 'additive-pdf',
    name: 'Additive PDF',
    description: 'Add text, images, drawings, and shapes to your PDF documents.',
    icon: '<svg class="additive-pdf-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M8 6.5h14l6 6v8M22 7v7h6M11 18h7M11 22h5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="m20 29 8.9-8.9a2.5 2.5 0 0 1 3.5 3.5L23.5 33.5l-5 1.5 1.5-5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M10 13v18a3 3 0 0 0 3 3h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
    route: '/tools/additive-pdf'
  },
  {
    id: 'lock-unlock-pdf',
    name: 'Lock & Unlock PDF',
    description: 'Protect PDF files with password or unlock protected documents.',
    icon: '🔐',
    route: '/tools/lock-unlock-pdf'
  },
  {
    id: 'converter-suite',
    name: 'Converter Suite',
    description: 'Convert documents and images between multiple formats in one place.',
    icon: '<svg class="converter-suite-icon" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M7 12.5h17M19.5 8l4.5 4.5-4.5 4.5M33 27.5H16M20.5 23 16 27.5l4.5 4.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="5.5" y="5.5" width="29" height="29" rx="6" stroke="currentColor" stroke-width="2"/></svg>',
    route: '/tools/converter-suite?mode=all'
  }
];

export default function Header({ currentPath, onNavigate }) {
  const { theme, toggleTheme } = useTheme();
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setToolsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNav = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    setMobileToolsOpen(false);
    onNavigate(path);
  };

  const isCoursesActive = currentPath === '/courses' || currentPath.startsWith('/course/');
  const isHomeActive = currentPath === '/' || currentPath === '/home';
  const isToolsActive = currentPath.startsWith('/tools');
  const isDevActive = currentPath === '/meet-developer';

  return (
    <header className="site-header" id="siteHeader">
      <div className="nav-container">
        <a
          className="brand-logo"
          href="/"
          onClick={(e) => handleNav(e, '/')}
          aria-label="Ahmad Saleem Mentorship — home"
        >
          <span className="logo-icon" aria-hidden="true">
            <Icon name="graduation-cap" />
          </span>
          <span className="logo-text">Ahmad Saleem</span>
        </a>

        <nav className="desktop-nav" id="desktopNav" aria-label="Primary">
          <button
            className={`nav-link ${isHomeActive ? 'active' : ''}`}
            type="button"
            onClick={(e) => handleNav(e, '/')}
            id="navHomeBtn"
          >
            Home
          </button>
          <button
            className={`nav-link ${isCoursesActive ? 'active' : ''}`}
            type="button"
            onClick={(e) => handleNav(e, '/courses')}
            id="navCoursesBtn"
          >
            Courses
          </button>
          <div
            className="tools-nav-item"
            ref={dropdownRef}
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <a
              className={`nav-link ${isToolsActive ? 'active' : ''}`}
              href="/tools"
              onClick={(e) => handleNav(e, '/tools')}
              aria-haspopup="true"
              aria-expanded={toolsDropdownOpen}
            >
              Tools
            </a>
            <div
              className="tools-dropdown"
              id="toolsDropdown"
              style={{ display: toolsDropdownOpen ? 'block' : 'none' }}
            >
              <p className="tools-dropdown-heading">Quick access</p>
              <div className="tools-dropdown-grid">
                {TOOLS_CONFIG.map((tool) => (
                  <a
                    key={tool.id}
                    className="tools-dropdown-link"
                    href={tool.route}
                    onClick={(e) => handleNav(e, tool.route)}
                  >
                    <span
                      className="tool-link-icon"
                      aria-hidden="true"
                      dangerouslySetInnerHTML={{ __html: tool.icon }}
                    />
                    <span className="tool-link-copy">
                      <strong>{tool.name}</strong>
                      <small>{tool.description}</small>
                    </span>
                    <span className="tool-link-arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <a
            className={`nav-link ${isDevActive ? 'active' : ''}`}
            href="/meet-developer"
            onClick={(e) => handleNav(e, '/meet-developer')}
          >
            Developer Team
          </a>
        </nav>

        <div className="nav-actions">
          <div className="desktop-auth-links">
            {user ? (
              user.role === 'admin' ? (
                <a
                  className="btn btn-ghost"
                  href="/admin/dashboard"
                  onClick={(e) => handleNav(e, '/admin/dashboard')}
                >
                  Admin Portal
                </a>
              ) : (
                <a
                  className="btn btn-secondary"
                  href="/student/dashboard"
                  onClick={(e) => handleNav(e, '/student/dashboard')}
                >
                  Workspace
                </a>
              )
            ) : (
              <>
                <a
                  className="btn btn-ghost"
                  href="/admin/login"
                  onClick={(e) => handleNav(e, '/admin/login')}
                >
                  Admin
                </a>
                <a
                  className="btn btn-secondary"
                  href="/login"
                  onClick={(e) => handleNav(e, '/login')}
                >
                  Student Login
                </a>
                <a
                  className="btn btn-primary"
                  href="/register"
                  onClick={(e) => handleNav(e, '/register')}
                >
                  Get Started
                  <Icon name="arrow-right" />
                </a>
              </>
            )}
          </div>

          <button
            className="theme-toggle-btn"
            id="themeToggleBtn"
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle colour theme"
            title={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            <span id="themeIcon" aria-hidden="true">
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </span>
            <span className="theme-label" id="themeLabel">
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </span>
          </button>

          <button
            className="mobile-menu-btn"
            id="mobileMenuBtn"
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            aria-controls="mobileDrawer"
            aria-expanded={mobileMenuOpen}
            aria-label="Open navigation menu"
          >
            <Icon name="menu" />
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} id="mobileDrawer">
        <div className="mobile-drawer-inner">
          <button
            className="mobile-nav-item"
            type="button"
            onClick={(e) => handleNav(e, '/')}
          >
            <Icon name="graduation-cap" /> Home
          </button>
          <button
            className="mobile-nav-item"
            type="button"
            onClick={(e) => handleNav(e, '/courses')}
          >
            <Icon name="book-open" /> Courses
          </button>
          <div className="mobile-tools-nav">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <a
                className="mobile-nav-item"
                href="/tools"
                onClick={(e) => handleNav(e, '/tools')}
                style={{ flex: 1 }}
              >
                🧰 Tools
              </a>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setMobileToolsOpen(prev => !prev)}
                aria-label="Toggle tools menu"
                style={{ padding: '0.4rem 0.8rem' }}
              >
                <Icon name={mobileToolsOpen ? 'chevron-down' : 'chevron-right'} />
              </button>
            </div>
            {mobileToolsOpen && (
              <div className="mobile-tools-list" style={{ paddingLeft: '1rem', marginTop: '0.5rem' }}>
                {TOOLS_CONFIG.map(t => (
                  <a
                    key={t.id}
                    className="mobile-nav-item"
                    href={t.route}
                    onClick={(e) => handleNav(e, t.route)}
                    style={{ fontSize: '0.9rem', padding: '0.4rem 0' }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: t.icon }} style={{ marginRight: '8px' }} />
                    {t.name}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a
            className="mobile-nav-item"
            href="/meet-developer"
            onClick={(e) => handleNav(e, '/meet-developer')}
          >
            <Icon name="user" /> Developer Team
          </a>
          <div className="mobile-auth-links">
            <a
              className="btn btn-primary btn-lg"
              href="/register"
              onClick={(e) => handleNav(e, '/register')}
            >
              Create student account
            </a>
            <a
              className="btn btn-secondary btn-lg"
              href="/login"
              onClick={(e) => handleNav(e, '/login')}
            >
              Student Login
            </a>
            <a
              className="btn btn-ghost"
              href="/admin/login"
              onClick={(e) => handleNav(e, '/admin/login')}
            >
              Admin portal
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
