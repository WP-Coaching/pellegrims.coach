'use client'

interface SpotlightConfig {
  className: string
}

interface SpotlightBackgroundProps {
  spotlights: SpotlightConfig[]
  wrapperClassName?: string
  asFragment?: boolean
}

export function SpotlightBackground({
  spotlights,
  wrapperClassName = 'absolute inset-0 overflow-hidden',
  asFragment = false
}: SpotlightBackgroundProps) {
  const content = spotlights.map((spotlight, index) => (
    <div key={index} className={spotlight.className} />
  ))

  if (asFragment) {
    return <>{content}</>
  }

  return <div className={wrapperClassName}>{content}</div>
}
