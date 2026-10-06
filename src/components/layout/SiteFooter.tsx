import { Link } from 'react-router-dom'
import {
  FacebookIcon,
  InstagramIcon,
  LinkIcon,
  LinkedInIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from '@/components/icons/Icons'
import { getMobilePhoneHref, hogarUrl, getPhoneHref, siteConfig, type SocialLink } from '@/config/site'
import '@/styles/layout.css'

const socialIcons = {
  FACEBOOK: FacebookIcon,
  INSTAGRAM: InstagramIcon,
  TIKTOK: TikTokIcon,
  YOUTUBE: YouTubeIcon,
  LINKEDIN: LinkedInIcon,
  X: XIcon,
  OTRA: LinkIcon,
} as const

function SocialIcon({ social }: { social: SocialLink }) {
  if (social.iconUrl) {
    return <img src={social.iconUrl} alt="" width={20} height={20} loading="lazy" decoding="async" />
  }
  const Icon = socialIcons[social.network]
  return <Icon />
}

export function SiteFooter() {
  const { address, email, phoneDisplay, mobileDisplay } = siteConfig.contact
  const mobileHref = getMobilePhoneHref()
  const socialLinks = siteConfig.social

  return (
    <footer className="site-footer theme-space starfield" data-fab-surface="dark">
      <div className="site-footer-body">
        <div className="container site-footer-grid">
          <div className="site-footer-brand">
            <p className="site-footer-name">
              <img
                className="site-footer-logo"
                src={siteConfig.brand.logoUrl}
                alt=""
                width={48}
                height={48}
                loading="lazy"
                decoding="async"
              />
              {siteConfig.brand.name}
            </p>
            <p className="site-footer-tagline">{siteConfig.brand.tagline}</p>
            <p>{address}</p>
            <p>
              <a href={`mailto:${email}`}>{email}</a>
            </p>
            <p>
              <a href={getPhoneHref()}>{phoneDisplay}</a>
              {mobileHref && mobileDisplay && (
                <>
                  {' · '}
                  <a href={mobileHref}>{mobileDisplay}</a>
                </>
              )}
            </p>
            <p>
              <a
                href={`https://${siteConfig.brand.website}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                {siteConfig.brand.website}
              </a>
            </p>
          </div>

          <div>
            <p className="site-footer-heading">Enlaces</p>
            <ul className="site-footer-links">
              <li>
                <Link viewTransition to={{ pathname: '/', hash: '#contacto-empresas' }}>
                  Solicitar cotización
                </Link>
              </li>
              <li>
                <a href={hogarUrl}>Internet para tu hogar</a>
              </li>
              {siteConfig.legal.map((item) => (
                <li key={item.href}>
                  <Link viewTransition to={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {socialLinks.length > 0 && (
            <div>
              <p className="site-footer-heading">Redes sociales</p>
              <ul className="site-footer-social">
                {socialLinks.map((social) => (
                  <li key={social.id}>
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <SocialIcon social={social} />
                      <span>{social.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      <div className="site-footer-legal">
        <div className="container">
          <p>{siteConfig.osiptelNotice}</p>
          <p className="site-footer-copy">
            © {new Date().getFullYear()} {siteConfig.brand.name}. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
