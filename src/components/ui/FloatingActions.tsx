import { WhatsAppIcon } from '@/components/icons/Icons'

type WhatsAppFabProps = {
  href: string
  label: string
}

export function WhatsAppFab({ href, label }: WhatsAppFabProps) {
  return (
    <a
      className="floating-fab whatsapp-fab"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
    >
      <WhatsAppIcon />
    </a>
  )
}
