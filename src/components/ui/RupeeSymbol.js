export default function RupeeSymbol({ className = "", size = "0.88em" }) {
  return (
    <span
      className={`rupee-symbol inline-block shrink-0 align-[-0.08em] ${className}`.trim()}
      style={{
        width: "0.62em",
        height: size,
      }}
      aria-hidden="true"
    />
  );
}
