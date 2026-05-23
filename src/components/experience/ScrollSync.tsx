"use client";

import { useEffect } from "react";
import { useScrollProgress } from "./useScrollProgress";

export default function ScrollSync() {
    const setProgress = useScrollProgress((s) => s.setProgress);

    useEffect(() => {
        const onScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll =
                document.body.scrollHeight - window.innerHeight;

            const progress = scrollY / maxScroll;

            setProgress(progress);
        };

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [setProgress]);

    return null;
}