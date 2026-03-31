import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage = () => (
  <main className="mx-auto grid max-w-6xl gap-8 px-4 py-20 md:grid-cols-2">
    <motion.div initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}>
      <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
        Learn Faster with <span className="text-indigo-400">CourseHub</span>
      </h1>
      <p className="mb-6 text-slate-300">
        Enroll in modern tech courses, track your progress, chat in real-time, and get AI-powered recommendations.
      </p>
      <div className="flex gap-3">
        <Link to="/courses" className="rounded bg-indigo-600 px-5 py-3 font-medium">
          Explore Courses
        </Link>
        <Link to="/register" className="rounded border border-slate-700 px-5 py-3 font-medium">
          Create Account
        </Link>
      </div>
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="glass rounded-2xl p-6"
    >
      <p className="mb-2 text-indigo-400">Interactive Experience</p>
      <ul className="space-y-2 text-slate-300">
        <li>- Animated UI and transitions</li>
        <li>- Real-time notifications and chat</li>
        <li>- Secure payments and enrollment</li>
        <li>- AI chatbot for instant help</li>
      </ul>
    </motion.div>
  </main>
);

export default LandingPage;
