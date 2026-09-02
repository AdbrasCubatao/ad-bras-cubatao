import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader.jsx'
import { DEPARTMENTS } from '../lib/departments.js'

export default function Departments() {
  return (
    <div className="page">
      <PageHeader title="Departamentos" subtitle="Conheça e participe dos nossos ministérios." />
      {DEPARTMENTS.map((d) => (
        <Link key={d.slug} to={`/departamentos/${d.slug}`} className="card" style={{ display: 'block' }}>
          <p className="comment-name" style={{ fontSize: 15 }}>{d.name}</p>
          <p className="comment-text">{d.description}</p>
        </Link>
      ))}
    </div>
  )
}
