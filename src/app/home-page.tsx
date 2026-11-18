"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { AnimatePresence, useScroll, useTransform } from "motion/react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, Github01Icon, Linkedin01Icon, Mail01Icon, NewTwitterIcon, StarIcon } from "@hugeicons/core-free-icons";
import { SiteFooter } from "@/components/site-footer";
import { workExperience } from "@/lib/work-experience";

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


const blogPosts: { title: string; source: string; linkText: string; url: string }[] = [];

const openSourceProjects = [
  {
    name: "calendarcn",
    description: "A beautifully crafted calendar component built with shadcn/ui and Tailwind CSS, inspired by Notion Calendar.",
    tech: "Next.js, shadcn/ui, Tailwind CSS",
    repo: "vmnog/calendarcn",
    url: "https://github.com/vmnog/calendarcn",
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

type Props = {
  // The page of each role with a written post, by company name (docs/adr/0002).
  storyHrefs: Record<string, string>;
};

export function HomePage({ storyHrefs }: Props) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [repoStars, setRepoStars] = useState<Record<string, number | null>>({});
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

  useEffect(() => {
    async function fetchGitHubStars() {
      const stars: Record<string, number | null> = {};

      await Promise.all(
        openSourceProjects.map(async (project) => {
          try {
            const response = await fetch(`https://api.github.com/repos/${project.repo}`);
            if (response.ok) {
              const data = await response.json();
              stars[project.repo] = data.stargazers_count;
            } else {
              stars[project.repo] = null;
            }
          } catch {
            stars[project.repo] = null;
          }
        })
      );

      setRepoStars(stars);
    }

    fetchGitHubStars();
  }, []);

  const displayedExperience = isExpanded
    ? workExperience
    : workExperience.slice(0, INITIAL_DISPLAY_COUNT);
  const hasMore = workExperience.length > INITIAL_DISPLAY_COUNT;

  return (
    <>
      <main className="flex min-h-dvh flex-col items-center px-6 py-16 leading-relaxed">
        <motion.div
          className="w-full max-w-2xl space-y-16"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <BlurFadeIn>
            <h1 className="text-[1.9rem] font-normal leading-tight tracking-tight text-balance sm:text-[2.7rem] sm:text-pretty">
              Transforming startup visions into reality{" "}
              <span className="text-zinc-400 dark:text-zinc-500">
                and expertly leading end-to-end product development.
              </span>
            </h1>
          </BlurFadeIn>
          <BlurFadeIn>
            <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-400">
              <span className="text-lg">Victor Nogueira</span>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/vmnog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                  aria-label="GitHub"
                >
                  <HugeiconsIcon icon={Github01Icon} size={24} />
                </a>
                <a
                  href="https://x.com/mevmnog"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                  aria-label="X (Twitter)"
                >
                  <HugeiconsIcon icon={NewTwitterIcon} size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/vmnogueira/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
                  aria-label="LinkedIn"
                >
                  <HugeiconsIcon icon={Linkedin01Icon} size={24} />
                </a>
                <a
                  href="mailto:me@vmnog.com"
                  className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 sm:hidden"
                  aria-label="Email"
                >
                  <HugeiconsIcon icon={Mail01Icon} size={24} />
                </a>
                <a
                  href="mailto:me@vmnog.com"
                  className="hidden text-lg decoration-zinc-600 underline-offset-4 transition-colors hover:underline hover:text-zinc-900 hover:decoration-zinc-900 sm:inline dark:decoration-zinc-400 dark:hover:text-zinc-100 dark:hover:decoration-zinc-100"
                >
                  me@vmnog.com
                </a>
              </div>
            </div>
          </BlurFadeIn>

          <BlurFadeIn>
            <div id="experiences" className="scroll-mt-16">
              <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Experiences
              </h2>
              <ol ref={experienceListRef} className="mt-8 overflow-hidden">
                <AnimatePresence>
                  {displayedExperience.map((job, index) => {
                    const jobKey = `${job.company}-${job.startYear}`;
                    const isJobExpanded = expandedJob === jobKey;
                    const storyHref = storyHrefs[job.company];
                    const detailsId = `experience-${jobKey.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-details`;
                    return (
                      <motion.li
                        key={jobKey}
                        className="group flex flex-col gap-2"
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          marginBottom: 24,
                          transition: { duration: 0.3, delay: index > INITIAL_DISPLAY_COUNT - 1 ? (index - INITIAL_DISPLAY_COUNT) * 0.1 : 0 }
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          marginBottom: 0,
                          transition: { duration: 0.3, delay: (workExperience.length - 1 - index) * 0.05 }
                        }}
                      >
                        {/* The header is the row's one control; the story link sits outside it, in the details. */}
                        <button
                          type="button"
                          aria-expanded={isJobExpanded}
                          aria-controls={detailsId}
                          onClick={() => setExpandedJob(isJobExpanded ? null : jobKey)}
                          className="flex w-full cursor-pointer flex-col rounded-lg text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-zinc-400 dark:focus-visible:outline-zinc-500"
                        >
                          <span className="flex w-full items-center gap-4">
                            <span className="relative flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-zinc-700/50">
                              <img
                                src={job.logo}
                                alt={`${job.company} logo`}
                                className="h-7 w-7 rounded-full object-cover"
                              />
                            </span>
                            <span className="flex-1 text-base font-medium leading-relaxed text-zinc-900 dark:text-zinc-100">
                              {job.company}
                            </span>
                            <span className="flex items-center gap-2">
                              <span className="text-sm text-zinc-400 dark:text-zinc-500">
                                {job.startYear} - {job.endYear}
                              </span>
                              <HugeiconsIcon
                                icon={ArrowDown01Icon}
                                size={14}
                                className={`text-zinc-400 transition-transform duration-200 group-hover:rotate-180 dark:text-zinc-500 ${isJobExpanded ? "rotate-180" : ""}`}
                              />
                            </span>
                          </span>
                          <span className="pl-14 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                            <span className="font-medium">{job.role}</span> · {job.tech}
                          </span>
                        </button>
                        <div className={`grid transition-all duration-200 ease-out ${isJobExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                          {/* Collapsed details are hidden from assistive tech and the tab order, not only by size. */}
                          <div id={detailsId} className="overflow-hidden" inert={!isJobExpanded} aria-hidden={!isJobExpanded}>
                            <p className="max-w-[50ch] pl-14 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                              <span className="mr-1 text-zinc-300 dark:text-zinc-600">↳</span>
                              {job.description}
                              {storyHref && (
                                <>
                                  {" "}
                                  {/* The details clip overflow, so focus shows as a fill and a darker underline, not an outline. */}
                                  <Link
                                    href={storyHref}
                                    className="whitespace-nowrap rounded-sm font-medium text-zinc-900 underline decoration-zinc-300 decoration-1 [text-underline-position:from-font] transition-colors hover:decoration-zinc-900 focus-visible:bg-zinc-200 focus-visible:decoration-zinc-900 focus-visible:decoration-2 focus-visible:outline-none dark:text-zinc-100 dark:decoration-zinc-600 dark:hover:decoration-zinc-100 dark:focus-visible:bg-zinc-700 dark:focus-visible:decoration-zinc-100"
                                  >
                                    Read the full story →
                                  </Link>
                                </>
                              )}
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
                  className="mt-8 w-full text-center text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
                >
                  {isExpanded ? "See less" : `See ${workExperience.length - INITIAL_DISPLAY_COUNT} more`}
                </button>
              )}
            </div>
          </BlurFadeIn>

          {blogPosts.length > 0 && (
          <BlurFadeIn>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Writings
              </h2>
              <ul className="mt-8 space-y-6">
                {blogPosts.map((post) => (
                  <li key={post.url} className="flex items-start justify-between gap-4">
                    <a
                      href={post.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-[40ch] text-base font-medium leading-relaxed text-balance text-zinc-900 decoration-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100 dark:decoration-zinc-100"
                    >
                      {post.title}
                    </a>
                    <span className="flex shrink-0 items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
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
          )}

          <BlurFadeIn>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
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
                        className="text-base font-medium whitespace-nowrap text-zinc-900 decoration-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100 dark:decoration-zinc-100"
                      >
                        {project.name}
                      </a>
                      {repoStars[project.repo] != null && (
                        <span className="flex items-center gap-1 text-sm text-amber-500">
                          <HugeiconsIcon icon={StarIcon} size={12} />
                          {repoStars[project.repo]}
                        </span>
                      )}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-zinc-400 decoration-zinc-400 underline-offset-4 hover:underline dark:text-zinc-500 dark:decoration-zinc-500"
                      >
                        GitHub
                      </a>
                    </div>
                    <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {project.description}
                    </p>
                    <span className="text-sm text-zinc-400 dark:text-zinc-500">
                      {project.tech}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </BlurFadeIn>

          <BlurFadeIn>
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
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
                        className="text-base font-medium text-zinc-900 decoration-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100 dark:decoration-zinc-100"
                      >
                        {course.title}
                      </a>
                    </div>
                    <p className="max-w-md text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {course.description}
                    </p>
                    <span className="flex items-center gap-2 text-sm text-zinc-400 dark:text-zinc-500">
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
            <div className="relative grid grid-cols-1 gap-6 sm:-mx-16 sm:grid-cols-2 sm:px-16">
              <div className="space-y-6 text-base leading-relaxed text-pretty text-zinc-600 dark:text-zinc-400">
                <h2 className="text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  About
                </h2>
                <div className="space-y-4">
                  <p>
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">Based in São Paulo, Brazil.</span>{" "}
                    Almost a decade turning ideas into products that people actually use.
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
                  <p className="text-base italic text-zinc-900 dark:text-zinc-100">
                    &ldquo;Building is my craft. Startups are my playground.&rdquo;
                  </p>
                  <cite className="mt-2 block text-sm font-medium not-italic text-zinc-400 dark:text-zinc-500">
                    — Victor Nogueira
                  </cite>
                </blockquote>
              </div>
              <div ref={aboutImageRef} className="overflow-hidden rounded-2xl">
                <motion.img
                  src="/assets/about.jpeg"
                  alt="Victor Nogueira"
                  className="aspect-square sm:aspect-3/4 w-full object-cover object-top-right scale-125"
                  style={{ y: imageY }}
                />
              </div>
            </div>
          </BlurFadeIn>

        </motion.div>
      </main>
      <SiteFooter />
    </>
  );
}
