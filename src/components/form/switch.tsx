import { InputHTMLAttributes } from "react";

export default function (props: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="group">
      <input type="checkbox" className="peer hidden" {...props} />
      <div className="flex items-center w-9 rounded-full bg-gray-200 p-0.5 peer-checked:bg-primary peer-checked:justify-end transition">
        <div className="transition rounded-full bg-white h-4 w-4"></div>
      </div>
    </label>
  );
}
