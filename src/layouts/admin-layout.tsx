import Card from "@/components/card";
import LogoutIcon from "@/components/icons/logout-icon";
import MenuIcon from "@/components/icons/menu-icon";
import SearchIcon from "@/components/icons/search-icon";
import stackIcon from "@/components/icons/stack-icon";
import userIcon from "@/components/icons/user-icon";
import usersIcon from "@/components/icons/users-icon";
import warningIcon from "@/components/icons/warning-icon";
import { useLoading } from "@/contexts/loading-context";
import { useModal } from "@/contexts/modal-context";
import http from "@/libs/http";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

interface Props {
  title: string;
  children: ReactNode;
}

export default function (props: Props) {
  const [showSidebar, setShowSidebar] = useState(false);

  const menus = [
    {
      path: "/admin",
      title: "Dashboard",
      icon: stackIcon,
    },
    {
      path: "/admin/user",
      title: "Data User",
      icon: usersIcon,
    },
    {
      path: "/admin/bantuan",
      title: "SOS Bantuan",
      icon: warningIcon,
    },
    {
      path: "/admin/akun",
      title: "Akun",
      icon: userIcon,
    },
  ];

  const router = useRouter();
  const modal = useModal();
  const loading = useLoading();

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  const handleLogout = () => {
    modal?.show({
      title: "Logout",
      message: "Anda yakin akan logout? Sesi anda akan terhapus!",
      onOk: async () => {
        await loading?.show(logout);
        localStorage.removeItem("_token");
        router.replace("/login");
      },
    });
  };

  const logout = async () => {
    await http().get("/logout");
    return true;
  };

  return (
    <>
      <Head>
        <title>Pengmas - Admin</title>
      </Head>
      <div className="bg-white min-h-screen">
        <div className="min-h-screen bg-gray-50 bg-opacity-50 text-gray-700 flex">
          <div
            className={`z-40 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-25 transition opacity-0 pointer-events-none ${
              showSidebar && "opacity-100 pointer-events-auto"
            }`}
            onClick={toggleSidebar}
          ></div>
          <div
            className={`w-72 bg-white min-h-screen shadow z-40 px-5 flex flex-col justify-between fixed top-0 left-0 lg:translate-x-0 -translate-x-full transition ${
              showSidebar && "translate-x-0"
            } `}
          >
            <div>
              <div className="py-3">
                <div className="h-16 items-center flex">
                  <div className="text-xl font-semibold">Pengmas</div>
                </div>
              </div>
              <ul className="text-gray-500">
                {menus.map((item) => (
                  <li className="mb-2" key={item.path}>
                    <Link
                      href={item.path}
                      className={`rounded hover:bg-gray-50 transition px-4 p-2 block flex items-center ${
                        item.path == router.pathname
                          ? "!bg-primary !text-white shadow"
                          : ""
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.title}
                    </Link>
                  </li>
                ))}

                <li className="mb-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={`rounded hover:bg-gray-50 transition px-4 p-2 block flex items-center w-full`}
                  >
                    <LogoutIcon className="w-5 h-5 mr-3" />
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="grow lg:pl-72 w-full max-w-screen">
            <div className="px-5 py-3 bg-transparent backdrop-blur sticky top-0 left-0 right-0 z-[10]">
              <div className="bg-white rounded-lg shadow h-16 flex items-center justify-between px-5">
                <div className="flex">
                  <button
                    type="button"
                    className="mr-5 block lg:hidden text-gray-500"
                    onClick={toggleSidebar}
                  >
                    <MenuIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    className="flex items-center text-gray-500"
                  >
                    <SearchIcon className="w-5 h-5 mr-2" />
                    Search
                  </button>
                </div>
                <div className="bg-gray-100 rounded-full h-10 w-10 overflow-hidden"></div>
              </div>
            </div>
            <div className="p-5 text-gray-500">{props.children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
