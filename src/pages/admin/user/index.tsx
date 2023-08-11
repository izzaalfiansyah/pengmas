import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Input from "@/components/form/input";
import Select from "@/components/form/select";
import Switch from "@/components/form/switch";
import ArrowTrendDown from "@/components/icons/arrow-trend-down";
import BellIcon from "@/components/icons/bell-icon";
import BuoyIcon from "@/components/icons/buoy-icon";
import CheckBadgeIcon from "@/components/icons/check-badge-icon";
import DesktopIcon from "@/components/icons/desktop-icon";
import SearchIcon from "@/components/icons/search-icon";
import UsersIcon from "@/components/icons/users-icon";
import WarningIcon from "@/components/icons/warning-icon";
import Pagination from "@/components/pagination";
import Table from "@/components/table";
import { useLoading } from "@/contexts/loading-context";
import { useNotif } from "@/contexts/notif-context";
import Meta from "@/interfaces/meta";
import User from "@/interfaces/user";
import AdminLayout from "@/layouts/admin-layout";
import http from "@/libs/http";
import { useEffect, useState } from "react";

// export default function () {
//   const loading = useLoading();
//   const notif = useNotif();

//   const [items, setItems] = useState<User[]>([]);
//   const [metaItems, setMetaItems] = useState<Meta>();
//   const [total, setTotal] = useState({
//     total: 0,
//     terverifikasi: 0,
//     ditolak: 0,
//     pending: 0,
//   });
//   const [q, setQ] = useState<string>("");
//   const [role, setRole] = useState("");
//   const [status, setStatus] = useState("");
//   const [page, setPage] = useState(1);

//   const getTotal = async () => {
//     const res = await http().get("/total/user");
//     setTotal(res.data.data as typeof total);
//   };

//   const getUser = async () => {
//     try {
//       const res = await http().get("/user", {
//         params: {
//           q,
//           role,
//           status,
//           page,
//         },
//       });
//       setItems(res.data.data);
//       setMetaItems(res.data.meta);
//     } catch (e: any) {}
//   };

//   const verifyUser = (item: User, status: string) => {
//     loading?.show(async () => {
//       item.status = status as any;
//       const res = await http().put("/user/" + item.id, item);
//       getTotal();
//       loading.show(getUser);
//       notif?.show("status pengguna berhasil diubah");
//     });
//   };

//   useEffect(() => {
//     getTotal();
//   }, []);

//   useEffect(() => {
//     loading?.show(getUser);
//   }, [role, status, page]);

//   return (
//     <AdminLayout title="Data User">
//       <div className="grid lg:grid-cols-4 grid-cols-1 gap-x-5">
//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-2xl">{total.total}</div>
//               <div className="text-sm">Total User</div>
//             </div>
//             <div className="rounded-full bg-blue-500 h-16 w-16 flex items-center justify-center bg-opacity-25">
//               <UsersIcon className="w-8 h-8 text-blue-500" />
//             </div>
//           </div>
//         </Card>
//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-2xl">{total.terverifikasi}</div>
//               <div className="text-sm">User Terverifikasi</div>
//             </div>
//             <div className="rounded-full bg-green-500 h-16 w-16 flex items-center justify-center bg-opacity-25">
//               <CheckBadgeIcon className="w-8 h-8 text-green-500" />
//             </div>
//           </div>
//         </Card>
//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-2xl">{total.ditolak}</div>
//               <div className="text-sm">User Ditolak</div>
//             </div>
//             <div className="rounded-full bg-red-500 h-16 w-16 flex items-center justify-center bg-opacity-25">
//               <WarningIcon className="w-8 h-8 text-red-500" />
//             </div>
//           </div>
//         </Card>
//         <Card>
//           <div className="flex items-center justify-between">
//             <div>
//               <div className="text-2xl">{total.pending}</div>
//               <div className="text-sm">User Pending</div>
//             </div>
//             <div className="rounded-full bg-primary h-16 w-16 flex items-center justify-center bg-opacity-25">
//               <BellIcon className="w-8 h-8 text-primary" />
//             </div>
//           </div>
//         </Card>
//       </div>
//       <Card title="Data User">
//         <div className="flex lg:flex-row flex-col items-center gap-x-3">
//           <div className="lg:w-1/4 w-full">
//             <FormGroup>
//               <Select
//                 options={[
//                   {
//                     value: "",
//                     label: "Semua Pengguna",
//                   },
//                   {
//                     value: "1",
//                     label: "Admin",
//                   },
//                   {
//                     value: "2",
//                     label: "Petugas",
//                   },
//                   {
//                     value: "3",
//                     label: "Korban",
//                   },
//                 ]}
//                 value={role}
//                 onChange={(e) => setRole(e.currentTarget.value)}
//               />
//             </FormGroup>
//           </div>
//           <div className="lg:w-1/4 w-full">
//             <FormGroup>
//               <Select
//                 options={[
//                   {
//                     value: "",
//                     label: "Semua User",
//                   },
//                   {
//                     value: "0",
//                     label: "Pending",
//                   },
//                   {
//                     value: "1",
//                     label: "Terverifikasi",
//                   },
//                   {
//                     value: "2",
//                     label: "Ditolak",
//                   },
//                 ]}
//                 value={status}
//                 onChange={(e) => setStatus(e.currentTarget.value)}
//               />
//             </FormGroup>
//           </div>
//           <form
//             onSubmit={(e) => {
//               e.preventDefault();
//               loading?.show(getUser);
//             }}
//             className="lg:w-1/2 w-full"
//           >
//             <FormGroup
//               suffix={
//                 <button
//                   type="submit"
//                   className="bg-primary h-10 px-3 rounded text-white"
//                 >
//                   <SearchIcon className="w-5 h-5" />
//                 </button>
//               }
//             >
//               <Input
//                 value={q}
//                 onChange={(e) => setQ(e.currentTarget.value)}
//                 placeholder="Ketikkan Nama..."
//               />
//             </FormGroup>
//           </form>
//         </div>

//         <div className="-mx-5 mt-5 overflow-x-auto">
//           <Table
//             headers={[
//               "Nama Pengguna",
//               "Role",
//               "Alamat",
//               "Telepon",
//               "Status",
//               "Verifikasi",
//             ]}
//             items={items.map((item) => [
//               <div>
//                 <div>{item.nama}</div>
//                 <div className="text-xs">{item.email}</div>
//               </div>,
//               <div className="flex items-center">
//                 {
//                   {
//                     "1": (
//                       <div className="w-7 h-7 rounded-full flex items-center justify-center bg-blue-100 mr-3">
//                         <DesktopIcon className="w-4 h-4 text-blue-500" />
//                       </div>
//                     ),
//                     "2": (
//                       <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-100 mr-3">
//                         <BuoyIcon className="w-4 h-4 text-green-500" />
//                       </div>
//                     ),
//                     "3": (
//                       <div className="w-7 h-7 rounded-full flex items-center justify-center bg-red-100 mr-3">
//                         <ArrowTrendDown className="w-4 h-4 text-red-500" />
//                       </div>
//                     ),
//                   }[item.role as string]
//                 }
//                 {item.role_detail}
//               </div>,
//               item.alamat,
//               item.telepon,
//               <span
//                 className={`${
//                   [
//                     "bg-orange-100 text-orange-500",
//                     "bg-green-200 text-green-500",
//                     "bg-red-200 text-red-500",
//                   ][parseInt(item.status as string)]
//                 } text-xs px-2 p-1 rounded`}
//               >
//                 {item.status_detail}
//               </span>,
//               <Switch
//                 checked={item.status == "1"}
//                 onChange={(e) =>
//                   verifyUser(item, e.currentTarget.checked ? "1" : "2")
//                 }
//               />,
//             ])}
//           />
//         </div>
//         {metaItems && (
//           <div className="mt-5">
//             <div className="flex lg:flex-row flex-col items-center justify-between gap-5">
//               <div className="text-sm">
//                 Menampilkan {metaItems?.from || 0} - {metaItems?.to || 0} dari{" "}
//                 {metaItems?.total} data
//               </div>
//               <Pagination
//                 current={metaItems.current_page}
//                 total={metaItems.last_page}
//                 onChange={(val) => setPage(val)}
//               />
//             </div>
//           </div>
//         )}
//       </Card>
//     </AdminLayout>
//   );
// }

export default function () {
  const loading = useLoading();
  const notif = useNotif();

  const [items, setItems] = useState<User[]>([]);
  const [metaItems, setMetaItems] = useState<Meta>();
  const [total, setTotal] = useState({
    total: 0,
    terverifikasi: 0,
    pending: 0,
  });
  const [q, setQ] = useState<string>("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(1);

  const getTotal = async () => {
    const res = await http().get("/total/user");
    setTotal(res.data.data as typeof total);
  };

  const getUser = async () => {
    try {
      const res = await http().get("/user", {
        params: {
          q,
          role,
          status,
          page,
        },
      });
      setItems(res.data.data);
      setMetaItems(res.data.meta);
    } catch (e: any) {
      notif?.show("Gagal mengambil data", false);
    }
  };

  const verifyUser = (item: User, status: string) => {
    loading?.show(async () => {
      item.status = status as any;
      const res = await http().put("/user/" + item.id_pengguna, item);
      getTotal();
      loading.show(getUser);
      notif?.show("status pengguna berhasil diubah");
    });
  };

  useEffect(() => {
    getTotal();
  }, []);

  useEffect(() => {
    loading?.show(getUser);
  }, [role, status, page]);

  return (
    <AdminLayout title="Data User">
      <div className="grid lg:grid-cols-3 grid-cols-1 gap-x-5">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl">{total.total}</div>
              <div className="text-sm">Total User</div>
            </div>
            <div className="rounded-full bg-blue-500 h-16 w-16 flex items-center justify-center bg-opacity-25">
              <UsersIcon className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl">{total.terverifikasi}</div>
              <div className="text-sm">User Terverifikasi</div>
            </div>
            <div className="rounded-full bg-green-500 h-16 w-16 flex items-center justify-center bg-opacity-25">
              <CheckBadgeIcon className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl">{total.pending}</div>
              <div className="text-sm">User Pending</div>
            </div>
            <div className="rounded-full bg-primary h-16 w-16 flex items-center justify-center bg-opacity-25">
              <BellIcon className="w-8 h-8 text-primary" />
            </div>
          </div>
        </Card>
      </div>
      <Card title="Data User">
        <div className="flex lg:flex-row flex-col items-center gap-x-3">
          <div className="lg:w-1/4 w-full">
            <FormGroup>
              <Select
                options={[
                  {
                    value: "",
                    label: "Semua Pengguna",
                  },
                  {
                    value: "admin",
                    label: "Admin",
                  },
                  {
                    value: "petugas",
                    label: "Petugas",
                  },
                  {
                    value: "korban",
                    label: "Korban",
                  },
                ]}
                value={role}
                onChange={(e) => setRole(e.currentTarget.value)}
              />
            </FormGroup>
          </div>
          <div className="lg:w-1/4 w-full">
            <FormGroup>
              <Select
                options={[
                  {
                    value: "",
                    label: "Semua User",
                  },
                  {
                    value: "pending",
                    label: "Pending",
                  },
                  {
                    value: "terverifikasi",
                    label: "Terverifikasi",
                  },
                ]}
                value={status}
                onChange={(e) => setStatus(e.currentTarget.value)}
              />
            </FormGroup>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              loading?.show(getUser);
            }}
            className="lg:w-1/2 w-full"
          >
            <FormGroup
              suffix={
                <button
                  type="submit"
                  className="bg-primary h-10 px-3 rounded text-white"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>
              }
            >
              <Input
                value={q}
                onChange={(e) => setQ(e.currentTarget.value)}
                placeholder="Ketikkan Nama..."
              />
            </FormGroup>
          </form>
        </div>

        <div className="-mx-5 mt-5 overflow-x-auto">
          <Table
            headers={[
              "Nama Pengguna",
              "Role",
              "Alamat",
              "Telepon",
              "Status",
              "Verifikasi",
            ]}
            items={items.map((item) => [
              item.nama_lengkap,
              <div className="flex items-center">
                {
                  {
                    admin: (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-blue-100 mr-3">
                        <DesktopIcon className="w-4 h-4 text-blue-500" />
                      </div>
                    ),
                    petugas: (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-green-100 mr-3">
                        <BuoyIcon className="w-4 h-4 text-green-500" />
                      </div>
                    ),
                    korban: (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center bg-red-100 mr-3">
                        <ArrowTrendDown className="w-4 h-4 text-red-500" />
                      </div>
                    ),
                  }[item.roles as string]
                }
                {item.roles}
              </div>,
              item.alamat,
              item.telepon,
              <span
                className={`${
                  {
                    terverifikasi: "bg-green-200 text-green-500",
                    pending: "bg-red-200 text-red-500",
                  }[item.status as string]
                } text-xs px-2 p-1 rounded`}
              >
                {item.status}
              </span>,
              <Switch
                checked={item.status == "terverifikasi"}
                onChange={(e) =>
                  verifyUser(
                    item,
                    e.currentTarget.checked ? "terverifikasi" : "pending"
                  )
                }
              />,
            ])}
          />
        </div>
        {metaItems && (
          <div className="mt-5">
            <div className="flex lg:flex-row flex-col items-center justify-between gap-5">
              <div className="text-sm">
                Menampilkan {metaItems?.from || 0} - {metaItems?.to || 0} dari{" "}
                {metaItems?.total} data
              </div>
              <Pagination
                current={metaItems.current_page}
                total={metaItems.last_page}
                onChange={(val) => setPage(val)}
              />
            </div>
          </div>
        )}
      </Card>
    </AdminLayout>
  );
}
