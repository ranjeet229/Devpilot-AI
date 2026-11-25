"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";

type User = { id: string; name: string; email: string; roles: string[] };

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch(`${apiUrl}/auth/me`, { credentials: "include" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unauthorized");
        return response.json();
      })
      .then((data) => setUser(data.user))
      .catch(() => router.replace("/signin"));
  }, [router]);

  async function logout() {
    await fetch(`${apiUrl}/auth/logout`, { method: "POST", credentials: "include" });
    router.replace("/signin");
    router.refresh();
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center text-sm text-[#929baa]">
        Loading workspace...
      </main>
    );
  }

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto max-w-[1180px]">
        <header className="flex items-center justify-between border-b border-white/[0.07] pb-5">
          <div>
            <div className="text-xs text-[#7f8794]">DevPilot workspace</div>
            <h1 className="mt-1 text-xl font-semibold">Welcome, {user.name}</h1>
          </div>
          <button onClick={logout} className="rounded-lg border border-white/10 px-3.5 py-2 text-sm text-[#c7cdd6] transition hover:border-white/20 hover:text-white">
            Sign out
          </button>
        </header>
        <section className="mt-8 rounded-xl border border-white/[0.09] bg-white/[0.025] p-6">
          <h2 className="font-semibold">Account ready</h2>
          <p className="mt-2 text-sm text-[#929baa]">{user.email}</p>
        </section>
      </div>
    </main>
  );
}
