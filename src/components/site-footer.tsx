import { HugeiconsIcon } from "@hugeicons/react";
import { Github01Icon, Linkedin01Icon, NewTwitterIcon } from "@hugeicons/core-free-icons";

// The homepage footer, shared by every page of the site.
export function SiteFooter() {
  return (
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
            href="https://x.com/mevmnog"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            aria-label="X (Twitter)"
          >
            <HugeiconsIcon icon={NewTwitterIcon} size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/vmnogueira/"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-100"
            aria-label="LinkedIn"
          >
            <HugeiconsIcon icon={Linkedin01Icon} size={20} />
          </a>
          <a
            href="mailto:me@vmnog.com"
            className="text-base decoration-zinc-600 underline-offset-4 transition-colors hover:underline hover:text-zinc-900 hover:decoration-zinc-900 dark:decoration-zinc-400 dark:hover:text-zinc-100 dark:hover:decoration-zinc-100"
          >
            me@vmnog.com
          </a>
        </div>
        <span className="text-sm text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()} Victor Nogueira. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
