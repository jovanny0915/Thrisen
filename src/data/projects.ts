/**
 * Projects slot — plug in real portfolio data later.
 */
export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  impact: string;
  image?: string;
  repo?: string;
  link?: string;
  tech: string[];
};

export const exampleProjects: Project[] = [
  {
    id: "1",
    title: "Thrisen",
    tagline: "Interactive identity-driven portfolio",
    description: "Interactive split-screen portfolio with 3D character and dual worlds.",
    problem: "Portfolio sites often flatten personality and technical depth into the same layout.",
    solution:
      "Designed a bridge interaction that routes users into audience-specific spaces with GSAP and React Three Fiber.",
    impact: "Improved narrative clarity for both recruiter and community audiences in a single product.",
    repo: "https://github.com",
    link: "https://github.com",
    tech: ["React", "Vite", "R3F", "GSAP", "Tailwind"],
  },
  {
    id: "2",
    title: "API Dashboard",
    tagline: "Operational visibility for integrations",
    description: "Real-time dashboard for monitoring external APIs with alerts.",
    problem: "Team lacked centralized health visibility across third-party API dependencies.",
    solution: "Implemented realtime websocket feeds and severity-based alert panels.",
    impact: "Reduced mean-time-to-detection during incidents and improved on-call response speed.",
    repo: "https://github.com",
    link: "https://github.com",
    tech: ["TypeScript", "React", "WebSocket"],
  },
  {
    id: "3",
    title: "CLI Tool",
    tagline: "Scaffold once, ship faster",
    description: "Developer CLI for scaffolding and code generation.",
    problem: "New project setup was repetitive and error-prone across teams.",
    solution: "Authored composable templates with typed prompts and guarded defaults.",
    impact: "Cut initial setup time from hours to minutes for internal contributors.",
    repo: "https://github.com",
    tech: ["Node.js", "TypeScript"],
  },
];
