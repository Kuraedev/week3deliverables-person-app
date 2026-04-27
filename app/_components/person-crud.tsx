"use client";

import { FormEvent, useCallback, useMemo, useState } from "react";

type Person = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number | null;
  city: string | null;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  city: string;
};

type Feedback = {
  type: "success" | "error";
  message: string;
} | null;

type PersonCrudPanelProps = {
  initialPeople: Person[];
};

const initialFormState: FormState = {
  firstName: "",
  lastName: "",
  email: "",
  age: "",
  city: "",
};

function readError(payload: unknown): string {
  if (payload && typeof payload === "object" && "error" in payload) {
    const value = (payload as Record<string, unknown>).error;
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return "Request failed.";
}

export default function PersonCrudPanel({
  initialPeople,
}: PersonCrudPanelProps) {
  const [people, setPeople] = useState<Person[]>(initialPeople);
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [feedback, setFeedback] = useState<Feedback>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    []
  );

  const loadPeople = useCallback(async () => {
    setIsLoading(true);

    try {
      const response = await fetch("/api/persons", { cache: "no-store" });
      const payload = (await response.json()) as { people?: Person[]; error?: string };

      if (!response.ok) {
        throw new Error(readError(payload));
      }

      setPeople(payload.people ?? []);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to load person records.";
      setFeedback({ type: "error", message });
    } finally {
      setIsLoading(false);
    }
  }, []);

  function resetForm() {
    setFormState(initialFormState);
    setEditingId(null);
  }

  function startEditing(person: Person) {
    setEditingId(person.id);
    setFeedback(null);
    setFormState({
      firstName: person.firstName,
      lastName: person.lastName,
      email: person.email,
      age: person.age !== null ? String(person.age) : "",
      city: person.city ?? "",
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    const endpoint = editingId ? `/api/persons/${editingId}` : "/api/persons";
    const method = editingId ? "PUT" : "POST";

    try {
      const payload = {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        age: formState.age.trim() ? Number(formState.age) : null,
        city: formState.city,
      };

      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const json = (await response.json().catch(() => null)) as unknown;

      if (!response.ok) {
        throw new Error(readError(json));
      }

      setFeedback({
        type: "success",
        message: editingId
          ? "Person record updated successfully."
          : "Person record created successfully.",
      });

      resetForm();
      await loadPeople();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to save person record.";
      setFeedback({ type: "error", message });
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(person: Person) {
    const confirmed = window.confirm(
      `Delete ${person.firstName} ${person.lastName}? This cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    setDeletingId(person.id);
    setFeedback(null);

    try {
      const response = await fetch(`/api/persons/${person.id}`, {
        method: "DELETE",
      });

      const json = (await response.json().catch(() => null)) as unknown;

      if (!response.ok) {
        throw new Error(readError(json));
      }

      if (editingId === person.id) {
        resetForm();
      }

      setFeedback({ type: "success", message: "Person record deleted." });
      await loadPeople();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to delete person record.";
      setFeedback({ type: "error", message });
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,410px)_1fr]">
      <section className="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)] sm:p-6">
        <div className="mb-5">
          <h2 className="text-2xl font-semibold text-zinc-900">
            {editingId ? "Edit person" : "Add person"}
          </h2>
          <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
            All fields except age and city are required.
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm font-medium text-zinc-800">
              First name
              <input
                required
                value={formState.firstName}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    firstName: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[rgba(31,111,120,0.18)]"
              />
            </label>

            <label className="space-y-1 text-sm font-medium text-zinc-800">
              Last name
              <input
                required
                value={formState.lastName}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    lastName: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[rgba(31,111,120,0.18)]"
              />
            </label>
          </div>

          <label className="space-y-1 text-sm font-medium text-zinc-800">
            Email
            <input
              required
              type="email"
              value={formState.email}
              onChange={(event) =>
                setFormState((current) => ({
                  ...current,
                  email: event.target.value,
                }))
              }
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[rgba(31,111,120,0.18)]"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="space-y-1 text-sm font-medium text-zinc-800">
              Age
              <input
                type="number"
                min={0}
                max={130}
                value={formState.age}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    age: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[rgba(31,111,120,0.18)]"
              />
            </label>

            <label className="space-y-1 text-sm font-medium text-zinc-800">
              City
              <input
                value={formState.city}
                onChange={(event) =>
                  setFormState((current) => ({
                    ...current,
                    city: event.target.value,
                  }))
                }
                className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-[var(--brand)] focus:ring-4 focus:ring-[rgba(31,111,120,0.18)]"
              />
            </label>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-[var(--brand-strong)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--brand)] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting
                ? "Saving..."
                : editingId
                  ? "Update person"
                  : "Create person"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
              >
                Cancel edit
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-3xl border border-black/10 bg-white/85 p-5 shadow-[0_20px_55px_-35px_rgba(26,37,47,0.5)] sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-semibold text-zinc-900">People directory</h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              {people.length} record{people.length === 1 ? "" : "s"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              void loadPeople();
            }}
            className="rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
          >
            Refresh
          </button>
        </div>

        {feedback && (
          <div
            className={`mb-4 rounded-xl border px-3 py-2 text-sm ${
              feedback.type === "success"
                ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                : "border-rose-300 bg-rose-50 text-rose-800"
            }`}
          >
            {feedback.message}
          </div>
        )}

        {isLoading ? (
          <p className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
            Loading person records...
          </p>
        ) : people.length === 0 ? (
          <p className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-600">
            No records yet. Create your first person using the form.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border-separate border-spacing-y-2 text-sm">
              <thead>
                <tr className="text-left text-xs uppercase tracking-[0.08em] text-zinc-500">
                  <th className="px-3 py-1">Name</th>
                  <th className="px-3 py-1">Email</th>
                  <th className="px-3 py-1">Age</th>
                  <th className="px-3 py-1">City</th>
                  <th className="px-3 py-1">Created</th>
                  <th className="px-3 py-1 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {people.map((person) => (
                  <tr key={person.id} className="rounded-2xl bg-white shadow-sm">
                    <td className="rounded-l-xl px-3 py-3 font-medium text-zinc-900">
                      {person.firstName} {person.lastName}
                    </td>
                    <td className="px-3 py-3 text-zinc-700">{person.email}</td>
                    <td className="px-3 py-3 text-zinc-700">
                      {person.age !== null ? person.age : "-"}
                    </td>
                    <td className="px-3 py-3 text-zinc-700">{person.city ?? "-"}</td>
                    <td className="px-3 py-3 text-zinc-700">
                      {dateFormatter.format(new Date(person.createdAt))}
                    </td>
                    <td className="rounded-r-xl px-3 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => startEditing(person)}
                          className="rounded-full border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-700 transition hover:border-zinc-500 hover:text-zinc-900"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          disabled={deletingId === person.id}
                          onClick={() => {
                            void handleDelete(person);
                          }}
                          className="rounded-full border border-rose-300 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                          {deletingId === person.id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
