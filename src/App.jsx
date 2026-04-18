import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react"
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import useAuth from "./hooks/useAuth";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Landing from "./pages/Landing";
import Selection from "./pages/Selection";
import Quiz from "./pages/Quiz";
import Login from "./pages/Login";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";

import allQuestions from "./data/question.json";
import shuffle from "./utils/shuffle";
import { saveAttempt } from "./services/attempts";


const courses = [{ id: 1, title: "Conservation Economics" }];
const weeks = [0,1,2,3,4,5,6,7,8,9,10,11,12];

export default function App() {
  const { user, setUser, loading } = useAuth();
  const navigate = useNavigate();

  // 🔥 LOAD FROM LOCAL STORAGE
  const [mode, setMode] = useState(
    localStorage.getItem("mode") || "practice"
  );

  const [selectedCourse, setSelectedCourse] = useState(
    localStorage.getItem("course") || ""
  );

  const [selectedWeeks, setSelectedWeeks] = useState(
    JSON.parse(localStorage.getItem("weeks")) || []
  );

  const [questions, setQuestions] = useState(
    JSON.parse(localStorage.getItem("questions")) || []
  );

  const [answers, setAnswers] = useState(
    JSON.parse(localStorage.getItem("answers")) || []
  );

  const [selectedOption, setSelectedOption] = useState(
    JSON.parse(localStorage.getItem("selectedOption")) || []
  );

  const [result, setResult] = useState(null);

  // 🔥 SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    localStorage.setItem("course", selectedCourse);
  }, [selectedCourse]);

  useEffect(() => {
    localStorage.setItem("weeks", JSON.stringify(selectedWeeks));
  }, [selectedWeeks]);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  useEffect(() => {
    localStorage.setItem("answers", JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem("selectedOption", JSON.stringify(selectedOption));
  }, [selectedOption]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // 🚀 START QUIZ
  const startQuiz = () => {
  localStorage.setItem("startTime", Date.now());

  if (!selectedWeeks.length) return alert("Select weeks");

  let filtered = allQuestions.filter(
    (q) =>
      q.course_id == selectedCourse &&
      selectedWeeks.includes(q.week_id)
  );

  if (mode === "exam") {
    filtered = shuffle(filtered).slice(0, 75);
  }

  // 🔥 ADD THIS BLOCK
  const withShuffledOptions = filtered.map((q) => ({
    ...q,
    options: shuffle(q.options), // ✅ shuffle options ONCE
  }));

  // 👇 use this instead of filtered
  const shuffled = shuffle(withShuffledOptions);

  setQuestions(shuffled);
  setAnswers([]);
  setSelectedOption([]);

  navigate("/quiz");
};

  // 🎯 HANDLE ANSWER
  const handleAnswer = (opt, index) => {
  setSelectedOption((prev) => {
    if (prev[index] === opt) return prev; // ✅ prevent unnecessary update

    const updated = [...prev];
    updated[index] = opt;
    return updated;
  });

  if (mode === "practice") {
    setAnswers((prev) => {
      if (prev[index]) return prev;

      const correct = questions[index].answer;
      const updated = [...prev];
      updated[index] = opt === correct ? "correct" : "wrong";
      return updated;
    });
  }
};

  // 📊 SUBMIT
const submitQuiz = async () => {
  const endTime = Date.now();
  const startTime = localStorage.getItem("startTime");

  const timeTaken = Math.floor((endTime - startTime) / 1000);

  let finalAnswers = [];

  if (mode === "test" || mode === "exam") {
    finalAnswers = questions.map((q, i) => {
      if (!selectedOption[i]) return "unanswered";
      if (selectedOption[i] === q.answer) return "correct";
      return "wrong";
    });

    setAnswers(finalAnswers);
  } else {
    finalAnswers = answers;
  }

  const correct = finalAnswers.filter(a => a === "correct").length;
  const wrong = finalAnswers.filter(a => a === "wrong").length;
  const unanswered = finalAnswers.filter(a => a === "unanswered").length;

  // ✅ PASS EVERYTHING CLEANLY
  navigate("/result", {
    replace: true,
    state: {
      result: {
        score: correct,
        total: questions.length,
        timeTaken,
        correct,
        wrong,
        unanswered,
      },
      questions,
      selectedOption,
    },
  });

  localStorage.removeItem("startTime");

  if (user) {
    await saveAttempt({
      user_id: user.id,
      course_id: selectedCourse,
      weeks: selectedWeeks,
      score: correct,
      total: questions.length,
    });
  }
};

  // 🔒 PROTECTED QUIZ (FIXED)
  const ProtectedQuiz = () => {
    if (!questions.length) {
      const saved = JSON.parse(localStorage.getItem("questions"));
      if (!saved || !saved.length) return <Navigate to="/select" />;
    }

    return (
      <Quiz
        questions={questions}
        answers={answers}
        selectedOption={selectedOption}
        handleAnswer={handleAnswer}
        submitQuiz={submitQuiz}
        mode={mode}
      />
    );
  };

  // 🔥 RESET APP
  const resetApp = () => {
    setQuestions([]);
    setAnswers([]);
    setSelectedOption([]);
    setSelectedWeeks([]);
    setSelectedCourse("");
    setMode("practice");

    localStorage.clear();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-blue-200">
      
      <Analytics />
      <Header user={user} setUser={setUser} resetApp={resetApp} />

      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/select"
          element={
            <Selection
              selectedCourse={selectedCourse}
              setSelectedCourse={setSelectedCourse}
              selectedWeeks={selectedWeeks}
              setSelectedWeeks={setSelectedWeeks}
              startQuiz={startQuiz}
              courses={courses}
              weeks={weeks}
              mode={mode}
              setMode={setMode}
            />
          }
        />

        <Route path="/login" element={<Login setUser={setUser} />} />

        <Route path="/quiz" element={<ProtectedQuiz />} />

        <Route path="/result" element={<Result />} />

        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />
      </Routes>

      <Footer />
    </div>
  );
}