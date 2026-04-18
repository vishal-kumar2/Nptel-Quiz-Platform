import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import confetti from "canvas-confetti";

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

  const [mode, setMode] = useState(null); 
  // null | "wrong" | "all"

  // 🎉 CONFETTI
  useEffect(() => {
    if (percentage === 100) {
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  }, [percentage]);

  // 🔙 BLOCK BACK
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

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m}m ${s}s`;
  };

  const getFeedback = () => {
    if (percentage === 100) return "🏆 Perfect Score! You're unstoppable!";
    if (percentage >= 80) return "🔥 Excellent! You're exam ready.";
    if (percentage >= 60) return "👍 Good job! Just refine weak areas.";
    if (percentage >= 40) return "⚡ Keep practicing, you're improving.";
    return "📚 Needs more practice. Keep pushing!";
  };

  return (
    <div className="min-h-screen flex flex-col items-center px-6 py-10 bg-gradient-to-br from-indigo-100 via-purple-100 to-blue-200">

      {/* 🔥 CARD */}
      <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 w-full max-w-3xl text-center border border-white/30">

        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Your Performance
        </h1>

        <p className="text-gray-600 mb-6">{getFeedback()}</p>

        {/* 🎯 SCORE */}
        <div className="text-5xl font-bold text-indigo-600 mb-4">
          {percentage}%
        </div>

        {/* 📊 STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Stat label="Correct" value={correct} color="text-green-500" />
          <Stat label="Wrong" value={wrong} color="text-red-500" />
          <Stat label="Unanswered" value={unanswered} color="text-gray-500" />
          <Stat label="Time" value={formatTime(timeTaken)} color="text-indigo-600" />
        </div>

        {/* 📈 BAR */}
        <div className="mb-6">
          <div className="bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>

        {/* 🔘 BUTTONS */}
        <div className="flex flex-wrap gap-3 justify-center">

          <button
            onClick={() => setMode(mode === "wrong" ? null : "wrong")}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
          >
            {mode === "wrong" ? "Hide ❌" : "Wrong Only ❌"}
          </button>

          <button
            onClick={() => setMode(mode === "all" ? null : "all")}
            className="px-5 py-2 rounded-xl bg-purple-600 text-white hover:bg-purple-700"
          >
            {mode === "all" ? "Hide ❌" : "Full Review 📘"}
          </button>

          <button
            onClick={() => navigate("/select")}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white "
          >
            Reattempt 🔁
          </button>

        </div>
      </div>

      {/* 📚 REVIEW SECTION */}
      {mode && (
        <div className="w-full max-w-3xl mt-8 space-y-4">

          {/* 🎉 PERFECT CASE */}
          {mode === "wrong" && wrong === 0 && (
            <div className="bg-white p-8 rounded-2xl shadow text-center border border-green-200">
              <div className="text-4xl mb-2">🎉</div>
              <p className="text-green-600 font-semibold">
                No wrong answers! Perfect attempt 🚀
              </p>
            </div>
          )}

          {questions.map((q, i) => {
            const userAns = selectedOption[i];
            const correctAns = q.answer;

            const isCorrect = userAns === correctAns;
            const isUnanswered = !userAns;

            if (mode === "wrong" && isCorrect) return null;

            let border = "border-gray-200";
            if (isCorrect) border = "border-green-400";
            else if (isUnanswered) border = "border-gray-300";
            else border = "border-red-400";

            return (
              <div
                key={i}
                className={`bg-white p-5 rounded-xl shadow border-l-4 ${border}`}
              >
                <p className="font-semibold mb-2 text-gray-800">
                  {i + 1}. {q.question}
                </p>

                <p className="text-sm">
                  Your Answer:{" "}
                  <span
                    className={
                      isCorrect
                        ? "text-green-600"
                        : isUnanswered
                        ? "text-gray-500"
                        : "text-red-500"
                    }
                  >
                    {userAns || "Not Attempted"}
                  </span>
                </p>

                <p className="text-green-600 text-sm">
                  Correct Answer: {correctAns}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className={`${color} text-xl font-bold`}>{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </div>
  );
}