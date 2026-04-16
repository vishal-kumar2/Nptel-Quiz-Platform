import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Selection({
  selectedCourse,
  setSelectedCourse,
  selectedWeeks,
  setSelectedWeeks,
  startQuiz,
  courses,
  weeks,
  mode,
  setMode,
}) {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);

  // 🔥 AUTO SELECT ALL WEEKS IN EXAM MODE
  useEffect(() => {
    if (mode === "exam") {
      setSelectedWeeks(weeks);
    }
  }, [mode, weeks]);

  // 🔁 TOGGLE WEEK
  const toggleWeek = (week) => {
    if (mode === "exam") return;

    if (selectedWeeks.includes(week)) {
      setSelectedWeeks(selectedWeeks.filter((w) => w !== week));
    } else {
      setSelectedWeeks([...selectedWeeks, week]);
    }
  };

  const selectAll = () => {
    if (mode === "exam") return;
    setSelectedWeeks(weeks);
  };

  const clearAll = () => {
    if (mode === "exam") return;
    setSelectedWeeks([]);
  };

  // 🚀 START VALIDATION
  const handleStart = () => {
    if (!selectedCourse || selectedWeeks.length === 0) {
      setShowError(true);
      return;
    }
    window.scrollTo(0, 0);
    startQuiz();
  };

  return (
    <div className="flex flex-1 items-center justify-center px-6 py-10">

      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-400 opacity-20 blur-3xl pointer-events-none"></div>

      {/* CARD */}
      <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-4xl w-full border border-white/30">

        {/* TITLE */}
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
          Start Your Practice 🚀
        </h2>

        {/* COURSE SELECT */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-600 font-medium">
            Select Course
          </label>

          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(Number(e.target.value))}
            className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-indigo-400 outline-none"
          >
            <option value="">Choose Course</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        {/* WEEK HEADER */}
        <div className="flex justify-between items-center mb-3">
          <p className="font-medium text-gray-700">Select Weeks</p>

          <div className="flex gap-3 text-sm">
            <button
              onClick={selectAll}
              disabled={mode === "exam"}
              className={`text-indigo-600 hover:underline ${
                mode === "exam" ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              Select All
            </button>

            <button
              onClick={clearAll}
              disabled={mode === "exam"}
              className={`text-red-500 hover:underline ${
                mode === "exam" ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              Clear
            </button>
          </div>
        </div>

        {/* WEEK GRID */}
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mb-4">
          {weeks.map((w) => {
            const selected = selectedWeeks.includes(w);

            return (
              <button
                key={w}
                onClick={() => toggleWeek(w)}
                className={`p-3 rounded-xl text-sm font-medium transition-all duration-200
                  ${
                    mode === "exam"
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : selected
                        ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg scale-105"
                        : "bg-gray-100 hover:bg-indigo-100 hover:scale-105"
                  }`}
              >
                W{w}
              </button>
            );
          })}
        </div>

        {/* EXAM MODE INFO */}
        {mode === "exam" && (
          <p className="text-center text-sm text-gray-500 mb-4">
            All weeks are automatically included in Exam Mode 🎯
          </p>
        )}

        {/* SELECTED INFO */}
        <p className="text-center text-sm text-gray-500 mb-6">
          {selectedWeeks.length > 0
            ? `${selectedWeeks.length} week(s) selected`
            : "No weeks selected"}
        </p>

        {/* MODE SELECTION */}
        <div className="grid grid-cols-3 gap-4 mb-8">

          {/* PRACTICE */}
          <div
            onClick={() => setMode("practice")}
            className={`cursor-pointer p-4 rounded-xl text-center transition
              ${
                mode === "practice"
                  ? "bg-green-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 hover:bg-green-100"
              }`}
          >
            <p className="font-semibold">Practice</p>
            <p className="text-xs">Learn concepts without pressure 💡</p>
          </div>

          {/* TEST */}
          <div
            onClick={() => setMode("test")}
            className={`cursor-pointer p-4 rounded-xl text-center transition
              ${
                mode === "test"
                  ? "bg-red-500 text-white shadow-lg scale-105"
                  : "bg-gray-100 hover:bg-red-100"
              }`}
          >
            <p className="font-semibold">Test</p>
            <p className="text-xs">Simulate real exam conditions ⏱️</p>
          </div>

          {/* EXAM */}
          <div
            onClick={() => setMode("exam")}
            className={`cursor-pointer p-4 rounded-xl text-center transition
              ${
                mode === "exam"
                  ? "bg-purple-600 text-white shadow-lg scale-105"
                  : "bg-gray-100 hover:bg-purple-100"
              }`}
          >
            <p className="font-semibold">Exam</p>
            <p className="text-xs">Challenge yourself with 75 questions 🎯</p>
          </div>

        </div>

        {/* START BUTTON */}
        <button
          onClick={handleStart}
          className="w-full py-4 text-lg font-semibold rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-xl hover:scale-105 transition"
        >
          Start 🚀
        </button>

      </div>

      {/* 🔥 BEAUTIFUL POPUP */}
      {showError && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-scaleIn">

            <div className="text-4xl mb-3">⚠️</div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Missing Selection
            </h3>

            <p className="text-gray-600 mb-6">
              Please select a course and at least one week before starting.
            </p>

            <button
              onClick={() => setShowError(false)}
              className="w-full py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              Got it 👍
            </button>

          </div>
        </div>
      )}
    </div>
  );
}