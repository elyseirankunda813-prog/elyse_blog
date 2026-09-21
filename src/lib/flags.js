const rayon = (cx, cy, r1, r2, count) => {
  const rays = []
  for (let i = 0; i < count; i += 1) {
    const a = (Math.PI * 2 * i) / count
    rays.push(
      `<line x1=${cx} y1=${cy} x2="${cx + Math.cos(a) * r1}" y2="${cy + Math.sin(a) * r1}"
        stroke="#FAD201" stroke-width="1.4" stroke-linecap="round"/>`,
    )
    rays.push(`<circle cx=${cx} cy=${cy} r="${r2 - 0.5}" fill="#FAD201"/>`)
  }
  return rays.join('')
}

const rw = `    <rect width="45" height="15" fill="#00A1DE"/>
    <rect y="15" width="45" height="7.5" fill="#FAD201"/>
    <rect y="22.5" width="45" height="7.5" fill="#20603D"/>
    <g transform="translate(30.5 7.5)">${rayon(0, 0, 5.5, 3.2, 12)}</g>`

export const RWANDA_FLAG = { name: 'Rwanda', lat: -1.9403, lng: 29.8739, markup: rw }