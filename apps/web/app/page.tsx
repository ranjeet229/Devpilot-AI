import {
  ArrowRight,
  Bot,
  CheckCircle2,
  Code2,
  GitBranch,
  Layers3,
  LockKeyhole,
  Play,
  ShieldCheck,
  TerminalSquare,
  TestTube2
} from "lucide-react";

const agents = [
  { name: "Architect", icon: Layers3, detail: "Plan" },
  { name: "Developer", icon: Code2, detail: "Implement" },
  { name: "Tester", icon: TestTube2, detail: "Validate" },
  { name: "Security", icon: ShieldCheck, detail: "Protect" },
  { name: "Reviewer", icon: CheckCircle2, detail: "Approve" }
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#090b10] text-[#f7f8fa]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[680px] grid-surface" />

      <nav className="relative z-20 mx-auto flex max-w-[1180px] items-center justify-between px-6 py-5">
        <a href="#" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="flex size-8 items-center justify-center rounded-lg border border-white/10 bg-white/[0.07]">
            <TerminalSquare className="size-4" />
          </span>
          DevPilot AI
        </a>

        <div className="hidden items-center gap-7 text-sm text-[#aab2bf] md:flex">
          <a href="#features" className="transition hover:text-white">Features</a>
          <a href="#workflow" className="transition hover:text-white">How it works</a>
          <a href="#pricing" className="transition hover:text-white">Pricing</a>
        </div>

        <div className="flex items-center gap-2">
          <a href="/signin" className="hidden rounded-lg px-3 py-2 text-sm text-[#c7cdd6] transition hover:text-white sm:block">
            Sign in
          </a>
          <a href="/signup" className="flex items-center gap-2 rounded-lg bg-white px-3.5 py-2 text-sm font-semibold text-[#111318] transition hover:bg-[#e8ebf2]">
            Get started
            <ArrowRight className="size-3.5" />
          </a>
        </div>
      </nav>

      <section className="relative z-10 mx-auto max-w-[1180px] px-6 pb-24 pt-20 text-center md:pt-28">
        <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#b5bdc9]">
          <span className="size-1.5 rounded-full bg-[#78a0ff] shadow-[0_0_14px_rgba(120,160,255,0.9)]" />
          Autonomous engineering, with human control
        </div>

        <h1 className="mx-auto max-w-[900px] text-balance text-5xl font-semibold leading-[1.02] tracking-[-0.055em] md:text-7xl">
          Ship software changes
          <span className="block text-[#aeb8c8]">without losing control.</span>
        </h1>

        <p className="mx-auto mt-7 max-w-[650px] text-pretty text-base leading-7 text-[#a7afbc] md:text-lg">
          Connect your repository, describe the work, and let a coordinated team of specialized AI agents plan, build, test, secure, and review it.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a href="/signup" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#7c9cff] px-5 text-sm font-semibold text-[#090b10] transition hover:bg-[#91aaff] sm:w-auto">
            <GitBranch className="size-4" />
            Connect repository
          </a>
          <a href="#workflow" className="flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.035] px-5 text-sm font-semibold text-[#dde2ea] transition hover:border-white/20 hover:bg-white/[0.06] sm:w-auto">
            <Play className="size-3.5 fill-current" />
            See the workflow
          </a>
        </div>

        <div id="workflow" className="panel-shadow mx-auto mt-16 max-w-[980px] overflow-hidden rounded-xl border border-white/10 bg-[#0d1016] text-left">
          <div className="flex h-11 items-center justify-between border-b border-white/[0.07] px-4">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#353a45]" />
              <span className="size-2.5 rounded-full bg-[#353a45]" />
              <span className="size-2.5 rounded-full bg-[#353a45]" />
            </div>
            <span className="text-xs text-[#7f8794]">devpilot/workspace</span>
            <LockKeyhole className="size-3.5 text-[#697182]" />
          </div>

          <div className="grid min-h-[330px] md:grid-cols-[210px_1fr]">
            <aside className="border-b border-white/[0.07] p-4 md:border-b-0 md:border-r">
              <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#737c8b]">Agents</div>
              <div className="space-y-2">
                {agents.map(({ name, icon: Icon, detail }, index) => (
                  <div key={name} className="flex items-center gap-3 rounded-lg border border-transparent px-2.5 py-2.5">
                    <span className={`flex size-7 items-center justify-center rounded-md border ${index === 1 ? "border-[#7c9cff]/40 bg-[#7c9cff]/10 text-[#91aaff]" : "border-white/[0.08] bg-white/[0.03] text-[#8d96a5]"}`}>
                      <Icon className="size-3.5" />
                    </span>
                    <div>
                      <div className="text-xs font-medium text-[#dfe3e9]">{name}</div>
                      <div className="mt-0.5 text-[10px] text-[#747d8c]">{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

            <div className="p-5 md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#747d8c]">Current workflow</div>
                  <div className="mt-1 text-sm font-medium">Repository analysis</div>
                </div>
                <div className="flex items-center gap-2 rounded-full border border-[#7c9cff]/20 bg-[#7c9cff]/[0.07] px-2.5 py-1 text-[10px] text-[#9fb3ff]">
                  <span className="size-1.5 animate-pulse rounded-full bg-[#7c9cff]" />
                  In progress
                </div>
              </div>

              <div className="rounded-lg border border-white/[0.07] bg-[#090b10] p-4">
                <div className="mb-3 flex items-center gap-2 border-b border-white/[0.06] pb-3">
                  <Bot className="size-4 text-[#8ea8ff]" />
                  <span className="text-xs font-medium">Architect Agent</span>
                </div>
                <div className="space-y-2 font-mono text-[11px] text-[#929baa]">
                  <p><span className="text-[#677286]">$</span> analyze repository structure</p>
                  <p><span className="text-[#78a0ff]">✓</span> dependencies and conventions identified</p>
                  <p><span className="text-[#78a0ff]">✓</span> implementation plan generated</p>
                  <p className="text-[#687183]">awaiting developer assignment<span className="animate-pulse">_</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 border-t border-white/[0.07] bg-[#0b0d12]/80">
        <div className="mx-auto grid max-w-[1180px] gap-px px-6 py-16 md:grid-cols-3 md:px-0">
          {[
            ["Coordinated agents", "Specialized roles share state, progress, and bounded execution limits."],
            ["Human approval", "Generated changes stay isolated until you review and explicitly approve them."],
            ["Secure execution", "Designed for isolated containers with resource limits and restricted network access."]
          ].map(([title, description]) => (
            <div key={title} className="border-b border-white/[0.07] px-6 py-8 md:border-b-0 md:border-r md:first:pl-0 md:last:border-r-0 md:last:pr-0">
              <h2 className="text-sm font-semibold">{title}</h2>
              <p className="mt-2 max-w-[320px] text-sm leading-6 text-[#8f98a7]">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="pricing" className="relative z-10 mx-auto max-w-[1180px] px-6 py-16">
        <div id="get-started" className="flex flex-col items-start justify-between gap-6 rounded-xl border border-white/[0.09] bg-white/[0.025] px-6 py-8 md:flex-row md:items-center">
          <div>
            <div className="text-sm font-semibold">Pricing</div>
            <p className="mt-2 text-sm text-[#929baa]">Plans and usage limits will be available with account setup.</p>
          </div>
          <a href="/signin" className="rounded-lg border border-white/10 bg-white px-4 py-2.5 text-sm font-semibold text-[#111318] transition hover:bg-[#e8ebf2]">
            Continue to sign in
          </a>
        </div>
      </section>
    </main>
  );
}
