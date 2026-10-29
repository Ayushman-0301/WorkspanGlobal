/**
 * Abstract illustration of the service model: your business on one side,
 * Workspan Global on the other, joined by a single span, with the independent
 * professionals Workspan engages clustered behind it.
 */
export function HeroVisual() {
  const cx = 240
  const cy = 262
  const r = 150
  const parallels = [-100, -50, 0, 50, 100]
  const meridians = [150, 112, 70, 26]

  const client = { x: 118, y: 236 }
  const workspan = { x: 352, y: 262 }
  const pros = [
    { x: 318, y: 352 },
    { x: 382, y: 366 },
    { x: 414, y: 318 },
  ]

  return (
    <div className="relative">
      <svg
        viewBox="0 0 480 460"
        className="h-auto w-full"
        role="img"
        aria-label="Illustration: your business and Workspan Global connected across a globe, with Workspan linked to a group of independent professionals."
      >
        <rect width="480" height="460" rx="24" fill="#15233f" />

        {/* Globe linework */}
        <g fill="none" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="1">
          <circle cx={cx} cy={cy} r={r} strokeOpacity="0.18" />
          {meridians.map((rx) => (
            <ellipse key={rx} cx={cx} cy={cy} rx={rx} ry={r} />
          ))}
          {parallels.map((d) => {
            const half = Math.sqrt(r * r - d * d)
            return <line key={d} x1={cx - half} x2={cx + half} y1={cy + d} y2={cy + d} />
          })}
        </g>

        {/* Links from Workspan to the professionals it engages */}
        <g stroke="#8fc0bc" strokeOpacity="0.45" strokeWidth="1.25" strokeDasharray="3 4">
          {pros.map((p) => (
            <line key={`${p.x}-${p.y}`} x1={workspan.x} y1={workspan.y} x2={p.x} y2={p.y} />
          ))}
        </g>

        {/* The span: one relationship between client and Workspan */}
        <path
          className="arc-draw"
          pathLength={1}
          d={`M${client.x} ${client.y} C 150 52, 320 52, ${workspan.x} ${workspan.y}`}
          fill="none"
          stroke="#8fc0bc"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Nodes */}
        <g>
          <circle className="node-pop" cx={client.x} cy={client.y} r="9" fill="#ffffff" />
          <circle cx={client.x} cy={client.y} r="17" fill="none" stroke="#ffffff" strokeOpacity="0.25" />
          <circle
            className="node-pop"
            style={{ animationDelay: '1.7s' }}
            cx={workspan.x}
            cy={workspan.y}
            r="9"
            fill="#8fc0bc"
          />
          <circle cx={workspan.x} cy={workspan.y} r="17" fill="none" stroke="#8fc0bc" strokeOpacity="0.4" />
          {pros.map((p, i) => (
            <circle
              key={`n-${p.x}`}
              className="node-pop"
              style={{ animationDelay: `${1.9 + i * 0.12}s` }}
              cx={p.x}
              cy={p.y}
              r="5"
              fill="#ffffff"
              fillOpacity="0.85"
            />
          ))}
        </g>

        {/* Labels */}
        <g fontFamily="inherit" fontSize="14" fontWeight="500">
          <text x={client.x - 22} y={client.y + 42} fill="#ffffff" fillOpacity="0.85">
            Your business
          </text>
          <text x={workspan.x - 58} y={workspan.y - 30} fill="#8fc0bc">
            Workspan Global
          </text>
          <text x={286} y={408} fill="#ffffff" fillOpacity="0.55" fontSize="12.5">
            Independent professionals
          </text>
        </g>
      </svg>
    </div>
  )
}
