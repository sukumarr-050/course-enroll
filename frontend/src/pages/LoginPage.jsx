import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      toast.success("Welcome back");
      navigate("/courses");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={submit}
      className="glass mx-auto mt-20 max-w-md space-y-4 rounded-2xl p-6"
    >
      <h2 className="text-2xl font-semibold">Login</h2>
      <input
        className="w-full rounded bg-slate-800 p-3"
        placeholder="Email"
        type="email"
        required
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        className="w-full rounded bg-slate-800 p-3"
        placeholder="Password"
        type="password"
        required
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button className="w-full rounded bg-indigo-600 p-3">Login</button>
      <p className="text-sm text-slate-400">
        No account?{" "}
        <Link to="/register" className="text-indigo-400">
          Register
        </Link>
      </p>
    </motion.form>
  );
};

export default LoginPage;
