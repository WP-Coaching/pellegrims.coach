"use client";

import { useEffect, useState } from "react";

/**
 * Custom hook for tracking section visibility using IntersectionObserver.
 * Eliminates repeated observer boilerplate in section components.
 *
 * @param sectionId - The ID of the section element to observe
 * @param threshold - Intersection threshold (default: 0.1 = 10% visible)
 * @returns boolean indicating if the section is visible
 */
export function useSectionVisibility(
  sectionId: string,
  threshold: number = 0.1,
  rootMargin: string = "0px"
): boolean {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    const section = document.getElementById(sectionId);
    if (section) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [sectionId, threshold, rootMargin]);

  return isVisible;
}
