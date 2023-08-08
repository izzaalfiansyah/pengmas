import { SelectHTMLAttributes } from "react";

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{
    value: string;
    label: string;
  }>;
}

export default function (props: Props) {
  const { options, ...others } = props;

  return (
    <select
      className="rounded border border-gray-300 h-10 bg-white px-3 w-full outline-none focus:shadow-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition disabled:bg-gray-50"
      {...others}
    >
      {options.map((item, index) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
}
