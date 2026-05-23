export type Project = {
  id: string;
  title: string;
  description: string;
  position: [number, number, number];
};

export const projects = [
  {
    id: "kivent",
    title: "Kivent",
    description:
      "AI-powered event organizer platform with Gemini AI integration, Clerk auth, and subscription system.",
    position: [-6, 1.5, -12],
  },
  {
    id: "elf",
    title: "ELF Bangladesh",
    description:
      "Enterprise incentive management system with dashboards, QR workflows, and analytics.",
    position: [6, 1.5, -18],
  },
];