export type Project = {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
};

export const projects: Project[] = [
  {
    id: "p1",
    title: "Project One",
    description: "A cinematic web experience",
    position: [-2, 1, -5],
  },
  {
    id: "p2",
    title: "Project Two",
    description: "A React + 3D interaction system",
    position: [2, 1.5, -8],
  },
  {
    id: "p3",
    title: "Project Three",
    description: "Experimental immersive UI concept",
    position: [0, 2, -12],
  },
];