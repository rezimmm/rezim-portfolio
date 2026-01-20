export default function StatCard({ title, value }) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-xl text-center">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold">{value}</p>
    </div>
  );
}
