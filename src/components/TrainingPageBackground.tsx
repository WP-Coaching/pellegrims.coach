import { SpotlightBackground } from "@/components/ui/spotlight-background";

export const TrainingPageBackground = () => (
  <>
    <SpotlightBackground
      asFragment
      spotlights={[
        {
          className:
            "absolute -top-16 -left-16 w-72 h-72 bg-ocean-100 rounded-full blur-3xl opacity-30 animate-float",
        },
        {
          className:
            "absolute -bottom-16 -right-16 w-80 h-80 bg-ocean-200 rounded-full blur-3xl opacity-20 animate-pulse-slow",
        },
      ]}
    />
    <div className="absolute left-1/4 top-1/4 h-16 w-16 animate-spin rounded-full border-2 border-ocean-400/30 opacity-50" />
    <div className="absolute bottom-1/4 right-1/3 h-12 w-12 animate-float rounded-lg bg-ocean-500/20 backdrop-blur-sm" />
  </>
);
