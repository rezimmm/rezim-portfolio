import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AdminInbox() {
  const navigate = useNavigate();

  const admin =
    JSON.parse(localStorage.getItem("admin")) ||
    JSON.parse(sessionStorage.getItem("admin")) ||
    {};

  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const prevCountRef = useRef(0);

  const [messages, setMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [replies, setReplies] = useState({});
  const [sendingId, setSendingId] = useState(null);

  const [toast, setToast] = useState("");
  const [newMsgAlert, setNewMsgAlert] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  /* =========================
     📥 SILENT AUTO-REFRESH INBOX
  ========================= */
  useEffect(() => {
    if (confirmDelete) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [confirmDelete]);

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
      return;
    }

    let stopped = false;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/contact?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (res.status === 401) {
          localStorage.clear();
          sessionStorage.clear();
          navigate("/admin/login");
          return;
        }

        if (!res.ok) return;

        const data = await res.json();

        if (!stopped) {
          if (
            prevCountRef.current > 0 &&
            data.total > prevCountRef.current
          ) {
            setNewMsgAlert(true);
            setTimeout(() => setNewMsgAlert(false), 4000);
          }

          prevCountRef.current = data.total;
          setMessages(data.messages || []);
          setTotal(data.total || 0);
        }
      } catch {
        // silent failure
      }

      if (!stopped) {
        setTimeout(fetchMessages, 15000);
      }
    };

    fetchMessages();
    return () => {
      stopped = true;
    };
  }, [token, page, navigate]);

  /* =========================
     FILTER + SEARCH
  ========================= */
  const filteredMessages = messages.filter((msg) => {
    const q = search.toLowerCase();
    const matchSearch =
      msg.name?.toLowerCase().includes(q) ||
      msg.email?.toLowerCase().includes(q);

    const matchFilter =
      filter === "all" ||
      (filter === "read" && msg.read) ||
      (filter === "unread" && !msg.read);

    return matchSearch && matchFilter;
  });

  /* =========================
     ACTIONS
  ========================= */
  const markRead = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contact/${id}/read`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    setMessages((prev) =>
      prev.map((m) => (m._id === id ? { ...m, read: true } : m))
    );
  };

  const toggleStar = (id) => {
    fetch(`${import.meta.env.VITE_API_URL}/api/contact/${id}/star`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });

    setMessages((prev) =>
      prev.map((m) =>
        m._id === id ? { ...m, important: !m.important } : m
      )
    );
  };

  const deleteMessage = async () => {
    if (!confirmDelete) return;

    setDeleting(true);

    try {
      await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact/${confirmDelete}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessages((prev) =>
        prev.filter((m) => m._id !== confirmDelete)
      );

      setToast("Message deleted successfully");
    } catch {
      setToast("Failed to delete message");
    } finally {
      setDeleting(false);
      setConfirmDelete(null);
      setTimeout(() => setToast(""), 3000);
    }
  };

  const sendReply = async (id) => {
    const message = replies[id]?.trim();
    if (!message) return;

    setSendingId(id);

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/contact/${id}/reply`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      }
    );

    setReplies((prev) => ({ ...prev, [id]: "" }));
    setSendingId(null);

    setToast("Reply sent successfully");
    setTimeout(() => setToast(""), 3000);
  };

  const totalPages = Math.ceil(total / 10);

  /* =========================
     UI
  ========================= */
  // 🔥 Decide border color based on message state
  const getBorderClass = (msg) => {
    if (msg.important) return "border-yellow-400/60"; // ⭐ starred
    if (!msg.read) return "border-blue-400/60";       // 🔵 unread
    return "border-white/10";                         // normal
  };

  return (
    /* ✅ FULL WIDTH SCROLL CONTAINER */
    <div className="min-h-screen">
      {/* ✅ CENTERED CONTENT */}
      <div className="max-w-6xl mx-auto px-8 py-24 text-white">

        {/* 🔔 NEW MESSAGE ALERT */}
        <AnimatePresence>
          {newMsgAlert && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 left-1/2 -translate-x-1/2
              bg-blue-500/20 border border-blue-400
              backdrop-blur-xl px-6 py-3 rounded-full
              shadow-lg text-sm z-50"
            >
              🔔 New message received
            </motion.div>
          )}
        </AnimatePresence>

        {/* ✅ TOAST */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-6 right-6 z-50
              bg-white/10 backdrop-blur-xl
              border border-white/20
              rounded-xl px-6 py-4 shadow-2xl"
            >
              <p className="font-semibold">✅ {toast}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <h2 className="text-4xl font-bold mb-14 text-center">
          📥 Admin Inbox
        </h2>

        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-4 mb-14">
          <input
            placeholder="Search name or email..."
            className="p-4 bg-black border border-white/10 rounded-xl w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="p-4 bg-black border border-white/10 rounded-xl"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>

        {/* MESSAGE LIST */}
        <div className="space-y-12">
          {filteredMessages.map((msg) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.015 }}
              className={`
              relative p-6 rounded-2xl border
              bg-white/5 backdrop-blur-xl
              transition-all duration-300
              ${getBorderClass(msg)}
              ${msg.important ? "shadow-lg shadow-yellow-500/25" : ""}
              ${!msg.read && !msg.important ? "shadow-lg shadow-blue-500/25" : ""}
            `}
              onClick={() => !msg.read && markRead(msg._id)}
            >
              <button
                className="absolute top-4 right-4 text-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleStar(msg._id);
                }}
              >
                {msg.important ? "⭐" : "☆"}
              </button>

              <p className="font-semibold text-lg">{msg.name}</p>
              <p className="text-sm text-gray-400">{msg.email}</p>

              {/* STATUS BADGES */}
              <div className="flex gap-2 mt-2">
                {!msg.read && (
                  <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
                    NEW
                  </span>
                )}
                {msg.important && (
                  <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-400">
                    ⭐ STARRED
                  </span>
                )}
              </div>

              <p className="mt-4 text-gray-200">{msg.message}</p>

              <textarea
                placeholder="Write a reply..."
                value={replies[msg._id] || ""}
                onChange={(e) =>
                  setReplies((prev) => ({ ...prev, [msg._id]: e.target.value }))
                }
                className="w-full mt-6 p-4 rounded-xl bg-black border border-white/10"
              />

              <div className="flex gap-4 mt-4">
                <button
                  disabled={!replies[msg._id]?.trim()}
                  onClick={() => sendReply(msg._id)}
                  className="px-4 py-2 bg-blue-500/20 rounded-full"
                >
                  {sendingId === msg._id ? "Sending..." : "Send Reply"}
                </button>

                <button
                  onClick={() => setConfirmDelete(msg._id)}
                  className="px-4 py-2 bg-red-500/20 rounded-full"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* PAGINATION (ONLY ONCE) */}
        <div className="flex justify-center gap-6 mt-20">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)}>
            ◀ Prev
          </button>
          <span>Page {page}</span>
          <button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
            Next ▶
          </button>
        </div>

        {/* DELETE CONFIRMATION MODAL */}
        <AnimatePresence>
          {confirmDelete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/70 backdrop-blur-sm
        pointer-events-auto
      "
              onClick={() => setConfirmDelete(null)} // click outside closes
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="
          w-full max-w-md rounded-2xl
          bg-[#0b1220]
          border border-red-500/30
          p-8 shadow-2xl
        "
                onClick={(e) => e.stopPropagation()} // prevent close on box click
              >
                <h3 className="text-2xl font-bold text-red-400 mb-4">
                  Delete Message?
                </h3>

                <p className="text-gray-300 mb-8">
                  This action is{" "}
                  <span className="text-red-400 font-semibold">permanent</span>.
                </p>

                <div className="flex justify-end gap-4">
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={deleteMessage}
                    disabled={deleting}
                    className="px-6 py-2 rounded-full bg-red-600 hover:bg-red-500 transition"
                  >
                    {deleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
