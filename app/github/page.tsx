import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GitHub",
};

const repositoryUrl =
  process.env.NEXT_PUBLIC_GITHUB_URL ??
  "https://github.com/Kuraedev/week3deliverables-person-app";

export default function GitHubPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
          Source Code
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900 sm:text-4xl">
          Public GitHub Repository
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-700">
          Use the link below to access the complete source code, commit history,
          and project documentation.
        </p>
      </header>

      <article className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)]">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.12em] text-zinc-500">
          Repository URL
        </p>
        <a
          href={repositoryUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center rounded-full border border-[var(--brand)] bg-[rgba(47,125,132,0.1)] px-4 py-2 text-sm font-semibold text-[var(--brand-strong)] transition hover:bg-[rgba(47,125,132,0.18)]"
        >
          {repositoryUrl}
        </a>
        <p className="mt-4 text-sm text-zinc-600">
          Set NEXT_PUBLIC_GITHUB_URL in your deployment environment to point to
          your actual public repository.
        </p>
      </article>
    </section>
  );
}
