import Image from "next/image";
import { Camera } from "lucide-react";

export default function ProfileAvatar({ src, onEditClick, inputRef, onFileChange }) {
  return (
    <div className="relative">
      <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[#ead9cb] bg-[#f7efe8] shadow-sm">
        <Image
          src={src}
          alt="Profile avatar"
          width={160}
          height={160}
          className="h-full w-full object-cover"
        />
      </div>

      <button
        type="button"
        onClick={onEditClick}
        className="absolute -bottom-1 -right-1 inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#f2d9c7] bg-white text-[#c97a48] shadow"
        aria-label="Edit profile picture"
      >
        <Camera size={15} strokeWidth={2.4} />
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />
    </div>
  );
}
