import React, { useState } from 'react';
import Icon from '../components/Icon';

const ALL_TOOLS = [
  {
    id: 'calculator',
    name: 'Calculator',
    description: 'Perform standard and scientific mathematical calculations right in your browser.',
    icon: '🧮',
    category: 'calculator',
    badge: 'Popular',
    path: '/tools/calculator'
  },
  {
    id: 'merge-pdf',
    name: 'Merge PDF',
    description: 'Combine multiple PDF documents into a single organized file with drag & drop ordering.',
    icon: '📑',
    category: 'pdf',
    badge: 'Fast',
    path: '/tools/merge-pdf'
  },
  {
    id: 'split-pdf',
    name: 'Split PDF',
    description: 'Extract specific pages, page ranges, or split an entire PDF into single pages.',
    icon: '✂️',
    category: 'pdf',
    badge: 'WASM',
    path: '/tools/split-pdf'
  },
  {
    id: 'compress-pdf',
    name: 'Compress PDF',
    description: 'Reduce PDF file sizes with balanced, strong, or custom compression quality levels.',
    icon: '🗜️',
    category: 'pdf',
    badge: 'Optimal',
    path: '/tools/compress-pdf'
  },
  {
    id: 'compress-image',
    name: 'Compress Image',
    description: 'Compress PNG, JPEG, WebP, GIF, and AVIF images with real-time before/after previews.',
    icon: '🖼️',
    category: 'image',
    badge: 'Lossless/Lossy',
    path: '/tools/compress-image'
  },
  {
    id: 'upscale-image',
    name: 'Upscale Image',
    description: 'Double the resolution of images using high-performance 2× sharpening and upscaling.',
    icon: '✨',
    category: 'image',
    badge: '2× HD',
    path: '/tools/upscale-image'
  },
  {
    id: 'remove-background',
    name: 'Remove Background',
    description: 'Instantly isolate subjects and export clean transparent PNG cutouts.',
    icon: '🎭',
    category: 'image',
    badge: 'AI Cutout',
    path: '/tools/remove-background'
  },
  {
    id: 'additive-pdf',
    name: 'Additive PDF',
    description: 'Annotate PDFs with text, geometric shapes, highlighters, signatures, and stamps.',
    icon: '✏️',
    category: 'pdf',
    badge: 'Editor',
    path: '/tools/additive-pdf'
  },
  {
    id: 'lock-unlock-pdf',
    name: 'Lock & Unlock PDF',
    description: 'Encrypt sensitive documents with standard passwords or unlock authorized PDFs.',
    icon: '🔐',
    category: 'pdf',
    badge: 'Secure',
    path: '/tools/lock-unlock-pdf'
  },
  {
    id: 'converter-suite',
    name: 'Universal Converter Suite',
    description: 'Convert between Word (DOCX), PDF, Excel (XLSX), PowerPoint (PPTX), and images.',
    icon: '🔄',
    category: 'converter',
    badge: 'Universal',
    path: '/tools/converter-suite'
  }
];

export default function ToolsLandingPage({ onNavigate }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredTools = ALL_TOOLS.filter(t => {
    if (activeCategory === 'all') return true;
    return t.category === activeCategory;
  });

  return (
    <div className="tools-landing-view main-container" style={{ padding: '40px 20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '36px' }}>
        <span className="pill-badge pill-glass">
          <Icon name="sparkles" />
          <span>Productivity &amp; Creation Suite</span>
        </span>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, margin: '14px 0 8px 0' }}>
          Free Online Creator &amp; Document Tools
        </h1>
        <p style={{ color: 'var(--text-secondary)', maxWidth: '64ch', margin: '0 auto', fontSize: '1.1rem' }}>
          10 high-performance utilities for document manipulation, media compression, format conversion, and calculations.
        </p>
      </div>

      {/* Category Pills */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '36px' }}>
        {[
          { id: 'all', label: 'All Tools' },
          { id: 'pdf', label: 'PDF Utilities' },
          { id: 'image', label: 'Image Tools' },
          { id: 'converter', label: 'Converters' },
          { id: 'calculator', label: 'Calculators' }
        ].map(cat => (
          <button
            key={cat.id}
            type="button"
            className={`btn ${activeCategory === cat.id ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '22px' }}>
        {filteredTools.map(tool => (
          <div
            key={tool.id}
            className="card tool-card"
            onClick={() => onNavigate(tool.path)}
            style={{
              padding: '24px',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
              <div style={{ fontSize: '2.4rem' }}>{tool.icon}</div>
              <span className="badge badge-accent">{tool.badge}</span>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 8px 0' }}>{tool.name}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
              {tool.description}
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', marginTop: 'auto' }}>
              <span>Launch Tool</span>
              <Icon name="arrow-right" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
