import CommonButton from "@/components/ui/CommonButton";
import CommonModal from "@/components/modals/CommonModal";

export default function ConfirmDialog({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) {
  return (
    <CommonModal
      open={open}
      title={title}
      onClose={onCancel}
      actions={
        <>
          <CommonButton
            onClick={onCancel}
            className="bg-slate-200 text-slate-800"
          >
            {cancelText}
          </CommonButton>
          <CommonButton onClick={onConfirm}>{confirmText}</CommonButton>
        </>
      }
    >
      <p className="text-sm text-slate-600">{description}</p>
    </CommonModal>
  );
}
