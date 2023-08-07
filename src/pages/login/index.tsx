import http from "@/libs/http";
import { useLoading } from "@/contexts/loading-context";
import { useState } from "react";
import { useRouter } from "next/router";
import loginSVG from "@/images/login.svg";
import Image from "next/image";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>({});

  const loading = useLoading();
  const router = useRouter();

  const login = async () => {
    try {
      const res = await http().post("/login", { email, password });
      localStorage.setItem("_token", res.data.data);
      router.replace("/admin");
    } catch (err: any) {
      setError(err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    loading?.show(login);
  };

  return (
    <div className="min-h-screen bg-white flex text-gray-700">
      <div className="grow flex-1 lg:flex justify-center items-center hidden border-r bg-gray-50 bg-opacity-50">
        <Image
          src={loginSVG}
          alt="Login SVG"
          width={1200}
          height={1200}
          className="max-h-screen max-w-screen p-10 px-20"
        />
      </div>
      <div className="lg:w-[470px] w-full flex min-h-screen items-center p-10">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="text-lg font-semibold">Selamat Datang! 👋🏻</div>
          <p className="text-sm">
            Masuk ke akun anda untuk memulai sesi aplikasi
          </p>
          <div className="pt-10"></div>
          <div className="mb-5">
            <div className="mb-2 mt-1 text-sm">Email</div>
            <input
              type="text"
              className="rounded border border-gray-300 h-10 bg-white px-3 w-full outline-none focus:shadow-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition disabled:bg-gray-50"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              disabled={loading?.value}
            />
            <div className="text-xs text-red-500">{error.email}</div>
          </div>
          <div className="mb-5">
            <div className="mb-2 mt-1 text-sm">Password</div>
            <input
              type="password"
              className="rounded border border-gray-300 h-10 bg-white px-3 w-full outline-none focus:shadow-sm focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition disabled:bg-gray-50"
              placeholder="********"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              disabled={loading?.value}
            />
            <div className="text-xs text-red-500">{error.password}</div>
          </div>
          <div className="flex-inline">
            <input
              type="checkbox"
              id="remember"
              className="rounded text-primary mr-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
            <label htmlFor="remember" className="text-sm">
              Ingat Saya
            </label>
          </div>
          <div className="pt-10"></div>
          <button
            type="submit"
            className="bg-primary text-white w-full text-center shadow-sm rounded h-10 outline-none disabled:bg-opacity-75 transition"
            disabled={loading?.value}
          >
            {loading?.value ? "Memuat..." : "Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
