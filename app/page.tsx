import PersonCrudPanel from "./_components/person-crud";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const people = await prisma.person.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const initialPeople = people.map((person) => ({
    ...person,
    createdAt: person.createdAt.toISOString(),
    updatedAt: person.updatedAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-black/10 bg-[rgba(255,253,250,0.85)] p-6 shadow-[0_24px_70px_-40px_rgba(26,37,47,0.45)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-strong)]">
          Production URL Ready
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold leading-tight text-zinc-900 sm:text-4xl">
          Manage real person records with a full Prisma-backed CRUD workflow.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-zinc-700 sm:text-lg">
          Create, browse, update, and delete records through a responsive UI with
          dedicated app documentation pages for architecture, repository access,
          and schema details.
        </p>
      </section>

      <PersonCrudPanel initialPeople={initialPeople} />
    </div>
  );
}
