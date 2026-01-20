import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProjectList() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  const token =
    localStorage.getItem("token") ||
    sessionStorage.getItem("token");

  /* =========================
     FETCH PROJECTS
  ========================= */
  const fetchProjects = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setProjects(data);
    } catch {
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* =========================
     DELETE PROJECT
  ========================= */
  const deleteProject = async (id) => {
    if (!confirm("Delete this project permanently?")) return;

    await fetch(
      `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setProjects((prev) => prev.filter((p) => p._id !== id));
  };

  /* =========================
     UPDATE PROJECT
  ========================= */
  const saveEdit = async () => {
    const formData = new FormData();

    formData.append("title", editing.title);
    formData.append("description", editing.description);
    formData.append("featured", editing.featured || false);

    if (editing.techStack) {
      formData.append(
        "techStack",
        JSON.stringify(editing.techStack)
      );
    }

    if (editing.newImage) {
      formData.append("image", editing.newImage);
    }

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/projects/${editing._id}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const updated = await res.json();

    setProjects((prev) =>
      prev.map((p) => (p._id === updated._id ? updated : p))
    );

    setEditing(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading projects...
      </div>
    );
  }

  return (
    <section className="min-h-screen px-6 md:px-16 py-32">
      <h1 className="text-4xl md:text-5xl font-bold mb-14">
        Admin · Projects
      </h1>

      {/* PROJECT LIST */}
      <div className="space-y-8">
        {projects.map((project) => (
          <motion.div
            key={project._id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-semibold">
                  {project.title}
                </h2>
                <p className="text-gray-400 mt-2">
                  {project.description}
                </p>

                {project.techStack?.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {project.techStack.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs rounded-full bg-blue-500/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditing(project)}
                  className="px-4 py-2 rounded-full bg-blue-500/20"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteProject(project._id)}
                  className="px-4 py-2 rounded-full bg-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* EDIT MODAL */}
      <AnimatePresence>
        {editing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full max-w-xl bg-black border border-white/10 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold mb-6">
                Edit Project
              </h2>

              <input
                className="input mb-4"
                value={editing.title}
                onChange={(e) =>
                  setEditing({ ...editing, title: e.target.value })
                }
              />

              <textarea
                className="input mb-4"
                rows="4"
                value={editing.description}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    description: e.target.value,
                  })
                }
              />

              {/* Current Image */}
              <img
                src={editing.image}
                alt="Current"
                className="w-full h-40 object-cover rounded-xl mb-4 border border-white/10"
              />

              {/* Change Image */}
              <input
                type="file"
                accept="image/*"
                className="input mb-4"
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    newImage: e.target.files[0],
                    imagePreview: URL.createObjectURL(e.target.files[0]),
                  })
                }
              />

              {/* Preview New Image */}
              {editing.imagePreview && (
                <img
                  src={editing.imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
              )}

              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setEditing(null)}
                  className="px-6 py-2 rounded-full border border-white/20"
                >
                  Cancel
                </button>
                <button
                  onClick={saveEdit}
                  className="px-6 py-2 rounded-full bg-blue-600"
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
