export default function QuestionCard({
  q,
  index,
  answers,
  selectedOption,
  handleAnswer,
  mode
}) {
  return (
    <div className="bg-white/80 backdrop-blur-xl p-5 rounded-2xl shadow-md border border-gray-200">

      {/* QUESTION */}
      <h3 className="mb-4 font-semibold text-gray-800">
        {index + 1}. {q.question}
      </h3>

      {/* OPTIONS */}
      <div className="space-y-3">
        {q.options.map((opt, i) => {
          const isSelected = selectedOption[index] === opt;
          const isAnswered = answers[index];

          let style =
            "w-full p-3 rounded-xl border text-left transition";

          // 🟢 PRACTICE MODE
          if (mode === "practice" && isAnswered) {
            if (opt === q.answer) {
              style += " bg-green-100 border-green-400";
            } else if (isSelected && isAnswered === "wrong") {
              style += " bg-red-100 border-red-400";
            } else {
              style += " bg-gray-100";
            }
          }

          // 🔵 TEST MODE (no correctness shown)
          else if (mode === "test") {
            if (isSelected) {
              style += " bg-indigo-100 border-indigo-400";
            } else {
              style += " bg-gray-50 hover:bg-indigo-50";
            }
          }

          // DEFAULT (before answering in practice)
          else {
            style += " bg-gray-50 hover:bg-indigo-50";
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt, index)}
              disabled={mode === "practice" && isAnswered} // 🔒 lock in practice
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