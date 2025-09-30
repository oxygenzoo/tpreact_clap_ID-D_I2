import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Filters() {
  const [params] = useSearchParams()
  const nav = useNavigate()
  const type = params.get('type') || ''
  const y = params.get('y') || ''
  const update = (k, v) => {
    const p = new URLSearchParams(params)
    if (v) p.set(k, v); else p.delete(k)
    p.set('page', '1')
    nav('/?' + p.toString())
  }
  return (
    <div className="controls">
      <select className="input" value={type} onChange={e => update('type', e.target.value)} aria-label="Type">
        <option value="">Tout</option>
        <option value="movie">Film</option>
        <option value="series">Série</option>
      </select>
      <input className="input" type="number" min="1900" max="2100" placeholder="Année" value={y} onChange={e => update('y', e.target.value)} aria-label="Année" />
    </div>
  )
}
