import { TextareaHTMLAttributes } from "react";

export default function (props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className="rounded border border-gray-300 min-h-10 bg-white px-3 w-full outline-none focus:shadow-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition disabled:bg-gray-50 resize-none"
      {...props}
    ></textarea>
  );
}
