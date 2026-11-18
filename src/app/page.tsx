import { experienceContentDir, experienceStoryHrefs } from "@/lib/experience-posts";
import { HomePage } from "./home-page";

// Read at build time: a row links to its experience post only when the post is written.
export default function Page() {
  return <HomePage storyHrefs={experienceStoryHrefs(experienceContentDir())} />;
}
