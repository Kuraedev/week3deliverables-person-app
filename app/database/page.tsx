import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Database",
};

const prismaSchemaSnippet = `model Person {
  id        Int      @id @default(autoincrement())
  firstName String
  lastName  String
  email     String   @unique
  age       Int?
  city      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}`;

export default function DatabasePage() {
  return (
    <section className="space-y-6">
      <header className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
          Prisma + Database
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-900 sm:text-4xl">
          Schema and Data Structure
        </h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-700">
          This app uses Prisma as the data access layer, with migrations managed
          in the prisma/migrations folder and sample records inserted by a seed
          script for testing CRUD behavior.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)]">
          <h2 className="text-xl font-semibold text-zinc-900">Schema highlights</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
            <li>Auto-incrementing integer primary key</li>
            <li>Email uniqueness constraint for identity safety</li>
            <li>Optional age and city for flexible records</li>
            <li>Created and updated timestamps for audit visibility</li>
          </ul>
        </article>

        <article className="rounded-3xl border border-black/10 bg-white/85 p-6 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)]">
          <h2 className="text-xl font-semibold text-zinc-900">Migration workflow</h2>
          <ul className="mt-3 space-y-2 text-sm leading-6 text-zinc-700">
            <li>Run npm run db:migrate to create or apply schema changes</li>
            <li>Run npm run db:seed to insert sample person records</li>
            <li>Route handlers query the Prisma client directly</li>
            <li>UI operations call API routes that execute database mutations</li>
          </ul>
        </article>
      </div>

      <article className="rounded-3xl border border-black/10 bg-zinc-950 p-5 text-zinc-100 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)] sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
          Prisma model excerpt
        </p>
        <pre className="mt-3 overflow-x-auto rounded-2xl bg-black/30 p-4 font-mono text-xs leading-6 sm:text-sm">
          <code>{prismaSchemaSnippet}</code>
        </pre>
      </article>
    </section>
  );
}
