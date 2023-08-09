import AuthProvider from "@/contexts/auth-context";
import LoadingProvider from "@/contexts/loading-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </LoadingProvider>
  );
}
