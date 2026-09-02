import { Link } from 'react-router-dom'
import { MenuIcon, BellIcon } from './icons.jsx'
import { CHURCH } from '../lib/churchConfig.js'
import { useSiteSettings } from '../lib/useSiteSettings.js'

export default function Hero() {
  const { settings } = useSiteSettings()
  const logo = settings.logo_url || CHURCH.logo
  const pastorPhoto = settings.pastor_photo_url || CHURCH.pastor.photo
  const pastorName = settings.pastor_name || CHURCH.pastor.name
  const pastorMessage = settings.pastor_message || CHURCH.pastor.message

  return (
    <>
      <header className="hero">
        <div className="hero-topbar">
          <button className="icon-btn" aria-label="Abrir menu"><MenuIcon /></button>
          <Link to="/avisos" className="icon-btn" aria-label="Notificações"><BellIcon /></Link>
        </div>
        <div className="hero-brand">
          <img className="hero-flame" src={logo} alt={`Logo ${CHURCH.name}`} />
          <div>
            <p className="hero-title">
              {CHURCH.nameLine1}
              <span className="accent">{CHURCH.nameLine2}</span>
            </p>
          </div>
        </div>
        <p className="hero-tagline">{CHURCH.tagline}</p>
      </header>

      <div className="welcome-card">
        <img className="welcome-photo" src={pastorPhoto} alt={pastorName} />
        <div>
          <h2 className="welcome-heading">Bem-vindo!</h2>
          <p className="welcome-text">{pastorMessage}</p>
          <p className="welcome-sign">{pastorName}</p>
          <p className="welcome-role">{CHURCH.pastor.role}</p>
        </div>
      </div>
    </>
  )
}
