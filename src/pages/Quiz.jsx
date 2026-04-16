import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";

export default function Quiz({
  questions = [],
  answers = [],
  selectedOption = [],
  handleAnswer,
  submitQuiz,
  mode,
}) {
  const navigate = useNavigate();
  const attempted = selectedOption.filter(Boolean).length;

  const [showPopup, setShowPopup] = useState(false);
  const [showExitPopup, setShowExitPopup] = useState(false);
 
  
  // 🔥 BACK BUTTON CONTROL (FINAL)
  useEffect(() => {
    if (mode !== "test" && mode !== "exam") return;

    // push fake state
    window.history.pushState(null, "", window.location.pathname);

    const handlePopState = () => {
      setShowExitPopup(true); // show custom modal
      window.history.pushState(null, "", window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [mode]);

  // 🔥 EXIT HANDLERS
  const handleExitConfirm = () => {
    setShowExitPopup(false);
    navigate("/select");
  };

  const handleStay = () => {
    setShowExitPopup(false);
  };

  // ✅ PRACTICE FINISH
  const handleFinishPractice = () => {
    if (attempted === questions.length) {
      navigate("/select");
    } else {
      setShowPopup(true);
    }
  };

  if (!questions.length) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full">

      {/* 🔥 STICKY PROGRESS BAR */}
      <div className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b">

  <div className="w-full px-6 py-3 flex items-start justify-between">

    {/* 🔙 LEFT SIDE */}
    <button
      onClick={() => setShowExitPopup(true)}
      className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 px-2 py-1 rounded-lg hover:bg-gray-100 transition"
    >
      <span className="text-lg">←</span>
      <span className="text-sm font-medium">Back</span>
    </button>

    {/* 📊 RIGHT SIDE */}
    <div className="flex flex-col items-end w-[100px] sm:w-[200px] md:w-[260px]">

  {/* TEXT */}
  <div className="flex items-center gap-2 mb-1">
    <span className="text-xs text-gray-500">Attempted</span>
    <span className="text-sm font-semibold text-indigo-600">
      {attempted}/{questions.length}
    </span>
  </div>

  {/* PROGRESS BAR */}
  <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
    <div
      className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 h-1.5 rounded-full transition-all duration-300"
      style={{
        width: `${(attempted / questions.length) * 100}%`,
      }}
    />
  </div>

</div>

  </div>
</div>

      {/* QUESTIONS */}
      <div className="w-full max-w-3xl mx-auto space-y-4 mt-6 px-4">
        {questions.map((q, i) => (
          <QuestionCard
            key={`${q.question}-${i}`}
            q={q}
            index={i}
            answers={answers}
            selectedOption={selectedOption}
            handleAnswer={handleAnswer}
            mode={mode}
          />
        ))}
      </div>

      {/* SUBMIT */}
      {(mode === "test" || mode === "exam") && (
        <div className="w-full flex justify-center">
          <button
            onClick={submitQuiz}
            className="mt-8 mb-10 bg-indigo-600 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Submit
          </button>
        </div>
      )}

      {/* PRACTICE */}
      {mode === "practice" && (
        <div className="w-full flex justify-center">
          <button
            onClick={handleFinishPractice}
            className="mt-8 mb-10 bg-green-500 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
          >
            Finish Practice
          </button>
        </div>
      )}

      {/* 🔥 PRACTICE WARNING POPUP */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-sm w-full">

            <div className="text-3xl mb-2">⚠️</div>

            <h3 className="font-semibold text-lg mb-2">
              Incomplete Attempt
            </h3>

            <p className="text-gray-600 mb-4">
              You have {questions.length - attempted} unanswered question(s).
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

      {/* 🔥 EXIT TEST POPUP */}
      {showExitPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full text-center animate-scaleIn">

            <div className="text-4xl mb-3">⚠️</div>

            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Leave Test?
            </h3>

            <p className="text-gray-600 mb-6">
              Your progress will not be saved.  
              Are you sure you want to exit?
            </p>

            <div className="flex gap-4">

              <button
                onClick={handleStay}
                className="flex-1 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition"
              >
                Stay
              </button>

              <button
                onClick={handleExitConfirm}
                className="flex-1 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition"
              >
                Leave
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}