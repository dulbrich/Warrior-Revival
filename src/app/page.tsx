export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-6 py-16">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Warrior Revival
        </p>
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">
          Next.js foundation for the Warrior Revival website
        </h1>
        <p className="max-w-2xl text-lg text-slate-600">
          This project bootstraps the new site with Next.js, Tailwind CSS, TanStack Query,
          React Hook Form, and Zod so the team can begin implementing the functional
          requirements in the FRD.
        </p>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-xl font-semibold text-slate-800">Ready for the next steps</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-600">
          <li>Wire up the headless CMS data fetching flows with TanStack Query.</li>
          <li>Build the events submission workflow with React Hook Form + Zod.</li>
          <li>Apply the bright, accessible design system described in the FRD.</li>
        </ul>
      </section>
    </main>
  );
}
