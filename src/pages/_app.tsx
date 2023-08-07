import LoadingProvider from "@/contexts/loading-context";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LoadingProvider>
      <div className="font-[Inter]">
        <Component {...pageProps} />
      </div>
    </LoadingProvider>
  );
}
