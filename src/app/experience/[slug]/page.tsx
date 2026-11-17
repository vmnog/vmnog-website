import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  experienceContentDir,
  experiencePostMetadata,
  experienceSlug,
  getExperiencePost,
  listExperiencePostSlugs,
} from "@/lib/experience-posts";
import { workExperience } from "@/lib/work-experience";

// Only the 11 known slugs with a written post exist; any other slug gets the site's 404 (docs/adr/0006).
export const dynamicParams = false;

export function generateStaticParams() {
  return listExperiencePostSlugs(experienceContentDir()).map((slug) => ({ slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getExperiencePost(slug, experienceContentDir());
  if (!post) return {};
  return experiencePostMetadata(post);
}

// Minimal, unstyled page that proves the route. The layout from the experience-pages/02 boards is
// built in experience-pages/06.
export default async function ExperiencePostPage({ params }: Props) {
  const { slug } = await params;
  const post = getExperiencePost(slug, experienceContentDir());
  const job = workExperience.find((row) => experienceSlug(row.company) === slug);
  if (!post || !job) notFound();

  return (
    <main>
      <header>
        {/* eslint-disable-next-line @next/next/no-img-element -- plain img, as the site does today (docs/adr/0007) */}
        <img src={job.logo} alt={`${job.company} logo`} width={40} height={40} />
        <p>{job.company}</p>
        <p>{job.role}</p>
        <p>
          {job.startYear} - {job.endYear}
        </p>
        <p>{job.tech}</p>
      </header>
      <article>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </article>
      <Link href="/#experiences">← Back</Link>
    </main>
  );
}
