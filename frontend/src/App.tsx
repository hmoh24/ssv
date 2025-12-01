const steps = [
  {
    title: 'Dev server',
    command: 'npm run dev',
    note: 'Or from repo root: npm run dev-frontend',
  },
  {
    title: 'Build',
    command: 'npm run build',
    note: 'Outputs to frontend/dist',
  },
  {
    title: 'Preview',
    command: 'npm run preview',
    note: 'Serves the production build locally',
  },
]

function App() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-10 px-6 py-12 lg:px-12">
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900/80 ring-1 ring-white/10">
            <span className="text-lg font-semibold text-white">SSV</span>
          </div>
          <div>
            <p className="text-sm text-slate-300">frontend</p>
            <p className="text-lg font-semibold text-white">
              React + Vite + Tailwind
            </p>
          </div>
        </div>
        <p className="max-w-3xl text-base text-slate-200">
          A clean Vite setup that lives entirely inside the{' '}
          <code className="rounded bg-white/10 px-2 py-1 text-sm text-white">
            frontend
          </code>{' '}
          folder. Tailwind is wired up, so you can start building UI components
          right away.
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-blue-900/30 backdrop-blur">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-300">
            Get started
          </h2>
          <p className="mt-3 text-sm text-slate-200">
            Run commands from inside <code className="font-mono">frontend/</code>{' '}
            or via the root helper scripts. HMR is enabled, and build output
            lands in <code className="font-mono">frontend/dist</code>.
          </p>
          <ul className="mt-4 space-y-3">
            {steps.map((step) => (
              <li
                key={step.title}
                className="rounded-xl border border-white/10 bg-slate-900/70 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold text-white">
                    {step.title}
                  </span>
                  <span className="rounded-md bg-blue-500/10 px-2 py-1 text-xs font-medium text-blue-200 ring-1 ring-blue-500/30">
                    {step.command}
                  </span>
                </div>
                <p className="mt-2 text-xs text-slate-300">{step.note}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-lg shadow-indigo-900/30 backdrop-blur">
          <h2 className="text-sm font-semibold uppercase tracking-[0.08em] text-slate-300">
            Tailwind quick start
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-4 text-sm text-slate-200">
            <li>
              Use utility classes directly in your components (
              <code className="font-mono">src/App.tsx</code> is an example).
            </li>
            <li>
              Add shared styles in <code className="font-mono">src/index.css</code>{' '}
              with <code className="font-mono">@layer</code> if needed.
            </li>
            <li>
              Customise the design system in{' '}
              <code className="font-mono">tailwind.config.js</code>.
            </li>
          </ol>
          <div className="mt-4 rounded-xl bg-slate-900/70 px-4 py-3 text-xs text-slate-100 ring-1 ring-white/10">
            Example: <span className="font-mono">className="rounded-xl bg-slate-800 p-6 text-white shadow"</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
