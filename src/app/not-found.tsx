import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";

// Same separator as the experience posts' tab titles (docs/adr/0006).
export const metadata: Metadata = { title: { absolute: "Page not found · Victor Nogueira" } };

// Every unknown URL on the site, including /experience/<unknown> (docs/adr/0006). Board "404 / unknown URL".
export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col">
      <main className="flex flex-1 flex-col items-center px-6 py-16 leading-relaxed">
        <div className="flex w-full max-w-2xl flex-col gap-5">
          <p className="text-sm font-medium uppercase tracking-widest text-zinc-400 dark:text-zinc-500">404</p>
          <h1 className="text-[1.9rem] font-normal leading-tight tracking-tight text-balance sm:text-[2.7rem]">
            This page doesn’t exist. <span className="text-zinc-400 dark:text-zinc-500">The link may be old or mistyped.</span>
          </h1>
          <Link
            href="/"
            className="mt-5 self-start text-sm font-medium text-zinc-400 transition-colors hover:text-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-100"
          >
            ← Back to the homepage
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
