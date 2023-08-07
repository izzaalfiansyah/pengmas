import http from "@/libs/http";
import { useRequest } from "alova";
import { useState } from "react";

export default function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading } = useRequest(http().Get("/sanctum/csrf-cookie"));

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-white flex text-gray-700">
      <div className="grow flex-1 lg:flex justify-center items-end hidden border-r bg-gray-50">
        <img
          src="https://demos.pixinvent.com/vuexy-vuejs-admin-template/demo-2/assets/auth-v2-login-illustration-bordered-light-47ee3625.png"
          alt="Login SVG"
          className="max-h-screen p-10"
        />
      </div>
      <div className="lg:w-[450px] w-full flex min-h-screen items-center p-10">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="text-lg font-semibold">Selamat Datang! 👋🏻</div>
          <p className="text-sm">
            Masuk ke akun anda untuk memulai sesi aplikasi
          </p>
          <div className="pt-10"></div>
          <div className="mb-5">
            <div className="mb-2 text-sm">Email</div>
            <input
              type="text"
              className="rounded border border-gray-300 h-10 bg-white px-3 w-full outline-none focus:shadow-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition"
              placeholder="Masukkan Email"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
          <div className="mb-5">
            <div className="mb-2 text-sm">Password</div>
            <input
              type="password"
              className="rounded border border-gray-300 h-10 bg-white px-3 w-full outline-none focus:shadow-sm focus:ring-2 focus:ring-purple-200 focus:border-purple-400 transition"
              placeholder="********"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
          </div>
          <div className="flex-inline">
            <input
              type="checkbox"
              id="remember"
              className="rounded text-primary mr-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-200"
            />
            <label htmlFor="remember" className="text-sm">
              Ingat Saya
            </label>
          </div>
          <div className="pt-10"></div>
          <button
            type="submit"
            className="bg-primary text-white w-full text-center shadow-sm rounded h-10"
          >
            Masuk
          </button>
        </form>
      </div>
    </div>
  );
}
