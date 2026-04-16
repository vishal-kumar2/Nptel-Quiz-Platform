import { useNavigate } from "react-router-dom";
import { signOut } from "../services/auth";

export default function Header({ user, setUser, resetApp }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    setUser(null);
    navigate("/"); // go to landing
  };

  return (
    <header className="bg-white/70 backdrop-blur shadow px-6 py-4 flex justify-between items-center">
      {/* LOGO */}
      <h1
        onClick={() => {
          resetApp();
          navigate("/");
        }}
        className="font-bold text-indigo-700 text-lg cursor-pointer"
      >
        NPTEL Practice
      </h1>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* DASHBOARD */}
        {user && (
          <button
            onClick={() => navigate("/dashboard")}
            className="text-sm text-indigo-600 hover:underline"
          >
            Dashboard
          </button>
        )}

        {/* LOGIN / USER */}
        {!user ? (
          <button
            onClick={() => navigate("/login")}
            className="bg-indigo-600 text-white px-4 py-1 rounded-lg hover:bg-indigo-700"
          >
            Login
          </button>
        ) : (
          <div className="flex items-center gap-3">
            {/* USER EMAIL */}
            <span className="text-sm text-gray-600">{user.email}</span>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
