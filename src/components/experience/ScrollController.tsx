"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { useScrollProgress } from "./useScrollProgress";

export default function ScrollController() {
    const setProgress = useScrollProgress((s) => s.setProgress);

    useEffect(() => {
        const lenis = new Lenis({ duration: 1.2, smoothWheel: true });

        lenis.on("scroll", ({ progress }: { progress: number }) => {
            console.log("[Lenis] scroll progress:", progress);
            setProgress(progress);
        });

        let rafId: number;

        function raf(time: number) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
            cancelAnimationFrame(rafId);
        };
    }, [setProgress]);

    return null;
}