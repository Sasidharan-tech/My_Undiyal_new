export default function FormWrapper({ title, description, children, onSubmit }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      {title ? <h2 className="text-base font-semibold text-slate-900">{title}</h2> : null}
      {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      <form onSubmit={onSubmit} className="mt-4 space-y-4">
        {children}
      </form>
    </section>
  );
}
