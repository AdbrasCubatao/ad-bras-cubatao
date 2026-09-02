import { Link } from 'react-router-dom'
import SimplePage from './SimplePage.jsx'
import { CHURCH } from '../lib/churchConfig.js'
import { useSiteSettings } from '../lib/useSiteSettings.js'
import { QuizIcon, PeopleIcon, MusicIcon, PinIcon, HeartHandIcon, PhoneIcon, BibleIcon, PlayBoxIcon, StudyIcon } from '../components/icons.jsx'

export function BiblePage() {
  return (
    <SimplePage title="Bíblia" subtitle="Leitura da Palavra">
      <p className="comment-text">
        Em breve: leitor de Bíblia completo dentro do app. Por enquanto, você pode ler
        pelo app da Bíblia Online ou pela versão impressa. 📖
      </p>
    </SimplePage>
  )
}

export function CultosPage() {
  const { settings } = useSiteSettings()
  const youtube = settings.youtube_url || CHURCH.social.youtube
  return (
    <SimplePage title="Cultos" subtitle="Assista ao vivo ou revise cultos anteriores">
      <p className="comment-text">
        Os cultos ao vivo acontecem pelo nosso canal do YouTube.
      </p>
      <a href={youtube} target="_blank" rel="noreferrer" className="btn-primary btn-gold" style={{ display: 'block', textAlign: 'center' }}>
        Assistir no YouTube
      </a>
    </SimplePage>
  )
}

export function StudiesPage() {
  return (
    <SimplePage title="Estudos / EBD" subtitle="Materiais da Escola Bíblica Dominical">
      <p className="comment-text">Em breve: materiais de estudo para download, direto aqui no app.</p>
    </SimplePage>
  )
}

export function WorshipPage() {
  return (
    <SimplePage title="Louvores" subtitle="Playlist e letras dos louvores da igreja">
      <p className="comment-text">Em breve: playlist do ministério de louvor.</p>
    </SimplePage>
  )
}

export function LocationPage() {
  const { settings, loading } = useSiteSettings()
  const address = settings.address || CHURCH.contacts.address
  const hasRealAddress = !loading && settings.address
  return (
    <SimplePage title="Localização" subtitle="Venha nos visitar">
      <p className="comment-text">{address}</p>
      {!hasRealAddress && (
        <p className="comment-text" style={{ fontSize: 12, color: 'var(--ink-500)' }}>
          Endereço provisório — atualize em Admin → Configurações.
        </p>
      )}
      <a
        href={`https://maps.google.com/?q=${encodeURIComponent(address)}`}
        target="_blank" rel="noreferrer"
        className="btn-primary" style={{ display: 'block', textAlign: 'center' }}
      >
        Abrir no Google Maps
      </a>
    </SimplePage>
  )
}

export function TithesPage() {
  return (
    <SimplePage title="Dízimos e Ofertas" subtitle="Contribua com a obra de Deus">
      <p className="comment-text">
        PIX: (chave a definir)<br />
        Também aceitamos dízimos e ofertas presencialmente, durante os cultos.
      </p>
    </SimplePage>
  )
}

export function ContactsPage() {
  const { settings } = useSiteSettings()
  const phone = settings.phone || CHURCH.contacts.phone
  const whatsapp = settings.whatsapp_url || CHURCH.social.whatsapp
  return (
    <SimplePage title="Contatos" subtitle="Fale com a nossa igreja">
      <p className="comment-text">Telefone: {phone}</p>
      <a href={whatsapp} target="_blank" rel="noreferrer" className="btn-primary btn-gold" style={{ display: 'block', textAlign: 'center' }}>
        Chamar no WhatsApp
      </a>
    </SimplePage>
  )
}

export function MorePage() {
  const links = [
    { to: '/quiz', label: 'Quiz Bíblico', Icon: QuizIcon },
    { to: '/departamentos', label: 'Departamentos', Icon: PeopleIcon },
    { to: '/louvores', label: 'Louvores', Icon: MusicIcon },
    { to: '/estudos', label: 'Estudos / EBD', Icon: StudyIcon },
    { to: '/cultos', label: 'Cultos', Icon: PlayBoxIcon },
    { to: '/biblia', label: 'Bíblia', Icon: BibleIcon },
    { to: '/localizacao', label: 'Localização', Icon: PinIcon },
    { to: '/dizimos', label: 'Dízimos e Ofertas', Icon: HeartHandIcon },
    { to: '/contatos', label: 'Contatos', Icon: PhoneIcon },
  ]
  return (
    <SimplePage title="Mais">
      <div style={{ display: 'grid', gap: 10 }}>
        {links.map(({ to, label, Icon }) => (
          <Link key={to} to={to} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 0' }}>
            <Icon style={{ width: 20, height: 20, color: 'var(--navy-800)' }} />
            <span style={{ fontWeight: 600, fontSize: 14 }}>{label}</span>
          </Link>
        ))}
      </div>
    </SimplePage>
  )
}
