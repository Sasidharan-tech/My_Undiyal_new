import Image from "next/image";
import ConfirmPopup from "@/components/ui/ConfirmPopup";

export default function DeletePopup({
  open,
  onConfirm,
  onCancel,
  title,
  showImage = false,
  imageSrc,
  imageAlt = "",
  primaryText = "",
  secondaryText = "",
  addressTag = "",
  addressLine = "",
  city = "",
}) {
  const resolvedTitle =
    title ||
    (showImage
      ? "Are you sure you want to delete this product?"
      : "Are you sure you want to delete this address?");

  const body = showImage ? (
    <div className="mx-auto mt-2.5 flex w-44.75 items-center gap-2">
      <div className="relative h-8.5 w-[52.42px] shrink-0">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="52px"
            className="object-contain"
          />
        ) : null}
      </div>

      <div className="min-w-0">
        <p className="truncate text-[10px] font-medium leading-3.75 text-black">
          {primaryText}
        </p>
        <p className="truncate text-[8px] font-normal leading-3 text-[#929292]">
          {secondaryText}
        </p>
      </div>
    </div>
  ) : (
    <div className="mx-auto mt-2 text-center">
      <p className="mx-auto max-w-66 text-sm leading-5 text-[#9A9A9A]">
        <span className="font-semibold text-[#1A1A1A]">{addressTag}</span>{" "}
        <span className="font-normal">
          {addressLine}
          {city ? ` ${city}` : ""}
        </span>
      </p>
    </div>
  );

  const addressMode = !showImage;

  return (
    <ConfirmPopup
      open={open}
      title={resolvedTitle}
      onCancel={onCancel}
      onConfirm={onConfirm}
      body={body}
      cancelText={addressMode ? "No" : "No"}
      confirmText={addressMode ? "Yes" : "Yes"}
      overlayClassName={addressMode ? "bg-[rgba(0,0,0,0.6)]" : ""}
      panelClassName={
        addressMode
          ? "w-full max-w-80 rounded-2xl px-6 pb-4 pt-5 shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
          : ""
      }
      titleClassName={
        addressMode
          ? "w-full max-w-64 text-[18px] leading-[1.15] font-bold text-[#1A1A1A] [font-size:clamp(18px,4.4vw,22px)]"
          : ""
      }
      actionsClassName={addressMode ? "mt-4 gap-2" : ""}
      cancelButtonClassName={
        addressMode
          ? "h-10.5 w-full flex-1 rounded-xl !bg-[#D6D6D6] text-[17px] font-semibold !text-white"
          : "!bg-[#D6D6D6] !text-white "
      }
      confirmButtonClassName={
        addressMode
          ? "h-10.5 w-full flex-1 rounded-xl bg-[#E53935] text-[17px] font-semibold text-white"
          : ""
      }
    />
  );
}
