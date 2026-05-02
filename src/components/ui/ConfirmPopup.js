export default function ConfirmPopup({
  open,
  title,
  body,
  onConfirm,
  onCancel,
  confirmText = "Yes",
  cancelText = "No",
  titleClassName = "",
  panelClassName = "",
  bodyClassName = "",
  overlayClassName = "",
  actionsClassName = "",
  confirmButtonClassName = "",
  cancelButtonClassName = "",
}) {
  if (!open) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 ${overlayClassName}`.trim()}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className={`w-75.75 rounded-[26px] bg-white px-4 pb-3 pt-3 shadow-xl popup-scale-in ${panelClassName}`.trim()}
      >
        <h2
          className={`mx-auto w-59 text-center text-[17.3333px] font-semibold leading-6.5 text-black ${titleClassName}`.trim()}
        >
          {title}
        </h2>

        {body ? <div className={`${bodyClassName}`.trim()}>{body}</div> : null}

        <div className={`mt-4.75 flex items-center justify-between ${actionsClassName}`.trim()}>
          <button
            type="button"
            onClick={onCancel}
            className={`inline-flex h-8.75 w-30.25 items-center justify-center rounded-lg bg-[rgba(212,212,212,0.5)] text-base font-medium leading-6 text-white ${cancelButtonClassName}`.trim()}
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className={`inline-flex h-8.75 w-30.25 items-center justify-center rounded-lg bg-[#FF1919] text-base font-medium leading-6 text-white ${confirmButtonClassName}`.trim()}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
