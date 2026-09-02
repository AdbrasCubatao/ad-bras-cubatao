import { NavLink } from 'react-router-dom'
import { HomeIcon, BibleIcon, CalendarIcon, MegaphoneIcon, MoreIcon } from './icons.jsx'

const TABS = [
  { to: '/', label: 'Início', Icon: HomeIcon, end: true },
  { to: '/biblia', label: 'Bíblia', Icon: BibleIcon },
  { to: '/agenda', label: 'Agenda', Icon: CalendarIcon },
  { to: '/avisos', label: 'Avisos', Icon: MegaphoneIcon },
  { to: '/mais', label: 'Mais', Icon: MoreIcon },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      {TABS.map(({ to, label, Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}
        >
          <Icon />
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
