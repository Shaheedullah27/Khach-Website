import React, { useState } from 'react';
import Icon from './Icon';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const TOOLS_LIST = [
  { id: 'calculator', name: 'Calculator', desc: 'Mathematical calculations', icon: '🧮', path: '/tools/calculator' },
  { id: 'merge-pdf', name: 'Merge PDF', desc: 'Combine multiple PDFs', icon: '📑', path: '/tools/merge-pdf' },
  { id: 'split-pdf', name: 'Split PDF', desc: 'Extract pages from PDF', icon: '✂️', path: '/tools/split-pdf' },
  { id: 'compress-pdf', name: 'Compress PDF', desc: 'Reduce PDF file size', icon: '🗜️', path: '/tools/compress-pdf' },
  { id: 'compress-image', name: 'Compress Image', desc: 'Reduce image file size', icon: '🖼️', path: '/tools/compress-image' },
  { id: 'upscale-image', name: 'Upscale Image', desc: '2× AI Image Upscaler', icon: '✨', path: '/tools/upscale-image' },
  { id: 'remove-background', name: 'Remove Background', desc: 'AI background remover', icon: '🎭', path: '/tools/remove-background' },
  { id: 'additive-pdf', name: 'Additive PDF', desc: 'Annotate, text & shapes', icon: '✏️', path: '/tools/additive-pdf' },
  { id: 'lock-unlock-pdf', name: 'Lock & Unlock PDF', desc: 'Protect or unlock PDF', icon: '🔐', path: '/tools/lock-unlock-pdf' },
  { id: 'converter-suite', name: 'Converter Suite', desc: 'Universal file converter', icon: '🔄', path: '/tools/converter-suite' }
];

export default function Header({ currentPath, onNavigate }) {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const handleNav = (e, path) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
    onNavigate(path);
  };

  return (
    <header className="site-header" id="siteHeader">
      <div className="nav-container">
        <a className="brand-logo" href="/" onClick={(e) => handleNav(e, '/')} aria-label="Ahmad Saleem Mentorship — home">
          <span className="logo-icon" aria-hidden="true"><Icon name="graduation-cap" /></span>
          <span className="logo-text">Ahmad Saleem</span>
        </a>

        <nav className="desktop-nav" id="desktopNav" aria-label="Primary">
          <button
            className={`nav-link ${currentPath === '/' ? 'active' : ''}`}
            type="button"
            onClick={(e) => handleNav(e, '/')}
            id="navHomeBtn"
          >
            Home
          </button>
          <button
            className={`nav-link ${currentPath === '/courses' ? 'active' : ''}`}
            type="button"
            onClick={(e) => handleNav(e, '/courses')}
            id="navCoursesBtn"
          >
            Courses
          </button>
          <div
            className="tools-nav-item"
            onMouseEnter={() => setToolsDropdownOpen(true)}
            onMouseLeave={() => setToolsDropdownOpen(false)}
          >
            <a
              className={`nav-link ${currentPath.startsWith('/tools') ? 'active' : ''}`}
              href="/tools"
              onClick={(e) => handleNav(e, '/tools')}
              aria-haspopup="true"
            >
              Tools
            </a>
            {toolsDropdownOpen && (
              <div className="tools-dropdown" id="toolsDropdown" style={{ display: 'block' }}>
                <p className="tools-dropdown-heading">Quick access</p>
                <div className="tools-dropdown-grid">
                  {TOOLS_LIST.map(tool => (
                    <a
                      key={tool.id}
                      href={tool.path}
                      onClick={(e) => handleNav(e, tool.path)}
                      className="tools-dropdown-item"
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', textDecoration: 'none', color: 'inherit' }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{tool.icon}</span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{tool.name}</div>
                        <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{tool.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          <a
            className={`nav-link ${currentPath === '/meet-developer' ? 'active' : ''}`}
            href="/meet-developer"
            onClick={(e) => handleNav(e, '/meet-developer')}
          >
            Developer Team
          </a>
        </nav>

        <div className="nav-actions">
          <div className="desktop-auth-links">
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <a className="btn btn-ghost" href="/admin/dashboard" onClick={(e) => handleNav(e, '/admin/dashboard')}>
                    Admin Dashboard
                  </a>
                ) : (
                  <a className="btn btn-secondary" href="/student/dashboard" onClick={(e) => handleNav(e, '/student/dashboard')}>
                    Workspace
                  </a>
                )}
                <button
                  className="btn btn-ghost"
                  type="button"
                  onClick={() => { logout(); onNavigate('/'); }}
                >
                  Log out
                </button>
              </>
            ) : (
              <>
                <a className="btn btn-ghost" href="/admin/login" onClick={(e) => handleNav(e, '/admin/login')}>Admin</a>
                <a className="btn btn-secondary" href="/login" onClick={(e) => handleNav(e, '/login')}>Student Login</a>
                <a className="btn btn-primary" href="/register" onClick={(e) => handleNav(e, '/register')}>
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
          >
            <span id="themeIcon" aria-hidden="true">
              <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
            </span>
            <span className="theme-label" id="themeLabel">
              {theme === 'dark' ? 'Daylight' : 'Dark Mode'}
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
            <Icon name={mobileMenuOpen ? 'x' : 'menu'} />
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${mobileMenuOpen ? 'active show' : ''}`} id="mobileDrawer" style={{ display: mobileMenuOpen ? 'block' : 'none' }}>
        <div className="mobile-drawer-inner">
          <button className="mobile-nav-item" type="button" onClick={(e) => handleNav(e, '/')}>
            <Icon name="graduation-cap" /> Home
          </button>
          <button className="mobile-nav-item" type="button" onClick={(e) => handleNav(e, '/courses')}>
            <Icon name="book-open" /> Courses
          </button>
          <div className="mobile-tools-nav">
            <button
              className="mobile-nav-item"
              type="button"
              style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              onClick={() => setMobileToolsOpen(prev => !prev)}
            >
              <span>🧰 Tools</span>
              <Icon name={mobileToolsOpen ? 'chevron-down' : 'chevron-right'} />
            </button>
            {mobileToolsOpen && (
              <div className="mobile-tools-list" style={{ paddingLeft: '1rem' }}>
                <a className="mobile-nav-item" href="/tools" onClick={(e) => handleNav(e, '/tools')}>All Tools Hub</a>
                {TOOLS_LIST.map(tool => (
                  <a
                    key={tool.id}
                    className="mobile-nav-item"
                    href={tool.path}
                    onClick={(e) => handleNav(e, tool.path)}
                    style={{ fontSize: '0.9rem' }}
                  >
                    <span>{tool.icon}</span> {tool.name}
                  </a>
                ))}
              </div>
            )}
          </div>
          <a className="mobile-nav-item" href="/meet-developer" onClick={(e) => handleNav(e, '/meet-developer')}>
            <Icon name="user" /> Developer Team
          </a>

          <div className="mobile-auth-links">
            {user ? (
              <>
                {user.role === 'admin' ? (
                  <a className="btn btn-primary btn-lg" href="/admin/dashboard" onClick={(e) => handleNav(e, '/admin/dashboard')}>Admin Portal</a>
                ) : (
                  <a className="btn btn-primary btn-lg" href="/student/dashboard" onClick={(e) => handleNav(e, '/student/dashboard')}>Learning Workspace</a>
                )}
                <button className="btn btn-secondary btn-lg" type="button" onClick={() => { logout(); setMobileMenuOpen(false); onNavigate('/'); }}>Log out</button>
              </>
            ) : (
              <>
                <a className="btn btn-primary btn-lg" href="/register" onClick={(e) => handleNav(e, '/register')}>Create student account</a>
                <a className="btn btn-secondary btn-lg" href="/login" onClick={(e) => handleNav(e, '/login')}>Student Login</a>
                <a className="btn btn-ghost" href="/admin/login" onClick={(e) => handleNav(e, '/admin/login')}>Admin portal</a>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
