'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import EnrollmentForm from '@/components/EnrollmentForm'
import { SectionHeader } from '@/components/ui/section-header'
import { SpotlightBackground } from '@/components/ui/spotlight-background'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function ZwemtrainingWinterClient({ locale, t }: Props) {
  const [isVisible, setIsVisible] = useState(false)
  const [groupsVisible, setGroupsVisible] = useState(false)
  const [practicalVisible, setPracticalVisible] = useState(false)
  const [datesVisible, setDatesVisible] = useState(false)

  useEffect(() => {
    // Set hero visible after paint to avoid synchronous state update errors
    const heroRevealFrame = requestAnimationFrame(() => setIsVisible(true))

    // Hero section visibility
    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    // Groups section visibility - trigger earlier with rootMargin
    const groupsObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGroupsVisible(true)
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    )

    // Practical section visibility
    const practicalObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPracticalVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    // Dates section visibility
    const datesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDatesVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    const heroSection = document.getElementById('hero')
    const groupsSection = document.getElementById('groups')
    const practicalSection = document.getElementById('practical')
    const datesSection = document.getElementById('dates')

    if (heroSection) heroObserver.observe(heroSection)
    if (groupsSection) groupsObserver.observe(groupsSection)
    if (practicalSection) practicalObserver.observe(practicalSection)
    if (datesSection) datesObserver.observe(datesSection)

    return () => {
      cancelAnimationFrame(heroRevealFrame)
      heroObserver.disconnect()
      groupsObserver.disconnect()
      practicalObserver.disconnect()
      datesObserver.disconnect()
    }
  }, [])

  const isEN = locale === 'en'
  const txt = t.swimWinter

  return (
    <>
      {/* Hero / Intro */}
      <motion.section 
        id="hero"
        className="relative pt-36 pb-16 overflow-hidden bg-gradient-to-br from-ocean-50 via-white to-athletic-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <SpotlightBackground
          asFragment
          spotlights={[
            { className: 'absolute -top-16 -left-16 w-72 h-72 bg-ocean-100 rounded-full blur-3xl opacity-30 animate-float' },
            { className: 'absolute -bottom-16 -right-16 w-80 h-80 bg-ocean-200 rounded-full blur-3xl opacity-20 animate-pulse-slow' }
          ]}
        />
        
        {/* Animated geometric elements */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 border-2 border-ocean-400/30 rounded-full animate-spin opacity-50" />
        <div className="absolute bottom-1/4 right-1/3 w-12 h-12 bg-ocean-500/20 rounded-lg backdrop-blur-sm animate-float" />

        <div className="max-w-5xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <motion.h1 
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-athletic-dark mb-6 whitespace-pre-line"
            initial={{ opacity: 0, y: 50 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {txt.heroTitle}
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-athletic-dark/80 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {txt.heroIntro}
          </motion.p>
          <motion.p 
            className="text-athletic-dark/70"
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {txt.locationIntro} <a href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA" target="_blank" rel="noopener noreferrer" className="font-semibold text-ocean-700 hover:underline">Topsportbad Wezenberg</a> {isEN ? 'in Antwerp.' : 'in Antwerpen.'}
          </motion.p>
        </div>
      </motion.section>

      {/* Trainingsgroepen */}
      <motion.section 
        id="groups"
        className="relative py-16"
        initial={{ opacity: 0 }}
        animate={groupsVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title={txt.groupsTitle}
            className="mb-16"
            titleClassName="text-3xl md:text-4xl mb-6"
            accentWidth="120px"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Beginners Group */}
            <motion.div 
              className="relative bg-gradient-to-br from-white via-ocean-50/30 to-white rounded-2xl shadow-xl border border-ocean-200/50 p-8 hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={groupsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-ocean-200 to-ocean-300 rounded-bl-2xl rounded-tr-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-ocean-500 rounded-full mr-3" />
                  <h3 className="text-xl font-display font-bold text-athletic-dark">{txt.begTitle}</h3>
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-ocean-100 text-ocean-700 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {txt.begTime}
                </div>
                <p className="text-athletic-dark/80 mb-6 leading-relaxed">
                  {txt.begDesc}
                </p>
                <div className="space-y-4 mb-6">
                  {txt.begBullets.map((bullet, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-athletic-dark/80 text-sm leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-ocean-100">
                  <p className="text-ocean-700 italic text-sm font-medium bg-ocean-50 px-4 py-2 rounded-lg">{txt.motivationalText}</p>
                </div>
              </div>
            </motion.div>

            {/* Advanced Group */}
            <motion.div 
              className="relative bg-gradient-to-br from-white via-ocean-50/30 to-white rounded-2xl shadow-xl border border-ocean-200/50 p-8 hover:shadow-2xl transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={groupsVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-ocean-200 to-ocean-300 rounded-bl-2xl rounded-tr-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
              <div className="relative">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-ocean-500 rounded-full mr-3" />
                  <h3 className="text-xl font-display font-bold text-athletic-dark">{txt.advTitle}</h3>
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-ocean-100 text-ocean-700 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {txt.advTime}
                </div>
                <p className="text-athletic-dark/80 mb-6 leading-relaxed">
                  {txt.advDesc}
                </p>
                <div className="space-y-4 mb-6">
                  {txt.advBullets.map((bullet, i) => (
                    <div key={i} className="flex items-start">
                      <div className="flex-shrink-0 w-6 h-6 bg-ocean-500 rounded-full flex items-center justify-center mr-3 mt-0.5">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-athletic-dark/80 text-sm leading-relaxed">{bullet}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-ocean-100">
                  <p className="text-ocean-700 italic text-sm font-medium bg-ocean-50 px-4 py-2 rounded-lg">{txt.advMotivationalText}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Praktische info - Clean & Elegant */}
      <motion.section 
        id="practical"
        className="relative py-16 bg-gradient-to-br from-white to-ocean-50/30"
        initial={{ opacity: 0 }}
        animate={practicalVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Subtle floating elements */}
        <SpotlightBackground
          asFragment
          spotlights={[
            { className: 'absolute top-16 left-16 w-20 h-20 bg-ocean-100 rounded-full blur-3xl opacity-20 animate-pulse-slow' },
            { className: 'absolute bottom-16 right-16 w-24 h-24 bg-ocean-50 rounded-full blur-3xl opacity-30 animate-float' }
          ]}
        />
        
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeader
            title={txt.practicalTitle}
            className="mb-16"
            titleClassName="text-3xl md:text-4xl mb-6"
            accentWidth="120px"
          />

          <motion.div 
            className="bg-white rounded-2xl shadow-xl border border-ocean-100/50 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            animate={practicalVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -4, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="p-6">
              <div className="grid gap-3">
                {[
                  { 
                    label: txt.coach, 
                    value: 'Ward Pellegrims',
                    icon: "👨‍🏫"
                  },
                  { 
                    label: txt.locationIntro, 
                    value: <a href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA" target="_blank" rel="noopener noreferrer" className="text-ocean-700 hover:text-ocean-800 font-medium hover:underline transition-colors duration-200">Topsportbad Wezenberg, Desguinlei 17-19, 2018 Antwerpen</a>,
                    icon: "📍"
                  },
                  { 
                    label: txt.day, 
                    value: txt.dayValue,
                    icon: "📅"
                  },
                  { 
                    label: txt.price, 
                    value: txt.priceValue,
                    icon: "💶"
                  },
                  { 
                    label: txt.gear, 
                    value: txt.gearValue,
                    icon: "🏊‍♀️"
                  },
                  { 
                    label: txt.invoice, 
                    value: txt.invoiceValue,
                    icon: "📄"
                  }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-ocean-25/50 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={practicalVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 8 }}
                  >
                    <motion.div 
                      className="text-xl"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {item.icon}
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                        <span className="font-semibold text-athletic-dark min-w-fit text-sm sm:text-base">
                          {item.label}
                        </span>
                        <div className="hidden sm:block w-1.5 h-1.5 bg-ocean-300 rounded-full opacity-40" />
                        <div className="text-athletic-dark/80 text-sm sm:text-base">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
          </motion.div>
        </div>
      </motion.section>

      {/* Trainingsdata - Enhanced vertical timeline */}
      <motion.section 
        id="dates"
        className="relative py-16 bg-gradient-to-br from-ocean-25 via-white to-ocean-50/30 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={datesVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Enhanced floating elements */}
        <SpotlightBackground
          asFragment
          spotlights={[
            { className: 'absolute -top-10 -left-10 w-64 h-64 bg-ocean-100 rounded-full blur-3xl opacity-30 animate-pulse-slow' },
            { className: 'absolute bottom-0 -right-16 w-72 h-72 bg-ocean-50 rounded-full blur-3xl opacity-40 animate-float' }
          ]}
        />
        <div className="absolute top-1/3 right-1/4 w-20 h-20 border-2 border-ocean-200/40 rounded-full animate-spin-slow opacity-30" />
        <div className="absolute bottom-1/4 left-1/3 w-16 h-16 bg-ocean-100/50 rounded-lg backdrop-blur-sm animate-float" />
        
        <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
          <SectionHeader
            title={txt.datesTitle}
            className="mb-16"
            titleClassName="text-3xl md:text-4xl mb-6"
            accentWidth="120px"
          />

          {/* Enhanced card with glass effect */}
          <motion.div 
            className="relative max-w-4xl mx-auto rounded-2xl border border-ocean-100/60 bg-white/80 backdrop-blur-sm shadow-2xl p-6 md:p-8"
            initial={{ opacity: 0, y: 50 }}
            animate={datesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            {/* Card decorative elements */}
            <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-ocean-100 to-ocean-200 rounded-br-3xl rounded-tl-2xl opacity-20" />
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-ocean-200 to-ocean-100 rounded-tl-3xl rounded-br-2xl opacity-15" />
            
            <div className="relative">
              {/* Enhanced timeline spine with gradient */}
              <div className="absolute left-3 sm:left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ocean-200 via-ocean-300 to-ocean-200 rounded-full" />
              <div className="absolute left-2.5 sm:left-4.5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-ocean-100 via-ocean-200 to-ocean-100 rounded-full opacity-50" />

              <div className="space-y-6">
                {txt.months.map((month, i) => (
                  <motion.div 
                    key={month.id} 
                    className="relative pl-12 sm:pl-16"
                    initial={{ opacity: 0, x: -30 }}
                    animate={datesVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                  >
                    {/* Enhanced timeline node */}
                    <motion.div 
                      className="absolute left-0 sm:left-2 top-1 w-6 h-6 rounded-full bg-gradient-to-br from-ocean-400 to-ocean-600 border-2 border-white shadow-lg flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={datesVisible ? { scale: 1, rotate: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.8 + i * 0.1, type: "spring", stiffness: 200 }}
                      whileHover={{ scale: 1.2, rotate: 360 }}
                    >
                      <motion.div 
                        className="w-2 h-2 bg-white rounded-full"
                        initial={{ scale: 0 }}
                        animate={datesVisible ? { scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 1.0 + i * 0.1 }}
                      />
                    </motion.div>
                    
                    {/* Month content with enhanced styling */}
                    <motion.div 
                      className="bg-gradient-to-r from-ocean-25 to-white rounded-xl p-4 border border-ocean-100/50 shadow-sm hover:shadow-md transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={datesVisible ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.9 + i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-lg sm:text-xl font-display font-bold text-athletic-dark mb-3 flex items-center">
                        <span className="mr-3">{month.title}</span>
                        <div className="h-px bg-gradient-to-r from-ocean-300 to-transparent flex-1" />
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                        {month.days.map((d, dayIndex) => (
                          <motion.span 
                            key={`${month.id}-${d}`} 
                            className="group inline-flex w-full justify-center items-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-ocean-50 to-ocean-25 text-ocean-700 border border-ocean-200/50 text-sm font-medium hover:from-ocean-100 hover:to-ocean-50 hover:border-ocean-300 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                            initial={{ opacity: 0, scale: 0.8, y: 10 }}
                            animate={datesVisible ? { opacity: 1, scale: 1, y: 0 } : {}}
                            transition={{ duration: 0.4, delay: 1.0 + i * 0.1 + dayIndex * 0.05, type: "spring", stiffness: 150 }}
                            whileHover={{ scale: 1.08, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <motion.span
                              className="group-hover:scale-110 transition-transform duration-200"
                            >
                              {d}
                            </motion.span>
                            <motion.div
                              className="w-1 h-1 bg-ocean-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                              initial={{ scale: 0 }}
                              whileHover={{ scale: 1 }}
                            />
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Enhanced footer text with icon */}
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={datesVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="inline-flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-ocean-100/50 shadow-lg">
              <svg className="w-5 h-5 text-ocean-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="text-sm text-athletic-dark/70 font-medium">
                {isEN ? 'All sessions take place on Friday afternoon at the ' : 'Alle sessies vinden plaats op vrijdagmiddag in het '}
                <a href="https://maps.app.goo.gl/LLJVUopK1vmeFsZWA" target="_blank" rel="noopener noreferrer" className="text-ocean-700 hover:text-ocean-800 font-semibold hover:underline transition-colors duration-200">
                  Topsportbad Wezenberg
                </a>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Inschrijven - CTA Style */}
      <motion.section 
        id="inschrijven" 
        className="relative py-16 bg-gradient-ocean text-white overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {txt.enrollTitle}
          </motion.h2>
          <motion.p 
            className="text-ocean-100 text-lg mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {txt.locationIntro} <span className="font-semibold">Topsportbad Wezenberg</span> • {txt.dayValue} • {txt.priceValue}
          </motion.p>

          <motion.div 
            className="bg-white/95 backdrop-blur-sm rounded-xl p-6 md:p-8 text-athletic-dark max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            whileHover={{ y: -2 }}
          >
            <EnrollmentForm locale={locale} />
          </motion.div>

          <motion.div 
            className="mt-6 text-center text-sm text-ocean-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            {txt.questions}<a className="text-white font-medium hover:underline" href={`/${locale}/#contact`}>{txt.contactForm}</a>.
          </motion.div>
        </div>
      </motion.section>
    </>
  )
}
