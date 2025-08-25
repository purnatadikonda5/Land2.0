// Beautiful Login & Signup (single-file React component)
// Drop this file as `App.jsx` into a Vite + React + Tailwind project.
// Prerequisites / install:
// npm install framer-motion lucide-react react-icons axios
// Tailwind should be configured in your project (recommended) — this uses Tailwind utility classes.

import React, { useState, useMemo } from "react";
import axios from "axios"; // axios for API calls
import { motion } from "framer-motion";
import { Mail, Lock, User, Phone, Eye, EyeOff, GitHub } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

function Input({ icon: Icon, label, type = "text", name, value, onChange, autoComplete, required }) {
  return (
    <label className="relative block">
      <div className="flex items-center gap-3 px-4 py-2 bg-white/6 rounded-xl backdrop-blur-sm border border-white/10 focus-within:border-white/30 transition">
        {Icon && <Icon className="w-5 h-5 text-white/80" />}
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          autoComplete={autoComplete}
          required={required}
          placeholder={label}
          className="flex-1 bg-transparent outline-none placeholder:text-white/60 text-white p-2"
        />
      </div>
    </label>
  );
}

function PasswordInput({ label, name, value, onChange }) {
  const [show, setShow] = useState(false);
  const strength = useMemo(() => {
    const s = value || "";
    let score = 0;
    if (s.length >= 8) score++;
    if (/[A-Z]/.test(s)) score++;
    if (/[0-9]/.test(s)) score++;
    if (/[^A-Za-z0-9]/.test(s)) score++;
    return Math.min(score, 4);
  }, [value]);

  const strengthLabels = ["Very weak", "Weak", "Okay", "Good", "Strong"];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3 px-4 py-2 bg-white/6 rounded-xl backdrop-blur-sm border border-white/10 transition">
        <Lock className="w-5 h-5 text-white/80" />
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={show ? "text" : "password"}
          placeholder={label}
          className="flex-1 bg-transparent outline-none placeholder:text-white/60 text-white p-2"
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="p-1 rounded-md bg-white/3 hover:bg-white/8 transition"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="w-5 h-5 text-white/90" /> : <Eye className="w-5 h-5 text-white/90" />}
        </button>
      </div>
      <div className="text-sm text-white/70 flex items-center justify-between">
        <div className="flex-1 pr-3">{strengthLabels[strength]}</div>
        <div className="flex gap-1 items-center">
          {[0,1,2,3].map(i => (
            <div key={i} className={`w-8 h-2 rounded ${i < strength ? (strength<=1?"bg-red-400":"bg-green-400") : "bg-white/8"}`} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("login"); // 'login' or 'signup'

  const [signup, setSignup] = useState({ Name: "", Email: "", MobileNumber: "", password: "" });
  const [login, setLogin] = useState({ Email: "", password: "" });

  const handleSignupChange = (e) => setSignup({ ...signup, [e.target.name]: e.target.value });
  const handleLoginChange = (e) => setLogin({ ...login, [e.target.name]: e.target.value });

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/signup', signup);
      console.log("SIGNUP RESPONSE", res.data);
      // if backend returns a token, store it
      if (res.data && res.data.token) {
        localStorage.setItem('authToken', res.data.token);
      }
      alert('Signup successful');
      // switch to login screen after successful signup
      setMode('login');
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || 'Signup failed';
      alert(msg);
    }
  };

  const submitLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', login);
      console.log("LOGIN RESPONSE", res.data);
      if (res.data && res.data.token) {
        localStorage.setItem('authToken', res.data.token);
        alert('Login successful');
        // redirect to dashboard (update path as needed)
        window.location.href = '/dashboard';
      } else {
        alert('Login successful (no token returned)');
      }
    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || err.message || 'Login failed';
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-sky-900 to-purple-800 p-6">
      {/* shiny floating decorative blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          initial={{ opacity: 0.12 }}
          animate={{ rotate: 20 }}
          transition={{ duration: 12, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -left-28 -top-20 w-[420px] h-[420px] bg-gradient-to-tr from-pink-500/40 to-yellow-300/20 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.08 }}
          animate={{ rotate: -30 }}
          transition={{ duration: 14, repeat: Infinity, repeatType: "reverse" }}
          className="absolute -right-36 -bottom-28 w-[540px] h-[540px] bg-gradient-to-tr from-cyan-400/30 to-indigo-500/20 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
      >
        {/* Left promo panel */}
        <div className="hidden md:flex flex-col gap-6 p-8 rounded-3xl bg-white/5 border border-white/8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-2xl font-bold text-white">L</div>
            <div>
              <h3 className="text-white text-xl font-semibold">LandLedger</h3>
              <p className="text-white/70 text-sm mt-1">Securely list, manage and discover land records.</p>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-center gap-4">
            <h2 className="text-4xl font-extrabold text-white leading-tight">Beautiful, secure land listings</h2>
            <p className="text-white/70">Register or log in to manage your lands and owner history. Fast, modern UI with great UX.</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-4 rounded-xl bg-white/6">
                <h4 className="text-lg font-semibold text-white">Add Lands</h4>
                <p className="text-white/70 text-sm mt-1">Add state, city, area and images — manage from dashboard.</p>
              </div>
              <div className="p-4 rounded-xl bg-white/6">
                <h4 className="text-lg font-semibold text-white">Track History</h4>
                <p className="text-white/70 text-sm mt-1">Keep an immutable change history of ownership and transactions.</p>
              </div>
            </div>
          </div>

          <div className="text-white/70 text-sm">Tip: Use strong passwords. This UI is only front-end — connect to your secure backend API.</div>
        </div>

        {/* Right form panel */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-white/6 to-white/4 border border-white/10 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div className="text-white">
              <h3 className="text-2xl font-bold">{mode === "login" ? "Welcome back" : "Create an account"}</h3>
              <p className="text-sm text-white/70 mt-1">{mode === "login" ? "Sign in to continue to your dashboard" : "Join us — it only takes a minute"}</p>
            </div>
            <div className="bg-white/6 px-3 py-2 rounded-xl text-white text-sm">Shiny UI</div>
          </div>

          <div className="mb-4 bg-white/5 p-1 rounded-xl grid grid-cols-2">
            <button
              onClick={() => setMode("login")}
              className={`py-3 rounded-lg text-sm font-medium transition ${mode === "login" ? "bg-white/12 text-white shadow-md" : "text-white/80 hover:bg-white/4"}`}
            >
              Login
            </button>
            <button
              onClick={() => setMode("signup")}
              className={`py-3 rounded-lg text-sm font-medium transition ${mode === "signup" ? "bg-white/12 text-white shadow-md" : "text-white/80 hover:bg-white/4"}`}
            >
              Sign up
            </button>
          </div>

          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            {mode === "signup" ? (
              <form onSubmit={submitSignup} className="space-y-4">
                <Input icon={User} label="Full name" name="Name" value={signup.Name} onChange={handleSignupChange} required />
                <Input icon={Mail} label="Email" type="email" name="Email" value={signup.Email} onChange={handleSignupChange} required />
                <Input icon={Phone} label="Mobile number" name="MobileNumber" value={signup.MobileNumber} onChange={handleSignupChange} required />
                <PasswordInput label="Password" name="password" value={signup.password} onChange={handleSignupChange} />

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 text-slate-900 font-semibold shadow-lg hover:scale-[1.01] transform transition">Create account</button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/8" />
                  <div className="text-xs text-white/70">or continue with</div>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                <div className="flex gap-3">
                  <button type="button" className="flex-1 py-2 rounded-xl bg-white/6 hover:bg-white/8 flex items-center justify-center gap-2">
                    <FcGoogle className="w-4 h-4" /> <span className="text-sm text-white/90">Google</span>
                  </button>
                  <button type="button" className="flex-1 py-2 rounded-xl bg-white/6 hover:bg-white/8 flex items-center justify-center gap-2">
                    <GitHub className="w-4 h-4" /> <span className="text-sm text-white/90">GitHub</span>
                  </button>
                </div>

                <p className="text-xs text-white/60">By continuing you agree to our <span className="underline">Terms</span> and <span className="underline">Privacy</span>.</p>
              </form>
            ) : (
              <form onSubmit={submitLogin} className="space-y-4">
                <Input icon={Mail} label="Email" type="email" name="Email" value={login.Email} onChange={handleLoginChange} required />
                <PasswordInput label="Password" name="password" value={login.password} onChange={handleLoginChange} />

                <div className="flex items-center justify-between text-sm text-white/70">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="accent-white/80" /> <span>Remember me</span>
                  </label>
                  <button type="button" className="underline">Forgot?</button>
                </div>

                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-indigo-500 text-slate-900 font-semibold shadow-lg hover:scale-[1.01] transform transition">Sign in</button>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/8" />
                  <div className="text-xs text-white/70">or sign in with</div>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                <div className="flex gap-3">
                  <button type="button" className="flex-1 py-2 rounded-xl bg-white/6 hover:bg-white/8 flex items-center justify-center gap-2">
                    <FcGoogle className="w-4 h-4" /> <span className="text-sm text-white/90">Google</span>
                  </button>
                  <button type="button" className="flex-1 py-2 rounded-xl bg-white/6 hover:bg-white/8 flex items-center justify-center gap-2">
                    <GitHub className="w-4 h-4" /> <span className="text-sm text-white/90">GitHub</span>
                  </button>
                </div>

                <p className="text-center text-xs text-white/60">Don’t have an account? <button type="button" onClick={() => setMode("signup")} className="underline">Create one</button></p>
              </form>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* small footer */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-sm text-white/40">© {new Date().getFullYear()} LandLedger — made with ❤️</div>
    </div>
  );
}
