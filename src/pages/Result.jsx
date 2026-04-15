import { useNavigate, useLocation } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const { state } = useLocation();

  const result = state?.result;
  const questions = state?.questions || [];
  const selectedOption = state?.selectedOption || [];

  const correct = result?.score || 0;
  const total = result?.total || 0;

  const unanswered = selectedOption.filter(x => !x).length;
  const wrong = total - correct - unanswered;

  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="flex flex-col items-center px-6 py-10">

      {/* 🔵 CIRCULAR RING */}
      <div className="relative w-40 h-40 mb-6">

        <svg className="w-full h-full rotate-[-90deg]">
          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#e5e7eb"
            strokeWidth="10"
            fill="none"
          />

          <circle
            cx="80"
            cy="80"
            r="70"
            stroke="#6366f1"
            strokeWidth="10"
            fill="none"
            strokeDasharray={440}
            strokeDashoffset={440 - (440 * percentage) / 100}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold">{percentage}%</p>
          <p className="text-sm text-gray-500">Score</p>
        </div>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-3 gap-6 text-center mb-8">

        <div>
          <p className="text-green-500 text-xl font-bold">{correct}</p>
          <p className="text-sm text-gray-500">Correct</p>
        </div>

        <div>
          <p className="text-red-500 text-xl font-bold">{wrong}</p>
          <p className="text-sm text-gray-500">Wrong</p>
        </div>

        <div>
          <p className="text-gray-500 text-xl font-bold">{unanswered}</p>
          <p className="text-sm text-gray-500">Unanswered</p>
        </div>

      </div>

      {/* 📚 SOLUTIONS */}
      <div className="w-full max-w-3xl space-y-4">

        {questions.map((q, i) => {
          const userAns = selectedOption[i];
          const correctAns = q.answer;

          if (userAns === correctAns) return null;

          return (
            <div key={i} className="bg-white p-4 rounded-xl shadow border">

              <p className="font-semibold mb-2">
                {i + 1}. {q.question}
              </p>

              <p className="text-red-500 text-sm">
                Your Answer: {userAns || "Not Attempted"}
              </p>

              <p className="text-green-600 text-sm">
                Correct Answer: {correctAns}
              </p>

            </div>
          );
        })}

      </div>

      {/* 🔁 BUTTON */}
      <button
        onClick={() => navigate("/select")}
        className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl"
      >
        Reattempt
      </button>

    </div>
  );
}