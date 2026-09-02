import PageHeader from '../components/PageHeader.jsx'

export default function SimplePage({ title, subtitle, children }) {
  return (
    <div className="page">
      <PageHeader title={title} subtitle={subtitle} />
      <div className="card">{children}</div>
    </div>
  )
}
