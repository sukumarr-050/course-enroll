import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";
import toast from "react-hot-toast";
import api from "../lib/api";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminDashboardPage = () => {
  const [stats, setStats] = useState({ usersCount: 0, coursesCount: 0, avgProgress: 0 });
  const [users, setUsers] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    price: 0
  });

  const load = async () => {
    const [statsRes, usersRes] = await Promise.all([api.get("/admin/stats"), api.get("/admin/users")]);
    setStats(statsRes.data);
    setUsers(usersRes.data);
  };

  useEffect(() => {
    load().catch(() => toast.error("Admin data load failed"));
  }, []);

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      await api.post("/courses", { ...courseForm, price: Number(courseForm.price) });
      setCourseForm({ title: "", description: "", videoUrl: "", price: 0 });
      toast.success("Course created");
    } catch (_e) {
      toast.error("Course creation failed");
    }
  };

  const deleteUser = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("User deleted");
    } catch (_e) {
      toast.error("Delete failed");
    }
  };

  return (
    <section className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Admin Dashboard</h1>
      <motion.div layout className="mb-6 grid gap-4 md:grid-cols-3">
        <div className="glass rounded-xl p-4">Users: {stats.usersCount}</div>
        <div className="glass rounded-xl p-4">Courses: {stats.coursesCount}</div>
        <div className="glass rounded-xl p-4">Avg Progress: {stats.avgProgress.toFixed(1)}%</div>
      </motion.div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <div className="glass rounded-xl p-4">
          <Bar
            data={{
              labels: ["Users", "Courses"],
              datasets: [{ label: "Counts", data: [stats.usersCount, stats.coursesCount], backgroundColor: ["#6366f1", "#14b8a6"] }]
            }}
          />
        </div>
        <div className="glass rounded-xl p-4">
          <Doughnut
            data={{
              labels: ["Completed", "Remaining"],
              datasets: [{ data: [stats.avgProgress, Math.max(0, 100 - stats.avgProgress)], backgroundColor: ["#22c55e", "#334155"] }]
            }}
          />
        </div>
      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2">
        <form onSubmit={addCourse} className="glass space-y-2 rounded-xl p-4">
          <h2 className="text-lg font-semibold">Add Course</h2>
          <input className="w-full rounded bg-slate-800 p-2" placeholder="Title" value={courseForm.title} onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })} />
          <textarea className="w-full rounded bg-slate-800 p-2" placeholder="Description" value={courseForm.description} onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })} />
          <input className="w-full rounded bg-slate-800 p-2" placeholder="Video URL" value={courseForm.videoUrl} onChange={(e) => setCourseForm({ ...courseForm, videoUrl: e.target.value })} />
          <input className="w-full rounded bg-slate-800 p-2" placeholder="Price" type="number" value={courseForm.price} onChange={(e) => setCourseForm({ ...courseForm, price: e.target.value })} />
          <button className="rounded bg-indigo-600 px-4 py-2">Create</button>
        </form>

        <div className="glass rounded-xl p-4">
          <h2 className="mb-3 text-lg font-semibold">Manage Users</h2>
          <div className="space-y-2">
            {users.map((user) => (
              <div key={user._id} className="flex items-center justify-between rounded bg-slate-800 p-2 text-sm">
                <span>{user.name} ({user.email})</span>
                <button onClick={() => deleteUser(user._id)} className="rounded bg-rose-600 px-2 py-1">
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboardPage;
