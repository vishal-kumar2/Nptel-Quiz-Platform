import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

export default function Quiz({
  questions,
  answers,
  selectedOption,
  handleAnswer,
  submitQuiz,
  mode
}) {
  const navigate = useNavigate();

  const attempted = selectedOption.filter(Boolean).length;
  const [timeLeft, setTimeLeft] = useState(600);

  const [showPopup, setShowPopup] = useState(false);

  // ⏱ TIMER (TEST MODE)
  useEffect(() => {
    if (mode !== "test") return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          submitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [mode]);

  // 🔙 BACK BUTTON WARNING
  useEffect(() => {
    const handlePop = () => {
      if (mode === "test") {
        const confirmLeave = window.confirm("Leave test?");
        if (!confirmLeave) {
          navigate("/quiz");
        }
      }
    };

    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, [mode]);

  // ✅ FINISH PRACTICE
  const handleFinishPractice = () => {
    if (attempted === questions.length) {
      navigate("/select");
    } else {
      setShowPopup(true);
    }
  };

  return (
    <div className="p-6 flex flex-col items-center">

      {/* HEADER */}
      <div className="flex justify-between w-full max-w-3xl mb-4">
        <ProgressBar attempted={attempted} total={questions.length} />

        {mode === "test" && (
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg">
            ⏱ {timeLeft}s
          </div>
        )}
      </div>

      {/* QUESTIONS */}
      <div className="w-full max-w-3xl space-y-4">
        {questions.map((q, i) => (
          <QuestionCard
            key={i}
            q={q}
            index={i}
            answers={answers}
            selectedOption={selectedOption}
            handleAnswer={handleAnswer}
            mode={mode}
          />
        ))}
      </div>

      {/* TEST MODE SUBMIT */}
      {mode === "test" && (
        <button
          onClick={submitQuiz}
          className="mt-6 bg-indigo-600 text-white px-6 py-3 rounded-xl"
        >
          Submit Test
        </button>
      )}

      {/* PRACTICE MODE FINISH */}
      {mode === "practice" && (
        <button
          onClick={handleFinishPractice}
          className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl hover:scale-105 transition"
        >
          Finish Practice ✅
        </button>
      )}

      {/* 🚨 POPUP */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">

          <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm w-full">

            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              ⚠️ Incomplete Attempt
            </h3>

            <p className="text-gray-600 mb-4">
              You have {questions.length - attempted} unanswered question(s).
              <br />
              Please attempt all questions to finish.
            </p>

            <button
              onClick={() => setShowPopup(false)}
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg"
            >
              Continue
            </button>

          </div>
        </div>
      )}

    </div>
  );
}