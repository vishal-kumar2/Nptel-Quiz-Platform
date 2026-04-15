import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-1 items-center justify-center px-6">

      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-blue-500 opacity-20 blur-2xl"></div>

      <div className="relative bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 max-w-2xl w-full text-center border border-white/30">

        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          NPTEL Practice Platform
        </h1>

        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
          Practice all your weekly questions in one place.  
          Select weeks, test your knowledge, and track your progress instantly.  
          Built for speed, clarity, and exam success 🚀
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">

          <button
            onClick={() => navigate("/select")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-green-400 to-emerald-500 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Continue as Guest
          </button>

          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Login & Track Progress
          </button>

        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
          <div className="bg-white/60 p-4 rounded-xl shadow">⚡ Instant Practice</div>
          <div className="bg-white/60 p-4 rounded-xl shadow">📊 Performance Tracking</div>
          <div className="bg-white/60 p-4 rounded-xl shadow">🎯 Exam Ready</div>
        </div>

      </div>
    </div>
  );
}