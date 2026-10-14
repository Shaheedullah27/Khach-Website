import React from 'react';
import Icon from '../components/Icon';

const TOOL_MAP = {
  calculator: { file: '/calculator.html', name: 'Calculator' },
  'merge-pdf': { file: '/merge-pdf.html', name: 'Merge PDF' },
  'split-pdf': { file: '/split-pdf.html', name: 'Split PDF' },
  'compress-pdf': { file: '/compress-pdf.html', name: 'Compress PDF' },
  'compress-image': { file: '/compress-image.html', name: 'Compress Image' },
  'upscale-image': { file: '/upscale-image.html', name: 'Upscale Image' },
  'remove-background': { file: '/remove-background.html', name: 'Remove Background' },
  'additive-pdf': { file: '/additive-pdf.html', name: 'Additive PDF' },
  'lock-unlock-pdf': { file: '/lock-unlock-pdf.html', name: 'Lock & Unlock PDF' },
  'converter-suite': { file: '/converter-suite.html', name: 'Converter Suite' }
};

export default function ToolViewPage({ toolId, onNavigate }) {
  const tool = TOOL_MAP[toolId] || { file: `/${toolId}.html`, name: toolId };

  return (
    <div className="tool-view-container" style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 70px)' }}>
      <div
        className="tool-view-header"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.75rem 1.5rem',
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)'
        }}
      >
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => onNavigate('/tools')}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Icon name="arrow-left" /> Back to Tools
        </button>
        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{tool.name}</span>
        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() => onNavigate('/')}
        >
          Home
        </button>
      </div>

      <iframe
        src={tool.file}
        title={tool.name}
        style={{
          flex: 1,
          width: '100%',
          height: 'calc(100vh - 120px)',
          border: 'none',
          display: 'block'
        }}
      />
    </div>
  );
}
