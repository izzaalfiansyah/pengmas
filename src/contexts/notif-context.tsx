import CheckBadgeIcon from "@/components/icons/check-badge-icon";
import WarningIcon from "@/components/icons/warning-icon";
import XIcon from "@/components/icons/x-icon";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const NotifContext = createContext<{
  show: (message: string, success?: boolean) => void;
} | null>(null);

export default function NotifProvider(props: { children: ReactNode }) {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState("");

  const value = {
    show: (message: string, success = true) => {
      if (show == true) {
        setShow(false);
        setTimeout(() => {
          setMessage(message);
          setSuccess(success);
          setShow(true);
        }, 400);
      } else {
        setMessage(message);
        setSuccess(success);
        setShow(true);
      }
    },
  };

  useEffect(() => {
    if (show == true) {
      const timeout = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <NotifContext.Provider value={value}>
      <div
        className={`fixed top-10 right-10 left-10 flex z-[99995] justify-end transition duration-[800ms] ${
          show ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-white rounded shadow-lg border space-x-5 p-3 px-5 flex items-center">
          {success ? (
            <CheckBadgeIcon className="text-green-500 w-6 h-6" />
          ) : (
            <WarningIcon className="text-red-500 w-6 h-6" />
          )}
          <div className="grow text-sm">
            <div className="text-gray-900">Informasi!</div>
            <div>{message}</div>
          </div>
          <button type="button" onClick={() => setShow(false)}>
            <XIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
      {props.children}
    </NotifContext.Provider>
  );
}

export const useNotif = () => useContext(NotifContext);
