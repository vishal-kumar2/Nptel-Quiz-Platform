import { useState } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

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
const weeks = [1,2,3,4,5,6,7,8,9,10,11];

export default function App() {
  const { user, setUser, loading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("practice");
  const [result, setResult] = useState(null);

  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedWeeks, setSelectedWeeks] = useState([]);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  if (loading) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  // 🚀 START QUIZ
 const startQuiz = () => {
  if (!selectedWeeks.length) return alert("Select weeks");

  const filtered = allQuestions.filter(
    (q) =>
      q.course_id == selectedCourse &&
      selectedWeeks.includes(q.week_id)
  );

  if (!filtered.length) {
    alert("No questions found");
    return;
  }

  // 🔥 SHUFFLE QUESTIONS + OPTIONS
  const shuffledQuestions = shuffle(filtered).map((q) => {
    const shuffledOptions = shuffle(q.options);

    return {
      ...q,
      options: shuffledOptions,
    };
  });

  setQuestions(shuffledQuestions);
  setAnswers([]);
  setSelectedOption([]);

  navigate("/quiz"); // router navigation
};

  // 🎯 HANDLE ANSWER
  const handleAnswer = (opt, index) => {
    let newSelected = [...selectedOption];
    newSelected[index] = opt;
    setSelectedOption(newSelected);

    if (mode === "practice") {
      if (answers[index]) return;

      const correct = questions[index].answer;
      let newAnswers = [...answers];
      newAnswers[index] = opt === correct ? "correct" : "wrong";
      setAnswers(newAnswers);
    }
  };

  // 📊 SUBMIT
  const submitQuiz = async () => {
    let finalAnswers = [];

    if (mode === "test") {
      finalAnswers = questions.map((q, i) =>
        selectedOption[i] === q.answer ? "correct" : "wrong"
      );

      const score = finalAnswers.filter(a => a === "correct").length;

      setResult({
        score,
        total: questions.length
      });

      navigate("/result",{
        state: {
    result: {
      score,
      total: questions.length
    },
    questions,
    selectedOption
  }
});
    }

    if (user) {
      const score = finalAnswers.filter(a => a === "correct").length;

      await saveAttempt({
        user_id: user.id,
        course_id: selectedCourse,
        weeks: selectedWeeks,
        score,
        total: questions.length,
      });
    }
  };

  // 🔒 PROTECT QUIZ ROUTE
  const ProtectedQuiz = () => {
    if (!questions.length) return <Navigate to="/select" />;
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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 to-blue-200">

      <Header user={user} setUser={setUser} />

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

        <Route
          path="/result"
          element={<Result result={result} />}
        />

        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />

      </Routes>

      <Footer />
    </div>
  );
}