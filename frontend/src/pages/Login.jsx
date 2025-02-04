import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Used for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/home"); // ✅ Redirect to home after successful login
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("Failed to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-6">
      <h1 className="text-green-500 text-center text-4xl md:text-5xl font-bold mb-6">
        Welcome to AgroVision
      </h1>

      <div className="bg-green-100 shadow-lg p-6 md:p-8 rounded-xl w-full max-w-md">
        <h3 className="text-green-500 text-2xl md:text-3xl font-semibold text-center mb-4">
          Login
        </h3>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-full px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition duration-200"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-green-500 hover:text-green-600 font-semibold cursor-pointer"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
