import { createContext, useContext, useState } from "react";

export const LoadingContext = createContext<{
  value: boolean;
  show: (promise: () => Promise<any>) => any;
} | null>(null);

export default function LoadingProvider(props: { children: any }) {
  const [val, setVal] = useState(false);
  const [width, setWidth] = useState(0);
  const [opacity, setOpacity] = useState(1);

  const start = async () => {
    setOpacity(1);
    setWidth(25);
  };

  const finish = async () => {
    setWidth(100);
    setTimeout(() => {
      setOpacity(0);
      setTimeout(() => {
        setWidth(0);
      }, 500);
    }, 500);
  };

  const value = {
    async show(promise: () => Promise<any>) {
      setVal(true);
      await start();
      await promise();
      await finish();
      setVal(false);
    },
    value: val,
  };

  return (
    <LoadingContext.Provider value={value}>
      <div className="fixed top-0 left-0 right-0 z-40">
        <div
          className="bg-purple-600 h-[2.3px]"
          style={{
            width: width + "%",
            opacity: opacity,
            transition: "all 500ms ease 0s",
          }}
        ></div>
      </div>
      {props.children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}