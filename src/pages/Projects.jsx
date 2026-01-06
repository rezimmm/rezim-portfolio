import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then(res => res.json())
      .then(data => setProjects(data));
  }, []);

  return (
    <section className="min-h-screen bg-gray-900 text-white p-10">
      <h2 className="text-4xl font-bold mb-8">Projects</h2>

      {projects.length === 0 && (
        <p className="text-gray-400">No projects added yet.</p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {projects.map(project => (
          <div
            key={project._id}
            className="bg-gray-800 p-5 rounded-xl hover:scale-105 transition"
          >
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="text-gray-400 mt-2">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
