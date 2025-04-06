import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://java-react-full-stack-project-d31z.vercel.app/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", response.data);

      alert(response.data.message); // Only works if "message" exists
      localStorage.setItem("username", response.data.username);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err);
      alert(
        "Login failed: " + (err.response?.data?.message || "Unknown error")
      );
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button onClick={handleLogin} type="submit">
          Login
        </button>
        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-blue-500 font-semibold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
