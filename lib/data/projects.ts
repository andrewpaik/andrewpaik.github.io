export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string[];
  techStack: string[];
  role: string;
  year: string;
  featured: boolean;
  status?: "building" | "complete";
  thumbnail?: string;
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "sprintiq",
    title: "SprintIQ",
    description:
      "AI-powered mobile app for sprint biomechanical analysis using pose estimation and personalized coaching feedback.",
    longDescription:
      "SprintIQ is a mobile application that provides automated biomechanical analysis for sprinters. Athletes record themselves running via their phone camera, MediaPipe Pose runs on-device to detect 33 body keypoints per frame (no video leaves the device), and the backend computes 7 biomechanical metrics -- trunk lean, shin angle, knee drive height, ground contact time, foot placement, triple extension, and stride progression. Each metric is classified into quality tiers with plain-language coaching feedback and corrective drill recommendations backed by published sports science research.",
    category: ["AI/ML", "Computer Vision", "Mobile"],
    techStack: ["React Native", "FastAPI", "MediaPipe", "Python", "NumPy"],
    role: "Creator & Developer",
    year: "2025",
    featured: true,
    status: "building",
  },
  {
    slug: "poker-gto-trainer",
    title: "Poker GTO Trainer",
    description:
      "Real-time poker training with AI-powered GTO strategy analysis and instant feedback on your decisions.",
    longDescription:
      "An interactive training application that teaches users game-theory-optimal (GTO) poker strategy. The trainer presents realistic poker scenarios, evaluates user decisions against mathematically optimal play, and provides detailed explanations of the underlying game theory. Features include hand range visualization, equity calculations, bet sizing analysis, and progressive difficulty levels that adapt to the user's skill development.",
    category: ["AI/ML", "Full-Stack"],
    techStack: ["React", "FastAPI", "WebSockets", "Python"],
    role: "Developer",
    year: "2024",
    featured: true,
    thumbnail: "/images/projects/poker.png",
    repoUrl: "https://github.com/andrewpaik/poker-gto-trainer",
  },
  {
    slug: "neighborhood",
    title: "Neighborhood",
    description:
      "Social community platform connecting locals through weekly missions and group activities.",
    longDescription:
      "Neighborhood is a social community platform designed to counter digital isolation by prioritizing proximity-based connections. The platform encourages users to engage with people in their physical community through weekly missions and group activities. Features include local event discovery, neighborhood discussion boards, skill-sharing networks, and collaborative projects -- all designed to foster genuine human-to-human interaction.",
    category: ["Full-Stack", "Research"],
    techStack: ["Next.js", "Firebase", "Tailwind CSS", "TypeScript"],
    role: "Creator & Developer",
    year: "2024",
    featured: true,
    thumbnail: "/images/projects/neighborhood.png",
    repoUrl: "https://github.com/andrewpaik/neighborhood",
  },
  {
    slug: "data-analyst-agent",
    title: "Data Analyst Agent",
    description:
      "Autonomous AI system for end-to-end data analysis with auto-generated reports and visualizations.",
    longDescription:
      "An autonomous AI system that performs end-to-end data analysis without human intervention. The system ingests raw datasets, automatically identifies patterns and anomalies, generates visualizations, and produces natural language reports summarizing key findings. Built with a modular architecture that supports various data formats and analysis techniques, from statistical testing to time-series decomposition.",
    category: ["AI/ML", "Data Science"],
    techStack: ["Python", "scikit-learn", "Pandas", "Matplotlib"],
    role: "Developer",
    year: "2024",
    featured: true,
    thumbnail: "/images/projects/data-analyst.png",
    repoUrl: "https://github.com/andrewpaik/data-analyst-agent",
  },
  {
    slug: "eye-tracking-app",
    title: "Eye Tracking App",
    description:
      "Desktop eye tracking with webcam-based gaze estimation, calibration, and heatmap visualization.",
    longDescription:
      "A desktop eye tracking application using webcam-based gaze estimation powered by MediaPipe. Features include a calibration system for accurate tracking, real-time gaze point visualization, and heatmap generation to analyze viewing patterns. Built with Electron for cross-platform desktop support, enabling accessibility research and UX analysis without specialized hardware.",
    category: ["AI/ML", "Computer Vision"],
    techStack: ["Electron", "JavaScript", "MediaPipe"],
    role: "Developer",
    year: "2024",
    featured: true,
    thumbnail: "/images/projects/eye-tracking.png",
    repoUrl: "https://github.com/andrewpaik/eye-tracking-app",
  },
];

export const categories = [
  "All",
  "AI/ML",
  "Full-Stack",
  "Mobile",
  "Data Science",
  "Research",
  "Computer Vision",
];
