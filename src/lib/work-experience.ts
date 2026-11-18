export type WorkExperience = {
  company: string;
  role: string;
  tech: string;
  description: string;
  startYear: string;
  endYear: string;
  logo: string;
};

export const workExperience: WorkExperience[] = [
  {
    company: "Needles",
    role: "AI Engineer",
    tech: "Python, FastAPI, Claude",
    description: "Founding AI engineer at Chronic Ink, building Needles: sales training where staff practice voice calls with an AI customer and get a score with coaching on what to fix. Own it end-to-end, from API design and data modeling to AI pipelines and deployment.",
    startYear: "2026",
    endYear: "Present",
    logo: "/assets/needles.png",
  },
  {
    company: "CARAQUECODA",
    role: "Founder",
    tech: "LLMs, Python, Next.js",
    description: "Software house behind my senior AI engineering contracts with international clients. Ship production AI systems end-to-end: LLM orchestration, RAG, agent workflows, and evaluation loops, backed by years of full-stack work in fintech, booking, and health tech.",
    startYear: "2023",
    endYear: "Present",
    logo: "/assets/caraquecoda.png",
  },
  {
    company: "BooksOpen",
    role: "Senior Software Engineer",
    tech: "Next.js, Nest.js, Prisma",
    description: "Migrated core architecture from 1-1 to 1-n enabling workspace environments and Stripe Connect accounts. Eliminated 100% of payment errors preventing duplicate charges and double bookings.",
    startYear: "2025",
    endYear: "2026",
    logo: "/assets/booksopen.jpeg",
  },
  {
    company: "DocHelp",
    role: "Co-Founder",
    tech: "Next.js, LangChain, Vector DB",
    description: "Built a RAG-powered AI chat that consults medicine books directly, helping 500+ real doctors in their clinical appointments.",
    startYear: "2024",
    endYear: "2025",
    logo: "/assets/dochelp.png",
  },
  {
    company: "Brasilprev",
    role: "Full Stack Developer",
    tech: "Angular, Node.js, AWS",
    description: "Implemented 90% unit test coverage on frontend single-handedly. Launched internal design system as npm packages for company-wide use. Delivered Open Insurance API matching government requirements.",
    startYear: "2021",
    endYear: "2023",
    logo: "/assets/brasilprev.webp",
  },
  {
    company: "Bullla",
    role: "Mobile Developer",
    tech: "React Native, TypeScript",
    description: "Built iOS and Android app from scratch, migrating from legacy Cordova. Led the team during development and managed App Store and Play Store releases.",
    startYear: "2021",
    endYear: "2021",
    logo: "/assets/bullla.png",
  },
  {
    company: "WEX Brasil Tech",
    role: "Frontend Developer",
    tech: "PHP, Cordova, JavaScript",
    description: "Maintained corporate websites and legacy Cordova mobile applications.",
    startYear: "2020",
    endYear: "2021",
    logo: "/assets/wex.png",
  },
  {
    company: "Sociax",
    role: "Full Stack Developer",
    tech: "React, Node.js",
    description: "Built web app integrating Facebook Marketing API with real-time graphs and filters, helping social media managers extract actionable insights from ad metrics.",
    startYear: "2020",
    endYear: "2020",
    logo: "/assets/sociax.jpeg",
  },
  {
    company: "Tinbeer",
    role: "Full Stack Developer",
    tech: "React, React Native, Node.js",
    description: "Built mobile app and admin panel for a craft beer marketplace that matched brewers with producers—like Tinder for beer.",
    startYear: "2019",
    endYear: "2020",
    logo: "/assets/tinbeer.png",
  },
  {
    company: "Commerzbank",
    role: "IT Intern",
    tech: "HTML, CSS, JavaScript",
    description: "Supported internal banking systems and data processing workflows.",
    startYear: "2018",
    endYear: "2019",
    logo: "/assets/commerzbank.png",
  },
  {
    company: "Cremesp",
    role: "IT Intern",
    tech: "HTML, CSS, JavaScript",
    description: "Maintained medical council registration systems and internal tools.",
    startYear: "2017",
    endYear: "2018",
    logo: "/assets/cremesp.jpg",
  },
];
