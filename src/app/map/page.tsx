"use client";

import { useMemo, useState } from "react";
import {
  Activity,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { demoIssues } from "@/data/demoIssues";
import { IssueCategory, IssueStatus } from "@/types/issue";
import { MapCanvas, Navbar, label } from "@/components/ui";

export default function MapPage() {
  const [cat, setCat] = useState<"all" | IssueCategory>("all");
  const [status, setStatus] = useState<"all" | IssueStatus>("all");
  const [query, setQuery] = useState("");
  const [mobileFilters, setMobileFilters] = useState(false);

  const issues = useMemo(
    () =>
      demoIssues.filter(
        (x) =>
          (cat === "all" || x.category === cat) &&
          (status === "all" || x.status === status) &&
          `${x.id} ${x.address} ${x.category}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [cat, status, query],
  );

  const activeFilters =
    Number(cat !== "all") + Number(status !== "all") + Number(query.length > 0);

  const clearFilters = () => {
    setCat("all");
    setStatus("all");
    setQuery("");
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#f5f8f7]">
        <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-6 sm:py-7 lg:px-8">
          {/* HEADER */}
          <header className="mb-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-50 text-civic">
                    <MapPin size={15} />
                  </span>

                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-civic">
                    Civic intelligence
                  </p>
                </div>

                <h1 className="mt-3 text-3xl font-black tracking-[-0.05em] text-slate-950 sm:text-4xl">
                  City issue intelligence
                </h1>

                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                  Explore reported civic problems, identify issue clusters, and
                  understand what needs attention across the city.
                </p>
              </div>

              {/* Issue counter */}
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-[0_8px_30px_rgba(15,23,42,0.035)]">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-civic">
                  <Activity size={16} />
                </div>

                <div>
                  <p className="font-mono text-lg font-black leading-none text-slate-950">
                    {issues.length}
                  </p>

                  <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Issues in view
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* MOBILE FILTER BUTTON */}
          <button
            onClick={() => setMobileFilters(!mobileFilters)}
            className="mb-4 flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-left shadow-sm lg:hidden"
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal size={16} className="text-civic" />

              <span className="text-xs font-black text-slate-900">Filters</span>

              {activeFilters > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-civic px-1.5 text-[9px] font-black text-white">
                  {activeFilters}
                </span>
              )}
            </span>

            <span className="text-[10px] font-bold text-slate-400">
              {mobileFilters ? "Hide" : "Show"}
            </span>
          </button>

          {/* MAIN */}
          <div className="grid gap-5 lg:grid-cols-[285px_minmax(0,1fr)]">
            {/* FILTER PANEL */}
            <aside className={`${mobileFilters ? "block" : "hidden"} lg:block`}>
              <div className="sticky top-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_12px_40px_rgba(15,23,42,0.045)]">
                {/* Filter heading */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-700">
                      <Filter size={15} />
                    </div>

                    <div>
                      <h2 className="text-sm font-black text-slate-950">
                        Map filters
                      </h2>

                      <p className="text-[9px] font-bold text-slate-400">
                        Refine visible issues
                      </p>
                    </div>
                  </div>

                  {activeFilters > 0 && (
                    <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[9px] font-black text-civic">
                      {activeFilters} active
                    </span>
                  )}
                </div>

                {/* Search */}
                <div className="mt-6">
                  <label className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
                    Search
                  </label>

                  <div className="group mt-2 flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 transition focus-within:border-civic focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-50">
                    <Search
                      size={15}
                      className="shrink-0 text-slate-400 group-focus-within:text-civic"
                    />

                    <input
                      className="h-11 min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Issue or location"
                    />

                    {query && (
                      <button
                        onClick={() => setQuery("")}
                        className="text-slate-400 transition hover:text-slate-900"
                        aria-label="Clear search"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Category */}
                <FilterGroup
                  title="Issue category"
                  values={[
                    "all",
                    "pothole",
                    "garbage",
                    "streetlight",
                    "obstruction",
                    "waterlogging",
                  ]}
                  active={cat}
                  set={(v) => setCat(v as "all" | IssueCategory)}
                />

                {/* Status */}
                <FilterGroup
                  title="Issue status"
                  values={[
                    "all",
                    "REPORTED",
                    "VERIFIED",
                    "ASSIGNED",
                    "IN_PROGRESS",
                    "RESOLVED",
                    "CLOSED",
                  ]}
                  active={status}
                  set={(v) => setStatus(v as "all" | IssueStatus)}
                />

                {/* Clear */}
                <button
                  onClick={clearFilters}
                  disabled={activeFilters === 0}
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-[10px] font-black uppercase tracking-wider text-slate-500 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <X size={13} />
                  Clear all filters
                </button>
              </div>
            </aside>

            {/* MAP */}
            <section className="relative min-w-0">
              <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_15px_50px_rgba(15,23,42,0.07)] sm:p-2.5">
                {/* Map top overlay */}
                <div className="pointer-events-none absolute left-5 right-5 top-5 z-10 flex items-start justify-between gap-3 sm:left-7 sm:right-7 sm:top-7">
                  <div className="pointer-events-auto rounded-xl border border-white/60 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>

                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-700">
                        Live issue map
                      </span>
                    </div>
                  </div>

                  <div className="pointer-events-auto hidden rounded-xl border border-white/60 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-md sm:block">
                    <span className="font-mono text-[9px] font-bold text-slate-500">
                      {issues.length} MARKERS
                    </span>
                  </div>
                </div>

                <div className="h-[560px] overflow-hidden rounded-xl sm:h-[650px] lg:h-[calc(100vh-250px)] lg:min-h-[620px] lg:max-h-[780px]">
                  <MapCanvas issues={issues} selected={issues[0]} />
                </div>

                {/* Bottom map legend */}
                <div className="absolute bottom-5 left-5 right-5 z-10 flex flex-wrap items-center justify-between gap-2 sm:bottom-7 sm:left-7 sm:right-7">
                  <div className="flex items-center gap-2 rounded-xl border border-white/60 bg-white/90 px-3 py-2.5 shadow-lg backdrop-blur-md">
                    <span className="h-2.5 w-2.5 rounded-full bg-civic" />

                    <span className="text-[9px] font-bold text-slate-600">
                      Reported civic issues
                    </span>
                  </div>

                  {activeFilters > 0 && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1.5 rounded-xl border border-white/60 bg-white/90 px-3 py-2.5 text-[9px] font-black text-slate-600 shadow-lg backdrop-blur-md transition hover:bg-white"
                    >
                      <X size={12} />
                      Reset filters
                    </button>
                  )}
                </div>
              </div>

              {/* Empty state */}
              {issues.length === 0 && (
                <div className="absolute inset-0 z-20 flex items-center justify-center p-5">
                  <div className="max-w-sm rounded-2xl border border-slate-200 bg-white p-7 text-center shadow-2xl">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <Search size={20} />
                    </div>

                    <h2 className="mt-4 text-lg font-black text-slate-950">
                      No issues found
                    </h2>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      Try changing your search or removing one of the active
                      filters.
                    </p>

                    <button
                      onClick={clearFilters}
                      className="mt-5 rounded-xl bg-civic px-4 py-2.5 text-[10px] font-black text-white"
                    >
                      Reset filters
                    </button>
                  </div>
                </div>
              )}
            </section>
          </div>

          <div className="h-6 sm:h-10" />
        </div>
      </main>
    </>
  );
}

function FilterGroup({
  title,
  values,
  active,
  set,
}: {
  title: string;
  values: string[];
  active: string;
  set: (v: string) => void;
}) {
  return (
    <div className="mt-7">
      <p className="text-[10px] font-black uppercase tracking-[0.16em] text-slate-400">
        {title}
      </p>

      <div className="mt-3 flex flex-wrap gap-2">
        {values.map((v) => {
          const selected = active === v;

          return (
            <button
              key={v}
              onClick={() => set(v)}
              className={`rounded-lg border px-2.5 py-2 text-[9px] font-black transition-all ${
                selected
                  ? "border-civic bg-civic text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              {v === "all" ? "All" : label(v)}
            </button>
          );
        })}
      </div>
    </div>
  );
}
