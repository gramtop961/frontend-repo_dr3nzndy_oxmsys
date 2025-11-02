function ProgressRing({ percent = 0 }) {
  const angle = Math.min(100, Math.max(0, percent)) * 3.6;
  const gradient = `conic-gradient(#10b981 ${angle}deg, #e5e7eb 0deg)`;
  return (
    <div className="relative h-32 w-32">
      <div className="absolute inset-0 rounded-full" style={{ background: gradient }} />
      <div className="absolute inset-2 rounded-full bg-white grid place-items-center">
        <div className="text-center">
          <div className="text-xl font-bold text-slate-900">{Math.round(percent)}%</div>
          <div className="text-xs text-slate-500">of goal</div>
        </div>
      </div>
    </div>
  );
}

export default function DailyProgress({ goal = 220, consumed = 180, meals = [] }) {
  const percent = (consumed / goal) * 100;
  return (
    <section id="log" className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid lg:grid-cols-2 gap-8 items-start">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-slate-900">Today's Meals</h2>
            <p className="text-sm text-slate-500">{consumed}g / {goal}g</p>
          </div>
          <div className="flex items-center gap-6">
            <ProgressRing percent={percent} />
            <ul className="flex-1 space-y-3">
              {meals.map((m, i) => (
                <li key={i} className="flex items-center justify-between rounded-xl border border-slate-200 p-3">
                  <div>
                    <p className="font-medium text-slate-800">{m.name}</p>
                    <p className="text-xs text-slate-500">{m.time} • {m.weight}g</p>
                  </div>
                  <p className="text-sm font-semibold text-emerald-700">{m.carbs}g</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-emerald-50 to-white p-6 shadow-sm" id="learn">
          <h3 className="text-lg font-semibold text-slate-900">Quick Tips</h3>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-800">Portion Guide</p>
              <p className="text-sm text-slate-600 mt-1">A roti (40–50g) roughly contains 20–25g carbs.</p>
              <p className="text-xs text-slate-500 mt-2">روٹی (40–50 گرام) میں تقریباً 20–25 گرام کارب ہوتا ہے۔</p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-800">Rice Estimate</p>
              <p className="text-sm text-slate-600 mt-1">Cooked rice ~28g carbs per 100g serving.</p>
              <p className="text-xs text-slate-500 mt-2">پکا ہوا چاول 100 گرام میں تقریباً 28 گرام کارب۔</p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-800">Balanced Plate</p>
              <p className="text-sm text-slate-600 mt-1">Fill half your plate with non-starchy veggies.</p>
              <p className="text-xs text-slate-500 mt-2">پلیٹ کا آدھا حصہ بغیر نشاستہ والی سبزیوں سے بھر دیں۔</p>
            </div>
            <div className="rounded-xl bg-white border border-slate-200 p-4">
              <p className="text-sm font-medium text-slate-800">Disclaimer</p>
              <p className="text-sm text-slate-600 mt-1">CarbMat does not provide medical dosing advice.</p>
              <p className="text-xs text-slate-500 mt-2">یہ طبی مشورہ نہیں۔ اپنی دوا کے لئے ڈاکٹر سے رجوع کریں۔</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
