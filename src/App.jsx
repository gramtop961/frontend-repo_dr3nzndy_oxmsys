import { useMemo, useRef, useState } from "react";
import Header from "./components/Header";
import HeroScan from "./components/HeroScan";
import DailyProgress from "./components/DailyProgress";
import WeeklyReport from "./components/WeeklyReport";

export default function App() {
  // State: meals and goal
  const [meals, setMeals] = useState([
    { name: "Chicken Biryani", weight: 350, carbs: 85, time: "Lunch" },
    { name: "Roti + Daal", weight: 200, carbs: 45, time: "Dinner" },
    { name: "Apple", weight: 120, carbs: 16, time: "Snack" },
  ]);
  const [goal, setGoal] = useState(220);

  // Manual entry UI state
  const [manualOpen, setManualOpen] = useState(false);

  // Scan: file input + mock recognition
  const fileRef = useRef(null);
  const [detection, setDetection] = useState(null);

  const onScanClick = () => {
    fileRef.current?.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Mock AI: pick a local dish and estimate
    const dishes = [
      { name: "Chicken Biryani", carbs100: 24 },
      { name: "Naan", carbs100: 55 },
      { name: "Chapati", carbs100: 48 },
      { name: "Daal", carbs100: 18 },
      { name: "Pulao", carbs100: 28 },
      { name: "Plain Rice", carbs100: 28 },
      { name: "Paratha", carbs100: 36 },
    ];
    const picked = dishes[Math.floor(Math.random() * dishes.length)];
    const weight = Math.floor(120 + Math.random() * 300); // 120-420g
    const carbs = Math.round((picked.carbs100 * weight) / 100);
    const confidence = Math.floor(80 + Math.random() * 20); // 80-99%

    const det = {
      name: picked.name,
      weight,
      carbs,
      confidence,
      macros: { protein: Math.round(weight * 0.06), fat: Math.round(weight * 0.04) },
    };
    setDetection(det);

    // Add as a new meal (assume current meal time by daypart)
    const hour = new Date().getHours();
    const time = hour < 11 ? "Breakfast" : hour < 16 ? "Lunch" : hour < 21 ? "Dinner" : "Snack";
    setMeals((prev) => [{ name: det.name, weight: det.weight, carbs: det.carbs, time }, ...prev]);

    // reset input value to allow re-uploading same file
    e.target.value = "";
  };

  const consumed = meals.reduce((a, m) => a + Number(m.carbs || 0), 0);

  const weekly = useMemo(
    () => [
      { day: "Mon", value: 198 },
      { day: "Tue", value: 210 },
      { day: "Wed", value: 176 },
      { day: "Thu", value: 205 },
      { day: "Fri", value: 189 },
      { day: "Sat", value: 223 },
      { day: "Sun", value: 194 },
    ],
    []
  );

  const onExportCSV = () => {
    const headers = ["Day", "Carbs (g)"];
    const rows = weekly.map((d) => [d.day, d.value]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "carbmat-weekly-report.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const onSettings = () => {
    const input = prompt("Set daily carb goal (g):", String(goal));
    if (!input) return;
    const n = Number(input);
    if (!Number.isFinite(n) || n <= 0) return alert("Please enter a valid number.");
    setGoal(Math.round(n));
  };

  const onSignIn = () => {
    alert("Sign-in coming next: We'll add Google login and sync with the cloud.");
  };

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onFileChange} />
      <Header onSettings={onSettings} onSignIn={onSignIn} />
      <HeroScan onScan={onScanClick} onAddManual={() => setManualOpen(true)} detection={detection} />
      <DailyProgress
        goal={goal}
        consumed={consumed}
        meals={meals}
        manualOpen={manualOpen}
        onOpenManual={() => setManualOpen(true)}
        onCancelManual={() => setManualOpen(false)}
        onAddMeal={(meal) => {
          setMeals((prev) => [meal, ...prev]);
          setManualOpen(false);
        }}
      />
      <WeeklyReport data={weekly} onExport={onExportCSV} />
      <footer className="border-t border-slate-200 py-8">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-sm text-slate-600">
          <p>
            CarbMat helps you estimate carbohydrates in local meals. This app does not provide medical dosing advice. Consult your doctor for insulin adjustments.
          </p>
          <p className="mt-2">© {new Date().getFullYear()} CarbMat</p>
        </div>
      </footer>
    </div>
  );
}
