import FlowHeader from "@/components/ui/FlowHeader";

export default function MainLayout({
  title,
  backHref = "/",
  children,
  className = "",
  contentClassName = "px-4 pb-6",
  headerProps = {},
}) {
  return (
    <main
      className={`mx-auto app-background min-h-dvh w-full max-w-[var(--app-max-width)] pb-[calc(96px+env(safe-area-inset-bottom))] ${className}`.trim()}
    >
      <FlowHeader title={title} backHref={backHref} {...headerProps} />
      <div className={contentClassName}>{children}</div>
    </main>
  );
}
