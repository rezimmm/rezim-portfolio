import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-gray-950 text-white px-10 py-4 flex justify-between">
      <h1 className="font-bold text-xl">Rezim.dev</h1>
      <div className="space-x-6">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/projects" className="hover:text-blue-400">Projects</Link>
        <Link to="/contact" className="hover:text-blue-400">Contact</Link>
      </div>
    </nav>
  );
}
