import React, { useEffect } from 'react';
import { TOOLS_CONFIG } from '../components/Header';

export default function ToolsLandingPage({ onNavigate }) {
  useEffect(() => {
    document.body.classList.add('tools-public-page');
    return () => {
      document.body.classList.remove('tools-public-page');
    };
  }, []);

  return (
    <div className="tools-landing-view">
      <div className="fx-scene" aria-hidden="true">
        <span className="fx-aurora fx-aurora-a"></span>
        <span className="fx-aurora fx-aurora-b"></span>
        <span className="fx-aurora fx-aurora-c"></span>
        <div className="fx-grid"></div>
        <div className="fx-beam"></div>
      </div>

      <main id="mainContent" className="tools-page">
        <header className="tools-page-heading">
          <span className="section-kicker">A little help, whenever you need it</span>
          <h1>Tools</h1>
          <p>Useful, easy-to-use tools for your work and learning — available instantly, with no account required.</p>
          <div className="fx-stats">
            <span className="fx-stat-pill"><b>10</b> tools &amp; converters</span>
            <span className="fx-stat-pill"><b>0</b> sign-ups required</span>
            <span className="fx-stat-pill"><b>100</b>% runs instantly</span>
          </div>
        </header>

        <div className="fx-divider" aria-hidden="true"></div>

        <section className="tools-card-grid" aria-label="Available tools">
          {TOOLS_CONFIG.map((tool) => (
            <a
              key={tool.id}
              className="tools-card"
              href={tool.route}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(tool.route);
              }}
            >
              <span
                className="tools-card-icon"
                aria-hidden="true"
                dangerouslySetInnerHTML={{ __html: tool.icon }}
              />
              <span className="tools-card-copy">
                <span className="tools-card-title">{tool.name}</span>
                <span className="tools-card-description">{tool.description}</span>
              </span>
              <span className="tools-card-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}
