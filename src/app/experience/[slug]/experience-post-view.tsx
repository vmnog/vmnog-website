import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import type { ExperiencePost } from "@/lib/experience-posts";
import type { WorkExperience } from "@/lib/work-experience";

type Props = { job: WorkExperience; post: ExperiencePost };

// The experience post page (docs/adr/0006, board "Experience post / long story"): an eyebrow from
// the homepage row, the title with the summary in grey like the homepage hero, role · stack, a
// rule, the body, a link back to the Experiences section and the site footer.
export function ExperiencePostView({ job, post }: Props) {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex flex-1 flex-col items-center px-6 py-16 leading-relaxed">
        <div className="flex w-full max-w-2xl flex-col gap-12">
          <header className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-sm leading-relaxed">
              <div className="flex size-6 flex-none items-center justify-center rounded-full bg-white shadow-sm shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-zinc-700/50">
                {/* eslint-disable-next-line @next/next/no-img-element -- plain img, as the site does today (docs/adr/0007) */}
                <img src={job.logo} alt={`${job.company} logo`} className="size-5 rounded-full object-cover" />
              </div>
              <span className="font-medium text-zinc-900 dark:text-zinc-100">{job.company}</span>
              <span className="text-zinc-400 dark:text-zinc-500" aria-label={`${job.startYear} until ${job.endYear}`}>
                {job.startYear} - {job.endYear}
              </span>
            </div>
            <h1 className="text-[1.9rem] font-normal leading-tight tracking-tight text-pretty sm:text-[2.7rem]">
              {post.title} <span className="text-zinc-400 dark:text-zinc-500">{post.summary}</span>
            </h1>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              <span className="font-medium">{job.role}</span> · {job.tech}
            </p>
          </header>
          <div
            className="experience-post-body border-t border-zinc-200 pt-10 dark:border-zinc-800"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          <Link
            href="/#experiences"
            className="self-start text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
          >
            ← Back
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
