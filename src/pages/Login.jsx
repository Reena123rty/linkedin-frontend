import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { setAuth } from "../services/auth";
import "./Login.css";

export default function Login() {
  const nav = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", {
        email: form.email,
        password: form.password
      });

      setAuth(data.token, data.user, form.remember);

      setMsg("✅ Logged in successfully!");
      setTimeout(() => nav("/feed", { replace: true }), 900);
    } catch (err) {
      setMsg(err.response?.data?.message || "❌ Login failed");
    }
  };

  return (
    <div className="login-page">
      <div className="left-logo">
        Linked<span>in</span>
      </div>

      <div className="login-box">
        <h2>Sign in</h2>

        <form onSubmit={onSubmit}>
          <input
            name="email"
            placeholder="Email or phone"
            value={form.email}
            onChange={onChange}
            required
          />

          <div className="password-wrap">
            <input
              name="password"
              type={show ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={onChange}
              required
            />

            <span className="show-btn" onClick={() => setShow(!show)}>
              {show ? "Hide" : "Show"}
            </span>
          </div>

          <label className="remember">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={onChange}
            />
            Keep me logged in
          </label>

          <button className="login-btn" type="submit">
            Sign in
          </button>
        </form>

        {msg && <p className="status">{msg}</p>}

        <p className="small">
          New to LinkedIn? <Link to="/signup">Join now</Link>
        </p>
      </div>
    </div>
  );
}
