import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { css } from '../utils/css.js'

// AnalytiGo Home — a cinematic, interaction-gated experience:
//  1. On load, only the full-screen montage plays, with a "click to begin" prompt.
//  2. On first interaction (click / tap / scroll / key), the video settles into
//     the background and the UI reveals with staggered, Apple-keynote-style motion.
//  The montage stays fixed behind the hero and bleeds into the top of the sport
//  selector via a gradient, so it never hard-cuts.

const ICON_BOX_LIVE_RED = css(
  'width:56px;height:56px;border-radius:15px;background:linear-gradient(145deg,rgba(232,35,46,.18),rgba(232,35,46,.04));border:1px solid rgba(232,35,46,.28);display:flex;align-items:center;justify-content:center',
)
const ICON_BOX_LIVE_SOFT = css(
  'width:56px;height:56px;border-radius:15px;background:linear-gradient(145deg,rgba(232,35,46,.14),rgba(232,35,46,.03));border:1px solid rgba(232,35,46,.22);display:flex;align-items:center;justify-content:center',
)
const ICON_BOX_SOON = css(
  'width:56px;height:56px;border-radius:15px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center',
)

const GLASS_STAT_STR =
  'min-width:180px;padding:16px 18px;border-radius:16px;background:rgba(14,17,20,.5);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);border:1px solid rgba(255,255,255,.12);box-shadow:0 12px 44px rgba(0,0,0,.4)'
const STAT_LABEL = css(
  "font:500 11px/1.3 'JetBrains Mono',monospace;letter-spacing:.08em;color:#9aa3ad;margin-top:6px",
)

// count-up easing for the hero stats (run once on reveal)
function tween(el) {
  const target = parseFloat(el.getAttribute('data-count'))
  if (isNaN(target)) return
  const dec = parseInt(el.getAttribute('data-decimals') || '0', 10)
  const suf = el.getAttribute('data-suffix') || ''
  const dur = 1500
  const start = performance.now()
  const fmt = (v) => (dec > 0 ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US')) + suf
  const step = (now) => {
    const t = Math.min(1, (now - start) / dur)
    const e = 1 - Math.pow(1 - t, 3)
    el.textContent = fmt(target * e)
    if (t < 1) requestAnimationFrame(step)
    else el.textContent = fmt(target)
  }
  requestAnimationFrame(step)
}

function SportCard({ to, cardClass, cardStyle, iconBox, icon, badge, title, desc, descColor, cta, image }) {
  const inner = (
    <>
      {image && (
        <>
          <img src={image} alt="" aria-hidden="true" style={css('position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center;z-index:0')} />
          {/* readability gradient — image shows up top, darkens behind the copy */}
          <div style={css('position:absolute;inset:0;z-index:1;background:linear-gradient(180deg,rgba(8,10,13,.30) 0%,rgba(8,10,13,.52) 42%,rgba(8,10,13,.9) 100%)')} />
        </>
      )}
      <div style={css('position:relative;z-index:2;display:flex;align-items:flex-start;justify-content:space-between')}>
        <span style={iconBox}>{icon}</span>
        {badge}
      </div>
      <div style={css('position:relative;z-index:2;text-align:left')}>
        <h3 style={css("font:700 23px/1.2 'Sora';margin:0 0 8px")}>{title}</h3>
        <p style={css(`font:400 14px/1.55 'Sora';color:${descColor};margin:0 0 16px`)}>{desc}</p>
        {cta}
      </div>
    </>
  )
  const cardCss = css(image ? `${cardStyle};position:relative;overflow:hidden` : cardStyle)
  return to ? (
    <Link to={to} className={cardClass} style={cardCss}>
      {inner}
    </Link>
  ) : (
    <div className={cardClass} style={cardCss}>
      {inner}
    </div>
  )
}

// merge a css() style object with a stagger delay
const rv = (style, delay) => ({ ...css(style), transitionDelay: delay })

export default function Home() {
  const videoRef = useRef(null)
  const heroRef = useRef(null)
  const [started, setStarted] = useState(false)

  // keep the montage playing
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
  }, [])

  // intro: lock scroll and wait for the first interaction (click / scroll / key / tap)
  useEffect(() => {
    if (started) return
    document.documentElement.style.overflow = 'hidden'
    document.body.style.overflow = 'hidden'
    const begin = () => {
      setStarted(true)
      window.scrollTo(0, 0) // always enter at the very top of the hero
    }
    // scrolling must behave exactly like clicking: block the scroll so the page
    // never moves, then trigger the reveal (works on desktop wheel + mobile touch)
    const onScroll = (e) => {
      e.preventDefault()
      begin()
    }
    window.addEventListener('wheel', onScroll, { passive: false })
    window.addEventListener('touchmove', onScroll, { passive: false })
    window.addEventListener('keydown', begin)
    window.addEventListener('pointerdown', begin)
    return () => {
      window.removeEventListener('wheel', onScroll)
      window.removeEventListener('touchmove', onScroll)
      window.removeEventListener('keydown', begin)
      window.removeEventListener('pointerdown', begin)
    }
  }, [started])

  // on reveal: restore scroll, snap to the very top, and run the stat count-ups
  useEffect(() => {
    if (!started) return
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
    window.scrollTo(0, 0)
    const t = setTimeout(() => {
      heroRef.current
        ?.querySelectorAll('[data-count]:not([data-done])')
        .forEach((el) => {
          el.setAttribute('data-done', '1')
          tween(el)
        })
    }, 600)
    return () => clearTimeout(t)
  }, [started])

  // safety: always restore scroll on unmount
  useEffect(() => () => {
    document.documentElement.style.overflow = ''
    document.body.style.overflow = ''
  }, [])

  const scrollToSports = () =>
    document.getElementById('sports')?.scrollIntoView({ behavior: 'smooth' })

  return (
    <div className={started ? 'ag-home ag-on' : 'ag-home'} style={css('position:relative;background:#0a0b0d')}>
      {/* fixed background intro video */}
      <div className="ag-video-wrap">
        <video ref={videoRef} autoPlay muted loop playsInline preload="auto" poster="/assets/home-intro-poster.jpg" aria-hidden="true">
          <source src="/assets/home-intro.mp4" type="video/mp4" />
        </video>
      </div>
      {/* intro veil (clears on start) + film grain */}
      <div className="ag-intro-veil" style={css('position:fixed;inset:0;z-index:1;pointer-events:none;background:radial-gradient(130% 95% at 50% 100%,rgba(0,0,0,.6),transparent 56%),linear-gradient(180deg,rgba(0,0,0,.4),transparent 32%)')} />
      <div style={css('position:fixed;inset:0;z-index:60;pointer-events:none;opacity:.022;mix-blend-mode:overlay;background-image:radial-gradient(rgba(255,255,255,.9) .5px,transparent .6px);background-size:3px 3px')} />

      {/* intro prompt */}
      <div className="ag-prompt">
        <span className="ag-prompt-ring">
          <span style={css('width:0;height:0;border-style:solid;border-width:8px 0 8px 13px;border-color:transparent transparent transparent #fff;margin-left:4px')} />
        </span>
        <span className="ag-prompt-text">CLICK ANYWHERE TO BEGIN</span>
        <svg className="ag-chev" width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 9l6 6 6-6" stroke="rgba(255,255,255,.8)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* ===================== HERO ===================== */}
      <header ref={heroRef} style={css('position:relative;z-index:10;min-height:100vh;overflow:hidden;display:flex;flex-direction:column')}>
        <div className="ag-heroscrim" />

        {/* nav (drops in from the top) */}
        <nav className="ag-rv ag-rv-top ag-pad" style={{ ...css('position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:24px 48px'), transitionDelay: '.05s' }}>
          <Link to="/" style={css('display:flex;align-items:center;gap:11px')}>
            <span style={css("width:30px;height:30px;border-radius:8px;background:#e8232e;display:flex;align-items:center;justify-content:center;color:#fff;font:800 17px/1 'Sora'")}>A</span>
            <span style={css("font:700 20px/1 'Sora';letter-spacing:-.01em;text-shadow:0 1px 12px rgba(0,0,0,.6)")}>AnalytiGo</span>
          </Link>
          <div style={css('display:flex;align-items:center;gap:16px')}>
            <a className="h-signin" style={css("font:600 14px/1 'Sora';color:#eef1f3;cursor:pointer;text-shadow:0 1px 10px rgba(0,0,0,.6)")}>Sign In</a>
            <button className="h-lift" style={css("font:600 14px/1 'Sora';color:#fff;background:#e8232e;border:none;padding:11px 20px;border-radius:10px;cursor:pointer;transition:transform .15s;box-shadow:0 8px 26px rgba(232,35,46,.4)")}>Get Started</button>
          </div>
        </nav>

        {/* hero copy — left, staggered from the left */}
        <div className="ag-pad" style={css('position:relative;z-index:2;flex:1;display:flex;align-items:flex-end;width:100%;max-width:1240px;margin:0 auto;padding:18px 48px 48px')}>
          {/* compact hero content card — premium glass overlay, bottom-left */}
          <div className="ag-rv" style={{ ...css('max-width:430px;text-align:left;padding:24px 28px 28px;border-radius:18px;background:rgba(13,15,19,.55);backdrop-filter:blur(22px) saturate(1.08);-webkit-backdrop-filter:blur(22px) saturate(1.08);border:1px solid rgba(255,255,255,.12);box-shadow:0 24px 64px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.07)'), transitionDelay: '.1s' }}>
            <div className="ag-rv ag-rv-left" style={rv('display:inline-flex;align-items:center;gap:8px;padding:6px 13px;border-radius:999px;border:1px solid rgba(232,35,46,.45);background:rgba(232,35,46,.16);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);box-shadow:0 6px 24px rgba(0,0,0,.35);margin-bottom:16px', '.15s')}>
              <span style={css('width:6px;height:6px;border-radius:50%;background:#e8232e;box-shadow:0 0 10px #e8232e')} />
              <span style={css("font:600 10.5px/1 'JetBrains Mono',monospace;letter-spacing:.1em;color:#ff5a62")}>MULTI-SPORT ANALYTICS PLATFORM</span>
            </div>
            <h1 className="ag-rv ag-rv-left" style={rv("font:800 34px/1.12 'Sora';letter-spacing:-.02em;margin:0 0 12px;text-wrap:balance;text-shadow:0 1px 12px rgba(0,0,0,.5)", '.27s')}>
              Smarter analytics for <span style={css('color:#ff3b44;text-shadow:0 0 24px rgba(232,35,46,.5)')}>every sport</span> you play
            </h1>
            <p className="ag-rv ag-rv-left" style={rv("font:400 14px/1.55 'Sora';color:#e7ebee;margin:0 0 22px", '.39s')}>
              AI-powered performance insights, shot tracking, and advanced visualizations — built for the way each game is played.
            </p>
            <div className="ag-rv ag-rv-left" style={rv('display:flex;align-items:center;gap:12px;flex-wrap:wrap', '.51s')}>
              <button onClick={scrollToSports} className="h-lift" style={css("display:inline-flex;align-items:center;gap:8px;font:700 14px/1 'Sora';color:#fff;background:#e8232e;border:none;padding:13px 22px;border-radius:11px;cursor:pointer;transition:transform .15s;box-shadow:0 12px 28px rgba(232,35,46,.42)")}>Choose Your Sport ↓</button>
              <button className="h-glass" style={css("display:inline-flex;align-items:center;gap:10px;font:600 13px/1 'Sora';color:#eef1f3;padding:8px 18px 8px 9px;border-radius:11px;background:rgba(255,255,255,.08);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(255,255,255,.18);cursor:pointer;transition:background .15s")}>
                <span style={css('width:30px;height:30px;border-radius:50%;background:#e8232e;display:flex;align-items:center;justify-content:center;animation:glowPulse 2.4s infinite')}>
                  <span style={css('width:0;height:0;border-style:solid;border-width:5px 0 5px 8px;border-color:transparent transparent transparent #fff;margin-left:2px')} />
                </span>
                Watch Trailer
              </button>
            </div>
          </div>
        </div>

        {/* floating glass stats (bottom-right) */}
        <div className="ag-home-stats" style={css('position:absolute;right:48px;bottom:7%;z-index:2;display:flex;flex-direction:column;gap:12px')}>
          <div className="ag-rv ag-rv-up" style={rv(GLASS_STAT_STR, '.6s')}>
            <div data-count="2.4" data-decimals="1" data-suffix="M" style={css("font:700 26px/1 'Sora';color:#e8232e")}>2.4M</div>
            <div style={STAT_LABEL}>MATCHES ANALYZED</div>
          </div>
          <div className="ag-rv ag-rv-up" style={rv(GLASS_STAT_STR, '.72s')}>
            <div data-count="180" data-suffix="K" style={css("font:700 26px/1 'Sora'")}>180K</div>
            <div style={STAT_LABEL}>ACTIVE PLAYERS</div>
          </div>
          <div className="ag-rv ag-rv-up" style={rv(GLASS_STAT_STR, '.84s')}>
            <div data-count="5.6" data-decimals="1" data-suffix="M" style={css("font:700 26px/1 'Sora'")}>5.6M</div>
            <div style={STAT_LABEL}>REPORTS GENERATED</div>
          </div>
        </div>
      </header>

      {/* ===================== SPORT SELECTOR ===================== */}
      <section id="sports" className="ag-pad" style={css('position:relative;z-index:10;padding:88px 48px 96px;overflow:hidden;background:linear-gradient(180deg,rgba(10,11,13,0) 0%,rgba(10,11,13,.55) 16%,rgba(10,11,13,.9) 38%,#0a0b0d 60%)')}>
        <div style={css('position:absolute;top:8%;left:50%;transform:translateX(-50%);width:70%;height:50%;background:radial-gradient(ellipse at center,rgba(232,35,46,.1),transparent 62%);pointer-events:none')} />

        <div style={css('position:relative;z-index:10;max-width:1240px;margin:0 auto')}>
          <div className="ag-rv ag-rv-up" style={rv('text-align:center;margin-bottom:34px', '.15s')}>
            <div style={css('display:inline-flex;align-items:center;gap:10px;margin-bottom:14px')}>
              <span style={css('width:30px;height:1px;background:rgba(255,255,255,.25)')} />
              <span style={css("font:600 11px/1 'JetBrains Mono',monospace;letter-spacing:.18em;color:#e8232e")}>CHOOSE YOUR SPORT</span>
              <span style={css('width:30px;height:1px;background:rgba(255,255,255,.25)')} />
            </div>
            <h2 className="ag-h2" style={css("font:800 40px/1.05 'Sora';letter-spacing:-.025em;margin:0 0 12px;text-wrap:balance;text-shadow:0 2px 24px rgba(0,0,0,.6)")}>Pick your game</h2>
            <p style={css("font:400 17px/1.6 'Sora';color:#aab2bb;max-width:520px;margin:0 auto;text-shadow:0 1px 14px rgba(0,0,0,.6)")}>Two sports live now, with more on the way. Jump in and explore the analytics built for how you play.</p>
          </div>

          {/* sport cards */}
          <div className="ag-rv ag-rv-up ag-sport-grid" style={rv('display:grid;grid-template-columns:repeat(4,1fr);gap:20px;width:100%', '.3s')}>
            <SportCard
              to="/pickleball"
              cardClass="h-card-pickle"
              image="/assets/card-pickleball.jpg"
              cardStyle="display:flex;flex-direction:column;justify-content:space-between;min-height:264px;padding:28px;border-radius:20px;background:linear-gradient(160deg,#16191d,#0f1216);border:1px solid rgba(232,35,46,.4);box-shadow:0 24px 60px rgba(232,35,46,.1);cursor:pointer;transition:transform .25s,border-color .25s,box-shadow .25s"
              iconBox={ICON_BOX_LIVE_RED}
              icon={
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#e8232e" strokeWidth="1.6" />
                  <circle cx="9" cy="9.5" r="1.1" fill="#e8232e" />
                  <circle cx="13.5" cy="9" r="1.1" fill="#e8232e" />
                  <circle cx="10.5" cy="13.5" r="1.1" fill="#e8232e" />
                  <circle cx="15" cy="13" r="1.1" fill="#e8232e" />
                </svg>
              }
              badge={<span style={css("font:600 9px/1 'JetBrains Mono',monospace;letter-spacing:.12em;color:#fff;background:#e8232e;padding:5px 9px;border-radius:6px")}>LIVE</span>}
              title="Pickleball"
              desc="Shot tracking, kitchen play, and rally analytics."
              descColor="#9aa3ad"
              cta={<span style={css("display:inline-flex;align-items:center;gap:7px;font:600 13px/1 'Sora';color:#e8232e")}>Explore →</span>}
            />

            <SportCard
              to="/tennis"
              cardClass="h-card-tennis"
              image="/assets/card-tennis.jpg"
              cardStyle="display:flex;flex-direction:column;justify-content:space-between;min-height:264px;padding:28px;border-radius:20px;background:linear-gradient(160deg,#13171c,#0f1216);border:1px solid rgba(255,255,255,.07);cursor:pointer;transition:transform .25s,border-color .25s,box-shadow .25s"
              iconBox={ICON_BOX_LIVE_SOFT}
              icon={
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#e8232e" strokeWidth="1.6" />
                  <path d="M5.5 6.5C9 9 9 15 5.5 17.5M18.5 6.5C15 9 15 15 18.5 17.5" stroke="#e8232e" strokeWidth="1.4" />
                </svg>
              }
              badge={<span style={css("font:600 9px/1 'JetBrains Mono',monospace;letter-spacing:.12em;color:#46d18a;border:1px solid rgba(70,209,138,.4);padding:5px 9px;border-radius:6px")}>LIVE</span>}
              title="Tennis"
              desc="Serve, return, and full rally intelligence."
              descColor="#9aa3ad"
              cta={<span style={css("display:inline-flex;align-items:center;gap:7px;font:600 13px/1 'Sora';color:#e8232e")}>Explore →</span>}
            />

            <SportCard
              cardStyle="display:flex;flex-direction:column;justify-content:space-between;min-height:264px;padding:28px;border-radius:20px;background:linear-gradient(160deg,#101216,#0d0f12);border:1px solid rgba(255,255,255,.05);opacity:.72"
              iconBox={ICON_BOX_SOON}
              icon={
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#8b95a1" strokeWidth="1.6" />
                  <path d="M3 12h18M12 3v18M5.5 5.5c4 3 9 3 13 0M5.5 18.5c4-3 9-3 13 0" stroke="#8b95a1" strokeWidth="1.2" />
                </svg>
              }
              badge={<span style={css("font:600 9px/1 'JetBrains Mono',monospace;letter-spacing:.1em;color:#8b95a1;border:1px solid rgba(255,255,255,.12);padding:5px 9px;border-radius:6px")}>SOON</span>}
              title="Basketball"
              desc="Shooting, possession, and court coverage."
              descColor="#7d8691"
              cta={<span style={css("display:inline-flex;align-items:center;gap:7px;font:600 13px/1 'Sora';color:#7d8691")}>Coming soon</span>}
            />

            <SportCard
              cardStyle="display:flex;flex-direction:column;justify-content:space-between;min-height:264px;padding:28px;border-radius:20px;background:linear-gradient(160deg,#101216,#0d0f12);border:1px solid rgba(255,255,255,.05);opacity:.72"
              iconBox={ICON_BOX_SOON}
              icon={
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#8b95a1" strokeWidth="1.6" />
                  <path d="M12 3c-3 5-3 10 0 18M4 8c5 2 11 1 15-3M5 18c3-4 9-6 15-4" stroke="#8b95a1" strokeWidth="1.2" />
                </svg>
              }
              badge={<span style={css("font:600 9px/1 'JetBrains Mono',monospace;letter-spacing:.1em;color:#8b95a1;border:1px solid rgba(255,255,255,.12);padding:5px 9px;border-radius:6px")}>SOON</span>}
              title="Volleyball"
              desc="Sets, spikes, and rotation efficiency."
              descColor="#7d8691"
              cta={<span style={css("display:inline-flex;align-items:center;gap:7px;font:600 13px/1 'Sora';color:#7d8691")}>Coming soon</span>}
            />
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="ag-rv ag-rv-up ag-pad" style={css('position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding:24px 48px;border-top:1px solid rgba(255,255,255,.06);background:#0a0b0d')}>
        <span style={css("font:400 13px/1 'JetBrains Mono',monospace;color:#7d8691")}>© 2026 AnalytiGo. All rights reserved.</span>
        <span style={css("font:400 13px/1 'Sora';color:#7d8691")}>Advanced analytics for every athlete.</span>
      </footer>
    </div>
  )
}
