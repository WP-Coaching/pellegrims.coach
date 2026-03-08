"use client";

import { motion } from "framer-motion";
import type { GroupTraining } from "@/payload-types";
import { Card } from "@/components/ui/card";
import { Stack } from "@/components/ui/layout";
import { RichText } from "@/components/ui/rich-text";

type TrainingGroupCardProps = {
  content: GroupTraining["focusContent"];
  isVisible: boolean;
  delay?: number;
};

export function TrainingGroupCard({
  content,
  isVisible,
  delay = 0.1,
}: TrainingGroupCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <Card variant="project" padding="none" className="relative h-full">
        <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-2xl rounded-tr-2xl bg-gradient-to-br from-primary-200 to-primary-300 opacity-20" />
        <Stack gap={6} className="relative h-full p-8">
          <RichText content={content} />
        </Stack>
      </Card>
    </motion.div>
  );
}
