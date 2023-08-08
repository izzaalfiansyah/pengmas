import { useEffect } from "react";

interface Props {
  current: number;
  total: number;
  onChange?: (val: number) => any;
}

export default function (props: Props) {
  const handleChange = async (val: number) => {
    if (props.onChange) {
      props.onChange(val);
    }
  };

  useEffect(() => {
    if (props.current > props.total) {
      handleChange(1);
    }
  }, [props.current, props.total]);

  return (
    <div className="flex gap-x-2">
      <button
        className="bg-gray-200 disabled:bg-gray-50 rounded h-[35px] w-[40px] flex items-center justify-center transition hover:bg-gray-300"
        onClick={(e) => {
          handleChange(1);
        }}
      >
        &laquo;
      </button>
      <button
        className="bg-gray-200 disabled:bg-gray-50 rounded h-[35px] w-[40px] flex items-center justify-center transition hover:bg-gray-300"
        onClick={(e) => {
          handleChange(props.current - 1);
        }}
        disabled={props.current <= 1}
      >
        &lsaquo;
      </button>

      <button
        className="bg-primary text-white rounded h-[35px] w-[40px] flex items-center justify-center"
        disabled
      >
        {props.current}
      </button>

      <button
        className="bg-gray-200 disabled:bg-gray-50 rounded h-[35px] w-[40px] flex items-center justify-center transition hover:bg-gray-300"
        onClick={(e) => {
          handleChange(props.current + 1);
        }}
        disabled={props.current >= props.total}
      >
        &rsaquo;
      </button>
      <button
        className="bg-gray-200 disabled:bg-gray-50 rounded h-[35px] w-[40px] flex items-center justify-center transition hover:bg-gray-300"
        onClick={(e) => {
          handleChange(props.total);
        }}
      >
        &raquo;
      </button>
    </div>
  );
}
