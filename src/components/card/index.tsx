import { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
}

export default function (props: Props) {
  return (
    <div className="bg-white rounded p-5 shadow mb-5">
      {props.title && (
        <div className="mb-4 text-lg text-gray-800">{props.title}</div>
      )}
      {props.children}
    </div>
  );
}
