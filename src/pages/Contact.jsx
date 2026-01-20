import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [emailError, setEmailError] = useState("");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setForm({ ...form, email: value });

    if (!emailRegex.test(value)) {
      setEmailError("Please enter a valid email address");
    } else {
      setEmailError("");
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    };

    if (!payload.name || !payload.message) return;

    if (!emailRegex.test(payload.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/contact`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error();

      setForm({ name: "", email: "", message: "" });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="relative py-32 flex justify-center">

      <div
        id="contact-anchor"
        className="absolute top-[45vh] left-0 w-full h-px"
      />

      {/* =========================
         ✅ SUCCESS MODAL (FULLSCREEN)
      ========================= */}
      <AnimatePresence>
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]
           flex items-center justify-center
           bg-black/60 backdrop-blur-xl
           pointer-events-auto"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-[320px] p-8 rounded-2xl
                         bg-white/5 border border-white/10
                         shadow-2xl text-center"
            >
              <div className="text-5xl mb-4">✅</div>
              <h3 className="text-2xl font-semibold mb-2">Sent!</h3>
              <p className="text-gray-400 text-sm">
                Your message has been delivered successfully.
              </p>

              <button
                onClick={() => setStatus("idle")}
                className="mt-6 px-6 py-2 rounded-full
                           bg-blue-600 hover:bg-blue-500 transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
         📩 CONTACT FORM
      ========================= */}
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        onSubmit={submitHandler}
        className="
          w-full max-w-md p-10 rounded-2xl
          bg-white/5 backdrop-blur-2xl
          border border-white/10
          shadow-2xl
        "
      >
        <h2 className="text-3xl font-bold mb-8">Contact Me</h2>

        {status === "error" && (
          <p className="mb-4 text-red-400">
            ❌ Failed to send message
          </p>
        )}

        <input
          placeholder="Your Name"
          required
          className="w-full p-4 mb-5 rounded-xl
                     bg-black/40 border border-white/10"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          type="email"
          placeholder="Your Email"
          required
          className={`w-full p-4 mb-2 rounded-xl bg-black/40 border
            ${emailError ? "border-red-500" : "border-white/10"}
          `}
          value={form.email}
          onChange={handleEmailChange}
        />

        {emailError && (
          <p className="text-red-400 text-sm mb-4">
            {emailError}
          </p>
        )}

        <textarea
          placeholder="Your Message"
          required
          rows={4}
          className="w-full p-4 mb-6 rounded-xl
                     bg-black/40 border border-white/10"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={status === "loading" || !!emailError}
          className="w-full py-3 rounded-xl
                     bg-blue-600 shadow-lg
                     disabled:opacity-50"
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </motion.button>
      </motion.form>
    </section>
  );
}
