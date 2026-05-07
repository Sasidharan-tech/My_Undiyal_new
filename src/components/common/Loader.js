export default function Loader({ label = "Loading..." }) {
  return (
    <p className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-500">
      {label}
    </p>
  );
}
