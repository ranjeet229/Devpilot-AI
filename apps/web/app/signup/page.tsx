"use client";

import { ArrowLeft, GitBranch, UserPlus } from "lucide-react";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

const apiUrl = "/api";

export default function SignUpPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch(`${apiUrl}/auth/signup`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          password: form.get("password")
        })
      });
      const body = await response.text();
      let data: { error?: string } | undefined;
      try {
        data = JSON.parse(body) as { error?: string };
      } catch {
        throw new Error(
          response.ok
            ? "The server returned an unexpected response. Please try again."
            : `Signup failed (HTTP ${response.status}). Please try again.`
        );
      }
      if (!response.ok) throw new Error(data.error ?? `Signup failed (HTTP ${response.status})`);
      router.push("/dashboard");
      router.refresh();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Unable to create account");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-md rounded-xl border border-white/[0.09] bg-[#0d1016] p-6 panel-shadow">
        <a href="/" className="mb-8 flex items-center gap-2 text-xs text-[#929baa] transition hover:text-white">
          <ArrowLeft className="size-3.5" />
          Back to DevPilot
        </a>
        <div className="flex size-10 items-center justify-center rounded-lg border border-white/10 bg-white/[0.05]">
          <UserPlus className="size-4 text-[#98adff]" />
        </div>
        <h1 className="mt-5 text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-2 text-sm text-[#929baa]">Start building with your own DevPilot workspace.</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-[#bdc4cf]">Name</span>
            <input name="name" type="text" required minLength={2} maxLength={80} autoComplete="name" className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm outline-none transition focus:border-[#7c9cff]/60" placeholder="Your name" />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-[#bdc4cf]">Email</span>
            <input name="email" type="email" required autoComplete="email" className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm outline-none transition focus:border-[#7c9cff]/60" placeholder="you@example.com" />
          </label>
          <label className="block">
            <span className="mb-2 block text-xs font-medium text-[#bdc4cf]">Password</span>
            <input name="password" type="password" required minLength={8} maxLength={128} autoComplete="new-password" className="h-11 w-full rounded-lg border border-white/10 bg-white/[0.035] px-3 text-sm outline-none transition focus:border-[#7c9cff]/60" placeholder="At least 8 characters" />
          </label>
          {error && <div role="alert" className="rounded-lg border border-red-400/20 bg-red-400/[0.07] px-3 py-2 text-sm text-red-200">{error}</div>}
          <button disabled={loading} type="submit" className="h-11 w-full rounded-lg bg-[#7c9cff] text-sm font-semibold text-[#090b10] transition hover:bg-[#91aaff] disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <button type="button" disabled className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] text-sm text-[#929baa] disabled:cursor-not-allowed">
          <GitBranch className="size-4" />
          GitHub OAuth
        </button>
        <p className="mt-5 text-center text-xs text-[#929baa]">
          Already have an account? <a href="/signin" className="text-[#9fb3ff] hover:underline">Sign in</a>
        </p>
      </section>
    </main>
  );
}
