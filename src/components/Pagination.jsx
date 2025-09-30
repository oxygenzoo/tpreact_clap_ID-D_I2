import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Pagination({ totalResults }) {
  const [params] = useSearchParams()
  const nav = useNavigate()
  const page = Number(params.get('page') || '1')
  const total = Number(totalResults || 0)
  const perPage = 10
  const maxPage = Math.max(1, Math.ceil(total / perPage))
  const go = p => { const next = new URLSearchParams(params); next.set('page', String(p)); nav('/?' + next.toString()) }
  if (!total) return null
  return (
    <div className="row" style={{ justifyContent: 'space-between', marginTop: 16 }}>
      <button className="btn btn-secondary" onClick={() => go(Math.max(1, page - 1))} disabled={page <= 1}>Précédent</button>
      <div>Page {page} sur {maxPage}</div>
      <button className="btn btn-secondary" onClick={() => go(Math.min(maxPage, page + 1))} disabled={page >= maxPage}>Suivant</button>
    </div>
  )
}
