import { useEffect, useRef, useState } from 'react'
import { css } from '../utils/css.js'

// Face Off — a premium head-to-head player comparison rendered over the cinematic
// red face-off backdrop. Bars animate in when the section scrolls into view.

const METRICS = [
  { k: 'rating', label: 'Rating' },
  { k: 'winRate', label: 'Win Rate', suf: '%' },
  { k: 'ranking', label: 'Ranking', rank: true },
  { k: 'power', label: 'Power' },
  { k: 'accuracy', label: 'Accuracy' },
  { k: 'consistency', label: 'Consistency' },
  { k: 'speed', label: 'Speed' },
  { k: 'coverage', label: 'Court Coverage' },
  { k: 'rally', label: 'Rally Performance' },
  { k: 'serve', label: 'Serve Performance' },
  { k: 'mental', label: 'Mental Strength' },
  { k: 'matchiq', label: 'Match Intelligence' },
]

const A = {
  name: 'Diego Rivera', sport: 'Tennis', tag: 'CHALLENGER', accent: '#ff4d54', rgb: '255,77,84',
  rating: 95, winRate: 84, ranking: 3, power: 91, accuracy: 94, consistency: 92, speed: 88, coverage: 89, rally: 93, serve: 91, mental: 89, matchiq: 91,
}
const B = {
  name: 'Nikola Vasic', sport: 'Tennis', tag: 'WORLD NO. 4', accent: '#38d0ff', rgb: '56,208,255',
  rating: 94, winRate: 83, ranking: 4, power: 93, accuracy: 90, consistency: 89, speed: 91, coverage: 92, rally: 90, serve: 92, mental: 92, matchiq: 90,
}

const SCOPES = ['Professional Athletes', 'Regional Players', 'Local Competitors', 'Country · State · City', 'ZIP Code · Radius']

const aWins = (m) => (m.rank ? A[m.k] < B[m.k] : A[m.k] > B[m.k])
const barOf = (p, m) => (m.rank ? Math.max(10, 100 - (p[m.k] - 1) * 7) : p[m.k])
const disp = (p, m) => (m.rank ? '#' + p[m.k] : p[m.k] + (m.suf || ''))

function Head({ p, align }) {
  return (
    <div style={css(`flex:1;text-align:${align}`)}>
      <div style={css(`font:600 10px/1 'JetBrains Mono',monospace;letter-spacing:.14em;color:${p.accent};margin-bottom:9px`)}>{p.tag}</div>
      <div className="ag-h2" style={css("font:800 27px/1.05 'Sora';letter-spacing:-.02em;margin-bottom:6px;text-shadow:0 2px 18px rgba(0,0,0,.55)")}>{p.name}</div>
      <div style={css("font:500 11px/1 'JetBrains Mono',monospace;letter-spacing:.06em;color:#9aa3ad;margin-bottom:14px")}>{p.sport.toUpperCase()}</div>
      <div style={css(`font:800 42px/1 'Sora';color:${p.accent};text-shadow:0 0 26px rgba(${p.rgb},.5)`)}>
        {p.rating}
        <span style={css("font:600 9px/1 'JetBrains Mono',monospace;letter-spacing:.12em;color:#9aa3ad;margin-left:7px")}>RATING</span>
      </div>
    </div>
  )
}

export default function FaceOff() {
  const ref = useRef(null)
  const [on, setOn] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { setOn(true); io.disconnect() } }),
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <section className="fo-section" ref={ref}>
      <div className="fo-bg" />
      <div className="fo-scrim" />

      <div style={css('position:relative;z-index:2;max-width:1240px;margin:0 auto;padding:0 48px')}>
        {/* heading */}
        <div style={css('text-align:center;margin-bottom:34px')}>
          <div style={css('display:inline-flex;align-items:center;gap:9px;padding:8px 16px;border-radius:999px;border:1px solid rgba(232,35,46,.5);background:rgba(232,35,46,.16);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);margin-bottom:18px')}>
            <span style={css('width:7px;height:7px;border-radius:50%;background:#ff3b44;box-shadow:0 0 10px #e8232e')} />
            <span style={css("font:600 12px/1 'JetBrains Mono',monospace;letter-spacing:.16em;color:#ff5a62")}>GLOBAL PLAYER COMPARISON</span>
          </div>
          <h2 className="ag-h2" style={css("font:800 56px/1.02 'Sora';letter-spacing:-.03em;margin:0 0 16px;text-shadow:0 4px 30px rgba(0,0,0,.6)")}>Face Off</h2>
          <p style={css("font:400 17px/1.65 'Sora';color:#dfe3e8;max-width:720px;margin:0 auto 20px;text-shadow:0 1px 14px rgba(0,0,0,.6)")}>
            Compare your performance against any athlete in the world. Analyze strengths, weaknesses, rankings, trends, match intelligence, and performance metrics side-by-side to identify opportunities for improvement and competitive advantage.
          </p>
          <div style={css('display:flex;flex-wrap:wrap;justify-content:center;gap:8px')}>
            {SCOPES.map((s) => (
              <span key={s} className="fo-chip">{s}</span>
            ))}
          </div>
        </div>

        {/* comparison panel */}
        <div className="fo-panel" style={css('max-width:920px;margin:0 auto')}>
          {/* players + VS */}
          <div style={css('display:flex;align-items:center;justify-content:center;gap:6px;margin-bottom:26px')}>
            <Head p={A} align="right" />
            <div style={css('padding:0 26px')}>
              <div className="fo-vs">VS</div>
            </div>
            <Head p={B} align="left" />
          </div>

          {/* metric bars */}
          <div style={css('display:flex;flex-direction:column;gap:2px')}>
            {METRICS.map((m, i) => {
              const win = aWins(m)
              return (
                <div className="fo-row" key={m.k}>
                  <span style={css(`font:700 14px/1 'Sora';text-align:right;color:${win ? A.accent : '#7d8691'}`)}>{disp(A, m)}</span>
                  <div className="fo-tl">
                    <div className="fo-bar" style={{ width: on ? barOf(A, m) + '%' : '0%', background: `linear-gradient(90deg,rgba(${A.rgb},.5),${A.accent})`, opacity: win ? 1 : 0.45, transitionDelay: i * 0.045 + 's' }} />
                  </div>
                  <span style={css("font:600 11px/1.2 'JetBrains Mono',monospace;letter-spacing:.04em;color:#aeb6bf;text-align:center")}>{m.label.toUpperCase()}</span>
                  <div className="fo-tr">
                    <div className="fo-bar" style={{ width: on ? barOf(B, m) + '%' : '0%', background: `linear-gradient(90deg,${B.accent},rgba(${B.rgb},.5))`, opacity: win ? 0.45 : 1, transitionDelay: i * 0.045 + 's' }} />
                  </div>
                  <span style={css(`font:700 14px/1 'Sora';text-align:left;color:${win ? '#7d8691' : B.accent}`)}>{disp(B, m)}</span>
                </div>
              )
            })}
          </div>

          <div style={css("text-align:center;margin-top:22px;font:500 11px/1 'JetBrains Mono',monospace;letter-spacing:.1em;color:#8b95a1")}>BENCHMARK AGAINST ANY ATHLETE · ANYWHERE IN THE WORLD</div>
        </div>
      </div>
    </section>
  )
}
