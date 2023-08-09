import User from "@/interfaces/user";
import http from "@/libs/http";
import { useRouter } from "next/router";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoading } from "./loading-context";

const AuthContext = createContext<{
  val?: User;
  login: (item: User) => any;
  logout: () => any;
} | null>(null);

export default function AuthProvider(props: { children: ReactNode }) {
  const router = useRouter();

  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  const getProfile = async () => {
    setIsLoading(true);
    try {
      const res = await http().get("/profile");
      if (res.data.data) {
        setUser(res.data.data);
        if (!router.pathname.includes("/admin")) {
          router.replace("/admin");
        }
      } else {
        if (!router.pathname.includes("/login")) {
          router.replace("/login");
        }
      }
    } catch (e) {
      console.log(e);
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  useEffect(() => {
    getProfile();
  }, []);

  const value = {
    val: user,
    login: (item: User) => {
      setUser(item);
    },
    logout: () => {
      setUser(undefined);
    },
  };

  return (
    <AuthContext.Provider value={value}>
      {isLoading && (
        <div className="bg-white fixed top-0 left-0 right-0 bottom-0 z-[99999999999] flex items-center justify-center gap-x-5">
          <div className="rounded-full animate animate-pulse bg-primary h-8 w-8"></div>
          <div className="rounded-full animate animate-pulse bg-primary h-10 w-10"></div>
          <div className="rounded-full animate animate-pulse bg-primary h-8 w-8"></div>
        </div>
      )}
      {!isLoading && props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
