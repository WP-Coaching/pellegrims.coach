"use client";

import {
  BikeIcon,
  BriefcaseIcon,
  RunIcon,
  SwimmerIcon,
  TriathlonIcon,
} from "@/components/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AthleticButton } from "@/components/ui/athletic-button";
import { AthleticCard } from "@/components/ui/athletic-card";
import { SectionHeader } from "@/components/ui/section-header";
import type { Locale } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/translations";

type Props = {
  locale: Locale;
  t: TranslationKey;
};

export default function Coaching({ t }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("coaching");
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const services = [
    {
      icon: SwimmerIcon,
      title: t.coaching.services.swim,
      gradient: "from-ocean-500 to-ocean-600",
      description: t.coaching.serviceDescriptions.swim,
      highlight: t.coaching.highlights.swim,
    },
    {
      icon: BikeIcon,
      title: t.coaching.services.bike,
      gradient: "from-ocean-600 to-ocean-700",
      description: t.coaching.serviceDescriptions.bike,
      highlight: t.coaching.highlights.bike,
    },
    {
      icon: RunIcon,
      title: t.coaching.services.run,
      gradient: "from-ocean-400 to-ocean-500",
      description: t.coaching.serviceDescriptions.run,
      highlight: t.coaching.highlights.run,
    },
    {
      icon: TriathlonIcon,
      title: t.coaching.services.triathlon,
      gradient: "from-ocean-700 to-ocean-800",
      description: t.coaching.serviceDescriptions.triathlon,
      highlight: t.coaching.highlights.triathlon,
    },
    {
      icon: BriefcaseIcon,
      title: t.coaching.services.executive,
      gradient: "from-ocean-800 to-ocean-900",
      description: t.coaching.serviceDescriptions.executive,
      highlight: t.coaching.highlights.executive,
    },
  ];

  return (
    <section
      id="coaching"
      className="relative bg-gradient-to-br from-athletic-light via-ocean-50 to-white py-24"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        <SectionHeader
          title={t.coaching.title}
          description={t.coaching.intro}
          className="mb-16"
          titleClassName="text-4xl md:text-5xl mb-6"
          descriptionClassName="text-xl max-w-3xl mx-auto"
          accentWidth="120px"
        />

        {/* Services Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="block h-full focus:outline-none"
              >
                <AthleticCard
                  variant="service"
                  className="group relative overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div
                    className={`absolute right-0 top-0 h-32 w-32 bg-gradient-to-br ${service.gradient} -translate-y-8 translate-x-8 transform rounded-full opacity-10 transition-transform duration-500 group-hover:scale-150`}
                  ></div>

                  {/* Highlight Badge */}
                  <div className="absolute right-4 top-4">
                    <span
                      className={`inline-block bg-gradient-to-r px-3 py-1 text-xs font-semibold ${service.gradient} rounded-full text-white`}
                    >
                      {service.highlight}
                    </span>
                  </div>

                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    className={`inline-flex h-16 w-16 items-center justify-center bg-gradient-to-br ${service.gradient} mb-6 rounded-2xl text-2xl text-white shadow-athletic group-hover:shadow-ocean`}
                  >
                    <service.icon />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="mb-3 font-display text-xl font-bold text-athletic-dark transition-colors duration-300 group-hover:text-ocean-700">
                      {service.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-ocean-200"></div>
                </AthleticCard>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="relative overflow-hidden rounded-2xl bg-gradient-ocean p-8 text-white md:p-12">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-11.046-8.954-20-20-20v20h20z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
              ></div>
            </div>

            <div className="relative z-10">
              <h3 className="mb-4 font-display text-2xl font-bold md:text-3xl">
                {t.coaching.cta.title}
              </h3>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-ocean-100">
                {t.coaching.cta.description}
              </p>
              <AthleticButton
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                variant="inverted"
                size="lg"
                className="font-semibold"
              >
                {t.coaching.cta.button}
              </AthleticButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
