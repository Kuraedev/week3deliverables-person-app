import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
          Architecture Overview
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900 sm:text-4xl">
          About This Person App
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-700">
          This application demonstrates full-stack development with Next.js App
          Router, route handlers, Prisma ORM, and a relational database. The
          frontend and backend are in the same project, making deployment and
          iteration straightforward.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)]">
          <h2 className="text-xl font-semibold text-zinc-900">Technology stack</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
            <li>Next.js 16 App Router with TypeScript</li>
            <li>Prisma ORM for schema, migrations, and typed queries</li>
            <li>SQLite database for local development records</li>
            <li>Tailwind CSS 4 for responsive, utility-first UI styling</li>
            <li>REST-style Route Handlers under app/api</li>
          </ul>
        </article>

        <article className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)]">
          <h2 className="text-xl font-semibold text-zinc-900">CRUD flow</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
            <li>Create: form submits to POST /api/persons</li>
            <li>Read: table hydrates from GET /api/persons</li>
            <li>Update: edit mode sends PUT /api/persons/[id]</li>
            <li>Delete: action button sends DELETE /api/persons/[id]</li>
            <li>Validation errors are surfaced directly in the interface</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
