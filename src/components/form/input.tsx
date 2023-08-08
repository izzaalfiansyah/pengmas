import { InputHTMLAttributes } from "react";

export default function (props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type="text"
      className="rounded border border-gray-300 h-10 bg-white px-3 w-full outline-none focus:shadow-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition disabled:bg-gray-50"
      {...props}
    />
  );
}
