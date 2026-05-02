export default function ProfileSection({ title, children }) {
  return (
    <section className="mt-4">
      <h2 className="mb-2 text-lg font-medium text-slate-800">{title}</h2>
      <div className="rounded-xl bg-white p-1">{children}</div>
    </section>
  );
}