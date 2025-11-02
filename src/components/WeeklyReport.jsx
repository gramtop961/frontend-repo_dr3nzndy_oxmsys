import { BarChart3 } from "lucide-react";

export default function WeeklyReport({ data = [], onExport = () => {} }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  return (
    <section id="report" className="py-12 sm:py-16 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-emerald-600" /> Weekly Report
            </h2>
            <button onClick={onExport} className="text-sm text-emerald-700 hover:text-emerald-800">Export CSV</button>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-3 items-end h-48">
            {data.map((d) => {
              const h = (d.value / max) * 100;
              return (
                <div key={d.day} className="flex flex-col items-center gap-2">
                  <div className="w-8 sm:w-10 rounded-lg bg-emerald-200/60" style={{ height: `${h}%` }} />
                  <div className="text-xs text-slate-600">{d.day}</div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            Your average daily carb intake was {Math.round(
              data.reduce((a, c) => a + c.value, 0) / Math.max(1, data.length)
            )}g this week.
          </div>
        </div>
      </div>
    </section>
  );
}
