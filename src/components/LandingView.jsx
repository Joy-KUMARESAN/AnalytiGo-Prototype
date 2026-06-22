import { Link } from 'react-router-dom'
import { css } from '../utils/css.js'

// Pickleball marketing view — a single hero screen (lower sections removed).

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
    </div>
  )
}
