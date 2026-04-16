import { useEffect } from "react";

export default function WeekSelector({
  weeks,
  selectedWeeks,
  setSelectedWeeks,
  mode, // ✅ MUST PASS THIS
}) {
  // 🔥 AUTO SELECT ALL IN EXAM MODE
  useEffect(() => {
    if (mode === "exam") {
      setSelectedWeeks(weeks);
    }
  }, [mode, weeks]);

  const toggleWeek = (w) => {
    if (mode === "exam") return; // ❌ disable click

    if (selectedWeeks.includes(w)) {
      setSelectedWeeks(selectedWeeks.filter((x) => x !== w));
    } else {
      setSelectedWeeks([...selectedWeeks, w]);
    }
  };

  return (
    <>
      {/* ACTION BUTTONS */}
      <div className="flex gap-3 mb-4">
        <button
          onClick={() => setSelectedWeeks(weeks)}
          disabled={mode === "exam"}
          className={`px-3 py-1 rounded text-white transition ${
            mode === "exam"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:scale-105"
          }`}
        >
          Select All
        </button>

        <button
          onClick={() => setSelectedWeeks([])}
          disabled={mode === "exam"}
          className={`px-3 py-1 rounded text-white transition ${
            mode === "exam"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:scale-105"
          }`}
        >
          Clear
        </button>
      </div>

      {/* WEEK GRID */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {weeks.map((w) => {
          const isSelected = selectedWeeks.includes(w);

          return (
            <button
              key={w}
              onClick={() => toggleWeek(w)}
              className={`p-3 rounded-xl font-medium transition-all duration-200
                ${
                  mode === "exam"
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : isSelected
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105"
                      : "bg-white shadow hover:bg-indigo-100 hover:scale-105"
                }
              `}
            >
              W{w}
            </button>
          );
        })}
      </div>

      {/* INFO */}
      {mode === "exam" && (
        <p className="text-xs text-gray-500 text-center mb-4">
          All weeks are included in Exam Mode 🎯
        </p>
      )}
    </>
  );
}
