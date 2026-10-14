import React, { useState } from 'react';
import Icon from '../components/Icon';
import { useToast } from '../context/ToastContext';

export default function ToolViewPage({ toolId, onNavigate }) {
  const { showToast } = useToast();

  // Calculator state
  const [calcDisplay, setCalcDisplay] = useState('0');
  const [calcPrev, setCalcPrev] = useState(null);
  const [calcOp, setCalcOp] = useState(null);

  // File upload tools state
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [outputReady, setOutputReady] = useState(false);

  // Image compress quality
  const [quality, setQuality] = useState(80);

  // Converter format state
  const [sourceFormat, setSourceFormat] = useState('pdf');
  const [targetFormat, setTargetFormat] = useState('docx');

  // Calculator actions
  const handleCalcNumber = (n) => {
    setCalcDisplay(prev => (prev === '0' ? String(n) : prev + String(n)));
  };

  const handleCalcOp = (op) => {
    setCalcPrev(parseFloat(calcDisplay));
    setCalcOp(op);
    setCalcDisplay('0');
  };

  const handleCalcEquals = () => {
    if (calcPrev === null || !calcOp) return;
    const current = parseFloat(calcDisplay);
    let result = 0;
    switch (calcOp) {
      case '+': result = calcPrev + current; break;
      case '-': result = calcPrev - current; break;
      case '×': result = calcPrev * current; break;
      case '÷': result = current !== 0 ? calcPrev / current : 'Error'; break;
      case '^': result = Math.pow(calcPrev, current); break;
      default: result = current;
    }
    setCalcDisplay(String(result));
    setCalcPrev(null);
    setCalcOp(null);
  };

  const handleCalcClear = () => {
    setCalcDisplay('0');
    setCalcPrev(null);
    setCalcOp(null);
  };

  // Generic file process simulation
  const handleProcessFile = () => {
    if (!selectedFile) {
      showToast('Please select a file to process.', 'error');
      return;
    }
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setOutputReady(true);
      showToast('Operation completed successfully! Ready to download.', 'success');
    }, 1200);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setOutputReady(false);
      if (file.type.startsWith('image/')) {
        setPreviewUrl(URL.createObjectURL(file));
      } else {
        setPreviewUrl(null);
      }
    }
  };

  const toolTitles = {
    'calculator': { name: 'Interactive Calculator', icon: '🧮', desc: 'Perform standard and scientific calculations.' },
    'merge-pdf': { name: 'Merge PDF Documents', icon: '📑', desc: 'Combine multiple PDF files into a single document.' },
    'split-pdf': { name: 'Split PDF Pages', icon: '✂️', desc: 'Extract specific pages or page ranges from your PDF.' },
    'compress-pdf': { name: 'Compress PDF', icon: '🗜️', desc: 'Reduce PDF file size while maintaining clarity.' },
    'compress-image': { name: 'Compress Image', icon: '🖼️', desc: 'Optimize JPG, PNG, and WebP images with custom compression levels.' },
    'upscale-image': { name: '2× AI Image Upscaler', icon: '✨', desc: 'Double resolution and enhance crispness of your photos.' },
    'remove-background': { name: 'Remove Image Background', icon: '🎭', desc: 'Isolate subjects and export transparent PNGs.' },
    'additive-pdf': { name: 'Additive PDF Editor', icon: '✏️', desc: 'Add text annotations, shapes, and stamps onto PDFs.' },
    'lock-unlock-pdf': { name: 'Lock & Unlock PDF', icon: '🔐', desc: 'Password protect sensitive documents or unlock authorized PDFs.' },
    'converter-suite': { name: 'Universal Converter Suite', icon: '🔄', desc: 'Convert between Word, PDF, Excel, and images.' }
  };

  const currentTool = toolTitles[toolId] || toolTitles['calculator'];

  return (
    <div className="tool-view-wrapper main-container" style={{ padding: '36px 20px', maxWidth: '900px' }}>
      <button className="btn btn-ghost btn-sm" onClick={() => onNavigate('/tools')} style={{ marginBottom: '16px' }}>
        <Icon name="arrow-left" /> Back to Tools Hub
      </button>

      <div className="card" style={{ padding: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
          <span style={{ fontSize: '2.5rem' }}>{currentTool.icon}</span>
          <div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800, margin: 0 }}>{currentTool.name}</h1>
            <p style={{ color: 'var(--text-secondary)', margin: '4px 0 0 0' }}>{currentTool.desc}</p>
          </div>
        </div>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '20px 0 28px 0' }} />

        {/* 1. Calculator Tool */}
        {toolId === 'calculator' && (
          <div style={{ maxWidth: '360px', margin: '0 auto', background: 'var(--navy-900, #08101f)', padding: '24px', borderRadius: '18px', color: '#fff', boxShadow: 'var(--shadow-xl)' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: '10px', padding: '16px', textAlign: 'right', fontSize: '2rem', fontWeight: 700, fontFamily: 'monospace', marginBottom: '18px', overflow: 'hidden' }}>
              {calcDisplay}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
              <button className="btn btn-secondary" onClick={handleCalcClear} style={{ gridColumn: 'span 2' }}>Clear</button>
              <button className="btn btn-secondary" onClick={() => handleCalcOp('^')}>xʸ</button>
              <button className="btn btn-primary" onClick={() => handleCalcOp('÷')}>÷</button>

              <button className="btn btn-ghost" onClick={() => handleCalcNumber(7)}>7</button>
              <button className="btn btn-ghost" onClick={() => handleCalcNumber(8)}>8</button>
              <button className="btn btn-ghost" onClick={() => handleCalcNumber(9)}>9</button>
              <button className="btn btn-primary" onClick={() => handleCalcOp('×')}>×</button>

              <button className="btn btn-ghost" onClick={() => handleCalcNumber(4)}>4</button>
              <button className="btn btn-ghost" onClick={() => handleCalcNumber(5)}>5</button>
              <button className="btn btn-ghost" onClick={() => handleCalcNumber(6)}>6</button>
              <button className="btn btn-primary" onClick={() => handleCalcOp('-')}>-</button>

              <button className="btn btn-ghost" onClick={() => handleCalcNumber(1)}>1</button>
              <button className="btn btn-ghost" onClick={() => handleCalcNumber(2)}>2</button>
              <button className="btn btn-ghost" onClick={() => handleCalcNumber(3)}>3</button>
              <button className="btn btn-primary" onClick={() => handleCalcOp('+')}>+</button>

              <button className="btn btn-ghost" onClick={() => handleCalcNumber(0)} style={{ gridColumn: 'span 2' }}>0</button>
              <button className="btn btn-ghost" onClick={() => handleCalcNumber('.')}>.</button>
              <button className="btn btn-primary" onClick={handleCalcEquals}>=</button>
            </div>
          </div>
        )}

        {/* 2. File / Image / PDF Tools */}
        {toolId !== 'calculator' && (
          <div>
            <div
              style={{
                border: '2px dashed var(--border)',
                borderRadius: '16px',
                padding: '40px 20px',
                textAlign: 'center',
                background: 'var(--surface-sunken)',
                cursor: 'pointer',
                marginBottom: '24px'
              }}
              onClick={() => document.getElementById('toolFileInput').click()}
            >
              <input
                id="toolFileInput"
                type="file"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <div style={{ fontSize: '3rem', marginBottom: '12px' }}>{currentTool.icon}</div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '6px' }}>
                {selectedFile ? selectedFile.name : 'Choose a file or drag & drop here'}
              </h3>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', margin: 0 }}>
                {selectedFile ? `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB · Click to choose another` : 'Maximum file size: 50MB'}
              </p>
            </div>

            {/* Quality Slider for Image Compress */}
            {toolId === 'compress-image' && (
              <div style={{ marginBottom: '24px', background: 'var(--surface-sunken)', padding: '16px', borderRadius: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontWeight: 600, fontSize: '0.9rem' }}>Compression Level / Quality:</label>
                  <span style={{ fontWeight: 700 }}>{quality}%</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="95"
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            )}

            {/* Converter Formats */}
            {toolId === 'converter-suite' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>Source Format</label>
                  <select className="form-control" value={sourceFormat} onChange={(e) => setSourceFormat(e.target.value)}>
                    <option value="pdf">PDF Document</option>
                    <option value="docx">Word (DOCX)</option>
                    <option value="xlsx">Excel (XLSX)</option>
                    <option value="pptx">PowerPoint (PPTX)</option>
                    <option value="png">PNG Image</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>Convert To</label>
                  <select className="form-control" value={targetFormat} onChange={(e) => setTargetFormat(e.target.value)}>
                    <option value="docx">Word (DOCX)</option>
                    <option value="pdf">PDF Document</option>
                    <option value="png">PNG Image</option>
                    <option value="xlsx">Excel (XLSX)</option>
                    <option value="txt">Plain Text</option>
                  </select>
                </div>
              </div>
            )}

            {/* Image Preview */}
            {previewUrl && (
              <div style={{ marginBottom: '24px', textAlign: 'center' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Preview:
                </div>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ maxWidth: '100%', maxHeight: '280px', borderRadius: '10px', boxShadow: 'var(--shadow-md)' }}
                />
              </div>
            )}

            {/* Action buttons */}
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center' }}>
              <button
                className="btn btn-primary btn-lg"
                disabled={!selectedFile || processing}
                onClick={handleProcessFile}
              >
                {processing ? 'Processing...' : `Execute ${currentTool.name}`}
              </button>

              {outputReady && (
                <button
                  className="btn btn-secondary btn-lg"
                  onClick={() => {
                    showToast('Download started.', 'success');
                    const link = document.createElement('a');
                    link.href = previewUrl || '#';
                    link.download = `output-${selectedFile?.name || 'document'}`;
                    link.click();
                  }}
                >
                  <Icon name="award" /> Download Output
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
