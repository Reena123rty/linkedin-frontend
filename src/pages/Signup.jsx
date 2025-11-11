import React, { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const nav = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", form); // ✅ Correct route
      setMsg("Account created ✅ Redirecting...");
      setTimeout(() => nav("/login"), 1000); // ✅ Go to login page
    } catch (err) {
      setMsg(err.response?.data?.message || "Error signup");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Create Account</h2>

        <form onSubmit={onSubmit}>
          <input 
            name="name" 
            placeholder="Full Name" 
            onChange={onChange} 
            required
          />
          <input 
            name="email" 
            type="email"
            placeholder="Email"
            onChange={onChange} 
            required
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password"
            onChange={onChange} 
            required
          />

          <button type="submit">Sign Up</button>
        </form>

        {msg && <p style={{ marginTop: "10px", fontWeight: "bold" }}>{msg}</p>}

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
