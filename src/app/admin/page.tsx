import Link from "next/link";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Download,
  MapPinned,
  ShieldAlert,
  Users,
} from "lucide-react";

import { demoIssues } from "@/data/demoIssues";
import { MapCanvas, Navbar, SeverityBadge, StatusBadge } from "@/components/ui";
import { label } from "@/lib/issue";

const kpis = [
  { n: "128", t: "Total issues", d: "+12 this week", c: "text-blue-600", Icon: Activity },
  { n: "43", t: "Open", d: "Needs triage", c: "text-amber-600", Icon: Clock3 },
  { n: "31", t: "In progress", d: "Teams deployed", c: "text-civic", Icon: MapPinned },
  { n: "54", t: "Resolved", d: "+18 this month", c: "text-emerald-600", Icon: CheckCircle2 },
  { n: "9", t: "Critical", d: "Immediate attention", c: "text-red-600", Icon: ShieldAlert },
];

export default function Admin() {
  const priority = [...demoIssues].sort((a, b) => b.priority - a.priority);

  const criticalCount = demoIssues.filter((x) => x.severity >= 8).length;

  return (
    <>
      <Navbar dark />

      <main className="min-h-screen bg-[#f4f7f6]">
        <div className="mx-auto w-full max-w-[1400px] px-4 py-5 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          {/* COMMAND CENTER HERO */}
          <section className="relative overflow-hidden rounded-3xl bg-[#101a1c] shadow-[0_25px_70px_rgba(15,23,42,0.14)]">
            {/* Background decoration */}
            <div className="pointer-events-none absolute -right-32 -top-40 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-cyan-400/5 blur-3xl" />

            <div className="relative p-6 sm:p-8 lg:p-10">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl">
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-400/10 text-teal-300">
                      <Activity size={15} />
                    </span>

                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-teal-300">
                      Civic operations
                    </p>
                  </div>

                  <h1 className="mt-4 text-3xl font-black tracking-[-0.055em] text-white sm:text-4xl lg:text-5xl">
                    Monitor, prioritize
                    <br className="hidden sm:block" />
                    <span className="text-teal-300"> and resolve.</span>
                  </h1>

                  <p className="mt-4 max-w-xl text-sm leading-6 text-slate-400">
                    A command center for evidence-backed civic response. Monitor
                    incidents, prioritize high-risk issues, and coordinate teams
                    from one place.
                  </p>
                </div>

                <Link
                  href="/report"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-civic px-5 py-3.5 text-xs font-black text-white shadow-lg shadow-teal-950/20 transition hover:brightness-95 active:scale-[0.98] sm:w-auto"
                >
                  <MapPinned size={15} />
                  New citizen report
                </Link>
              </div>

              {/* Status strip */}
              <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </span>

                  <span className="text-[10px] font-bold text-slate-300">
                    Operations active
                  </span>
                </div>

                <span className="hidden text-slate-700 sm:block">•</span>

                <span className="text-[10px] text-slate-500">
                  Last updated just now
                </span>

                <span className="hidden text-slate-700 sm:block">•</span>

                <span className="text-[10px] text-slate-500">
                  {criticalCount || 9} high-risk signals detected
                </span>
              </div>
            </div>
          </section>

          {/* KPI GRID */}
          <section className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {kpis.map(({ n, t, d, c, Icon: IconComponent }) => {
              return (
                <div
                  key={String(t)}
                  className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_15px_40px_rgba(15,23,42,0.07)] sm:p-5"
                >
                  <div className="flex items-start justify-between gap-2">
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 ${c}`}
                    >
                      <IconComponent size={16} />
                    </span>

                    {t === "Critical" && (
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                    )}
                  </div>

                  <p
                    className={`mt-4 font-mono text-2xl font-black tracking-tight ${c}`}
                  >
                    {n}
                  </p>

                  <h2 className="mt-1 text-xs font-black text-slate-900 sm:text-sm">
                    {t}
                  </h2>

                  <p className="mt-1.5 text-[9px] font-bold text-slate-400 sm:text-[10px]">
                    {d}
                  </p>
                </div>
              );
            })}
          </section>

          {/* PRIORITY + MAP */}
          <section className="mt-5 grid gap-5 xl:grid-cols-[.85fr_1.15fr]">
            {/* PRIORITY QUEUE */}
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_10px_40px_rgba(15,23,42,0.04)] sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-600">
                      <ShieldAlert size={15} />
                    </span>

                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-red-600">
                      Priority queue
                    </p>
                  </div>

                  <h2 className="mt-3 text-xl font-black tracking-tight text-slate-950">
                    Issues needing attention
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Highest priority incidents requiring action.
                  </p>
                </div>

                <span className="rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-black text-red-600">
                  {priority.length} active
                </span>
              </div>

              <div className="mt-6 space-y-2.5">
                {priority.slice(0, 5).map((x, i) => (
                  <Link
                    href={`/issues/${x.id}`}
                    key={x.id}
                    className="group flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3.5 transition hover:border-slate-200 hover:bg-slate-50 hover:shadow-sm"
                  >
                    {/* Rank */}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-mono text-[10px] font-black ${
                        i === 0
                          ? "bg-red-50 text-red-600"
                          : "bg-slate-50 text-slate-400"
                      }`}
                    >
                      #{i + 1}
                    </span>

                    {/* Issue */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <b className="truncate text-xs font-black text-slate-900 sm:text-sm">
                          {label(x.category)}
                        </b>

                        {i === 0 && (
                          <span className="hidden rounded-full bg-red-50 px-1.5 py-0.5 text-[7px] font-black uppercase text-red-600 sm:inline">
                            Urgent
                          </span>
                        )}
                      </div>

                      <span className="mt-1 block truncate text-[9px] text-slate-500 sm:text-[10px]">
                        {x.address}
                      </span>

                      <span className="mt-1 block text-[9px] font-bold text-slate-400">
                        {x.reportCount} citizen reports
                      </span>
                    </div>

                    {/* Score */}
                    <div className="hidden text-right sm:block">
                      <b className="block font-mono text-sm font-black text-slate-900">
                        P{x.priority}
                      </b>

                      <span className="mt-1 block max-w-[100px] truncate text-[9px] text-slate-400">
                        {x.assignedTeam || "Unassigned"}
                      </span>
                    </div>

                    <ArrowUpRight
                      size={15}
                      className="shrink-0 text-slate-300 transition group-hover:text-civic"
                    />
                  </Link>
                ))}
              </div>

              <Link
                href="/issues"
                className="mt-5 flex w-full items-center justify-center rounded-xl border border-slate-200 py-3 text-[10px] font-black uppercase tracking-wider text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
              >
                View all issues
              </Link>
            </section>

            {/* MAP */}
            <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_10px_40px_rgba(15,23,42,0.05)] sm:p-2.5">
              <div className="pointer-events-none absolute left-5 right-5 top-5 z-10 flex items-start justify-between gap-3 sm:left-7 sm:right-7 sm:top-7">
                <div className="pointer-events-auto rounded-xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-civic opacity-40" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-civic" />
                    </span>

                    <div>
                      <p className="text-[9px] font-black uppercase tracking-wider text-slate-700">
                        Live civic map
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pointer-events-auto hidden items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-md sm:flex">
                  <MapPinned size={13} className="text-civic" />

                  <span className="font-mono text-[9px] font-bold text-slate-500">
                    {demoIssues.length} ISSUES
                  </span>
                </div>
              </div>

              <div className="h-[430px] overflow-hidden rounded-xl sm:h-[480px] xl:h-[540px]">
                <MapCanvas issues={demoIssues} selected={priority[0]} />
              </div>

              {/* Map legend */}
              <div className="pointer-events-none absolute bottom-5 left-5 z-10 sm:bottom-7 sm:left-7">
                <div className="flex items-center gap-2 rounded-xl border border-white/70 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-md">
                  <span className="h-2.5 w-2.5 rounded-full bg-civic" />

                  <span className="text-[9px] font-bold text-slate-600">
                    Civic issue
                  </span>
                </div>
              </div>
            </section>
          </section>

          {/* WORK QUEUE */}
          <section className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.04)]">
            {/* Header */}
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-civic">
                    <Activity size={14} />
                  </span>

                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-civic">
                    Work queue
                  </p>
                </div>

                <h2 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                  All civic issues
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Review and manage the complete issue queue.
                </p>
              </div>

              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-[10px] font-black uppercase tracking-wider text-slate-600 transition hover:bg-slate-50 hover:text-slate-950">
                <Download size={13} />
                Export view
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-left">
                <thead className="bg-slate-50/80">
                  <tr>
                    {[
                      "Issue",
                      "Location",
                      "Category",
                      "Severity",
                      "Reports",
                      "Priority",
                      "Status",
                      "Team",
                      "",
                    ].map((h) => (
                      <th
                        className="px-5 py-3.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400"
                        key={h}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {priority.map((x) => (
                    <tr
                      className="group border-t border-slate-100 text-xs transition hover:bg-slate-50/70"
                      key={x.id}
                    >
                      <td className="px-5 py-4">
                        <span className="font-mono text-[10px] font-black text-slate-700">
                          {x.id}
                        </span>
                      </td>

                      <td className="max-w-[180px] px-5 py-4">
                        <div className="flex items-center gap-2">
                          <MapPinned
                            size={13}
                            className="shrink-0 text-slate-300"
                          />

                          <span className="truncate text-[10px] text-slate-600">
                            {x.address}
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-bold text-slate-800">
                          {label(x.category)}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <SeverityBadge severity={x.severity} />
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-mono text-[11px] font-bold text-slate-700">
                          {x.reportCount}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-slate-50 px-2 py-1 font-mono text-[10px] font-black text-slate-700">
                          {x.priority}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={x.status} />
                      </td>

                      <td className="px-5 py-4 text-[10px] font-medium text-slate-500">
                        {x.assignedTeam || "Unassigned"}
                      </td>

                      <td className="px-5 py-4">
                        <Link
                          className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-[10px] font-black text-civic transition hover:bg-teal-50"
                          href={`/issues/${x.id}`}
                        >
                          Review
                          <ArrowUpRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 px-5 py-3.5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[9px] font-bold text-slate-400">
                Showing{" "}
                <span className="text-slate-700">{priority.length}</span> civic
                issues
              </p>

              <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Data synchronized
              </div>
            </div>
          </section>

          <div className="h-8 sm:h-12" />
        </div>
      </main>
    </>
  );
}
