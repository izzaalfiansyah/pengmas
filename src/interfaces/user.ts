// export default interface User {
//   id?: string;
//   nama?: string;
//   email?: string;
//   telepon?: string;
//   roles?: string;
//   role?: "1" | "2" | "3";
//   role_detail?: string;
//   status?: "0" | "1" | "2";
//   status_detail?: string;
// }

export default interface User {
  id_pengguna?: string;
  nama_lengkap?: string;
  telepon?: string;
  alamat?: string;
  roles?: "admin" | "petugas" | "korban";
  status?: "terverifikasi" | "pending";
}
