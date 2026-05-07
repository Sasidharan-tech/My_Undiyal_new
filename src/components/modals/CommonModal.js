import { AnimatePresence, motion } from "framer-motion";

export default function CommonModal({
  open,
  title,
  children,
  onClose,
  actions,
}) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-90 flex items-center justify-center bg-black/60 px-4"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="w-full max-w-md rounded-2xl bg-white p-5 shadow-xl"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
              <button
                type="button"
                onClick={onClose}
                className="rounded-md p-1 text-sm text-slate-500"
                aria-label="Close dialog"
              >
                Close
              </button>
            </div>

            <div className="mt-4">{children}</div>

            {actions ? <div className="mt-5 flex items-center justify-end gap-2">{actions}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
