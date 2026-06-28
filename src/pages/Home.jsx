import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { css } from '../utils/css.js'
import EliteProfiles from '../components/EliteProfiles.jsx'
import FaceOff from '../components/FaceOff.jsx'

// Lvl-Up Home — a cinematic, interaction-gated experience:
//  1. On load, only the full-screen montage plays, with a "click to begin" prompt.
//  2. On first interaction (click / tap / scroll / key), the video settles into
//     the background and the UI reveals with staggered, Apple-keynote-style motion.
//  The montage stays fixed behind the hero and bleeds into the top of the sport
//  selector via a gradient, so it never hard-cuts.

const ICON_BOX_LIVE_RED = css(
  'width:56px;height:56px;border-radius:15px;background:linear-gradient(145deg,rgba(166,77,255,.18),rgba(166,77,255,.04));border:1px solid rgba(166,77,255,.28);display:flex;align-items:center;justify-content:center',
)
const ICON_BOX_LIVE_SOFT = css(
  'width:56px;height:56px;border-radius:15px;background:linear-gradient(145deg,rgba(166,77,255,.14),rgba(166,77,255,.03));border:1px solid rgba(166,77,255,.22);display:flex;align-items:center;justify-content:center',
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

// Pick Your Game is a scroll-PINNED stage: the section is a tall track, an inner
// 100vh stage sticks to the viewport, and scroll progress through the track drives
// the reveal — first the heading slides in, then each card flies in one-by-one from
// far outside the viewport. dx/dy are fractions of viewport width/height; win is the
// [start,end] slice of pin progress (0→1) over which each card travels.
const REVEAL_CARDS = [
  { dx: -1.2, dy: 0, s: 1, win: [0.15, 0.37] },   // Pickleball — far left, off-screen
  { dx: 1.2, dy: 0, s: 1, win: [0.32, 0.54] },    // Tennis — far right, off-screen
  { dx: 0, dy: -1.15, s: 1, win: [0.49, 0.71] },  // Basketball — far top, off-screen
  { dx: 0, dy: 1.15, s: 0.5, win: [0.66, 0.88] }, // Volleyball — far bottom + scale-up
]
const cardInitStyle = (c) => ({
  display: 'grid',
  opacity: 0,
  transform: `translate(${c.dx * 100}vw, ${c.dy * 100}vh) scale(${c.s})`,
  filter: 'blur(8px)',
  // long, eased transitions give a slow, cinematic settle as scroll scrubs the value
  transition: 'opacity .4s ease-out, transform .55s cubic-bezier(.22,.61,.36,1), filter .45s ease-out',
  willChange: 'opacity, transform',
})
// ambient floating particles / light motes for the hero (premium depth)
const HERO_FX = [
  { l: '12%', t: '30%', s: '5px', o: 0.5, d: '13s', delay: '0s' },
  { l: '22%', t: '68%', s: '3px', o: 0.4, d: '17s', delay: '2s' },
  { l: '34%', t: '20%', s: '4px', o: 0.45, d: '15s', delay: '4s' },
  { l: '46%', t: '78%', s: '6px', o: 0.5, d: '19s', delay: '1s' },
  { l: '58%', t: '24%', s: '3px', o: 0.35, d: '16s', delay: '3s' },
  { l: '66%', t: '60%', s: '5px', o: 0.5, d: '14s', delay: '5s' },
  { l: '76%', t: '34%', s: '4px', o: 0.45, d: '18s', delay: '2.5s' },
  { l: '86%', t: '70%', s: '3px', o: 0.4, d: '15s', delay: '6s' },
  { l: '7%', t: '52%', s: '4px', o: 0.4, d: '20s', delay: '1.5s' },
  { l: '92%', t: '44%', s: '5px', o: 0.45, d: '17s', delay: '4.5s' },
]
// Scroll-pinned hero reveal: four sport shots fly in around the headline, one per
// scroll stage. dx/dy are the off-screen start offset (fraction of viewport); win is
// the [start,end] slice of pin progress over which each shot travels in.
const HERO_SHOTS = [
  { src: '/assets/hero-shot-1.png', place: 'top:12%;left:2.5%', dx: -0.36, dy: -0.3, rot: -5, win: [0.04, 0.30] },
  { src: '/assets/hero-shot-2.png', place: 'top:12%;right:2.5%', dx: 0.36, dy: -0.3, rot: 5, win: [0.27, 0.53] },
  { src: '/assets/hero-shot-3.png', place: 'bottom:9%;left:2.5%', dx: -0.36, dy: 0.3, rot: 5, win: [0.5, 0.74] },
  { src: '/assets/hero-shot-4.png', place: 'bottom:9%;right:2.5%', dx: 0.36, dy: 0.3, rot: -5, win: [0.7, 0.92] },
]
const shotInit = (c) => ({
  opacity: 0,
  transform: `translate3d(${c.dx * 100}vw, ${c.dy * 100}vh, 0) rotate(${c.rot * 3}deg) scale(.7)`,
  filter: 'blur(8px)',
  transition: 'none',
  willChange: 'transform, opacity',
})
const shotFinal = (c) => ({
  opacity: 1,
  transform: `translate3d(0,0,0) rotate(${c.rot}deg) scale(1)`,
  filter: 'none',
  transition: 'none',
  willChange: 'transform, opacity',
})
// heading enters first, dramatically — rises + fades + unblurs from below
const HEADING_INIT = {
  opacity: 0,
  transform: 'translateY(80px) scale(.92)',
  filter: 'blur(12px)',
  transition: 'opacity .45s ease-out, transform .6s cubic-bezier(.22,.61,.36,1), filter .5s ease-out',
  willChange: 'opacity, transform',
}
// settled state once the section has unlocked — fully visible, NO transition so the
// switch from pin to normal block is instant (never a fade or flash)
const CARD_DONE = { display: 'grid', opacity: 1, transform: 'none', filter: 'none', transition: 'none' }
const HEADING_DONE = { textAlign: 'center', marginBottom: '34px', opacity: 1, transform: 'none', filter: 'none', transition: 'none' }

export default function Home() {
  const videoRef = useRef(null)
  const heroRef = useRef(null)
  const cardsRef = useRef(null)
  const cardWrapRefs = useRef([])
  const trackRef = useRef(null)
  const headingRef = useRef(null)
  const fxRef = useRef(null)
  const copyRef = useRef(null)
  const heroTrackRef = useRef(null)
  const shotRefs = useRef([])
  const heroPendingRef = useRef(null)
  const heroDoneRef = useRef(false)
  const [heroDone, setHeroDone] = useState(false)
  const [started, setStarted] = useState(false)
  // one-time pin: once all four cards have fully revealed, the section unlocks and
  // behaves like a normal (un-pinned) block — no reverse animation, no re-pinning.
  const [unlocked, setUnlocked] = useState(false)
  const unlockedRef = useRef(false)
  const pendingScrollRef = useRef(null)

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

  // subtle hero parallax: ambient lighting drifts one way, the headline the other,
  // so the type feels like it floats above the video with real depth.
  useEffect(() => {
    const hero = heroRef.current
    if (!hero || window.matchMedia('(pointer: coarse)').matches) return
    let raf = 0
    const cur = { x: 0, y: 0 }
    const tgt = { x: 0, y: 0 }
    const loop = () => {
      cur.x += (tgt.x - cur.x) * 0.06
      cur.y += (tgt.y - cur.y) * 0.06
      if (fxRef.current) fxRef.current.style.transform = `translate3d(${(cur.x * 26).toFixed(1)}px, ${(cur.y * 20).toFixed(1)}px, 0)`
      raf = requestAnimationFrame(loop)
    }
    const onMove = (e) => {
      const r = hero.getBoundingClientRect()
      tgt.x = ((e.clientX - r.left) / r.width) * 2 - 1
      tgt.y = ((e.clientY - r.top) / r.height) * 2 - 1
    }
    const onLeave = () => { tgt.x = 0; tgt.y = 0 }
    hero.addEventListener('pointermove', onMove)
    hero.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(loop)
    return () => {
      hero.removeEventListener('pointermove', onMove)
      hero.removeEventListener('pointerleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Scroll-pinned cinematic hero reveal: the hero is a tall track with a sticky stage.
  // Scroll progress flies the four sport shots in one-by-one (reversible until done),
  // and the next section can't appear until all four have landed. Once complete the
  // hero unlocks for good (no replay) and normal scrolling resumes.
  useEffect(() => {
    const track = heroTrackRef.current
    if (!track) return
    let raf = 0
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)
    const writeShot = (i, e, lp, vw, vh) => {
      const el = shotRefs.current[i]
      if (!el) return
      const c = HERO_SHOTS[i]
      const tx = c.dx * vw * (1 - e)
      const ty = c.dy * vh * (1 - e)
      const rot = c.rot * (3 - 2 * e) // extra spin on entry → settles to a slight tilt
      const sc = 0.7 + 0.3 * e
      el.style.opacity = lp <= 0 ? '0' : e.toFixed(3)
      el.style.transform = `translate3d(${tx.toFixed(1)}px, ${ty.toFixed(1)}px, 0) rotate(${rot.toFixed(2)}deg) scale(${sc.toFixed(3)})`
      el.style.filter = lp <= 0 ? 'none' : `blur(${((1 - e) * 8).toFixed(2)}px)`
    }
    const update = () => {
      raf = 0
      if (heroDoneRef.current) return
      const vw = window.innerWidth || 1200
      const vh = window.innerHeight || 800
      if (vw <= 1080) { // desktop-only experience; hide the shots elsewhere
        for (let i = 0; i < HERO_SHOTS.length; i++) {
          const el = shotRefs.current[i]
          if (el) el.style.opacity = '0'
        }
        return
      }
      const rect = track.getBoundingClientRect()
      const span = rect.height - vh
      const p = span > 0 ? Math.max(0, Math.min(1, -rect.top / span)) : 0
      for (let i = 0; i < HERO_SHOTS.length; i++) {
        const c = HERO_SHOTS[i]
        const lp = Math.max(0, Math.min(1, (p - c.win[0]) / (c.win[1] - c.win[0])))
        writeShot(i, easeOut(lp), lp, vw, vh)
      }
      if (p >= 0.95) {
        heroDoneRef.current = true
        heroPendingRef.current = window.scrollY + rect.top
        setHeroDone(true)
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // hero unlocked: collapse the track to a normal block, lock the shots in place, and
  // re-anchor scroll synchronously so nothing visually jumps.
  useLayoutEffect(() => {
    if (!heroDone) return
    shotRefs.current.forEach((el, i) => {
      if (!el) return
      el.style.opacity = '1'
      el.style.transform = `translate3d(0,0,0) rotate(${HERO_SHOTS[i].rot}deg) scale(1)`
      el.style.filter = 'none'
    })
    if (heroPendingRef.current != null) {
      window.scrollTo(0, heroPendingRef.current)
      heroPendingRef.current = null
    }
  }, [heroDone])

  const scrollToSports = () =>
    document.getElementById('sports')?.scrollIntoView({ behavior: 'smooth' })

  // Scroll-pinned reveal. The section is a tall track; the inner stage sticks to the
  // viewport while the user scrolls through it. Pin progress (0→1) drives the heading
  // in first, then each card one-by-one from far off-screen — and the track can't be
  // scrolled past (next section can't appear) until every card is settled.
  useEffect(() => {
    let raf = 0
    const easeOut = (t) => 1 - Math.pow(1 - t, 3)
    const writeHeading = (he) => {
      const h = headingRef.current
      if (!h) return
      h.style.opacity = he <= 0 ? '0' : String(he)
      h.style.transform = `translateY(${(80 * (1 - he)).toFixed(1)}px) scale(${(0.92 + 0.08 * he).toFixed(3)})`
      h.style.filter = `blur(${((1 - he) * 12).toFixed(2)}px)`
    }
    const writeCard = (i, e, lp, vw, vh) => {
      const w = cardWrapRefs.current[i]
      if (!w) return
      const c = REVEAL_CARDS[i]
      w.style.opacity = lp <= 0 ? '0' : String(e) // no opacity preview before its window
      w.style.transform = `translate(${(c.dx * vw * (1 - e)).toFixed(1)}px, ${(c.dy * vh * (1 - e)).toFixed(1)}px) scale(${(c.s + (1 - c.s) * e).toFixed(3)})`
      w.style.filter = `blur(${((1 - e) * 8).toFixed(2)}px)`
    }
    const update = () => {
      raf = 0
      if (unlockedRef.current) return // section completed — it's a normal block now
      const track = trackRef.current
      if (!track) return
      const vw = window.innerWidth || 1200
      const vh = window.innerHeight || 800
      // Pinning only when the 100vh stage can comfortably hold the 4-up grid (desktop).
      // Below that the track collapses (CSS) and everything is simply shown.
      if (vw <= 1080) {
        writeHeading(1)
        for (let i = 0; i < REVEAL_CARDS.length; i++) writeCard(i, 1, 1, vw, vh)
        return
      }
      const rect = track.getBoundingClientRect()
      const span = rect.height - vh // pinnable scroll distance (px)
      const p = span > 0 ? Math.max(0, Math.min(1, -rect.top / span)) : 0
      writeHeading(easeOut(Math.max(0, Math.min(1, p / 0.15)))) // heading first
      for (let i = 0; i < REVEAL_CARDS.length; i++) {
        const c = REVEAL_CARDS[i]
        const lp = Math.max(0, Math.min(1, (p - c.win[0]) / (c.win[1] - c.win[0])))
        writeCard(i, easeOut(lp), lp, vw, vh)
      }
      // first full reveal complete → unlock the section permanently (this run).
      // Remember the current track-top so we can keep the stage visually in place
      // after the tall pin track collapses to a normal-height block.
      if (p >= 0.92) {
        unlockedRef.current = true
        pendingScrollRef.current = window.scrollY + rect.top
        setUnlocked(true)
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // When the section unlocks, the track collapses from a tall pin to a normal block.
  // Lock the cards/heading to their settled state and re-anchor scroll synchronously
  // (before paint) so the stage doesn't visually jump.
  useLayoutEffect(() => {
    if (!unlocked) return
    const h = headingRef.current
    if (h) { h.style.opacity = '1'; h.style.transform = 'none'; h.style.filter = 'none' }
    cardWrapRefs.current.forEach((w) => {
      if (w) { w.style.opacity = '1'; w.style.transform = 'none'; w.style.filter = 'none' }
    })
    if (pendingScrollRef.current != null) {
      window.scrollTo(0, pendingScrollRef.current)
      pendingScrollRef.current = null
    }
  }, [unlocked])

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
      <section ref={heroTrackRef} className="ag-hero-track" style={css(`position:relative;z-index:10;height:${heroDone ? 100 : 320}vh`)}>
      <header ref={heroRef} className="ag-hero-sticky" style={css(`position:${heroDone ? 'static' : 'sticky'};top:0;z-index:10;height:100vh;overflow:hidden;display:flex;flex-direction:column`)}>
        {/* frosted glass between video and content — softens & integrates the footage */}
        <div className="ag-hero-frost" />
        <div className="ag-heroscrim" />
        {/* purple/pink mood + legibility wash — video stays visible behind it */}
        <div className="ag-hero-tint" />
        {/* animated brand-color lighting + ambient motes (parallax wrapper) */}
        <div className="ag-hero-fx" ref={fxRef}>
          <div className="ag-hero-aurora" />
          <div className="ag-hero-particles">
            {HERO_FX.map((p, i) => (
              <i key={i} style={{ left: p.l, top: p.t, width: p.s, height: p.s, '--o': p.o, animationDuration: p.d, animationDelay: p.delay }} />
            ))}
          </div>
        </div>
        {/* cinematic vignette around the edges */}
        <div className="ag-hero-vignette" />
        {/* scroll-revealed sport shots framing the headline (one per scroll stage) */}
        {HERO_SHOTS.map((c, i) => (
          <div key={i} ref={(el) => { shotRefs.current[i] = el }} className="ag-hero-shot" style={{ ...css(c.place), ...(heroDone ? shotFinal(c) : shotInit(c)) }}>
            <img src={c.src} alt="" draggable={false} />
          </div>
        ))}

        {/* nav (drops in from the top) */}
        <nav className="ag-rv ag-rv-top ag-pad" style={{ ...css('position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:24px 48px'), transitionDelay: '.05s' }}>
          <Link to="/" style={css('display:flex;align-items:center;gap:11px')}>
            <span style={css("width:30px;height:30px;border-radius:8px;background:#a64dff;display:flex;align-items:center;justify-content:center;color:#fff;font:800 17px/1 'Sora'")}>L</span>
            <span style={css("font:700 20px/1 'Sora';letter-spacing:-.01em;text-shadow:0 1px 12px rgba(0,0,0,.6)")}>Lvl-Up</span>
          </Link>
          <div style={css('display:flex;align-items:center;gap:16px')}>
            <a className="h-signin" style={css("font:600 14px/1 'Sora';color:#eef1f3;cursor:pointer;text-shadow:0 1px 10px rgba(0,0,0,.6)")}>Sign In</a>
            <button className="h-lift" style={css("font:600 14px/1 'Sora';color:#fff;background:#a64dff;border:none;padding:11px 20px;border-radius:10px;cursor:pointer;transition:transform .15s;box-shadow:0 8px 26px rgba(166,77,255,.4)")}>Get Started</button>
          </div>
        </nav>

        {/* hero headline — huge type straight over the video (no card) */}
        <div ref={copyRef} className="ag-pad ag-hero-copy" style={css('position:relative;z-index:2;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;width:100%;max-width:1500px;margin:0 auto;padding:88px 40px 64px')}>
          <div className="ag-rv ag-rv-up" style={rv("font:700 13px/1 'JetBrains Mono',monospace;letter-spacing:.4em;text-transform:uppercase;color:#e6c2ff;margin-bottom:6px;text-shadow:0 2px 22px rgba(0,0,0,.55)", '.1s')}>AI-Powered Athlete Intelligence</div>
          <h1 style={css("margin:0;font-family:'Sora',sans-serif;font-weight:800;line-height:.84;letter-spacing:-.035em;text-transform:uppercase")}>
            <span className="ag-rv ag-rv-up" style={rv("display:block;font-size:clamp(20px,3.2vw,46px);font-weight:700;letter-spacing:.14em;color:#f0ddff;margin-bottom:.14em;text-shadow:0 2px 20px rgba(0,0,0,.55)", '.2s')}>Unlock your</span>
            <span className="ag-rv ag-rv-up ag-hero-grad" style={rv("display:block;font-size:clamp(64px,15vw,232px)", '.3s')}>Next</span>
            <span className="ag-rv ag-rv-up ag-hero-grad" style={rv("display:block;font-size:clamp(64px,15vw,232px)", '.42s')}>Level</span>
          </h1>
          <div className="ag-rv ag-rv-up" style={rv('display:flex;align-items:center;gap:14px;flex-wrap:wrap;justify-content:center;margin-top:38px', '.56s')}>
            <button className="h-glass" style={css("display:inline-flex;align-items:center;justify-content:center;gap:10px;min-width:320px;font:600 14px/1 'Sora';color:#f0e2ff;padding:14px 40px 14px 16px;border-radius:12px;background:rgba(255,255,255,.07);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(227,167,255,.38);cursor:pointer;transition:background .15s")}>
              <span style={css('width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,#a64dff,#ff5fc4);display:flex;align-items:center;justify-content:center;animation:glowPulseP 2.4s infinite')}>
                <span style={css('width:0;height:0;border-style:solid;border-width:5px 0 5px 8px;border-color:transparent transparent transparent #fff;margin-left:2px')} />
              </span>
              Watch Trailer
            </button>
          </div>
        </div>

      </header>
      </section>

      {/* ===================== SPORT SELECTOR ===================== */}
      <section id="sports" ref={trackRef} className="ag-pin-track" style={css(`position:relative;z-index:10;height:${unlocked ? 100 : 420}vh`)}>
        <div className="ag-pin-stage" style={css(`position:${unlocked ? 'static' : 'sticky'};top:0;height:100vh;overflow:hidden;display:flex;align-items:center;padding:0 48px;background:linear-gradient(180deg,rgba(7,4,12,.66) 0%,rgba(7,4,12,.5) 40%,rgba(7,4,12,.82) 100%),url('/assets/elite-bg.png') center/cover no-repeat`)}>
        <div style={css('position:absolute;top:8%;left:50%;transform:translateX(-50%);width:70%;height:50%;background:radial-gradient(ellipse at center,rgba(166,77,255,.1),transparent 62%);pointer-events:none')} />

        <div style={css('position:relative;z-index:10;max-width:1240px;margin:0 auto;width:100%')}>
          <div ref={headingRef} style={unlocked ? HEADING_DONE : { ...css('text-align:center;margin-bottom:34px'), ...HEADING_INIT }}>
            <div style={css('display:inline-flex;align-items:center;gap:10px;margin-bottom:14px')}>
              <span style={css('width:30px;height:1px;background:rgba(255,255,255,.25)')} />
              <span style={css("font:600 11px/1 'JetBrains Mono',monospace;letter-spacing:.18em;color:#a64dff")}>CHOOSE YOUR SPORT</span>
              <span style={css('width:30px;height:1px;background:rgba(255,255,255,.25)')} />
            </div>
            <h2 className="ag-h2" style={css("font:800 40px/1.05 'Sora';letter-spacing:-.025em;margin:0 0 12px;text-wrap:balance;text-shadow:0 2px 24px rgba(0,0,0,.6)")}>Pick your game</h2>
            <p style={css("font:400 17px/1.6 'Sora';color:#aab2bb;max-width:520px;margin:0 auto;text-shadow:0 1px 14px rgba(0,0,0,.6)")}>Two sports live now, with more on the way. Jump in and explore the analytics built for how you play.</p>
          </div>

          {/* sport cards */}
          <div ref={cardsRef} className="ag-sport-grid" style={css('display:grid;grid-template-columns:repeat(4,1fr);gap:20px;width:100%')}>
            <div ref={(el) => { cardWrapRefs.current[0] = el }} style={unlocked ? CARD_DONE : cardInitStyle(REVEAL_CARDS[0])}>
            <SportCard
              to="/pickleball"
              cardClass="h-card-pickle"
              image="/assets/card-pickleball.jpg"
              cardStyle="display:flex;flex-direction:column;justify-content:space-between;min-height:264px;padding:28px;border-radius:20px;background:linear-gradient(160deg,#16191d,#0f1216);border:1px solid rgba(166,77,255,.4);box-shadow:0 24px 60px rgba(166,77,255,.1);cursor:pointer;transition:transform .25s,border-color .25s,box-shadow .25s"
              iconBox={ICON_BOX_LIVE_RED}
              icon={
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#a64dff" strokeWidth="1.6" />
                  <circle cx="9" cy="9.5" r="1.1" fill="#a64dff" />
                  <circle cx="13.5" cy="9" r="1.1" fill="#a64dff" />
                  <circle cx="10.5" cy="13.5" r="1.1" fill="#a64dff" />
                  <circle cx="15" cy="13" r="1.1" fill="#a64dff" />
                </svg>
              }
              badge={<span style={css("font:600 9px/1 'JetBrains Mono',monospace;letter-spacing:.12em;color:#fff;background:#a64dff;padding:5px 9px;border-radius:6px")}>LIVE</span>}
              title="Pickleball"
              desc="Shot tracking, kitchen play, and rally analytics."
              descColor="#9aa3ad"
              cta={<span style={css("display:inline-flex;align-items:center;gap:7px;font:600 13px/1 'Sora';color:#a64dff")}>Explore →</span>}
            />
            </div>
            <div ref={(el) => { cardWrapRefs.current[1] = el }} style={unlocked ? CARD_DONE : cardInitStyle(REVEAL_CARDS[1])}>
            <SportCard
              to="/tennis"
              cardClass="h-card-tennis"
              image="/assets/card-tennis.jpg"
              cardStyle="display:flex;flex-direction:column;justify-content:space-between;min-height:264px;padding:28px;border-radius:20px;background:linear-gradient(160deg,#13171c,#0f1216);border:1px solid rgba(255,255,255,.07);cursor:pointer;transition:transform .25s,border-color .25s,box-shadow .25s"
              iconBox={ICON_BOX_LIVE_SOFT}
              icon={
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="9" stroke="#a64dff" strokeWidth="1.6" />
                  <path d="M5.5 6.5C9 9 9 15 5.5 17.5M18.5 6.5C15 9 15 15 18.5 17.5" stroke="#a64dff" strokeWidth="1.4" />
                </svg>
              }
              badge={<span style={css("font:600 9px/1 'JetBrains Mono',monospace;letter-spacing:.12em;color:#46d18a;border:1px solid rgba(70,209,138,.4);padding:5px 9px;border-radius:6px")}>LIVE</span>}
              title="Tennis"
              desc="Serve, return, and full rally intelligence."
              descColor="#9aa3ad"
              cta={<span style={css("display:inline-flex;align-items:center;gap:7px;font:600 13px/1 'Sora';color:#a64dff")}>Explore →</span>}
            />
            </div>
            <div ref={(el) => { cardWrapRefs.current[2] = el }} style={unlocked ? CARD_DONE : cardInitStyle(REVEAL_CARDS[2])}>
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
            </div>
            <div ref={(el) => { cardWrapRefs.current[3] = el }} style={unlocked ? CARD_DONE : cardInitStyle(REVEAL_CARDS[3])}>
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
        </div>
        </div>
      </section>

      {/* ===================== ELITE ATHLETE PROFILES ===================== */}
      <EliteProfiles />

      {/* ===================== FACE OFF ===================== */}
      <FaceOff />

      {/* footer */}
      <footer className="ag-rv ag-rv-up ag-pad" style={css('position:relative;z-index:10;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:12px;padding:24px 48px;border-top:1px solid rgba(255,255,255,.06);background:#0a0b0d')}>
        <span style={css("font:400 13px/1 'JetBrains Mono',monospace;color:#7d8691")}>© 2026 Lvl-Up. All rights reserved.</span>
        <span style={css("font:400 13px/1 'Sora';color:#7d8691")}>Advanced analytics for every athlete.</span>
      </footer>
    </div>
  )
}
