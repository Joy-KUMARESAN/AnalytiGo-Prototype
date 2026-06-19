import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { css } from '../utils/css.js'
import { useCountUp } from '../hooks/useCountUp.js'
import { useReveal } from '../hooks/useReveal.js'
import { useStickyNav } from '../hooks/useStickyNav.js'
import LandingView from '../components/LandingView.jsx'
import Dashboard from '../components/Dashboard.jsx'

// Landing container. Mirrors the prototype's single-component-with-screens model:
// a `screen` flag toggles between the marketing site and the dashboard "peek",
// while shared scroll behaviours (counters, reveals, sticky nav) run against the
// outer root ref so they cover whichever screen is mounted.
export default function Landing() {
  const [screen, setScreen] = useState('landing')
  const rootRef = useRef(null)
  const navRef = useRef(null)
  const videoRef = useRef(null)

  const isLanding = screen === 'landing'

  // Always open /landing at the very top — never inherit the scroll position
  // from the previous route (e.g. the homepage).
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useCountUp(rootRef, [screen])
  useReveal(rootRef, [screen])
  useStickyNav(navRef, [screen])

  // Keep the hero video reliably playing (autoplay can be refused; loop on end).
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    v.defaultMuted = true
    v.loop = true
    const onEnded = () => {
      try {
        v.currentTime = 0
        v.play()
      } catch {
        /* ignore */
      }
    }
    v.addEventListener('ended', onEnded)
    const p = v.play()
    if (p && p.catch) p.catch(() => {})
    return () => v.removeEventListener('ended', onEnded)
  }, [screen])

  const openDashboard = () => {
    setScreen('dashboard')
    try {
      window.scrollTo(0, 0)
    } catch {
      /* ignore */
    }
  }
  const closeDashboard = () => {
    setScreen('landing')
    try {
      window.scrollTo(0, 0)
    } catch {
      /* ignore */
    }
  }

  return (
    <div ref={rootRef} style={css('min-height:100vh;background:#0a0b0d;overflow-x:hidden;position:relative;isolation:isolate')}>
      {/* fine noise overlay */}
      <div style={css('position:fixed;inset:0;z-index:200;pointer-events:none;opacity:.022;mix-blend-mode:overlay;background-image:radial-gradient(rgba(255,255,255,.9) .5px,transparent .6px);background-size:3px 3px')} />

      {isLanding ? (
        <LandingView navRef={navRef} videoRef={videoRef} openDashboard={openDashboard} />
      ) : (
        <Dashboard onBack={closeDashboard} />
      )}
    </div>
  )
}
