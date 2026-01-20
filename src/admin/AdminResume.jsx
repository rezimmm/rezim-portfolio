import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function AdminResume() {
  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    // ✅ Client-side validation
    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Max file size is 5MB");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload/resume`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (res.status === 401) {
        localStorage.clear();
        sessionStorage.clear();
        alert("Session expired. Please login again.");
        window.location.href = "/admin/login";
        return;
      }

      if (!res.ok) throw new Error();

      alert("✅ Resume PDF uploaded successfully");
      setFile(null);
    } catch {
      alert("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-8 py-24 max-w-3xl mx-auto text-white">
      <h2 className="text-3xl font-bold mb-10">Admin → Resume</h2>

      <div className="p-6 rounded-xl bg-white/5 border border-white/10">
        <h3 className="text-xl mb-4">Upload Resume PDF</h3>

        <input
          type="file"
          accept="application/pdf"
          onChange={e => setFile(e.target.files[0])}
          className="mb-4 block"
        />

        <button
          onClick={uploadResume}
          disabled={loading}
          className="px-6 py-3 bg-blue-600 rounded-lg
                     hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </button>
      </div>
    </div>
  );
}
