import { createContext, useContext, useEffect, useState } from "react";

const LoadingContext = createContext<{
  value: boolean;
  show: (promise: () => Promise<any>) => any;
} | null>(null);

export default function LoadingProvider(props: { children: any }) {
  const [val, setVal] = useState(false);
  const [width, setWidth] = useState(0);
  const [opacity, setOpacity] = useState(0);

  const start = async () => {
    setOpacity(1);
    setWidth(25);
  };

  const finish = async () => {
    setWidth(100);
  };

  const value = {
    async show(promise: () => Promise<any>) {
      setVal(true);
      await start();
      await promise();
      await finish();
      setVal(false);
      return promise;
    },
    value: val,
  };

  useEffect(() => {
    if (width == 100) {
      const timeout = setTimeout(() => {
        setOpacity(0);
        setTimeout(() => {
          setWidth(0);
        }, 500);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [width]);

  return (
    <LoadingContext.Provider value={value}>
      <div className="fixed top-0 left-0 right-0 z-[99999]">
        <div
          className="bg-primary h-[3px] shadow shadow-white"
          style={{
            width: width + "%",
            opacity: opacity,
            transition: "all 500ms ease 0s",
          }}
        ></div>
      </div>
      <div className={opacity != 0 ? "pointer-events-none" : ""}>
        {props.children}
      </div>
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
