import { useMemo } from "react";
import { useScrollProgress } from "./useScrollProgress";

export function useScene() {
  const progress = useScrollProgress((s) => s.progress);

  return useMemo(() => {
    if (progress < 0.3) {
      return {
        name: "intro",
        fogNear: 5,
        fogFar: 25,
        light: 0.4,
        particleIntensity: 1,
        treeDensity: 60,
        openness: 0.6,
      };
    }

    if (progress < 0.6) {
      return {
        name: "projects",
        fogNear: 2,
        fogFar: 18,
        light: 0.7,
        particleIntensity: 1.4,
        treeDensity: 100,
        openness: 0.3,
      };
    }

    if (progress < 0.85) {
      return {
        name: "skills",
        fogNear: 8,
        fogFar: 35,
        light: 0.9,
        particleIntensity: 0.7,
        treeDensity: 40,
        openness: 0.8,
      };
    }

    return {
      name: "contact",
      fogNear: 3,
      fogFar: 20,
      light: 0.5,
      particleIntensity: 0.3,
      treeDensity: 20,
      openness: 1,
    };
  }, [progress]);
}