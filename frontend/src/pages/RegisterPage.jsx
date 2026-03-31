import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created");
      navigate("/courses");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={submit}
      className="glass mx-auto mt-20 max-w-md space-y-4 rounded-2xl p-6"
    >
      <h2 className="text-2xl font-semibold">Register</h2>
      <input
        className="w-full rounded bg-slate-800 p-3"
        placeholder="Name"
        required
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
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
      <button className="w-full rounded bg-indigo-600 p-3">Create Account</button>
      <p className="text-sm text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="text-indigo-400">
          Login
        </Link>
      </p>
    </motion.form>
  );
};

export default RegisterPage;
