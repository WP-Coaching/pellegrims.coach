"use client";

import {
  BikeIcon,
  BriefcaseIcon,
  RunIcon,
  SwimmerIcon,
  TriathlonIcon,
} from "@/components/ui/icons";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/typography";
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
      gradient: "from-primary-500 to-primary-600",
      description: t.coaching.serviceDescriptions.swim,
      highlight: t.coaching.highlights.swim,
    },
    {
      icon: BikeIcon,
      title: t.coaching.services.bike,
      gradient: "from-primary-600 to-primary-700",
      description: t.coaching.serviceDescriptions.bike,
      highlight: t.coaching.highlights.bike,
    },
    {
      icon: RunIcon,
      title: t.coaching.services.run,
      gradient: "from-primary-400 to-primary-500",
      description: t.coaching.serviceDescriptions.run,
      highlight: t.coaching.highlights.run,
    },
    {
      icon: TriathlonIcon,
      title: t.coaching.services.triathlon,
      gradient: "from-primary-700 to-primary-800",
      description: t.coaching.serviceDescriptions.triathlon,
      highlight: t.coaching.highlights.triathlon,
    },
    {
      icon: BriefcaseIcon,
      title: t.coaching.services.executive,
      gradient: "from-primary-800 to-primary-900",
      description: t.coaching.serviceDescriptions.executive,
      highlight: t.coaching.highlights.executive,
    },
  ];

  return (
    <section
      id="coaching"
      className="from-athletic-light via-ocean-50 relative bg-gradient-to-br to-white py-24"
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
                <Card
                  variant="service"
                  className="group relative overflow-hidden"
                  interactive={true}
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
                    className={`inline-flex h-16 w-16 items-center justify-center bg-gradient-to-br ${service.gradient} mb-6 rounded-2xl text-2xl text-white shadow-athletic group-hover:shadow-primary`}
                  >
                    <service.icon />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-athletic-dark group-hover:text-ocean-700 mb-3 font-display text-xl font-bold transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="leading-relaxed text-gray-600">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Effect Border */}
                  <div className="group-hover:border-ocean-200 absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300"></div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
