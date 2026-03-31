import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { io } from "socket.io-client";
import { useAuth } from "../context/AuthContext";

const ChatWidget = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [toUser, setToUser] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) return;
    const s = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000");
    s.emit("join:user", user._id || user.id);
    s.on("chat:receive", (payload) => setChat((prev) => [...prev, payload]));
    s.on("chat:sent", (payload) => setChat((prev) => [...prev, payload]));
    setSocket(s);
    return () => s.disconnect();
  }, [user]);

  const send = () => {
    if (!toUser || !message || !socket || !user) return;
    socket.emit("chat:send", {
      senderId: user._id || user.id,
      receiverId: toUser,
      message
    });
    setMessage("");
  };

  if (!user) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button onClick={() => setOpen((s) => !s)} className="rounded-full bg-indigo-600 p-4 shadow-glow">
        <MessageCircle />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="glass mt-3 w-80 rounded-xl p-3"
          >
            <input
              value={toUser}
              onChange={(e) => setToUser(e.target.value)}
              placeholder="Receiver User ID"
              className="mb-2 w-full rounded bg-slate-800 p-2 text-sm"
            />
            <div className="mb-2 h-40 space-y-1 overflow-auto rounded bg-slate-900 p-2">
              {chat.map((m, idx) => (
                <p key={`${m._id || "msg"}-${idx}`} className="text-sm text-slate-200">
                  {m.message}
                </p>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type message..."
                className="w-full rounded bg-slate-800 p-2 text-sm"
              />
              <button onClick={send} className="rounded bg-indigo-600 px-3">
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
