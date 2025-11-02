import { Camera, Plus, ShieldCheck } from "lucide-react";

export default function HeroScan({ onScan, onAddManual, detection }) {
  const detected = detection ?? {
    name: "Chicken Biryani",
    confidence: 92,
    weight: 350,
    carbs: 85,
    macros: { protein: 22, fat: 14 },
  };

  return (
    <section id="scan" className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-96 w-[60rem] rounded-full bg-emerald-200/30 blur-3xl" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Count carbs in seconds
          </h1>
          <p className="mt-4 text-slate-600 text-base sm:text-lg">
            Snap your meal or add it manually. Optimized for Pakistani cuisine like naan, biryani, daal, and chapati. Get instant estimates for portion size and carbohydrates.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onScan} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-white bg-emerald-600 hover:bg-emerald-700 transition shadow-sm">
              <Camera className="h-5 w-5" />
              Scan Food
            </button>
            <button onClick={onAddManual} className="inline-flex items-center gap-2 rounded-xl px-4 py-3 text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition">
              <Plus className="h-5 w-5" />
              Add Manually
            </button>
          </div>

          <div className="mt-6 flex items-center gap-3 text-sm text-slate-600">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <p>Private and secure. No medical dosing advice is provided.</p>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
              <div className="h-3 w-3 rounded-full bg-rose-400" />
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <div className="h-3 w-3 rounded-full bg-emerald-400" />
            </div>
            <div className="p-6 grid gap-4">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-sm font-medium text-slate-700">Detected</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm">
                  <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 text-emerald-700 px-3 py-1">
                    {detected.name} <span className="text-xs">({detected.confidence}%)</span>
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 text-slate-700 px-3 py-1">
                    {detected.weight} g
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Carbs", value: `${detected.carbs} g` },
                  { label: "Protein", value: `${detected.macros?.protein ?? 0} g` },
                  { label: "Fat", value: `${detected.macros?.fat ?? 0} g` },
                ].map((m) => (
                  <div key={m.label} className="rounded-xl border border-slate-200 p-4">
                    <p className="text-xs uppercase tracking-wide text-slate-500">{m.label}</p>
                    <p className="mt-1 text-lg font-semibold text-slate-900">{m.value}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-slate-500">
                Not sure? You can correct the dish and we will learn.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
