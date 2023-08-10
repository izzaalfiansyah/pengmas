import Card from "@/components/card";
import { ReactNode, createContext, useContext, useState } from "react";

interface Props {
  onOk: () => any;
  message: string;
  title?: string;
}

interface ContextProps {
  show: (props: Props) => any;
}

const ModalContext = createContext<ContextProps | null>(null);

export default function ModalProvider(props: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState<string>();
  const [onOk, setOnOk] = useState<Function>();

  const handleOk = () => {
    if (onOk) {
      onOk();
    }
    setShow(false);
  };

  const value: ContextProps = {
    show: (props) => {
      setTitle(props.title);
      setMessage(props.message);
      setOnOk(() => props.onOk);
      setShow(true);
    },
  };

  return (
    <ModalContext.Provider value={value}>
      {show && (
        <div className="fixed top-0 left-0 right-0 bottom-0 z-[100] overflow-y-auto flex items-center justify-center p-5">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25"></div>
          <div className="w-full lg:w-[500px] relative">
            <Card title={title}>
              <p>{message}</p>
              <div className="mt-5 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={handleOk}
                  className="bg-primary text-white rounded px-5 p-1.5"
                >
                  OK
                </button>
                <button
                  type="button"
                  onClick={() => setShow(false)}
                  className="border rounded px-5 p-1.5"
                >
                  Batal
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
      {props.children}
    </ModalContext.Provider>
  );
}

export const useModal = () => useContext(ModalContext);
