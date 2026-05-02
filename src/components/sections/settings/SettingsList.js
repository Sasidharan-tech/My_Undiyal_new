"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { BellRing, CircleDashed, Languages } from "lucide-react";

const SETTINGS_OPTIONS = [
  {
    id: "theme",
    label: "Dark / light",
    icon: CircleDashed,
    iconClassName: "text-slate-800",
  },
  {
    id: "rtl",
    label: "Right to Left",
    icon: Languages,
    iconClassName: "text-slate-800",
  },
  {
    id: "notifications",
    label: "Notification",
    icon: BellRing,
    iconClassName: "text-slate-800",
  },
];

function SettingToggleRow({ icon: Icon, label, value, onToggle, iconClassName }) {
  return (
    <li>
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={value}
        className="flex w-full items-center justify-between gap-3 rounded-xl px-2 py-2 text-left transition active:scale-[0.99]"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center">
            <Icon size={19} strokeWidth={2} className={iconClassName} />
          </span>
          <span className="truncate text-[14px] font-medium text-slate-800">{label}</span>
        </span>

        <span
          className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition ${
            value ? "border-[#cc7a4b]" : "border-slate-300"
          }`.trim()}
        >
          <span
            className={`h-2.5 w-2.5 rounded-full transition ${
              value ? "bg-[#cc7a4b]" : "bg-transparent"
            }`.trim()}
          />
        </span>
      </button>
    </li>
  );
}


export default function SettingsList() {
  const { theme, toggleTheme } = useTheme();
  const [settings, setSettings] = useState({
    rtl: false,
    notifications: false,
  });

  function toggleSetting(key) {
    if (key === "theme") {
      toggleTheme();
    } else {
      setSettings((prev) => ({
        ...prev,
        [key]: !prev[key],
      }));
    }
  }

  return (
    <section className="rounded-b-md bg-white px-2 py-3">
      <ul className="space-y-1">
        {SETTINGS_OPTIONS.map((option) => (
          <SettingToggleRow
            key={option.id}
            icon={option.icon}
            label={option.label}
            value={option.id === "theme" ? theme === "dark" : settings[option.id]}
            onToggle={() => toggleSetting(option.id)}
            iconClassName={option.iconClassName}
          />
        ))}
      </ul>
    </section>
  );
}
