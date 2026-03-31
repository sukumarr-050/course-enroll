import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import api from "../lib/api";
import CourseCard from "../components/CourseCard";
import NotificationBell from "../components/NotificationBell";

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiReply, setAiReply] = useState("");
  const [recommendations, setRecommendations] = useState([]);

  const enrolledSet = useMemo(
    () => new Set(enrollments.map((e) => e.courseId?._id || e.courseId)),
    [enrollments]
  );

  const load = async () => {
    const [coursesRes, enrollmentsRes] = await Promise.all([
      api.get("/courses"),
      api.get("/enrollments/me")
    ]);
    setCourses(coursesRes.data);
    setEnrollments(enrollmentsRes.data);
  };

  useEffect(() => {
    load().catch(() => toast.error("Failed to load courses"));
  }, []);

  const enroll = async (courseId) => {
    try {
      await api.post("/enrollments", { courseId });
      await load();
      toast.success("Enrolled successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "Enrollment failed");
    }
  };

  const buyCourse = async (courseId) => {
    try {
      const { data } = await api.post("/payments/checkout-session", { courseId });
      window.location.href = data.url;
    } catch (error) {
      toast.error(error.response?.data?.message || "Payment failed");
    }
  };

  const askAi = async () => {
    try {
      const { data } = await api.post("/ai/chatbot", { message: aiPrompt });
      setAiReply(data.reply);
    } catch (_error) {
      toast.error("AI chat unavailable");
    }
  };

  const loadRecommendations = async () => {
    try {
      const { data } = await api.get("/ai/recommendations");
      setRecommendations(data);
    } catch (_error) {
      toast.error("Could not fetch recommendations");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Courses</h1>
        <NotificationBell />
      </div>

      <motion.div layout className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {courses.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
            onEnroll={enroll}
            onBuy={buyCourse}
            enrolled={enrolledSet.has(course._id)}
          />
        ))}
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="glass rounded-xl p-4">
          <h2 className="mb-3 text-xl font-semibold">AI Chat Assistant</h2>
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ask anything about your learning journey..."
            className="mb-3 h-24 w-full rounded bg-slate-800 p-2"
          />
          <button onClick={askAi} className="rounded bg-indigo-600 px-4 py-2">
            Ask AI
          </button>
          {aiReply && <p className="mt-3 text-sm text-slate-300">{aiReply}</p>}
        </div>
        <div className="glass rounded-xl p-4">
          <h2 className="mb-3 text-xl font-semibold">AI Recommendations</h2>
          <button onClick={loadRecommendations} className="rounded bg-indigo-600 px-4 py-2">
            Get Suggestions
          </button>
          <ul className="mt-3 space-y-2">
            {recommendations.map((course) => (
              <li key={course._id} className="rounded bg-slate-800 p-2 text-sm">
                {course.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CoursesPage;
