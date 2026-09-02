// Ícones minimalistas em SVG, sem dependência externa.
const base = (children, props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
       strokeLinecap="round" strokeLinejoin="round" {...props}>
    {children}
  </svg>
)

export const HomeIcon = (p) => base(<><path d="M3 11.5 12 4l9 7.5" /><path d="M5 10v9.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10" /></>, p)
export const BibleIcon = (p) => base(<><path d="M12 6.5c-1.6-1.4-4-2-7-1.7v13c3-.3 5.4.3 7 1.7 1.6-1.4 4-2 7-1.7v-13c-3-.3-5.4.3-7 1.7Z" /><path d="M12 6.5v13" /></>, p)
export const CalendarIcon = (p) => base(<><rect x="3.5" y="5" width="17" height="15" rx="2" /><path d="M8 3v4M16 3v4M3.5 10h17" /></>, p)
export const PlayBoxIcon = (p) => base(<><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" stroke="none" /></>, p)
export const MegaphoneIcon = (p) => base(<><path d="M3 10v4a1 1 0 0 0 1 1h2l6 4V5L6 9H4a1 1 0 0 0-1 1Z" /><path d="M17 8.5a4 4 0 0 1 0 7" /></>, p)
export const PrayIcon = (p) => base(<><path d="M12 3v6M12 3c-1.5 1-2 3-2 5M12 3c1.5 1 2 3 2 5" /><path d="M7 21c0-4 2.2-7 5-9 2.8 2 5 5 5 9" /></>, p)
export const StudyIcon = (p) => base(<><path d="M4 5.5c2.5-1 5.2-1 8 0v13c-2.8-1-5.5-1-8 0Z" /><path d="M12 5.5c2.5-1 5.2-1 8 0v13c-2.8-1-5.5-1-8 0Z" /></>, p)
export const MusicIcon = (p) => base(<><circle cx="7" cy="17" r="2.4" /><circle cx="17" cy="15" r="2.4" /><path d="M9.4 17V6l10-1.6v10.6" /></>, p)
export const PeopleIcon = (p) => base(<><circle cx="12" cy="8" r="3" /><circle cx="5.5" cy="10.5" r="2.4" /><circle cx="18.5" cy="10.5" r="2.4" /><path d="M2.5 20c.6-3 3-5 5-5m9 5c-.6-3-3-5-5-5m-9 0h9" /></>, p)
export const PinIcon = (p) => base(<><path d="M12 21s7-6.5 7-11.5a7 7 0 0 0-14 0C5 14.5 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.3" /></>, p)
export const HeartHandIcon = (p) => base(<><path d="M4 12h4l2-2 3 3 2-2h5" /><path d="M12 17.5 6 12a3 3 0 0 1 4.5-4l1.5 1.4L13.5 8a3 3 0 0 1 4.5 4l-6 5.5Z" /></>, p)
export const PhoneIcon = (p) => base(<><path d="M6 3h3l1.5 4.5L8 9.5a12 12 0 0 0 6.5 6.5l2-2.5L21 15v3a2 2 0 0 1-2 2C10.5 20 4 13.5 4 5a2 2 0 0 1 2-2Z" /></>, p)
export const BellIcon = (p) => base(<><path d="M6 10a6 6 0 0 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" /><path d="M10 18.5a2 2 0 0 0 4 0" /></>, p)
export const MenuIcon = (p) => base(<><path d="M4 6.5h16M4 12h16M4 17.5h16" /></>, p)
export const QuizIcon = (p) => base(<><circle cx="12" cy="12" r="9" /><path d="M9.5 9.2a2.5 2.5 0 1 1 3.4 2.3c-.9.4-1.4 1-1.4 2" /><circle cx="12" cy="16.3" r="0.6" fill="currentColor" /></>, p)
export const MoreIcon = (p) => base(<><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" /></>, p)
export const WhatsAppIcon = (p) => base(<><path d="M7 17.5 4.5 19l1.1-3.2A7.5 7.5 0 1 1 12 19.5c-1.1 0-2.1-.2-3-.6L7 17.5Z" /><path d="M9 9.5c0 3 2.5 5.5 5.5 5.5" /></>, p)
export const InstagramIcon = (p) => base(<><rect x="3.5" y="3.5" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="3.6" /><circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" /></>, p)
export const YoutubeIcon = (p) => base(<><rect x="2.5" y="6" width="19" height="12" rx="3" /><path d="M10.5 9.8v4.4l4-2.2-4-2.2Z" fill="currentColor" stroke="none" /></>, p)
export const FacebookIcon = (p) => base(<><circle cx="12" cy="12" r="9" /><path d="M13.5 21v-7h2l.4-3h-2.4V9c0-.9.3-1.5 1.7-1.5h1.2V4.8c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8V11H8v3h2.5v7" /></>, p)
