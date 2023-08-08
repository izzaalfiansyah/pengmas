import { ReactNode } from "react";

export default function (props: {
  children: ReactNode;
  label?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
}) {
  return (
    <div className="mb-4">
      {props.label && <div className="mb-2 text-sm">{props.label}</div>}
      <div className="flex items-center gap-x-1">
        {props.prefix}
        <div className="grow">{props.children}</div>
        {props.suffix}
      </div>
    </div>
  );
}
