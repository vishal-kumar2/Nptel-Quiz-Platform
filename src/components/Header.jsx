import { useNavigate, useLocation } from "react-router-dom";
import { signOut } from "../services/auth";

export default function Header({ user, setUser, resetApp }) {
  const navigate = useNavigate();
  const location = useLocation();

  const ENABLE_AUTH = false;

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="top-0 bg-white/70 backdrop-blur-xl border-b border-white/30 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3 flex justify-between items-center">

        {/* 🔥 LEFT: LOGO */}
        <div
          onClick={() => {
            resetApp();
            navigate("/");
          }}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
            NP
          </div>

          <span className="font-semibold text-gray-800 group-hover:text-indigo-600 transition">
            NPTEL Practice
          </span>
        </div>

        {/* 🔥 CENTER: NAV LINKS (Now Empty except optional Dashboard) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {ENABLE_AUTH && (
            <button
              onClick={() => navigate("/dashboard")}
              className={`transition ${
                isActive("/dashboard")
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-indigo-600"
              }`}
            >
              Dashboard
            </button>
          )}
        </div>

        {/* 🔥 RIGHT: ACTIONS */}
        <div className="flex items-center gap-4">

          {ENABLE_AUTH ? (
            !user ? (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm shadow hover:scale-105 transition"
              >
                Login
              </button>
            ) : (
              <div className="flex items-center gap-3">

                {/* USER BADGE */}
                <div className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-700">
                  {user.email}
                </div>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600 transition"
                >
                  Logout
                </button>

              </div>
            )
          ) : (
            <button
              disabled
              className="px-4 py-1.5 rounded-lg bg-gray-200 text-gray-500 text-sm cursor-not-allowed"
            >
              Login (Coming Soon)
            </button>
          )}

        </div>
      </div>
    </header>
  );
}