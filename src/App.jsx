import { useMemo } from "react";
import Header from "./components/Header";
import HeroScan from "./components/HeroScan";
import DailyProgress from "./components/DailyProgress";
import WeeklyReport from "./components/WeeklyReport";

export default function App() {
  const meals = [
    { name: "Chicken Biryani", weight: 350, carbs: 85, time: "Lunch" },
    { name: "Roti + Daal", weight: 200, carbs: 45, time: "Dinner" },
    { name: "Apple", weight: 120, carbs: 16, time: "Snack" },
  ];

  const consumed = meals.reduce((a, m) => a + m.carbs, 0);
  const goal = 220;

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

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <HeroScan onScan={() => {}} onAddManual={() => {}} />
      <DailyProgress goal={goal} consumed={consumed} meals={meals} />
      <WeeklyReport data={weekly} />
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
