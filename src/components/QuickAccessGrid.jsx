import { Link } from 'react-router-dom'
import {
  HomeIcon, BibleIcon, CalendarIcon, PlayBoxIcon, MegaphoneIcon, PrayIcon,
  StudyIcon, MusicIcon, PeopleIcon, PinIcon, HeartHandIcon, PhoneIcon,
} from './icons.jsx'

const ITEMS = [
  { to: '/', label: 'Início', Icon: HomeIcon },
  { to: '/biblia', label: 'Bíblia', Icon: BibleIcon },
  { to: '/agenda', label: 'Agenda', Icon: CalendarIcon },
  { to: '/cultos', label: 'Cultos', badge: 'AO VIVO', Icon: PlayBoxIcon },
  { to: '/avisos', label: 'Avisos', Icon: MegaphoneIcon },
  { to: '/oracao', label: 'Pedidos de Oração', Icon: PrayIcon },
  { to: '/estudos', label: 'Estudos / EBD', Icon: StudyIcon },
  { to: '/louvores', label: 'Louvores', Icon: MusicIcon },
  { to: '/departamentos', label: 'Departamentos', Icon: PeopleIcon },
  { to: '/localizacao', label: 'Localização', Icon: PinIcon },
  { to: '/dizimos', label: 'Dízimos e Ofertas', Icon: HeartHandIcon },
  { to: '/contatos', label: 'Contatos', Icon: PhoneIcon },
]

export default function QuickAccessGrid() {
  return (
    <>
      <h3 className="section-heading">Acesso Rápido</h3>
      <div className="quick-grid">
        {ITEMS.map(({ to, label, Icon, badge }) => (
          <Link key={to + label} to={to} className="quick-card">
            <Icon />
            <span className="quick-label">{label}</span>
            {badge && <span className="quick-badge">{badge}</span>}
          </Link>
        ))}
      </div>
    </>
  )
}
