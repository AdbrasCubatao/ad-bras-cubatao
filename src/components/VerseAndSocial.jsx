import { WhatsAppIcon, InstagramIcon, YoutubeIcon, FacebookIcon } from './icons.jsx'
import { CHURCH } from '../lib/churchConfig.js'
import { useSiteSettings } from '../lib/useSiteSettings.js'

export function VerseBanner() {
  const { settings } = useSiteSettings()
  const text = settings.verse_text || CHURCH.verseOfTheDay.text
  const reference = settings.verse_reference || CHURCH.verseOfTheDay.reference
  return (
    <div className="verse-banner">
      <div>
        <p className="verse-quote">"{text}"</p>
        <p className="verse-ref">{reference}</p>
      </div>
    </div>
  )
}

export function SocialLinks() {
  const { settings } = useSiteSettings()
  const links = [
    { href: settings.whatsapp_url || CHURCH.social.whatsapp, Icon: WhatsAppIcon, color: '#25D366', label: 'WhatsApp' },
    { href: settings.instagram_url || CHURCH.social.instagram, Icon: InstagramIcon, color: '#C13584', label: 'Instagram' },
    { href: settings.youtube_url || CHURCH.social.youtube, Icon: YoutubeIcon, color: '#FF0000', label: 'YouTube' },
    { href: settings.facebook_url || CHURCH.social.facebook, Icon: FacebookIcon, color: '#1877F2', label: 'Facebook' },
  ]
  return (
    <div className="socials">
      <p className="socials-title">Conecte-se conosco</p>
      <div className="socials-row">
        {links.map(({ href, Icon, color, label }) => (
          <a key={label} href={href} target="_blank" rel="noreferrer"
             className="social-btn" style={{ background: color }} aria-label={label}>
            <Icon style={{ width: 22, height: 22 }} />
          </a>
        ))}
      </div>
    </div>
  )
}
