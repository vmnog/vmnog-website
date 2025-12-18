"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, useScroll, useTransform } from "motion/react";
import * as motion from "motion/react-client";
import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon, NewTwitterIcon, StarIcon } from "@hugeicons/core-free-icons";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, filter: "blur(10px)", y: 10 },
  show: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

function BlurFadeIn({ children }: { children: ReactNode }) {
  return <motion.div variants={item}>{children}</motion.div>;
}

const workExperience = [
  {
    company: "BooksOpen",
    role: "Founding Engineer",
    tech: "React, TypeScript, Next.js",
    description: "Building the future of digital reading experiences with modern web technologies and AI-powered features.",
    startYear: "2025",
    endYear: "Present",
    logo: "/assets/booksopen.jpeg",
  },
  {
    company: "CARAQUECODA",
    role: "Founder",
    tech: "React, Node.js, YouTube",
    description: "Created a Brazilian tech education channel focused on web development tutorials and career guidance for developers.",
    startYear: "2023",
    endYear: "2025",
    logo: "/assets/caraquecoda.png",
  },
  {
    company: "DocHelp",
    role: "Co-Founder",
    tech: "React, TypeScript, AI",
    description: "Built an AI-powered documentation assistant to help developers navigate and understand complex codebases.",
    startYear: "2024",
    endYear: "2025",
    logo: "/assets/dochelp.png",
  },
  {
    company: "Brasilprev",
    role: "Full Stack Developer",
    tech: "React, Node.js, AWS",
    description: "Developed pension and retirement planning applications serving millions of Brazilian customers.",
    startYear: "2021",
    endYear: "2023",
    logo: "/assets/brasilprev.webp",
  },
  {
    company: "Bullla",
    role: "Mobile Developer",
    tech: "React Native, TypeScript",
    description: "Built mobile fintech solutions for salary advance and financial wellness products.",
    startYear: "2021",
    endYear: "2021",
    logo: "/assets/bullla.png",
  },
  {
    company: "WEX Brasil Tech",
    role: "Frontend Developer",
    tech: "React, TypeScript",
    description: "Developed fleet management and corporate payment solutions for enterprise clients.",
    startYear: "2020",
    endYear: "2021",
    logo: "/assets/wex.png",
  },
  {
    company: "Sociax",
    role: "Full Stack Developer",
    tech: "React, Node.js",
    description: "Built social impact platforms connecting volunteers with community organizations.",
    startYear: "2020",
    endYear: "2020",
    logo: "/assets/sociax.jpeg",
  },
  {
    company: "Tinbeer",
    role: "Full Stack Developer",
    tech: "React, Node.js, MongoDB",
    description: "Created a craft beer marketplace connecting breweries with consumers and retailers.",
    startYear: "2019",
    endYear: "2020",
    logo: "/assets/tinbeer.png",
  },
  {
    company: "Commerzbank",
    role: "IT Intern",
    tech: "Java, SQL",
    description: "Supported internal banking systems and data processing workflows.",
    startYear: "2018",
    endYear: "2019",
    logo: "/assets/commerzbank.png",
  },
  {
    company: "Cremesp",
    role: "IT Intern",
    tech: "PHP, MySQL",
    description: "Maintained medical council registration systems and internal tools.",
    startYear: "2017",
    endYear: "2018",
    logo: "/assets/cremesp.jpg",
  },
];

const blogPosts = [
  {
    title: "Migrating from 1-1 to 1-N: Scaling a Multi-User Studio Architecture",
    source: "BooksOpen",
    linkText: "Blog",
    url: "https://blog.booksopen.io/posts/downsizing-your-piercing",
  },
  {
    title: "Building an AI-Powered Migration Tool for E-commerce Platforms",
    source: "BooksOpen",
    linkText: "Blog",
    url: "https://blog.booksopen.io/posts/downsizing-your-piercing",
  },
];

const openSourceProjects = [
  {
    name: "plotwist",
    description: "Open-source platform for tracking movies, TV shows, and building watchlists.",
    tech: "Next.js, TypeScript, Tailwind",
    stars: 1200,
    url: "https://github.com/plotwist-app/plotwist",
    contributor: true,
  },
  {
    name: "nextjs-stripe-store",
    description: "Full-featured ecommerce starter with Stripe payments, cart management, and product catalog.",
    tech: "Next.js, Stripe, TypeScript",
    stars: 85,
    url: "https://github.com/vmnog/nextjs-stripe-store",
  },
  {
    name: "saas-ai-boilerplate",
    description: "Production-ready SaaS starter with AI chat, Stripe subscriptions, and authentication.",
    tech: "Next.js, Fastify, OpenAI, Stripe",
    stars: 42,
    url: "https://github.com/vmnog/saas-ai-boilerplate",
  },
];

const courses = [
  {
    title: "HTML5 for Beginners",
    description: "Learn HTML5 from basics to advanced. Build professional web pages.",
    platform: "Udemy",
    rating: 4.7,
    students: 7,
    url: "https://www.udemy.com/course/caraquecoda-curso-html5",
  },
];

const INITIAL_DISPLAY_COUNT = 4;

export default function Home() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const experienceListRef = useRef<HTMLOListElement>(null);
  const aboutImageRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: aboutImageRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (experienceListRef.current && !experienceListRef.current.contains(event.target as Node)) {
        setExpandedJob(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayedExperience = isExpanded
    ? workExperience
    : workExperience.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = workExperience.length > INITIAL_DISPLAY_COUNT;

  return (
    <>
    <main className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <motion.div
        className="w-full max-w-2xl space-y-16"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <BlurFadeIn>
          <h1 className="text-3xl font-normal leading-tight tracking-tight text-balance sm:text-4xl">
            Transforming startup visions into reality{" "}
            <span className="text-zinc-400 dark:text-zinc-500">
              and expertly leading end-to-end product development.
            </span>
          </h1>
        </BlurFadeIn>
        <BlurFadeIn>
          <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
            <span className="text-base">Victor Nogueira</span>
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/vmnog"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                aria-label="GitHub"
              >
                <HugeiconsIcon icon={Github01Icon} size={20} />
              </a>
              <a
                href="https://x.com/caraquecoda"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                aria-label="X (Twitter)"
              >
                <HugeiconsIcon icon={NewTwitterIcon} size={20} />
              </a>
              <a
                href="mailto:me@vmnog.com"
                className="text-sm decoration-zinc-900 underline-offset-4 hover:underline dark:decoration-zinc-100"
              >
                me@vmnog.com
              </a>
            </div>
          </div>
        </BlurFadeIn>

        <BlurFadeIn>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Experiences
            </h2>
            <ol ref={experienceListRef} className="mt-8 space-y-6 overflow-hidden">
              <AnimatePresence>
                {displayedExperience.map((job, index) => {
                  const jobKey = `${job.company}-${job.startYear}`;
                  const isJobExpanded = expandedJob === jobKey;
                  return (
                    <motion.li
                      key={jobKey}
                      className="group flex cursor-default flex-col gap-2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0, transition: { duration: 0.3, delay: index * 0.1 } }}
                      exit={{ opacity: 0, x: 20, transition: { duration: 0.3, delay: (workExperience.length - 1 - index) * 0.1 } }}
                      onClick={() => setExpandedJob(isJobExpanded ? null : jobKey)}
                    >
                      <div className="flex items-start gap-4">
                        <div className="relative flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-zinc-700/50">
                          <img
                            src={job.logo}
                            alt={`${job.company} logo`}
                            className="h-7 w-7 rounded-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col gap-1">
                          <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                            {job.company}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-zinc-400">
                            <span className="font-medium">{job.role}</span> · {job.tech}
                          </span>
                        </div>
                        <span
                          className="text-xs text-zinc-400 dark:text-zinc-500"
                          aria-label={`${job.startYear} until ${job.endYear}`}
                        >
                          {job.startYear} - {job.endYear}
                        </span>
                      </div>
                      <div className={`grid transition-all duration-200 ease-out ${isJobExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"} sm:group-hover:grid-rows-[1fr] sm:group-hover:opacity-100`}>
                        <div className="overflow-hidden">
                          <p className="max-w-sm pl-14 text-xs text-zinc-500 dark:text-zinc-400">
                            <span className="mr-1 text-zinc-300 dark:text-zinc-600">↳</span>
                            {job.description}
                          </p>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ol>
            {hasMore && (
              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-8 w-full text-center text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
              >
                {isExpanded ? "See less" : `See ${workExperience.length - INITIAL_DISPLAY_COUNT} more`}
              </button>
            )}
          </div>
        </BlurFadeIn>

        <BlurFadeIn>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Writings
            </h2>
            <ul className="mt-8 space-y-6">
              {blogPosts.map((post) => (
                <li key={post.url} className="flex items-start justify-between gap-4">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-w-[40ch] text-sm font-medium text-balance text-zinc-900 decoration-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100 dark:decoration-zinc-100"
                  >
                    {post.title}
                  </a>
                  <span className="flex shrink-0 items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                    <span>{post.source}</span>
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="decoration-zinc-400 underline-offset-4 hover:underline dark:decoration-zinc-500"
                    >
                      {post.linkText}
                    </a>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </BlurFadeIn>

        <BlurFadeIn>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Open Source
            </h2>
            <ul className="mt-8 space-y-6">
              {openSourceProjects.map((project) => (
                <li key={project.url} className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium whitespace-nowrap text-zinc-900 decoration-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100 dark:decoration-zinc-100"
                    >
                      {project.name}
                    </a>
                    <span className="flex items-center gap-1 text-xs text-amber-500">
                      <HugeiconsIcon icon={StarIcon} size={12} />
                      {project.stars}
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-400 decoration-zinc-400 underline-offset-4 hover:underline dark:text-zinc-500 dark:decoration-zinc-500"
                    >
                      GitHub
                    </a>
                    {project.contributor && (
                      <span className="ml-auto rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-700 dark:bg-amber-900/30 dark:text-amber-500">
                        Contributor
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {project.description}
                  </p>
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    {project.tech}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </BlurFadeIn>

        <BlurFadeIn>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              Courses
            </h2>
            <ul className="mt-8 space-y-6">
              {courses.map((course) => (
                <li key={course.url} className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-zinc-900 decoration-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100 dark:decoration-zinc-100"
                    >
                      {course.title}
                    </a>
                  </div>
                  <p className="max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                    {course.description}
                  </p>
                  <span className="flex items-center gap-2 text-xs text-zinc-400 dark:text-zinc-500">
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="decoration-zinc-400 underline-offset-4 hover:underline dark:decoration-zinc-500"
                    >
                      {course.platform}
                    </a>
                    <span>·</span>
                    <span className="flex items-center gap-1 text-amber-500">
                      <HugeiconsIcon icon={StarIcon} size={12} />
                      {course.rating}
                    </span>
                    <span>·</span>
                    <span>{course.students} students</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </BlurFadeIn>

        <BlurFadeIn>
          <div>
            <h2 className="text-xs font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              About
            </h2>
            <div className="relative mt-8 grid grid-cols-1 gap-6 sm:-mx-16 sm:grid-cols-2 sm:px-16">
              <div className="space-y-6 text-sm text-pretty text-zinc-600 dark:text-zinc-400">
                <div className="space-y-4">
                  <p>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">Based in São Paulo, Brazil.</span>{" "}
                    Nine years turning ideas into products that people actually use.
                  </p>
                  <p>
                    I thrive in startups where speed matters and ideas turn into real things.
                  </p>
                  <p>
                    Give me a problem, a deadline, and some creative freedom—I&apos;ll give you something you&apos;re proud to ship.
                  </p>
                  <p>
                    The details matter to me. It&apos;s what separates good from great.
                  </p>
                </div>
                <blockquote className="border-l-2 border-zinc-200 pl-4 dark:border-zinc-700">
                  <p className="text-sm italic text-zinc-900 dark:text-zinc-100">
                    &ldquo;Building is my craft. Startups are my playground.&rdquo;
                  </p>
                  <cite className="mt-2 block text-xs font-medium not-italic text-zinc-400 dark:text-zinc-500">
                    — Victor Nogueira
                  </cite>
                </blockquote>
              </div>
              <div ref={aboutImageRef} className="overflow-hidden rounded-2xl">
                <motion.img
                  src="/assets/about.jpeg"
                  alt="Victor Nogueira"
                  className="aspect-square sm:aspect-9/16 w-full object-cover object-top-right scale-125"
                  style={{ y: imageY }}
                />
              </div>
            </div>
          </div>
        </BlurFadeIn>

      </motion.div>
    </main>
    <footer className="border-t border-zinc-200 px-6 py-8 dark:border-zinc-800">
      <div className="mx-auto flex max-w-2xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-4 text-zinc-600 dark:text-zinc-400">
          <a
            href="https://github.com/vmnog"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            aria-label="GitHub"
          >
            <HugeiconsIcon icon={Github01Icon} size={20} />
          </a>
          <a
            href="https://x.com/caraquecoda"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            aria-label="X (Twitter)"
          >
            <HugeiconsIcon icon={NewTwitterIcon} size={20} />
          </a>
          <a
            href="mailto:me@vmnog.com"
            className="text-sm decoration-zinc-600 underline-offset-4 hover:underline dark:decoration-zinc-400"
          >
            me@vmnog.com
          </a>
        </div>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()} Victor Nogueira. All rights reserved.
        </span>
      </div>
    </footer>
    </>
  );
}
