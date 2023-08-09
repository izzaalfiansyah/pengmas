import AuthProvider from "@/contexts/auth-context";
import LoadingProvider from "@/contexts/loading-context";
import NotifProvider from "@/contexts/notif-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <NotifProvider>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </NotifProvider>
    </LoadingProvider>
  );
}
