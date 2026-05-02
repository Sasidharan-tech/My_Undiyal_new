import Image from "next/image";
import Link from "next/link";

import { useAuth } from "@/context/AuthContext";

export default function ProfileCard({ name, email, onEdit, editHref = "/profile-edit" }) {
  const { user } = useAuth();
  const avatar = user?.avatar || "/categories/images/electronics.png";
  return (
    <section className="rounded-xl bg-white p-3">
      <div className="flex items-center gap-3">
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#f7efe8]">
          <Image
            src={avatar}
            alt="Profile"
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <h1 className="truncate text-base font-semibold text-slate-800">{name}</h1>
          <p className="truncate text-sm text-gray-400">{email}</p>

          <Link
            href={editHref}
            onClick={onEdit}
            className="mt-2 inline-flex min-h-8 items-center rounded-lg bg-[#c97a48] px-3 py-1 text-xs font-semibold text-white"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </section>
  );
}