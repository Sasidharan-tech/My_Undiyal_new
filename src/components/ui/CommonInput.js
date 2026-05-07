import { memo } from "react";

function CommonInput({
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
  ...rest
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`h-11 w-full rounded-lg border border-transparent bg-[#ECECEC] px-3 text-sm text-[#373737] placeholder:text-[#B5B5B5] focus:border-[#C1683A] focus:bg-white focus:outline-none ${className}`.trim()}
      {...rest}
    />
  );
}

export default memo(CommonInput);
