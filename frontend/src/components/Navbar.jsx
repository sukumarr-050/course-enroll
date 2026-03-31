import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-indigo-400">
          CourseHub
        </Link>
        <div className="flex items-center gap-2">
          <NavLink to="/courses" className="rounded px-3 py-2 text-sm hover:bg-slate-800">
            Courses
          </NavLink>
          {user?.role === "admin" && (
            <NavLink to="/admin" className="rounded px-3 py-2 text-sm hover:bg-slate-800">
              Admin
            </NavLink>
          )}
          {user ? (
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="rounded bg-indigo-600 px-3 py-2 text-sm"
            >
              Logout
            </motion.button>
          ) : (
            <Link to="/login" className="rounded bg-indigo-600 px-3 py-2 text-sm">
              Login
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
