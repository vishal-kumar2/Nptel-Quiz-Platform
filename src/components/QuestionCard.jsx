import React from "react";

function QuestionCard({
  q,
  index,
  answers = [],
  selectedOption = [],
  handleAnswer,
  mode,
}) {
  const isAnswered = answers[index];

  return (
    <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-md border border-gray-200">
      <h3 className="mb-4 font-semibold text-gray-800">
        {index + 1}. {q.question}
      </h3>

      <div className="space-y-3">
        {q.options.map((opt) => {
          const isSelected = selectedOption[index] === opt;

          let style = "w-full p-3 rounded-xl border text-left transition";

          if (mode === "practice" && isAnswered) {
            if (opt === q.answer) {
              style += " bg-green-100 border-green-400";
            } else if (isSelected && isAnswered === "wrong") {
              style += " bg-red-100 border-red-400";
            } else {
              style += " bg-gray-100";
            }
          } else if (mode === "test") {
            style += isSelected
              ? " bg-indigo-100 border-indigo-400"
              : " bg-gray-50 hover:bg-indigo-50";
          } else if (mode === "exam") {
            style += isSelected
              ? " bg-purple-100 border-purple-400"
              : " bg-gray-50 hover:bg-purple-50";
          } else {
            style += " bg-gray-50 hover:bg-indigo-50";
          }

          return (
            <button
              key={`${index}-${opt}`}
              onClick={() => handleAnswer(opt, index)}
              disabled={mode === "practice" && isAnswered}
              className={style}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(QuestionCard);
