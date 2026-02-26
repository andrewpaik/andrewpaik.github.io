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
  liveUrl?: string;
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "sprintiq",
    title: "SprintIQ",
    description:
      "AI biomechanical analysis app using pose estimation and computer vision to optimize athletic performance.",
    longDescription:
      "SprintIQ leverages cutting-edge pose estimation and computer vision algorithms to provide real-time biomechanical analysis for athletes. The app captures movement patterns, identifies areas for improvement, and delivers actionable insights to optimize sprint technique, reduce injury risk, and enhance overall athletic performance. Built with a mobile-first approach, it processes video input through custom ML pipelines to extract joint angles, stride metrics, and symmetry scores.",
    category: ["AI/ML", "Computer Vision"],
    techStack: ["Python", "MediaPipe", "TensorFlow", "React Native", "FastAPI"],
    role: "Lead Developer",
    year: "2024",
    featured: true,
  },
  {
    slug: "serenity-ai",
    title: "Serenity AI",
    description:
      "Agentic wellness platform with LLM orchestration and RAG for personalized mental health support.",
    longDescription:
      "Serenity AI is an agentic wellness platform that orchestrates multiple LLM agents to deliver personalized mental health support. The system uses Retrieval-Augmented Generation (RAG) to ground responses in clinical research, combines conversational AI with structured therapeutic frameworks, and adapts its approach based on user interaction patterns. The multi-agent architecture enables specialized modules for different aspects of wellness -- from guided meditation to cognitive behavioral therapy techniques.",
    category: ["AI/ML", "Full-Stack"],
    techStack: [
      "Python",
      "LangChain",
      "OpenAI API",
      "Pinecone",
      "Next.js",
      "PostgreSQL",
    ],
    role: "Co-Founder & AI Developer",
    year: "2024",
    featured: true,
  },
  {
    slug: "neighborhood",
    title: "Neighborhood",
    description:
      "Social media app combating AI-human relationships by nurturing authentic human connection.",
    longDescription:
      "Neighborhood is a social media concept application designed to counter the growing trend of AI-human relationships and digital isolation. The platform prioritizes proximity-based connections, encouraging users to engage with people in their physical community. Features include local event discovery, neighborhood discussion boards, skill-sharing networks, and collaborative projects -- all designed to foster genuine human-to-human interaction in an increasingly AI-mediated world.",
    category: ["Full-Stack", "Research"],
    techStack: ["React Native", "Node.js", "Firebase", "Google Maps API"],
    role: "Creator & Developer",
    year: "2024",
    featured: true,
  },
  {
    slug: "poker-gto-trainer",
    title: "Poker GTO Trainer",
    description:
      "Interactive tool training users to play perfect game-theory-optimal poker strategy.",
    longDescription:
      "An interactive training application that teaches users game-theory-optimal (GTO) poker strategy. The trainer presents realistic poker scenarios, evaluates user decisions against mathematically optimal play, and provides detailed explanations of the underlying game theory. Features include hand range visualization, equity calculations, bet sizing analysis, and progressive difficulty levels that adapt to the user's skill development.",
    category: ["AI/ML", "Full-Stack"],
    techStack: ["Python", "NumPy", "React", "TypeScript", "WebSocket"],
    role: "Developer",
    year: "2024",
    featured: false,
  },
  {
    slug: "blockchainsc-research",
    title: "BlockchainSC Research",
    description:
      "Crypto research and investment analysis for a student-run blockchain investment organization.",
    longDescription:
      "Research and investment work for BlockchainSC, USC's premier blockchain investment and research organization. Conducted deep-dive analyses on DeFi protocols, layer-2 scaling solutions, and emerging blockchain ecosystems. Produced research reports on protocol mechanics, tokenomics, risk assessment, and market dynamics. Contributed to investment thesis development and portfolio strategy for the organization's digital asset fund.",
    category: ["Blockchain", "Research"],
    techStack: [
      "Python",
      "Dune Analytics",
      "DeFi Protocols",
      "On-chain Data",
    ],
    role: "Research Analyst",
    year: "2023-2024",
    featured: false,
  },
  {
    slug: "autonomous-data-analysis",
    title: "Autonomous Data Analysis",
    description:
      "AI-powered system for automated exploratory data analysis and insight generation.",
    longDescription:
      "An autonomous data analysis system that leverages LLM agents to perform exploratory data analysis without human intervention. The system ingests raw datasets, automatically identifies patterns and anomalies, generates visualizations, and produces natural language reports summarizing key findings. Built with a modular architecture that supports various data formats and analysis techniques, from statistical testing to time-series decomposition.",
    category: ["AI/ML", "Data Science"],
    techStack: [
      "Python",
      "Pandas",
      "Scikit-learn",
      "Plotly",
      "LangChain",
      "Streamlit",
    ],
    role: "Developer",
    year: "2024",
    featured: false,
  },
];

export const categories = [
  "All",
  "AI/ML",
  "Blockchain",
  "Full-Stack",
  "Data Science",
  "Research",
  "Computer Vision",
];
