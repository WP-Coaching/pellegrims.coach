"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { SectionHeader } from "@/components/ui/section-header";

export type TrainingGroup = {
  title: string;
  time: string;
  description: string;
  bullets: string[];
  motivationalText: string;
};

type TrainingGroupCardProps = {
  group: TrainingGroup;
  isVisible: boolean;
  delay?: number;
};

export function TrainingGroupCard({
  group,
  isVisible,
  delay = 0.1,
}: TrainingGroupCardProps) {
  return (
    <motion.div
      className="group relative rounded-2xl border border-ocean-200/50 bg-gradient-to-br from-white via-ocean-50/30 to-white p-8 shadow-xl transition-all duration-300 hover:shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
    >
      <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-br from-ocean-200 to-ocean-300 opacity-20 transition-opacity duration-300 group-hover:opacity-30" />
      <div className="relative">
        <div className="mb-4 flex items-center">
          <div className="mr-3 h-3 w-3 rounded-full bg-ocean-500" />
          <h3 className="font-display text-xl font-bold text-athletic-dark">
            {group.title}
          </h3>
        </div>
        <Badge variant="subtle" className="mb-6 px-3 text-sm font-medium">
          <svg
            className="mr-2 h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {group.time}
        </Badge>
        <p className="mb-6 leading-relaxed text-athletic-dark/80">
          {group.description}
        </p>
        <div className="mb-6 space-y-4">
          {group.bullets.map((bullet, i) => (
            <div key={i} className="flex items-start">
              <div className="mr-3 mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-ocean-500">
                <svg
                  className="h-3 w-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="text-sm leading-relaxed text-athletic-dark/80">
                {bullet}
              </p>
            </div>
          ))}
        </div>
        <div className="border-t border-ocean-100 pt-4">
          <p className="rounded-lg bg-ocean-50 px-4 py-2 text-sm font-medium italic text-ocean-700">
            {group.motivationalText}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

type TrainingGroupsSectionProps = {
  title: string;
  groups: TrainingGroup[];
  isVisible: boolean;
  columns?: 1 | 2;
};

export function TrainingGroupsSection({
  title,
  groups,
  isVisible,
  columns = 2,
}: TrainingGroupsSectionProps) {
  return (
    <motion.section
      id="training-groups"
      className="relative py-16"
      initial={{ opacity: 0 }}
      animate={isVisible ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader
          title={title}
          className="mb-16"
          titleClassName="text-3xl md:text-4xl mb-6"
          accentWidth="120px"
        />

        <div
          className={`grid grid-cols-1 gap-8 ${columns === 2 ? "md:grid-cols-2" : ""}`}
        >
          {groups.map((group, index) => (
            <TrainingGroupCard
              key={index}
              group={group}
              isVisible={isVisible}
              delay={0.1 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
