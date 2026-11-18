import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  experienceContentDir,
  experiencePostMetadata,
  experienceSlug,
  getExperiencePost,
  listExperiencePostSlugs,
} from "@/lib/experience-posts";
import { workExperience } from "@/lib/work-experience";
import { ExperiencePostView } from "./experience-post-view";

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

export default async function ExperiencePostPage({ params }: Props) {
  const { slug } = await params;
  const post = getExperiencePost(slug, experienceContentDir());
  const job = workExperience.find((row) => experienceSlug(row.company) === slug);
  if (!post || !job) notFound();

  return <ExperiencePostView job={job} post={post} />;
}
