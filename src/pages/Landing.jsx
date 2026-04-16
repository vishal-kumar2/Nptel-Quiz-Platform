import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center px-6 py-10 relative">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-20 blur-3xl pointer-events-none"></div>

      {/* HERO */}
      <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-4xl w-full text-center border border-white/30">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          NPTEL Practice Platform 🚀
        </h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-2xl mx-auto">
          Master your NPTEL courses with structured practice, realistic tests,
          and full exam simulation. Designed to help you prepare smarter, not
          harder.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={() => navigate("/select")}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Continue as Guest
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Login & Track Progress
          </button>
        </div>

        {/* FEATURES */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-700">
          <div className="bg-white/60 p-6 rounded-xl shadow hover:scale-105 transition">
            ⚡ <p className="font-semibold mt-2">Instant Practice</p>
            <p className="text-sm mt-1">Solve questions week-wise instantly</p>
          </div>

          <div className="bg-white/60 p-6 rounded-xl shadow hover:scale-105 transition">
            📊 <p className="font-semibold mt-2">Performance Tracking</p>
            <p className="text-sm mt-1">Analyze your progress over time</p>
          </div>

          <div className="bg-white/60 p-6 rounded-xl shadow hover:scale-105 transition">
            🎯 <p className="font-semibold mt-2">Exam Simulation</p>
            <p className="text-sm mt-1">Experience real CBT-style exams</p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="mt-12 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          How It Works
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white/70 p-6 rounded-xl shadow text-center">
            <p className="text-xl font-bold">1️⃣</p>
            <p className="font-semibold mt-2">Select Course</p>
            <p className="text-sm text-gray-600 mt-1">
              Choose your course and weeks
            </p>
          </div>

          <div className="bg-white/70 p-6 rounded-xl shadow text-center">
            <p className="text-xl font-bold">2️⃣</p>
            <p className="font-semibold mt-2">Choose Mode</p>
            <p className="text-sm text-gray-600 mt-1">
              Practice, Test, or Exam mode
            </p>
          </div>

          <div className="bg-white/70 p-6 rounded-xl shadow text-center">
            <p className="text-xl font-bold">3️⃣</p>
            <p className="font-semibold mt-2">Analyze</p>
            <p className="text-sm text-gray-600 mt-1">
              View results & improve performance
            </p>
          </div>
        </div>
      </div>

      {/* MODES SECTION */}
      <div className="mt-12 max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Practice Modes
        </h2>

        <div className="grid sm:grid-cols-3 gap-6">
          {/* PRACTICE */}
          <div className="bg-green-100 p-6 rounded-xl shadow">
            <p className="font-semibold text-green-700">Practice Mode</p>
            <p className="text-sm mt-2 text-gray-700">
              Learn concepts with instant feedback and no pressure.
            </p>
          </div>

          {/* TEST */}
          <div className="bg-red-100 p-6 rounded-xl shadow">
            <p className="font-semibold text-red-700">Test Mode</p>
            <p className="text-sm mt-2 text-gray-700">
              Timed tests with performance evaluation.
            </p>
          </div>

          {/* EXAM */}
          <div className="bg-purple-100 p-6 rounded-xl shadow">
            <p className="font-semibold text-purple-700">Exam Mode</p>
            <p className="text-sm mt-2 text-gray-700">
              75 random questions for real exam simulation.
            </p>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="mt-12 text-center">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">
          Ready to ace your NPTEL exam?
        </h3>

        <button
          onClick={() => navigate("/select")}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-xl hover:scale-105 transition"
        >
          Get Started 🚀
        </button>
      </div>
    </div>
  );
}
