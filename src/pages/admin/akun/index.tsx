import Card from "@/components/card";
import FormGroup from "@/components/form/form-group";
import Input from "@/components/form/input";
import Textarea from "@/components/form/textarea";
import { useAuth } from "@/contexts/auth-context";
import { useLoading } from "@/contexts/loading-context";
import { useNotif } from "@/contexts/notif-context";
import User from "@/interfaces/user";
import AdminLayout from "@/layouts/admin-layout";
import http from "@/libs/http";
import { useEffect, useState } from "react";

// export default function () {
//   const auth = useAuth();
//   const loading = useLoading();
//   const notif = useNotif();

//   const [nama, setNama] = useState("");
//   const [email, setEmail] = useState("");
//   const [telepon, setTelepon] = useState("");
//   const [alamat, setAlamat] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState<any>({});

//   const getAccount = async () => {
//     try {
//       const res = await http().get("/user/" + auth?.val?.id);
//       const item: User = res.data.data;

//       setNama(item.nama as string);
//       setEmail(item.email as string);
//       setTelepon(item.telepon as string);
//       setAlamat(item.alamat as string);
//     } catch (e) {
//       alert("Gagal mengambil data");
//     }
//   };

//   const saveUser = async () => {
//     try {
//       setError({});
//       await http().put("/user/" + auth?.val?.id, {
//         nama,
//         email,
//         telepon,
//         alamat,
//         password,
//       });
//       notif?.show("data berhasil disimpan");
//     } catch (err) {
//       setError(err);
//     }
//   };

//   useEffect(() => {
//     loading?.show(getAccount);
//   }, []);

//   return (
//     <AdminLayout title="Akun">
//       <Card title="Pengaturan Akun">
//         <form
//           onSubmit={(e) => {
//             e.preventDefault();
//             loading?.show(saveUser);
//           }}
//         >
//           <FormGroup label="Nama">
//             <Input
//               placeholder="Masukkan Nama"
//               value={nama}
//               onChange={(e) => setNama(e.currentTarget.value)}
//             />
//             <div className="text-xs mt-1 text-red-500">{error.nama}</div>
//           </FormGroup>
//           <FormGroup label="Email">
//             <Input
//               type="email"
//               placeholder="Masukkan Email"
//               value={email}
//               onChange={(e) => setEmail(e.currentTarget.value)}
//             />
//             <div className="text-xs mt-1 text-red-500">{error.email}</div>
//           </FormGroup>
//           <FormGroup label="Telepon">
//             <Input
//               type="tel"
//               placeholder="Masukkan Telepon"
//               value={telepon}
//               onChange={(e) => setTelepon(e.currentTarget.value)}
//             />
//             <div className="text-xs mt-1 text-red-500">{error.telepon}</div>
//           </FormGroup>
//           <FormGroup label="Alamat">
//             <Textarea
//               rows={4}
//               placeholder="Masukkan Alamat"
//               value={alamat}
//               onChange={(e) => setAlamat(e.currentTarget.value)}
//             />
//             <div className="text-xs mt-1 text-red-500">{error.alamat}</div>
//           </FormGroup>
//           <FormGroup label="Password">
//             <Input
//               type="password"
//               placeholder="Masukkan Password"
//               value={password}
//               onChange={(e) => setPassword(e.currentTarget.value)}
//             />
//             <div className="mt-1 text-xs">
//               Kosongkan jika tidak ingin mengganti password
//             </div>
//             <div className="text-xs mt-1 text-red-500">{error.password}</div>
//           </FormGroup>
//           <div className="mt-5 flex justify-end">
//             <button
//               type="submit"
//               className="bg-primary px-6 p-2 text-white rounded"
//             >
//               Simpan
//             </button>
//           </div>
//         </form>
//       </Card>
//     </AdminLayout>
//   );
// }

export default function () {
  const auth = useAuth();
  const loading = useLoading();
  const notif = useNotif();

  const [nama_lengkap, setNama_lengkap] = useState("");
  const [telepon, setTelepon] = useState("");
  const [alamat, setAlamat] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState<any>({});

  const getAccount = async () => {
    try {
      const res = await http().get("/user/" + auth?.val?.id_pengguna);
      const item: User = res.data.data;

      setNama_lengkap(item.nama_lengkap as string);
      setTelepon(item.telepon as string);
      setAlamat(item.alamat as string);
      setRoles(item.roles as string);
      setStatus(item.status as string);
    } catch (e) {
      notif?.show("Gagal mengambil data", false);
    }
  };

  const saveUser = async () => {
    try {
      setError({});
      await http().put("/user/" + auth?.val?.id_pengguna, {
        nama_lengkap,
        telepon,
        alamat,
        password,
        roles,
        status,
      });
      notif?.show("data berhasil disimpan");
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    loading?.show(getAccount);
  }, []);

  return (
    <AdminLayout title="Akun">
      <Card title="Pengaturan Akun">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loading?.show(saveUser);
          }}
        >
          <FormGroup label="Nama Lengkap">
            <Input
              placeholder="Masukkan Nama Lengkap"
              value={nama_lengkap}
              onChange={(e) => setNama_lengkap(e.currentTarget.value)}
            />
            <div className="text-xs mt-1 text-red-500">
              {error.nama_lengkap}
            </div>
          </FormGroup>
          <FormGroup label="Telepon">
            <Input
              type="tel"
              placeholder="Masukkan Telepon"
              value={telepon}
              onChange={(e) => setTelepon(e.currentTarget.value)}
            />
            <div className="text-xs mt-1 text-red-500">{error.telepon}</div>
          </FormGroup>
          <FormGroup label="Alamat">
            <Textarea
              rows={4}
              placeholder="Masukkan Alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.currentTarget.value)}
            />
            <div className="text-xs mt-1 text-red-500">{error.alamat}</div>
          </FormGroup>
          <FormGroup label="Password">
            <Input
              type="password"
              placeholder="Masukkan Password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <div className="mt-1 text-xs">
              Kosongkan jika tidak ingin mengganti password
            </div>
            <div className="text-xs mt-1 text-red-500">{error.password}</div>
          </FormGroup>
          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              className="bg-primary px-6 p-2 text-white rounded"
            >
              Simpan
            </button>
          </div>
        </form>
      </Card>
    </AdminLayout>
  );
}
