import { useState } from "react";
import { motion } from "framer-motion";

export default function AdminProjects() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: null,
    preview: null,
    techStack: "",
    githubUrl: "",
    liveUrl: "",
    featured: false,
  });

  const [loading, setLoading] = useState(false);
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("image", form.image);
      formData.append(
        "techStack",
        JSON.stringify(form.techStack.split(",").map((t) => t.trim()))
      );
      formData.append("githubUrl", form.githubUrl);
      formData.append("liveUrl", form.liveUrl);
      formData.append("featured", form.featured);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      alert("✅ Project added successfully");

      setForm({
        title: "",
        description: "",
        image: null,
        techStack: "",
        githubUrl: "",
        liveUrl: "",
        featured: false,
      });
    } catch (err) {
      alert(err.message || "Failed to add project");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen px-6 md:px-16 py-32">
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold mb-12"
      >
        Admin · Add Project
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl space-y-6 bg-white/5
                   backdrop-blur-xl p-8 rounded-2xl
                   border border-white/10"
      >
        {/* Title */}
        <input
          name="title"
          placeholder="Project title"
          value={form.title}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Description */}
        <textarea
          name="description"
          placeholder="Project description"
          rows="4"
          value={form.description}
          onChange={handleChange}
          required
          className="input"
        />

        {/* Image Upload */}
        <input
          type="file"
          accept="image/*"
          required
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              image: e.target.files[0],
              preview: URL.createObjectURL(e.target.files[0]),
            }))
          }
          className="input"
        />

        {/* Image Preview */}
        {form.preview && (
          <img
            src={form.preview}
            alt="Preview"
            className="w-full h-48 object-cover rounded-xl border border-white/10"
          />
        )}

        {/* Tech Stack */}
        <input
          name="techStack"
          placeholder="Tech stack (comma separated)"
          value={form.techStack}
          onChange={handleChange}
          className="input"
        />

        {/* Links */}
        <div className="grid md:grid-cols-2 gap-6">
          <input
            name="githubUrl"
            placeholder="GitHub URL"
            value={form.githubUrl}
            onChange={handleChange}
            className="input"
          />

          <input
            name="liveUrl"
            placeholder="Live project URL"
            value={form.liveUrl}
            onChange={handleChange}
            className="input"
          />
        </div>

        {/* Featured */}
        <label className="flex items-center gap-3 text-sm">
          <input
            type="checkbox"
            name="featured"
            checked={form.featured}
            onChange={handleChange}
          />
          Featured project
        </label>

        {/* Submit */}
        <button
          disabled={loading}
          className="px-8 py-3 rounded-full bg-blue-600
                     hover:bg-blue-500 transition shadow-lg
                     shadow-blue-500/30 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </section>
  );
}
