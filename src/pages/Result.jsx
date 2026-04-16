import { useNavigate, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const result = state?.result;
  const questions = state?.questions || [];
  const selectedOption = state?.selectedOption || [];

  const correct = result?.correct || 0;
  const wrong = result?.wrong || 0;
  const unanswered = result?.unanswered || 0;
  const total = result?.total || 0;
  const timeTaken = result?.timeTaken || 0;

  const percentage = total ? Math.round((correct / total) * 100) : 0;

  const [showSolutions, setShowSolutions] = useState(false);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}m ${s}s`;
  };

  const getFeedback = () => {
    if (percentage >= 80) return "🔥 Excellent! You're exam ready.";
    if (percentage >= 60) return "👍 Good job! Just refine weak areas.";
    if (percentage >= 40) return "⚡ Keep practicing, you're improving.";
    return "📚 Needs more practice. Don't worry, keep going.";
  };

  useEffect(() => {
  const handlePopState = () => {
    navigate("/select", { replace: true });
  };

  window.history.pushState(null, "", window.location.pathname);
  window.addEventListener("popstate", handlePopState);

  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
}, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-gradient-to-br from-indigo-100 to-blue-200">

      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-2 text-gray-800">
        Test Analysis
      </h1>
      <p className="text-gray-600 mb-6">{getFeedback()}</p>

      {/* SCORE RING */}
      <div className="relative w-44 h-44 mb-8">
        <svg className="w-full h-full rotate-[-90deg]">
          <circle cx="88" cy="88" r="75" stroke="#e5e7eb" strokeWidth="12" fill="none" />
          <circle
            cx="88"
            cy="88"
            r="75"
            stroke="url(#grad)"
            strokeWidth="12"
            fill="none"
            strokeDasharray={470}
            strokeDashoffset={470 - (470 * percentage) / 100}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-bold text-indigo-600">{percentage}%</p>
          <p className="text-sm text-gray-500">Score</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center mb-10 w-full max-w-2xl">
        <Stat label="Correct" value={correct} color="text-green-500" />
        <Stat label="Wrong" value={wrong} color="text-red-500" />
        <Stat label="Unanswered" value={unanswered} color="text-gray-500" />
        <Stat label="Time" value={formatTime(timeTaken)} color="text-indigo-600" />
      </div>

      {/* PERFORMANCE BAR */}
      <div className="w-full max-w-2xl mb-8">
        <div className="bg-gray-200 rounded-full h-3">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 mt-2 text-center">
          Accuracy: {percentage}%
        </p>
      </div>

      {/* 🔥 TOGGLE BUTTON */}
      <button
        onClick={() => setShowSolutions(!showSolutions)}
        className="mb-8 bg-indigo-600 text-white px-6 py-2 rounded-xl shadow hover:bg-indigo-700 transition"
      >
        {showSolutions ? "Hide Solutions ❌" : "Review Answers 📖"}
      </button>

      {/* 📚 SOLUTIONS (ONLY WHEN CLICKED) */}
      {showSolutions && (
        <div className="w-full max-w-3xl space-y-5">
          {questions.map((q, i) => {
            const userAns = selectedOption[i];
            const correctAns = q.answer;

            if (userAns === correctAns) return null;

            return (
              <div
                key={i}
                className="bg-white p-5 rounded-xl shadow border-l-4 border-red-400"
              >
                <p className="font-semibold mb-2 text-gray-800">
                  {i + 1}. {q.question}
                </p>

                <p className="text-red-500 text-sm">
                  ❌ Your Answer: {userAns || "Not Attempted"}
                </p>

                <p className="text-green-600 text-sm">
                  ✅ Correct Answer: {correctAns}
                </p>
              </div>
            );
          })}
        </div>
      )}

      {/* BUTTON */}
      <button
        onClick={() => navigate("/select")}
        className="mt-10 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
      >
        Reattempt Test 🔁
      </button>
    </div>
  );
}

/* 🔥 SMALL COMPONENT */
function Stat({ label, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className={`${color} text-xl font-bold`}>{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}