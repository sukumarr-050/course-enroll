import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";

const NotificationBell = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!user) return;
    let socket;
    const load = async () => {
      const { data } = await api.get("/notifications/me");
      setItems(data);
    };
    load();

    socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");
    socket.emit("join:user", user._id || user.id);
    socket.on("notification:new", (message) => {
      setItems((prev) => [message, ...prev]);
    });

    return () => socket?.disconnect();
  }, [user]);

  const unreadCount = items.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button className="rounded p-2 hover:bg-slate-800" onClick={() => setOpen((s) => !s)}>
        <Bell size={18} />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 rounded-full bg-rose-500 px-1.5 text-xs">{unreadCount}</span>
        )}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="glass absolute right-0 mt-2 w-80 rounded-xl p-3"
          >
            <h4 className="mb-2 font-semibold">Notifications</h4>
            <div className="max-h-64 space-y-2 overflow-auto">
              {items.map((n) => (
                <div key={n._id} className={`rounded p-2 text-sm ${n.read ? "bg-slate-800" : "bg-indigo-600/20"}`}>
                  {n.message}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationBell;
