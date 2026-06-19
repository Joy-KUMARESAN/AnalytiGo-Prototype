import { Link } from 'react-router-dom'
import { css } from '../utils/css.js'

// Tennis marketing view — the Tennis counterpart of LandingView. Same structure,
// hero, sections, cinematic backdrop and animations; teal accent (var(--ta) /
// rgba(var(--tc), x), set on the page root) and Tennis-specific content, plus a
// dedicated Player Insights section. `openDashboard` switches to the dashboard peek.

const KPI_CARD = 'padding:20px;border-radius:15px;background:rgba(20,24,30,.62);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.07)'
const KPI_LABEL = "font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad;letter-spacing:.05em;margin-bottom:14px"

function Kpi({ label, value, delta, deltaColor }) {
  return (
    <div style={css(KPI_CARD)}>
      <div style={css(KPI_LABEL)}>{label}</div>
      {value}
      <div style={css(`font:500 11px/1 'JetBrains Mono',monospace;color:${deltaColor};margin-top:10px`)}>{delta}</div>
    </div>
  )
}

const ICON = css('color:var(--ta)')

const FEATURES = [
  {
    title: 'Serve Speed Analysis',
    desc: 'Measure first- and second-serve velocity, spin, and consistency over time.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={ICON}>
        <path d="M4 17a8 8 0 0 1 16 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M12 17l4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="17" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'First Serve Percentage',
    desc: 'Track first-serve make rates and the points won behind your delivery.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={ICON}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8 16L16 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="9" cy="9" r="1.5" fill="currentColor" />
        <circle cx="15" cy="15" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Return Efficiency',
    desc: 'Quantify return depth, placement, and points won off both serves.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={ICON}>
        <path d="M9 6l-5 6 5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M4 12h11a5 5 0 0 1 5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: 'Rally Intelligence',
    desc: 'Understand rally length, patterns, and the shots that decide points.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={ICON}>
        <path d="M3 8h13l-3-3M21 16H8l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Shot Placement Analytics',
    desc: 'Map exactly where your shots land to expose strengths and gaps.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={ICON}>
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="1.4" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Court Coverage',
    desc: 'Visualize movement, recovery, and the ground you control each match.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={ICON}>
        <rect x="4" y="4" width="16" height="16" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 12h16M12 4v16" stroke="currentColor" strokeWidth="1.2" opacity=".55" />
      </svg>
    ),
  },
  {
    title: 'Match Momentum Tracking',
    desc: 'See how momentum swings across sets and where matches are won.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={ICON}>
        <polyline points="3,15 8,9 12,12 16,6 21,9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="9" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: 'Player Performance Trends',
    desc: 'Monitor progression, consistency, and form across your season.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={ICON}>
        <rect x="3" y="13" width="4" height="8" rx="1" fill="currentColor" opacity=".5" />
        <rect x="10" y="8" width="4" height="13" rx="1" fill="currentColor" />
        <rect x="17" y="4" width="4" height="17" rx="1" fill="currentColor" opacity=".7" />
      </svg>
    ),
  },
  {
    title: 'AI Coaching Insights',
    desc: 'Get personalized, data-driven coaching tailored to your game.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={ICON}>
        <path d="M12 4l1.8 4.4 4.7.4-3.6 3 1.1 4.6L12 14.6 7.9 16.4 9 11.8 5.5 8.8l4.7-.4z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
]

const HEAT = [
  0.1, 0.22, 0.35, 0.3, 0.15, 0.08, 0.2, 0.45, 0.7, 0.6, 0.3, 0.12, 0.28, 0.6, 0.95, 0.8, 0.4, 0.18,
  0.22, 0.5, 0.78, 0.62, 0.32, 0.14, 0.12, 0.26, 0.4, 0.34, 0.18, 0.08, 0.06, 0.14, 0.2, 0.16, 0.1, 0.05,
]

const BARS = [
  { l: 'SRV', h: '92%', grad: true, d: '' },
  { l: 'FH', h: '78%', grad: true, d: ' .1s' },
  { l: 'BH', h: '60%', grad: false, d: ' .2s' },
  { l: 'VOL', h: '44%', grad: false, d: ' .3s' },
  { l: 'SLC', h: '34%', grad: false, d: ' .4s' },
]

const INSIGHT_SCORES = [
  { label: 'SERVE PERFORMANCE', main: '8.7', unit: '/10', delta: '▲ 0.4', dc: '#46d18a' },
  { label: 'RETURN PERFORMANCE', main: '7.9', unit: '/10', delta: '▲ 0.6', dc: '#46d18a' },
  { label: 'SHOT CONSISTENCY', main: '91', unit: '/100', delta: '— stable', dc: '#9aa3ad' },
  { label: 'MATCH READINESS', main: 'A+', unit: '', delta: '▲ peak form', dc: '#46d18a' },
]

const NAV_LINKS = ['Features', 'Analytics', 'Metrics', 'Player Insights', 'Pricing']

export default function TennisView({ navRef, videoRef, openDashboard }) {
  return (
    <div>
      {/* fixed, full-frame Tennis background video — continuous backdrop */}
      <div className="lh-bg">
        <video className="lh-bg-fill" autoPlay muted loop playsInline preload="auto" poster="/assets/tennis-bg-poster.jpg" aria-hidden="true">
          <source src="/assets/tennis-bg-fill.mp4" type="video/mp4" />
        </video>
        <video ref={videoRef} className="lh-video" autoPlay muted loop playsInline preload="auto" poster="/assets/tennis-bg-poster.jpg" aria-hidden="true">
          <source src="/assets/tennis-bg.mp4" type="video/mp4" />
        </video>
      </div>

      {/* NAV */}
      <nav ref={navRef} style={css('position:fixed;top:0;left:0;right:0;z-index:70;display:flex;align-items:center;justify-content:space-between;padding:20px 48px;background:linear-gradient(180deg,rgba(8,9,11,.55) 0%,rgba(8,9,11,.32) 38%,rgba(8,9,11,.1) 70%,transparent 100%);border:none;transition:background .25s,padding .25s,backdrop-filter .25s')}>
        <Link to="/" style={css('display:flex;align-items:center;gap:11px')}>
          <span style={css("width:30px;height:30px;border-radius:8px;background:var(--ta);display:flex;align-items:center;justify-content:center;color:#06201d;font:800 17px/1 'Sora'")}>A</span>
          <span style={css("font:700 20px/1 'Sora';letter-spacing:-.01em")}>AnalytiGo</span>
        </Link>
        <div className="ag-nav-links" style={css('display:flex;align-items:center;gap:34px')}>
          {NAV_LINKS.map((label) => (
            <a
              key={label}
              className="h-navlink"
              onClick={label === 'Analytics' ? openDashboard : undefined}
              style={css("font:500 14px/1 'Sora';color:#c4ccd4;text-decoration:none;cursor:pointer")}
            >
              {label}
            </a>
          ))}
        </div>
        <div style={css('display:flex;align-items:center;gap:14px')}>
          <a className="ht-signin" style={css("font:600 14px/1 'Sora';color:#eef1f3;text-decoration:none;cursor:pointer")}>Sign In</a>
          <button className="h-lift" style={css("font:600 14px/1 'Sora';color:#06201d;background:var(--ta);border:none;padding:11px 20px;border-radius:10px;cursor:pointer;transition:transform .15s")}>Get Started</button>
        </div>
      </nav>

      {/* HERO */}
      <header style={css('position:relative;min-height:100vh;display:flex;align-items:flex-end;overflow:hidden')}>
        <div className="lh-heroscrim" />
        <div className="lh-vignette" />
        <div className="lh-cinebars" />
        <div className="lh-curtain" />

        {/* floating stat overlay */}
        <div className="ag-hero-stats lh-rise" style={{ ...css('position:absolute;right:48px;bottom:120px;display:flex;flex-direction:column;gap:12px;z-index:3'), animationDelay: '1.15s' }}>
          <div style={css('display:flex;gap:12px')}>
            <div style={css('min-width:150px;padding:16px 18px;border-radius:14px;background:rgba(16,19,22,.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);animation:floaty 6s ease-in-out infinite')}>
              <div data-count="2.4" data-decimals="1" data-suffix="M" style={css("font:700 26px/1 'Sora';color:var(--ta-bright)")}>2.4M</div>
              <div style={css("font:500 11px/1.3 'JetBrains Mono',monospace;letter-spacing:.08em;color:#9aa3ad;margin-top:6px")}>MATCHES ANALYZED</div>
            </div>
            <div style={css('min-width:150px;padding:16px 18px;border-radius:14px;background:rgba(16,19,22,.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);animation:floaty 6s ease-in-out infinite .8s')}>
              <div data-count="180" data-suffix="K" style={css("font:700 26px/1 'Sora'")}>180K</div>
              <div style={css("font:500 11px/1.3 'JetBrains Mono',monospace;letter-spacing:.08em;color:#9aa3ad;margin-top:6px")}>ACTIVE PLAYERS</div>
            </div>
          </div>
          <div style={css('padding:16px 18px;border-radius:14px;background:rgba(16,19,22,.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);animation:floaty 6s ease-in-out infinite 1.6s')}>
            <div data-count="5.6" data-decimals="1" data-suffix="M" style={css("font:700 26px/1 'Sora'")}>5.6M</div>
            <div style={css("font:500 11px/1.3 'JetBrains Mono',monospace;letter-spacing:.08em;color:#9aa3ad;margin-top:6px")}>PERFORMANCE REPORTS GENERATED</div>
          </div>
        </div>

        {/* hero content bottom-left */}
        <div className="ag-pad lh-rise" style={{ ...css('position:relative;z-index:4;max-width:600px;padding:0 48px 72px'), animationDelay: '.95s' }}>
          <div style={css('display:inline-flex;align-items:center;gap:9px;padding:7px 14px;border-radius:999px;border:1px solid rgba(var(--tc),.4);background:rgba(var(--tc),.1);margin-bottom:26px')}>
            <span style={css('width:7px;height:7px;border-radius:50%;background:var(--ta);box-shadow:0 0 10px var(--ta)')} />
            <span style={css("font:500 12px/1 'JetBrains Mono',monospace;letter-spacing:.1em;color:var(--ta-bright)")}>AI-POWERED TENNIS ANALYTICS</span>
          </div>
          <h1 className="ag-h1" style={css("font:800 50px/1.06 'Sora';letter-spacing:-.025em;margin:0 0 16px;text-wrap:balance;text-shadow:0 2px 30px rgba(0,0,0,.6)")}>
            Elite <span style={css('color:var(--ta-bright);text-shadow:0 0 30px rgba(var(--tc),.6)')}>Tennis</span> Analytics
          </h1>
          <p style={css("font:400 17px/1.6 'Sora';color:#dfe5ea;max-width:460px;margin:0 0 30px;text-shadow:0 1px 14px rgba(0,0,0,.6)")}>
            Transform every match into actionable insights with AI-powered tennis analytics, serve intelligence, shot tracking, player performance trends, and advanced visualizations.
          </p>
          <div style={css('display:flex;align-items:center;gap:16px;flex-wrap:wrap')}>
            <button onClick={openDashboard} className="h-lift" style={css("display:inline-flex;align-items:center;gap:10px;font:700 16px/1 'Sora';color:#06201d;background:var(--ta);border:none;padding:18px 30px;border-radius:13px;cursor:pointer;transition:transform .15s;box-shadow:0 14px 34px rgba(var(--tc),.4)")}>View Analytics →</button>
            <button className="h-glass" style={css("display:inline-flex;align-items:center;gap:14px;font:600 15px/1 'Sora';color:#eef1f3;padding:11px 22px 11px 12px;border-radius:13px;background:rgba(255,255,255,.07);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.16);cursor:pointer;transition:background .15s")}>
              <span style={css('width:38px;height:38px;border-radius:50%;background:var(--ta);display:flex;align-items:center;justify-content:center;animation:glowPulse 2.4s infinite')}>
                <span style={css('width:0;height:0;border-style:solid;border-width:7px 0 7px 11px;border-color:transparent transparent transparent #06201d;margin-left:3px')} />
              </span>
              Watch Trailer
            </button>
          </div>
        </div>
        <div className="lh-rise" style={{ ...css('position:absolute;left:50%;bottom:28px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:9px;z-index:4'), animationDelay: '1.45s' }}>
          <span style={css("font:500 10px/1 'JetBrains Mono',monospace;letter-spacing:.22em;color:rgba(255,255,255,.42)")}>SCROLL</span>
          <span style={css('width:1px;height:34px;background:linear-gradient(var(--ta),transparent)')} />
        </div>
      </header>

      {/* FEATURES */}
      <section style={css('padding:120px 0;background:rgba(10,11,13,.84)')}>
        <div className="ag-pad" style={css('max-width:1240px;margin:0 auto;padding:0 48px')}>
          <div data-reveal className="ag-split" style={css('display:grid;grid-template-columns:1.05fr .95fr;gap:52px;align-items:center;margin-bottom:64px')}>
            <div>
              <div style={css("font:500 12px/1 'JetBrains Mono',monospace;letter-spacing:.16em;color:var(--ta);margin-bottom:18px")}>FEATURES</div>
              <h2 className="ag-h2" style={css("font:700 50px/1.06 'Sora';letter-spacing:-.025em;margin:0 0 18px;text-wrap:balance")}>Powerful Tennis Analytics Built for Champions</h2>
              <p style={css("font:400 18px/1.6 'Sora';color:#9aa3ad;margin:0")}>Everything you need to sharpen your serve, read the rally, and gain a competitive edge on every surface.</p>
            </div>
            <div style={css('position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.08);box-shadow:0 30px 70px rgba(0,0,0,.45);aspect-ratio:16/10')}>
              <img src="/assets/features.png" alt="Tennis athletes mid-action" style={css('position:absolute;inset:0;width:100%;height:100%;object-fit:cover')} />
              <div style={css('position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(10,11,13,.5))')} />
            </div>
          </div>
          <div data-reveal className="ag-feature-grid" style={css('display:grid;grid-template-columns:repeat(3,1fr);gap:20px')}>
            {FEATURES.map((f) => (
              <div key={f.title} className="ht-feature" style={css('position:relative;padding:32px;border-radius:18px;background:linear-gradient(160deg,#13171c,#0f1216);border:1px solid rgba(255,255,255,.07);box-shadow:inset 0 1px 0 rgba(255,255,255,.04);transition:transform .25s,border-color .25s,box-shadow .25s')}>
                <div style={css('width:54px;height:54px;border-radius:14px;background:linear-gradient(145deg,rgba(var(--tc),.18),rgba(var(--tc),.04));border:1px solid rgba(var(--tc),.24);box-shadow:inset 0 1px 0 rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;margin-bottom:22px')}>
                  {f.icon}
                </div>
                <h3 style={css("font:600 21px/1.3 'Sora';margin:0 0 10px")}>{f.title}</h3>
                <p style={css("font:400 15px/1.6 'Sora';color:#9aa3ad;margin:0")}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* METRICS & ANALYTICS */}
      <section style={css('background:rgba(12,14,16,.84);border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06)')}>
        <div className="ag-pad" style={css('max-width:1240px;margin:0 auto;padding:120px 48px')}>
          <div data-reveal style={css('display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:24px;margin-bottom:54px')}>
            <div style={css('max-width:680px')}>
              <div style={css("font:500 12px/1 'JetBrains Mono',monospace;letter-spacing:.16em;color:var(--ta);margin-bottom:18px")}>METRICS &amp; ANALYTICS</div>
              <h2 className="ag-h2" style={css("font:700 50px/1.06 'Sora';letter-spacing:-.025em;margin:0;text-wrap:balance")}>Detailed Tennis Analytics</h2>
            </div>
            <button onClick={openDashboard} className="ht-outline" style={css("display:inline-flex;align-items:center;gap:10px;font:600 15px/1 'Sora';color:var(--ta);background:transparent;border:1px solid rgba(var(--tc),.4);padding:15px 24px;border-radius:12px;cursor:pointer;transition:background .15s")}>Explore Visualizations →</button>
          </div>

          {/* KPI cards */}
          <div data-reveal className="ag-kpi-grid" style={css('display:grid;grid-template-columns:repeat(6,1fr);gap:14px;margin-bottom:24px')}>
            <Kpi label="FIRST SERVE %" delta="▲ 3.1%" deltaColor="#46d18a" value={<div data-count="64" data-suffix="%" style={css("font:700 34px/1 'Sora';color:var(--ta-bright)")}>64%</div>} />
            <Kpi label="SERVE SPEED" delta="▲ 2 MPH" deltaColor="#46d18a" value={
              <div style={css("font:700 34px/1 'Sora'")}>
                <span data-count="124">124</span>
                <span style={css('font-size:18px;color:#6b7480')}> MPH</span>
              </div>
            } />
            <Kpi label="RETURN PTS WON" delta="▲ 1.8%" deltaColor="#46d18a" value={<div data-count="41" data-suffix="%" style={css("font:700 34px/1 'Sora'")}>41%</div>} />
            <Kpi label="WINNERS" delta="▲ 5" deltaColor="#46d18a" value={<div data-count="32" style={css("font:700 34px/1 'Sora'")}>32</div>} />
            <Kpi label="BREAK PT CONV" delta="— stable" deltaColor="#9aa3ad" value={<div data-count="47" data-suffix="%" style={css("font:700 34px/1 'Sora'")}>47%</div>} />
            <Kpi label="UNFORCED ERRORS" delta="▼ 4" deltaColor="#46d18a" value={<div data-count="18" style={css("font:700 34px/1 'Sora';color:var(--ta-bright)")}>18</div>} />
          </div>

          {/* dashboard preview mockup */}
          <div data-reveal style={css('border-radius:22px;background:#141820;border:1px solid rgba(255,255,255,.08);box-shadow:0 40px 90px rgba(0,0,0,.4);overflow:hidden')}>
            <div style={css('display:flex;align-items:center;gap:8px;padding:16px 22px;border-bottom:1px solid rgba(255,255,255,.06)')}>
              <span style={css('width:11px;height:11px;border-radius:50%;background:#3a4049')} />
              <span style={css('width:11px;height:11px;border-radius:50%;background:#3a4049')} />
              <span style={css('width:11px;height:11px;border-radius:50%;background:#3a4049')} />
              <span style={css("margin-left:14px;font:500 12px/1 'JetBrains Mono',monospace;color:#6b7480")}>analytigo.app / tennis / performance</span>
            </div>
            <div className="ag-preview-body" style={css('padding:26px;display:grid;grid-template-columns:1.6fr 1fr;gap:18px')}>
              {/* trend */}
              <div style={css('grid-column:1 / -1;padding:22px;border-radius:15px;background:#0e1114;border:1px solid rgba(255,255,255,.06)')}>
                <div style={css('display:flex;align-items:center;justify-content:space-between;margin-bottom:18px')}>
                  <span style={css("font:600 14px/1 'Sora'")}>Match Performance Timeline</span>
                  <span style={css("font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad")}>LAST 12 MATCHES</span>
                </div>
                <svg viewBox="0 0 760 150" width="100%" height="150" preserveAspectRatio="none" style={ICON}>
                  <line x1="0" y1="37" x2="760" y2="37" stroke="rgba(255,255,255,.05)" />
                  <line x1="0" y1="75" x2="760" y2="75" stroke="rgba(255,255,255,.05)" />
                  <line x1="0" y1="113" x2="760" y2="113" stroke="rgba(255,255,255,.05)" />
                  <polyline points="0,150 0,118 70,100 140,108 210,78 280,86 350,58 420,64 490,40 560,52 630,30 700,36 760,22 760,150" fill="url(#gradT)" stroke="none" />
                  <polyline points="0,118 70,100 140,108 210,78 280,86 350,58 420,64 490,40 560,52 630,30 700,36 760,22" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" style={css('stroke-dasharray:1;stroke-dashoffset:1;animation:drawLine 1.8s ease-out forwards')} />
                  <polyline points="0,132 70,124 140,128 210,118 280,122 350,110 420,114 490,104 560,110 630,98 700,102 760,94" fill="none" stroke="#57c8ff" strokeWidth="2" strokeDasharray="4 5" opacity=".55" />
                  <defs>
                    <linearGradient id="gradT" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="currentColor" stopOpacity=".28" />
                      <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={css('display:flex;gap:20px;margin-top:14px')}>
                  <span style={css("display:flex;align-items:center;gap:7px;font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad")}><span style={css('width:14px;height:3px;background:var(--ta);border-radius:2px')} />YOUR FORM</span>
                  <span style={css("display:flex;align-items:center;gap:7px;font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad")}><span style={css('width:14px;height:3px;background:#57c8ff;border-radius:2px')} />TOUR AVERAGE</span>
                </div>
              </div>
              {/* heatmap */}
              <div style={css('padding:22px;border-radius:15px;background:#0e1114;border:1px solid rgba(255,255,255,.06)')}>
                <div style={css("font:600 14px/1 'Sora';margin-bottom:6px")}>Shot Placement Heatmap</div>
                <div style={css("font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad;margin-bottom:18px")}>LANDING DENSITY</div>
                <div style={css('aspect-ratio:1.1;border:1.5px solid rgba(255,255,255,.18);border-radius:6px;padding:6px;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(6,1fr);gap:4px;position:relative')}>
                  <div style={css('position:absolute;left:0;right:0;top:50%;height:1.5px;background:rgba(255,255,255,.18)')} />
                  {HEAT.map((o, i) => (
                    <div key={i} style={{ background: `rgba(15,182,164,${o})`, borderRadius: '3px' }} />
                  ))}
                </div>
              </div>
              {/* shot distribution */}
              <div style={css('padding:22px;border-radius:15px;background:#0e1114;border:1px solid rgba(255,255,255,.06)')}>
                <div style={css("font:600 14px/1 'Sora';margin-bottom:6px")}>Shot Distribution</div>
                <div style={css("font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad;margin-bottom:22px")}>BY TYPE</div>
                <div style={css('display:flex;align-items:flex-end;gap:12px;height:120px')}>
                  {BARS.map((b) => (
                    <div key={b.l} style={css('flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;height:100%;justify-content:flex-end')}>
                      <div style={css(`width:100%;height:${b.h};background:${b.grad ? 'linear-gradient(var(--ta),var(--ta-deep))' : '#2a313a'};border-radius:6px 6px 0 0;transform-origin:bottom;animation:growBar .8s ease-out${b.d} forwards`)} />
                      <span style={css("font:500 10px/1 'JetBrains Mono',monospace;color:#9aa3ad")}>{b.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PLAYER INSIGHTS */}
      <section style={css('padding:120px 0;background:rgba(10,11,13,.82)')}>
        <div className="ag-pad" style={css('max-width:1240px;margin:0 auto;padding:0 48px')}>
          <div data-reveal style={css('text-align:center;margin-bottom:48px')}>
            <div style={css("font:500 12px/1 'JetBrains Mono',monospace;letter-spacing:.16em;color:var(--ta);margin-bottom:16px")}>PLAYER INTELLIGENCE</div>
            <h2 className="ag-h2" style={css("font:700 48px/1.06 'Sora';letter-spacing:-.025em;margin:0 0 14px;text-wrap:balance")}>Know Every Edge of Your Game</h2>
            <p style={css("font:400 18px/1.6 'Sora';color:#9aa3ad;max-width:600px;margin:0 auto")}>AI-generated intelligence on your strengths, weaknesses, and exactly what to work on next.</p>
          </div>

          {/* score row */}
          <div data-reveal className="ag-kpi-grid" style={css('display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:18px')}>
            {INSIGHT_SCORES.map((s) => (
              <div key={s.label} style={css('padding:24px;border-radius:16px;background:linear-gradient(160deg,#13171c,#0f1216);border:1px solid rgba(255,255,255,.07)')}>
                <div style={css("font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad;letter-spacing:.05em;margin-bottom:16px")}>{s.label}</div>
                <div style={css("font:700 38px/1 'Sora';color:var(--ta-bright)")}>
                  {s.main}
                  {s.unit && <span style={css('font-size:18px;color:#6b7480')}>{s.unit}</span>}
                </div>
                <div style={css(`font:500 11px/1 'JetBrains Mono',monospace;color:${s.dc};margin-top:12px`)}>{s.delta}</div>
              </div>
            ))}
          </div>

          {/* strengths / weaknesses */}
          <div data-reveal className="ag-split" style={css('display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:18px')}>
            <div style={css('padding:26px;border-radius:16px;background:rgba(20,24,30,.62);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(var(--tc),.22)')}>
              <div style={css('display:flex;align-items:center;gap:10px;margin-bottom:12px')}>
                <span style={css('width:26px;height:26px;border-radius:8px;background:rgba(var(--tc),.16);display:flex;align-items:center;justify-content:center')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={ICON}><path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </span>
                <span style={css("font:600 16px/1 'Sora'")}>Strengths</span>
              </div>
              <p style={css("font:400 15px/1.6 'Sora';color:#b3bcc5;margin:0")}>Explosive first serve, aggressive forehand winners, and confident net play under pressure.</p>
            </div>
            <div style={css('padding:26px;border-radius:16px;background:rgba(20,24,30,.62);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.08)')}>
              <div style={css('display:flex;align-items:center;gap:10px;margin-bottom:12px')}>
                <span style={css('width:26px;height:26px;border-radius:8px;background:rgba(224,87,58,.16);display:flex;align-items:center;justify-content:center')}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 8v5M12 16.5v.5" stroke="#e0573a" strokeWidth="2.2" strokeLinecap="round" /><circle cx="12" cy="12" r="9" stroke="#e0573a" strokeWidth="1.6" /></svg>
                </span>
                <span style={css("font:600 16px/1 'Sora'")}>Weaknesses</span>
              </div>
              <p style={css("font:400 15px/1.6 'Sora';color:#b3bcc5;margin:0")}>Second-serve return depth and backhand consistency dip on long rallies and break points.</p>
            </div>
          </div>

          {/* AI coaching + improvement */}
          <div data-reveal style={css('padding:30px 32px;border-radius:18px;background:linear-gradient(120deg,rgba(var(--tc),.12),rgba(var(--tc),.02));border:1px solid rgba(var(--tc),.28);display:flex;gap:20px;align-items:flex-start;flex-wrap:wrap')}>
            <span style={css('width:46px;height:46px;border-radius:12px;background:var(--ta);flex-shrink:0;display:flex;align-items:center;justify-content:center')}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 4l1.8 4.4 4.7.4-3.6 3 1.1 4.6L12 14.6 7.9 16.4 9 11.8 5.5 8.8l4.7-.4z" fill="#06201d" /></svg>
            </span>
            <div style={css('flex:1;min-width:260px')}>
              <div style={css("font:600 16px/1.3 'Sora';margin-bottom:8px")}>AI Coaching Recommendations</div>
              <div style={css("font:400 15px/1.65 'Sora';color:#b3bcc5")}>Add 6% topspin to the second serve and target the deuce-court backhand to lift return-game pressure. Vary serve placement on break points, and approach behind the inside-out forehand to finish at net — projected to raise rally success by ~6 points.</div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL WIDTH CTA */}
      <section className="ag-pad" style={css('position:relative;overflow:hidden;padding:130px 48px')}>
        <div style={css('position:absolute;inset:0;background:radial-gradient(120% 120% at 82% 18%,rgba(10,40,37,.86) 0%,rgba(11,16,19,.9) 50%,rgba(8,9,11,.92) 100%)')} />
        <div style={css('position:absolute;inset:0;opacity:.5;background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);background-size:64px 64px')} />
        <svg style={css('position:absolute;right:0;bottom:0;width:62%;height:72%;opacity:.55')} viewBox="0 0 600 300" preserveAspectRatio="none">
          <polyline points="0,262 80,232 160,250 240,178 320,202 400,120 480,150 560,66 600,86" fill="none" stroke="rgba(15,182,164,.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={css('position:absolute;top:-10%;right:6%;width:46%;height:64%;background:radial-gradient(circle,rgba(15,182,164,.16),transparent 62%)')} />
        <div style={css('position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,9,11,.96) 0%,rgba(8,9,11,.72) 50%,rgba(8,9,11,.42) 100%)')} />
        <div data-reveal className="ag-split" style={css('position:relative;z-index:2;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center')}>
          <div>
            <div style={css("font:500 12px/1 'JetBrains Mono',monospace;letter-spacing:.16em;color:var(--ta);margin-bottom:20px")}>YOUR GAME · YOUR DATA</div>
            <h2 className="ag-h2" style={css("font:800 56px/1.04 'Sora';letter-spacing:-.03em;margin:0 0 22px;text-wrap:balance")}>Discover Your Personal Tennis Performance Story</h2>
            <p style={css("font:400 18px/1.65 'Sora';color:#b3bcc5;max-width:540px;margin:0 0 36px")}>Access personalized statistics, serve and return intelligence, strengths, weaknesses, and AI-generated recommendations tailored to your game.</p>
            <div style={css('display:flex;gap:16px;flex-wrap:wrap')}>
              <button onClick={openDashboard} className="h-lift" style={css("font:700 16px/1 'Sora';color:#06201d;background:var(--ta);border:none;padding:18px 30px;border-radius:13px;cursor:pointer;transition:transform .15s")}>View My Stats</button>
              <button className="h-glass" style={css("font:600 16px/1 'Sora';color:#eef1f3;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);padding:18px 30px;border-radius:13px;cursor:pointer;transition:background .15s")}>Start Free Analysis</button>
            </div>
          </div>
          {/* player profile preview */}
          <div style={css('display:flex;flex-direction:column;gap:14px')}>
            <div style={css('padding:22px;border-radius:18px;background:rgba(20,24,32,.7);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:16px')}>
              <div style={css("width:58px;height:58px;border-radius:14px;background:#0e1114;border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font:500 9px/1 'JetBrains Mono',monospace;color:#6b7480;text-align:center")}>PLAYER<br />PHOTO</div>
              <div style={css('flex:1')}>
                <div style={css("font:700 19px/1 'Sora'")}>Marco Reyes</div>
                <div style={css("font:500 12px/1 'JetBrains Mono',monospace;color:#9aa3ad;margin-top:7px")}>SINGLES · UTR 11.2</div>
              </div>
              <div style={css('text-align:right')}>
                <div style={css("font:700 30px/1 'Sora';color:var(--ta-bright)")}>A+</div>
                <div style={css("font:500 10px/1 'JetBrains Mono',monospace;color:#9aa3ad;margin-top:6px")}>FORM</div>
              </div>
            </div>
            <div style={css('display:grid;grid-template-columns:1fr 1fr;gap:14px')}>
              <div style={css('padding:18px;border-radius:15px;background:rgba(20,24,32,.7);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1)')}>
                <div style={css("font:500 10px/1 'JetBrains Mono',monospace;color:#9aa3ad;margin-bottom:12px")}>PERFORMANCE SCORE</div>
                <div data-count="942" style={css("font:700 30px/1 'Sora'")}>942</div>
                <div style={css("font:500 10px/1 'JetBrains Mono',monospace;color:#46d18a;margin-top:8px")}>▲ 28 this month</div>
              </div>
              <div style={css('padding:18px;border-radius:15px;background:rgba(20,24,32,.7);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1)')}>
                <div style={css("font:500 10px/1 'JetBrains Mono',monospace;color:#9aa3ad;margin-bottom:12px")}>WIN STREAK</div>
                <div style={css("font:700 30px/1 'Sora';color:var(--ta-bright)")}>7<span style={css('font-size:16px;color:#6b7480')}>&nbsp;wins</span></div>
                <div style={css("font:500 10px/1 'JetBrains Mono',monospace;color:#46d18a;margin-top:8px")}>▲ trending up</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ag-pad" style={css('background:rgba(10,11,13,.85);border-top:1px solid rgba(255,255,255,.07);padding:72px 48px 36px')}>
        <div className="ag-foot-grid" style={css('max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr;gap:40px;padding-bottom:54px;border-bottom:1px solid rgba(255,255,255,.07)')}>
          <div style={css('max-width:300px')}>
            <div style={css('display:flex;align-items:center;gap:11px;margin-bottom:18px')}>
              <span style={css("width:30px;height:30px;border-radius:8px;background:var(--ta);display:flex;align-items:center;justify-content:center;color:#06201d;font:800 17px/1 'Sora'")}>A</span>
              <span style={css("font:700 20px/1 'Sora'")}>AnalytiGo</span>
            </div>
            <p style={css("font:400 15px/1.6 'Sora';color:#9aa3ad;margin:0 0 24px")}>Advanced analytics for competitive tennis athletes.</p>
            <div style={css('display:flex;gap:10px')}>
              {[['in', '11px'], ['X', '13px'], ['YT', '9px'], ['IG', '9px']].map(([label, fs]) => (
                <a key={label} className="h-social" style={css(`width:38px;height:38px;border-radius:10px;background:#141820;border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font:600 ${fs}/1 'JetBrains Mono',monospace;color:#9aa3ad;text-decoration:none;cursor:pointer`)}>{label}</a>
              ))}
            </div>
          </div>
          {[
            { head: 'QUICK LINKS', links: ['Features', 'Analytics', 'Metrics', 'Player Insights', 'Pricing'] },
            { head: 'RESOURCES', links: ['Documentation', 'Blog'] },
            { head: 'SUPPORT', links: ['Support', 'Contact'] },
          ].map((col) => (
            <div key={col.head}>
              <div style={css("font:600 12px/1 'JetBrains Mono',monospace;letter-spacing:.12em;color:#6b7480;margin-bottom:20px")}>{col.head}</div>
              <div style={css('display:flex;flex-direction:column;gap:13px')}>
                {col.links.map((l) => (
                  <a key={l} className="h-footlink" style={css("font:400 14px/1 'Sora';color:#c4ccd4;text-decoration:none;cursor:pointer")}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={css('max-width:1240px;margin:0 auto;padding-top:28px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:14px')}>
          <span style={css("font:400 13px/1 'JetBrains Mono',monospace;color:#6b7480")}>© 2026 AnalytiGo. All rights reserved.</span>
          <div style={css('display:flex;gap:24px')}>
            <a className="h-legal" style={css("font:400 13px/1 'Sora';color:#6b7480;text-decoration:none;cursor:pointer")}>Privacy</a>
            <a className="h-legal" style={css("font:400 13px/1 'Sora';color:#6b7480;text-decoration:none;cursor:pointer")}>Terms</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
