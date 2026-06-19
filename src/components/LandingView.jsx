import { Link } from 'react-router-dom'
import { css } from '../utils/css.js'

// The AnalytiGo marketing landing screen: nav, video hero with floating stat
// counters, feature grid, metrics + dashboard-preview section, CTA, and footer.
// `openDashboard` switches the parent to the interactive dashboard peek.

const KPI_CARD = 'padding:20px;border-radius:15px;background:#141820;border:1px solid rgba(255,255,255,.07)'
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

const FEATURES = [
  {
    title: 'Shot Analysis',
    desc: 'Track shot placement, speed, accuracy, and winning patterns.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="9" stroke="#e8232e" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="4.5" stroke="#e8232e" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="1.4" fill="#e8232e" />
      </svg>
    ),
  },
  {
    title: 'Player Performance Insights',
    desc: 'Monitor strengths, weaknesses, consistency, and progression over time.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <polyline points="3,16 9,10 13,13 21,5" stroke="#e8232e" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="21" cy="5" r="1.8" fill="#e8232e" />
      </svg>
    ),
  },
  {
    title: 'Match Intelligence',
    desc: 'Identify trends, tactical opportunities, and opponent tendencies.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v18M3 12h18" stroke="#e8232e" strokeWidth="1.4" opacity=".4" />
        <circle cx="12" cy="12" r="7" stroke="#e8232e" strokeWidth="1.6" />
        <circle cx="15" cy="9" r="1.6" fill="#e8232e" />
      </svg>
    ),
  },
  {
    title: 'AI Recommendations',
    desc: 'Receive personalized coaching insights and improvement suggestions.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 4l1.8 4.4 4.7.4-3.6 3 1.1 4.6L12 14.6 7.9 16.4 9 11.8 5.5 8.8l4.7-.4z" stroke="#e8232e" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: 'Heat Maps',
    desc: 'Visualize court coverage, positioning, and movement efficiency.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="1.5" fill="#e8232e" opacity=".9" />
        <rect x="13" y="3" width="8" height="8" rx="1.5" fill="#e8232e" opacity=".35" />
        <rect x="3" y="13" width="8" height="8" rx="1.5" fill="#e8232e" opacity=".5" />
        <rect x="13" y="13" width="8" height="8" rx="1.5" fill="#e8232e" opacity=".75" />
      </svg>
    ),
  },
  {
    title: 'Performance Benchmarking',
    desc: 'Compare performance against peers, teams, and professionals.',
    icon: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="13" width="4" height="8" rx="1" fill="#e8232e" opacity=".5" />
        <rect x="10" y="8" width="4" height="13" rx="1" fill="#e8232e" />
        <rect x="17" y="4" width="4" height="17" rx="1" fill="#e8232e" opacity=".7" />
      </svg>
    ),
  },
]

const HEAT = [
  0.1, 0.22, 0.35, 0.3, 0.15, 0.08, 0.2, 0.45, 0.7, 0.6, 0.3, 0.12, 0.28, 0.6, 0.95, 0.8, 0.4, 0.18,
  0.22, 0.5, 0.78, 0.62, 0.32, 0.14, 0.12, 0.26, 0.4, 0.34, 0.18, 0.08, 0.06, 0.14, 0.2, 0.16, 0.1, 0.05,
]

const BARS = [
  { l: 'FH', h: '78%', grad: true, d: '' },
  { l: 'BH', h: '60%', grad: false, d: ' .1s' },
  { l: 'SRV', h: '92%', grad: true, d: ' .2s' },
  { l: 'VOL', h: '44%', grad: false, d: ' .3s' },
  { l: 'DRP', h: '34%', grad: false, d: ' .4s' },
]

const NAV_LINKS = ['Features', 'Analytics', 'Metrics', 'Player Insights', 'Pricing']

export default function LandingView({ navRef, videoRef, openDashboard }) {
  return (
    <div>
      {/* fixed, full-frame background video — one continuous backdrop */}
      <div className="lh-bg">
        <video className="lh-bg-fill" autoPlay muted loop playsInline preload="auto" poster="/assets/landing-bg-poster.jpg" aria-hidden="true">
          <source src="/assets/landing-bg-fill.mp4" type="video/mp4" />
        </video>
        <video ref={videoRef} className="lh-video" autoPlay muted loop playsInline preload="auto" poster="/assets/landing-bg-poster.jpg" aria-hidden="true">
          <source src="/assets/landing-bg.mp4" type="video/mp4" />
        </video>
      </div>
      {/* NAV */}
      <nav ref={navRef} style={css('position:fixed;top:0;left:0;right:0;z-index:70;display:flex;align-items:center;justify-content:space-between;padding:20px 48px;background:linear-gradient(180deg,rgba(8,9,11,.55) 0%,rgba(8,9,11,.32) 38%,rgba(8,9,11,.1) 70%,transparent 100%);border:none;transition:background .25s,padding .25s,backdrop-filter .25s')}>
        <Link to="/" style={css('display:flex;align-items:center;gap:11px')}>
          <span style={css("width:30px;height:30px;border-radius:8px;background:#e8232e;display:flex;align-items:center;justify-content:center;color:#fff;font:800 17px/1 'Sora'")}>A</span>
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
          <a className="h-signin" style={css("font:600 14px/1 'Sora';color:#eef1f3;text-decoration:none;cursor:pointer")}>Sign In</a>
          <button className="h-lift" style={css("font:600 14px/1 'Sora';color:#fff;background:#e8232e;border:none;padding:11px 20px;border-radius:10px;cursor:pointer;transition:transform .15s")}>Get Started</button>
        </div>
      </nav>

      {/* HERO A — full-bleed video, content bottom-left */}
      <header style={css('position:relative;min-height:100vh;display:flex;align-items:flex-end;overflow:hidden')}>
        {/* video moved to the fixed full-page backdrop (.lh-bg) above */}
        {/* legibility scrims */}
        <div style={css('position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,9,11,.82) 0%,rgba(8,9,11,.42) 38%,rgba(8,9,11,.05) 68%,transparent 100%)')} />
        <div style={css('position:absolute;inset:0;background:linear-gradient(0deg,rgba(8,9,11,.96) 0%,rgba(8,9,11,.28) 40%,transparent 62%)')} />
        <div style={css('position:absolute;inset:0;background:radial-gradient(120% 120% at 48% 42%,transparent 55%,rgba(0,0,0,.42) 100%)')} />
        {/* cinematic framing + fade-from-black open */}
        <div className="lh-vignette" />
        <div className="lh-cinebars" />
        <div className="lh-curtain" />

        {/* floating stat overlay */}
        <div className="ag-hero-stats lh-rise" style={{ ...css('position:absolute;right:48px;bottom:120px;display:flex;flex-direction:column;gap:12px;z-index:3'), animationDelay: '1.15s' }}>
          <div style={css('display:flex;gap:12px')}>
            <div style={css('min-width:150px;padding:16px 18px;border-radius:14px;background:rgba(16,19,22,.55);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);animation:floaty 6s ease-in-out infinite')}>
              <div data-count="2.4" data-decimals="1" data-suffix="M" style={css("font:700 26px/1 'Sora';color:#e8232e")}>2.4M</div>
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
          <div style={css('display:inline-flex;align-items:center;gap:9px;padding:7px 14px;border-radius:999px;border:1px solid rgba(232,35,46,.35);background:rgba(232,35,46,.08);margin-bottom:26px')}>
            <span style={css('width:7px;height:7px;border-radius:50%;background:#e8232e;box-shadow:0 0 10px #e8232e')} />
            <span style={css("font:500 12px/1 'JetBrains Mono',monospace;letter-spacing:.1em;color:#e8232e")}>AI-POWERED SPORTS ANALYTICS</span>
          </div>
          <h1 className="ag-h1" style={css("font:800 50px/1.06 'Sora';letter-spacing:-.025em;margin:0 0 16px;text-wrap:balance")}>
            Unlock <span style={css('color:#e8232e')}>Elite</span> Tennis &amp; Pickleball Analytics
          </h1>
          <p style={css("font:400 17px/1.6 'Sora';color:#cfd5db;max-width:440px;margin:0 0 30px")}>
            Transform every match into actionable insights with AI-powered performance analytics, shot tracking, player trends, and advanced visualizations.
          </p>
          <div style={css('display:flex;align-items:center;gap:16px;flex-wrap:wrap')}>
            <button onClick={openDashboard} className="h-lift" style={css("display:inline-flex;align-items:center;gap:10px;font:700 16px/1 'Sora';color:#fff;background:#e8232e;border:none;padding:18px 30px;border-radius:13px;cursor:pointer;transition:transform .15s")}>View Analytics →</button>
            <button className="h-glass" style={css("display:inline-flex;align-items:center;gap:14px;font:600 15px/1 'Sora';color:#eef1f3;padding:11px 22px 11px 12px;border-radius:13px;background:rgba(255,255,255,.07);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.16);cursor:pointer;transition:background .15s")}>
              <span style={css('width:38px;height:38px;border-radius:50%;background:#e8232e;display:flex;align-items:center;justify-content:center;animation:glowPulse 2.4s infinite')}>
                <span style={css('width:0;height:0;border-style:solid;border-width:7px 0 7px 11px;border-color:transparent transparent transparent #fff;margin-left:3px')} />
              </span>
              Watch Trailer
            </button>
          </div>
        </div>
        <div style={css('position:absolute;left:50%;bottom:28px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:9px;z-index:4')}>
          <span style={css("font:500 10px/1 'JetBrains Mono',monospace;letter-spacing:.22em;color:rgba(255,255,255,.42)")}>SCROLL</span>
          <span style={css('width:1px;height:34px;background:linear-gradient(#e8232e,transparent)')} />
        </div>
      </header>

      {/* FEATURES */}
      <section style={css('padding:120px 0;background:rgba(10,11,13,.84)')}>
        <div className="ag-pad" style={css('max-width:1240px;margin:0 auto;padding:0 48px')}>
        <div data-reveal className="ag-split" style={css('display:grid;grid-template-columns:1.05fr .95fr;gap:52px;align-items:center;margin-bottom:64px')}>
          <div>
            <div style={css("font:500 12px/1 'JetBrains Mono',monospace;letter-spacing:.16em;color:#e8232e;margin-bottom:18px")}>FEATURES</div>
            <h2 className="ag-h2" style={css("font:700 50px/1.06 'Sora';letter-spacing:-.025em;margin:0 0 18px;text-wrap:balance")}>Powerful Analytics Built for Modern Athletes</h2>
            <p style={css("font:400 18px/1.6 'Sora';color:#9aa3ad;margin:0")}>Everything you need to understand performance, improve strategy, and gain a competitive edge.</p>
          </div>
          <div style={css('position:relative;border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.08);box-shadow:0 30px 70px rgba(0,0,0,.45);aspect-ratio:16/10')}>
            <img src="/assets/features.png" alt="Tennis and pickleball athletes mid-action" style={css('position:absolute;inset:0;width:100%;height:100%;object-fit:cover')} />
            <div style={css('position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(10,11,13,.5))')} />
          </div>
        </div>
        <div data-reveal className="ag-feature-grid" style={css('display:grid;grid-template-columns:repeat(3,1fr);gap:20px')}>
          {FEATURES.map((f) => (
            <div key={f.title} className="h-feature" style={css('position:relative;padding:32px;border-radius:18px;background:linear-gradient(160deg,#13171c,#0f1216);border:1px solid rgba(255,255,255,.07);box-shadow:inset 0 1px 0 rgba(255,255,255,.04);transition:transform .25s,border-color .25s,box-shadow .25s')}>
              <div style={css('width:54px;height:54px;border-radius:14px;background:linear-gradient(145deg,rgba(232,35,46,.16),rgba(232,35,46,.04));border:1px solid rgba(232,35,46,.22);box-shadow:inset 0 1px 0 rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;margin-bottom:22px')}>
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
              <div style={css("font:500 12px/1 'JetBrains Mono',monospace;letter-spacing:.16em;color:#e8232e;margin-bottom:18px")}>METRICS &amp; ANALYTICS</div>
              <h2 className="ag-h2" style={css("font:700 50px/1.06 'Sora';letter-spacing:-.025em;margin:0;text-wrap:balance")}>Detailed Sports Analytics</h2>
            </div>
            <button onClick={openDashboard} className="h-outline" style={css("display:inline-flex;align-items:center;gap:10px;font:600 15px/1 'Sora';color:#e8232e;background:transparent;border:1px solid rgba(232,35,46,.4);padding:15px 24px;border-radius:12px;cursor:pointer;transition:background .15s")}>Explore Visualizations →</button>
          </div>

          {/* KPI cards */}
          <div data-reveal className="ag-kpi-grid" style={css('display:grid;grid-template-columns:repeat(6,1fr);gap:14px;margin-bottom:24px')}>
            <Kpi label="WIN RATE" delta="▲ 4.2%" deltaColor="#46d18a" value={<div data-count="68" data-suffix="%" style={css("font:700 34px/1 'Sora';color:#e8232e")}>68%</div>} />
            <Kpi label="SERVE ACCURACY" delta="▲ 2.1%" deltaColor="#46d18a" value={<div data-count="82" data-suffix="%" style={css("font:700 34px/1 'Sora'")}>82%</div>} />
            <Kpi label="RALLY SUCCESS" delta="▲ 1.4%" deltaColor="#46d18a" value={<div data-count="74" data-suffix="%" style={css("font:700 34px/1 'Sora'")}>74%</div>} />
            <Kpi label="SHOT CONSISTENCY" delta="— stable" deltaColor="#9aa3ad" value={<div data-count="91" style={css("font:700 34px/1 'Sora'")}>91</div>} />
            <Kpi label="COURT COVERAGE" delta="▲ 0.6" deltaColor="#46d18a" value={
              <div style={css("font:700 34px/1 'Sora'")}>
                <span data-count="8.7" data-decimals="1">8.7</span>
                <span style={css('font-size:18px;color:#6b7480')}>/10</span>
              </div>
            } />
            <Kpi label="MATCH EFFICIENCY" delta="▼ 1.1%" deltaColor="#e0573a" value={<div data-count="76" data-suffix="%" style={css("font:700 34px/1 'Sora';color:#e8232e")}>76%</div>} />
          </div>

          {/* dashboard preview mockup */}
          <div data-reveal style={css('border-radius:22px;background:#141820;border:1px solid rgba(255,255,255,.08);box-shadow:0 40px 90px rgba(0,0,0,.4);overflow:hidden')}>
            <div style={css('display:flex;align-items:center;gap:8px;padding:16px 22px;border-bottom:1px solid rgba(255,255,255,.06)')}>
              <span style={css('width:11px;height:11px;border-radius:50%;background:#3a4049')} />
              <span style={css('width:11px;height:11px;border-radius:50%;background:#3a4049')} />
              <span style={css('width:11px;height:11px;border-radius:50%;background:#3a4049')} />
              <span style={css("margin-left:14px;font:500 12px/1 'JetBrains Mono',monospace;color:#6b7480")}>analytigo.app / dashboard / performance</span>
            </div>
            <div className="ag-preview-body" style={css('padding:26px;display:grid;grid-template-columns:1.6fr 1fr;gap:18px')}>
              {/* trend */}
              <div style={css('grid-column:1 / -1;padding:22px;border-radius:15px;background:#0e1114;border:1px solid rgba(255,255,255,.06)')}>
                <div style={css('display:flex;align-items:center;justify-content:space-between;margin-bottom:18px')}>
                  <span style={css("font:600 14px/1 'Sora'")}>Performance Trends</span>
                  <span style={css("font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad")}>LAST 12 MATCHES</span>
                </div>
                <svg viewBox="0 0 760 150" width="100%" height="150" preserveAspectRatio="none">
                  <line x1="0" y1="37" x2="760" y2="37" stroke="rgba(255,255,255,.05)" />
                  <line x1="0" y1="75" x2="760" y2="75" stroke="rgba(255,255,255,.05)" />
                  <line x1="0" y1="113" x2="760" y2="113" stroke="rgba(255,255,255,.05)" />
                  <polyline points="0,150 0,118 70,100 140,108 210,78 280,86 350,58 420,64 490,40 560,52 630,30 700,36 760,22 760,150" fill="url(#gradM)" stroke="none" />
                  <polyline points="0,118 70,100 140,108 210,78 280,86 350,58 420,64 490,40 560,52 630,30 700,36 760,22" fill="none" stroke="#e8232e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" pathLength="1" style={css('stroke-dasharray:1;stroke-dashoffset:1;animation:drawLine 1.8s ease-out forwards')} />
                  <polyline points="0,132 70,124 140,128 210,118 280,122 350,110 420,114 490,104 560,110 630,98 700,102 760,94" fill="none" stroke="#57c8ff" strokeWidth="2" strokeDasharray="4 5" opacity=".55" />
                  <defs>
                    <linearGradient id="gradM" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0" stopColor="#e8232e" stopOpacity=".28" />
                      <stop offset="1" stopColor="#e8232e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
                <div style={css('display:flex;gap:20px;margin-top:14px')}>
                  <span style={css("display:flex;align-items:center;gap:7px;font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad")}><span style={css('width:14px;height:3px;background:#e8232e;border-radius:2px')} />YOUR FORM</span>
                  <span style={css("display:flex;align-items:center;gap:7px;font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad")}><span style={css('width:14px;height:3px;background:#57c8ff;border-radius:2px')} />TOUR AVERAGE</span>
                </div>
              </div>
              {/* heatmap */}
              <div style={css('padding:22px;border-radius:15px;background:#0e1114;border:1px solid rgba(255,255,255,.06)')}>
                <div style={css("font:600 14px/1 'Sora';margin-bottom:6px")}>Court Heat Map</div>
                <div style={css("font:500 11px/1 'JetBrains Mono',monospace;color:#9aa3ad;margin-bottom:18px")}>COVERAGE DENSITY</div>
                <div style={css('aspect-ratio:1.1;border:1.5px solid rgba(255,255,255,.18);border-radius:6px;padding:6px;display:grid;grid-template-columns:repeat(6,1fr);grid-template-rows:repeat(6,1fr);gap:4px;position:relative')}>
                  <div style={css('position:absolute;left:0;right:0;top:50%;height:1.5px;background:rgba(255,255,255,.18)')} />
                  {HEAT.map((o, i) => (
                    <div key={i} style={{ background: `rgba(232,35,46,${o})`, borderRadius: '3px' }} />
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
                      <div style={css(`width:100%;height:${b.h};background:${b.grad ? 'linear-gradient(#e8232e,#b4151f)' : '#2a313a'};border-radius:6px 6px 0 0;transform-origin:bottom;animation:growBar .8s ease-out${b.d} forwards`)} />
                      <span style={css("font:500 10px/1 'JetBrains Mono',monospace;color:#9aa3ad")}>{b.l}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FULL WIDTH CTA */}
      <section className="ag-pad" style={css('position:relative;overflow:hidden;padding:130px 48px')}>
        <div style={css('position:absolute;inset:0;background:radial-gradient(120% 120% at 82% 18%,rgba(21,34,29,.82) 0%,rgba(11,16,19,.86) 50%,rgba(8,9,11,.9) 100%)')} />
        <div style={css('position:absolute;inset:0;opacity:.5;background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);background-size:64px 64px')} />
        <svg style={css('position:absolute;right:0;bottom:0;width:62%;height:72%;opacity:.55')} viewBox="0 0 600 300" preserveAspectRatio="none">
          <polyline points="0,262 80,232 160,250 240,178 320,202 400,120 480,150 560,66 600,86" fill="none" stroke="rgba(232,35,46,.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={css('position:absolute;top:-10%;right:6%;width:46%;height:64%;background:radial-gradient(circle,rgba(232,35,46,.14),transparent 62%)')} />
        <div style={css("position:absolute;left:26px;bottom:20px;font:500 11px/1 'JetBrains Mono',monospace;letter-spacing:.16em;color:rgba(255,255,255,.28)")}>[ SPORTS IMAGERY · action shot ]</div>
        <div style={css('position:absolute;inset:0;background:linear-gradient(90deg,rgba(8,9,11,.96) 0%,rgba(8,9,11,.72) 50%,rgba(8,9,11,.42) 100%)')} />
        <div data-reveal className="ag-split" style={css('position:relative;z-index:2;max-width:1240px;margin:0 auto;display:grid;grid-template-columns:1.1fr .9fr;gap:60px;align-items:center')}>
          <div>
            <div style={css("font:500 12px/1 'JetBrains Mono',monospace;letter-spacing:.16em;color:#e8232e;margin-bottom:20px")}>YOUR GAME · YOUR DATA</div>
            <h2 className="ag-h2" style={css("font:800 56px/1.04 'Sora';letter-spacing:-.03em;margin:0 0 22px;text-wrap:balance")}>Discover Your Personal Performance Story</h2>
            <p style={css("font:400 18px/1.65 'Sora';color:#b3bcc5;max-width:540px;margin:0 0 36px")}>Access personalized statistics, performance history, strengths, weaknesses, and AI-generated recommendations tailored to your game.</p>
            <div style={css('display:flex;gap:16px;flex-wrap:wrap')}>
              <button onClick={openDashboard} className="h-lift" style={css("font:700 16px/1 'Sora';color:#fff;background:#e8232e;border:none;padding:18px 30px;border-radius:13px;cursor:pointer;transition:transform .15s")}>View My Stats</button>
              <button className="h-glass" style={css("font:600 16px/1 'Sora';color:#eef1f3;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.16);padding:18px 30px;border-radius:13px;cursor:pointer;transition:background .15s")}>Start Free Analysis</button>
            </div>
          </div>
          {/* player profile preview */}
          <div style={css('display:flex;flex-direction:column;gap:14px')}>
            <div style={css('padding:22px;border-radius:18px;background:rgba(20,24,32,.7);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.1);display:flex;align-items:center;gap:16px')}>
              <div style={css("width:58px;height:58px;border-radius:14px;background:#0e1114;border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font:500 9px/1 'JetBrains Mono',monospace;color:#6b7480;text-align:center")}>PLAYER<br />PHOTO</div>
              <div style={css('flex:1')}>
                <div style={css("font:700 19px/1 'Sora'")}>Jordan Avery</div>
                <div style={css("font:500 12px/1 'JetBrains Mono',monospace;color:#9aa3ad;margin-top:7px")}>SINGLES · UTR 9.4</div>
              </div>
              <div style={css('text-align:right')}>
                <div style={css("font:700 30px/1 'Sora';color:#e8232e")}>A+</div>
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
                <div style={css("font:700 30px/1 'Sora';color:#e8232e")}>7<span style={css('font-size:16px;color:#6b7480')}>&nbsp;wins</span></div>
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
              <span style={css("width:30px;height:30px;border-radius:8px;background:#e8232e;display:flex;align-items:center;justify-content:center;color:#fff;font:800 17px/1 'Sora'")}>A</span>
              <span style={css("font:700 20px/1 'Sora'")}>AnalytiGo</span>
            </div>
            <p style={css("font:400 15px/1.6 'Sora';color:#9aa3ad;margin:0 0 24px")}>Advanced analytics for tennis and pickleball athletes.</p>
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
