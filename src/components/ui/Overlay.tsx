"use client";

import { useScrollProgress } from "../experience/useScrollProgress";
import { useActiveProject } from "../shared/useActiveProject";
import { projects } from "../experience/projects";

export default function Overlay() {
    const progress = useScrollProgress((s) => s.progress);
    const activeId = useActiveProject((s) => s.activeId);

    const activeProject = projects.find((p) => p.id === activeId);

    return (
        <div className="fixed top-0 left-0 w-full h-screen pointer-events-none text-white">
            <div className="absolute left-10 top-10 text-sm opacity-70">
                Scroll: {progress.toFixed(2)}
            </div>

            <div className="absolute bottom-20 left-10">
                <h1 className="text-4xl font-light">
                    Immersive Portfolio
                </h1>

                {activeProject && (
                    <div
                        className={`
                            mt-6
                            transition-all
                            duration-700
                            ${activeProject
                                ? "opacity-100 translate-y-0"
                                : "opacity-0 translate-y-4"
                            }
                        `}
                    >
                        <h2 className="text-xl font-medium">
                            {activeProject.title}
                        </h2>
                        <p className="text-sm opacity-70">
                            {activeProject.description}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}