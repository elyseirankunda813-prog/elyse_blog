import { useEffect, useRef, useState } from 'react'

const STARTER = {
  html: `<h1>Pixel Counter</h1>
<button id="btn">Clicks: <span id="count">0</span></button>`,
  css: `body {
  font-family: monospace;
  display: grid;
  place-items: center;
  min-height: 100vh;
  margin: 0;
  background: #0d1117;
  color: #f0f0f0;
}

button {
  font-family: monospace;
  font-size: 1rem;
  padding: 14px 24px;
  border: 1px solid #f0f0f0;
  background: transparent;
  color: #f0f0f0;
  cursor: pointer;
}

button:hover {
  background: #f0f0f0;
  color: #0d1117;
}`,
  js: `let clicks = 0;
const count = document.getElementById('count');

document.getElementById('btn').addEventListener('click', () => {
  clicks += 1;
  count.textContent = clicks;
});`,
}

const buildSrcDoc = (html, css, js) => `<!doctype html>
<html>
  <head><meta charset="utf-8"><style>${css}</style></head>
  <body>${html}<script>${js}</script></body>
</html>`

const FIELDS = [
  { key: 'html', label: 'HTML', placeholder: '<h1>Hello</h1>' },
  { key: 'css', label: 'CSS', placeholder: 'body { color: tomato; }' },
  { key: 'js', label: 'JS', placeholder: 'console.log("hi")' },
]

export default function Playground() {
  const [code, setCode] = useState({ html: STARTER.html, css: STARTER.css, js: STARTER.js })
  const [srcDoc, setSrcDoc] = useState(() =>
    buildSrcDoc(STARTER.html, STARTER.css, STARTER.js),
  )
  const firstRun = useRef(true)

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
      return
    }
    const id = window.setTimeout(
      () => setSrcDoc(buildSrcDoc(code.html, code.css, code.js)),
      500,
    )
    return () => window.clearTimeout(id)
  }, [code])

  const run = () => setSrcDoc(buildSrcDoc(code.html, code.css, code.js))

  const reset = () => {
    setCode({ html: STARTER.html, css: STARTER.css, js: STARTER.js })
    setSrcDoc(buildSrcDoc(STARTER.html, STARTER.css, STARTER.js))
  }

  const handleKeyDown = (e) => {
    if (e.key !== 'Tab') return
    e.preventDefault()
    const { key, value, selectionStart, selectionEnd } = e.target
    const next = value.slice(0, selectionStart) + '  ' + value.slice(selectionEnd)
    setCode((prev) => ({ ...prev, [key]: next }))
    requestAnimationFrame(() => {
      e.target.selectionStart = e.target.selectionEnd = selectionStart + 2
    })
  }

  return (
    <section id="playground" className="playground" aria-label="Code playground">
      <div className="playground-header">
        <span className="section-label">Playground</span>
        <h2 className="section-title">Code it live.</h2>
        <p className="section-subtitle">
          Edit HTML, CSS and JavaScript in your browser and watch the result update as you type.
        </p>
      </div>

      <div className="playground-editor">
        <div className="playground-editor-top">
          <div className="playground-tabs" aria-label="Editor panes">
            {FIELDS.map((f) => (
              <span className="playground-tab" key={f.key}>{f.label}</span>
            ))}
          </div>
          <div className="playground-actions">
            <button type="button" className="btn btn-ghost playground-btn" onClick={reset}>Reset</button>
            <button type="button" className="btn btn-primary playground-btn" onClick={run}>Run</button>
          </div>
        </div>
        <div className="playground-editor-grid">
          {FIELDS.map((f) => (
            <div className="playground-pane" key={f.key}>
              <span className="playground-pane-label">{f.label}</span>
              <textarea
                className="playground-pane-input"
                name={f.key}
                spellCheck="false"
                value={code[f.key]}
                placeholder={f.placeholder}
                onChange={(e) => setCode((prev) => ({ ...prev, [f.key]: e.target.value }))}
                onKeyDown={handleKeyDown}
                aria-label={`${f.label} editor`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="playground-preview" aria-label="Live preview">
        <div className="playground-preview-bar">
          <span className="playground-preview-label">Preview</span>
          <span className="playground-preview-status">auto-runs on change</span>
        </div>
        <iframe className="playground-preview-frame" title="Live preview" sandbox="allow-scripts allow-modals" srcDoc={srcDoc} />
      </div>
    </section>
  )
}