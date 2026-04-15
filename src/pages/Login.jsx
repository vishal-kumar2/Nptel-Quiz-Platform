import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn, signUp } from "../services/auth";

export default function Login({ setUser }) {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const { data } = isLogin
      ? await signIn(email, password)
      : await signUp(email, password);

    setUser(data.user);
    navigate("/select"); // ✅ FIX
  };

  return (
    <div className="flex items-center justify-center flex-1 px-4">
      <div className="bg-white p-6 rounded-xl shadow w-full max-w-md">

        <h2 className="text-2xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Create Account"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-3 border rounded-lg"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded-lg"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>

        <p className="text-sm text-center mt-4">
          <span onClick={() => setIsLogin(!isLogin)} className="cursor-pointer text-indigo-600">
            Switch Mode
          </span>
        </p>

        <button
          onClick={() => navigate("/select")}
          className="mt-4 text-sm text-gray-500 w-full"
        >
          Continue as Guest
        </button>

      </div>
    </div>
  );
}