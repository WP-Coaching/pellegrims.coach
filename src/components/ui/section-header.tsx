'use client'

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4'

interface SectionHeaderProps {
  title: ReactNode
  description?: ReactNode
  align?: 'center' | 'left'
  className?: string
  titleClassName?: string
  descriptionClassName?: string
  accentClassName?: string
  accentWidth?: number | string
  headingLevel?: HeadingLevel
}

export function SectionHeader({
  title,
  description,
  align = 'center',
  className = '',
  titleClassName = '',
  descriptionClassName = '',
  accentClassName = '',
  accentWidth = '120px',
  headingLevel = 'h2'
}: SectionHeaderProps) {
  const alignmentClass = align === 'center' ? 'text-center' : 'text-left'
  const accentAlignment = align === 'center' ? 'mx-auto' : ''
  const resolvedAccentWidth = typeof accentWidth === 'number' ? `${accentWidth}px` : accentWidth
  const HeadingTag = headingLevel

  return (
    <motion.div
      className={`${alignmentClass} ${className}`.trim()}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.div
        className={`h-1 bg-gradient-ocean ${accentAlignment} mb-6 ${accentClassName}`.trim()}
        initial={{ width: 0 }}
        whileInView={{ width: resolvedAccentWidth }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      />
      <HeadingTag className={`font-display font-bold text-athletic-dark ${titleClassName}`.trim()}>
        {title}
      </HeadingTag>
      {description ? (
        <motion.p
          className={`text-gray-600 leading-relaxed ${descriptionClassName}`.trim()}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
        >
          {description}
        </motion.p>
      ) : null}
    </motion.div>
  )
}
