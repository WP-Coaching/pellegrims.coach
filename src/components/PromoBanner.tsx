import Link from 'next/link'
import { AthleticButton } from '@/components/ui/athletic-button'
import { SpotlightBackground } from '@/components/ui/spotlight-background'
import type { Locale } from '@/lib/i18n'

type Props = {
  locale: Locale
}

export default function PromoBanner({ locale }: Props) {
  const isEN = locale === 'en'
  const href = `/${locale}/zwemtraining/winter-2025-2026`

  return (
    <section className="relative py-10 bg-gradient-to-r from-ocean-100 via-ocean-50 to-white border-y border-ocean-100">
      <SpotlightBackground
        asFragment
        spotlights={[
          { className: 'absolute -top-10 -left-10 w-56 h-56 bg-ocean-200 rounded-full blur-3xl opacity-20' },
          { className: 'absolute -bottom-12 -right-12 w-64 h-64 bg-ocean-100 rounded-full blur-3xl opacity-30' }
        ]}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 bg-white/70 backdrop-blur-md border border-ocean-200 rounded-xl p-6 shadow-glass">
          <div className="text-center lg:text-left">
            <p className="text-sm font-semibold uppercase tracking-wide text-ocean-700 mb-1">
              {isEN ? 'Limited spots' : 'Beperkte plaatsen'}
            </p>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-athletic-dark">
              {isEN ? 'Group Swim Training — Winter 2025–2026 (Antwerp)' : 'Zwemtrainingen — Winter 2025–2026 (Antwerpen)'}
            </h2>
            <p className="text-athletic-dark/80 mt-2">
              {isEN
                ? 'Beginners (technique) and advanced (speed & intensity) on Friday afternoons at Wezenberg.'
                : 'Beginners (techniek) en gevorderden (snelheid & intensiteit) op vrijdagmiddag in Wezenberg.'}
            </p>
          </div>

          <div className="shrink-0">
            <Link href={href}>
              <AthleticButton size="lg">
                {isEN ? 'Learn more' : 'Meer info & inschrijven'}
              </AthleticButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
